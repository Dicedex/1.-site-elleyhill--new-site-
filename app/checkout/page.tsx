"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart, WHATSAPP_PHONE_NUMBER, WHATSAPP_PHONE_DISPLAY, PlacedOrder } from "@/context/CartContext";
import { useAuth, getNextSequenceNumber } from "@/context/AuthContext";

import { initiatePawaPayPayment } from "@/lib/pawapay";

type Step = 1 | 2;
type PaymentMethod = "momo" | "card" | "staged" | "layby" | "wire";
type MomoProvider = "mtn" | "airtel" | "zamtel";

/**
 * Detects the Zambian Mobile Money network provider based on phone number prefixes:
 * - MTN Zambia: 096, 076 (or +260 96, +260 76, 96, 76)
 * - Airtel Zambia: 097, 077 (or +260 97, +260 77, 97, 77)
 * - Zamtel: 095, 075 (or +260 95, +260 75, 95, 75)
 */
function detectMomoProvider(phoneStr: string): MomoProvider | null {
  if (!phoneStr) return null;
  const cleaned = phoneStr.replace(/\D/g, "");
  const withoutCountryCode = cleaned.startsWith("260") ? cleaned.slice(3) : cleaned;
  const nationalNumber = withoutCountryCode.startsWith("0") ? withoutCountryCode.slice(1) : withoutCountryCode;

  if (nationalNumber.startsWith("96") || nationalNumber.startsWith("76")) {
    return "mtn";
  }
  if (nationalNumber.startsWith("97") || nationalNumber.startsWith("77")) {
    return "airtel";
  }
  if (nationalNumber.startsWith("95") || nationalNumber.startsWith("75")) {
    return "zamtel";
  }
  return null;
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    hardwareSubtotal,
    installationSubtotal,
    deliveryZone,
    setDeliveryZone,
    deliveryCost,
    isFreeDelivery,
    freeDeliveryProgress,
    amountForFreeDelivery,
    grandTotal,
    totalItemsCount,
    saveOrder,
    clearCart,
  } = useCart();

  const { user, isAuthenticated, addOrder } = useAuth();

  const defaultAddress =
    user?.savedAddresses?.find((a) => a.isDefault) ||
    (user?.savedAddresses && user.savedAddresses.length > 0
      ? user.savedAddresses[0]
      : null);
  const primaryAddressText = defaultAddress?.fullAddress || user?.primaryAddress || "";
  const districtText = defaultAddress?.district || user?.primaryDistrict || "";
  const provinceText = defaultAddress?.province || user?.primaryProvince || "";
  const hasSavedAddress = Boolean(
    primaryAddressText.trim() || districtText.trim() || provinceText.trim()
  );
  const hasInstallation =
    installationSubtotal > 0 ||
    items.some(
      (item) => item.installationIncluded || item.installationOption === "professional"
    );

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [placedOrderSnapshot, setPlacedOrderSnapshot] = useState<PlacedOrder | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatusText, setPaymentStatusText] = useState("");

  // Step 1: Site & Contact Form State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("lusaka");
  const [roofType, setRoofType] = useState("ibr");
  const [scheduleOption, setScheduleOption] = useState<"fastest" | "scheduled" | "staged">("fastest");

  // Step 2: Payment Gateway Form State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");
  const [momoProvider, setMomoProvider] = useState<MomoProvider>("mtn");
  const [momoPhone, setMomoPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [acceptStagedAgreement, setAcceptStagedAgreement] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [activeOrderRef, setActiveOrderRef] = useState("");

  // Sync with logged in user profile
  useEffect(() => {
    if (user) {
      if (user.fullName) setFullName(user.fullName);
      if (user.email) setEmail(user.email);
      if (user.phone) {
        const cleanPhone = user.phone.replace("+260", "").trim();
        setPhone(cleanPhone);
        setMomoPhone((prev) => {
          if (!prev) {
            const detected = detectMomoProvider(cleanPhone);
            if (detected) setMomoProvider(detected);
            return cleanPhone;
          }
          return prev;
        });
      }
      const defaultAddr =
        user.savedAddresses?.find((a) => a.isDefault) ||
        (user.savedAddresses && user.savedAddresses.length > 0
          ? user.savedAddresses[0]
          : null);
      const addr = defaultAddr?.fullAddress || user.primaryAddress || "";
      if (addr) setAddress(addr);
      const prov = defaultAddr?.province || user.primaryProvince || "lusaka";
      if (prov.toLowerCase().includes("lusaka")) {
        setProvince("lusaka");
        setDeliveryZone("lusaka");
      } else {
        setProvince(prov);
        setDeliveryZone("copperbelt");
      }
    }
  }, [user, setDeliveryZone]);

  const handleMomoPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setMomoPhone(val);
    const detected = detectMomoProvider(val);
    if (detected) {
      setMomoProvider(detected);
    }
  };

  const copyOrderRef = () => {
    navigator.clipboard.writeText(activeOrderRef);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2200);
  };

  const handleProvinceChange = (newProvince: string) => {
    setProvince(newProvince);
    if (newProvince === "lusaka") {
      setDeliveryZone("lusaka");
    } else {
      setDeliveryZone("copperbelt");
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      router.push("/cart");
      return;
    }
    // Auto-populate Momo phone from Step 1 phone if not already filled
    if (!momoPhone && phone) {
      const cleanPhone = phone.replace("+260", "").trim();
      setMomoPhone(cleanPhone);
      const detected = detectMomoProvider(cleanPhone);
      if (detected) {
        setMomoProvider(detected);
      }
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      router.push("/cart");
      return;
    }
    setIsProcessingPayment(true);
    setPaymentStatusText("Connecting to Secure Payment Gateway...");

    const seq = getNextSequenceNumber("ehp_order_sequence", 4);
    const generatedRef = `EHP-${new Date().getFullYear()}-${seq}`;
    setActiveOrderRef(generatedRef);

    const checkoutItems = items.length > 0 ? items : [];

    const finalCustomerName = fullName || user?.fullName || "Online Client";
    const finalCustomerEmail = email || user?.email || "customer@elleyhill.co.zm";
    const finalPhone = momoPhone || phone || user?.phone || "0971838038";
    const finalAddress = address || defaultAddress?.fullAddress || user?.primaryAddress || "Lusaka Delivery";

    // Trigger Cloudflare Worker Edge request to payment switch if Mobile Money or Card
    if (paymentMethod === "momo" || paymentMethod === "card") {
      setPaymentStatusText(
        paymentMethod === "momo"
          ? `Initiating ${momoProvider.toUpperCase()} MoMo STK Push (+260 ${finalPhone})...`
          : "Authorizing 3D-Secure Card..."
      );

      try {
        await initiatePawaPayPayment({
          orderRef: generatedRef,
          amount: grandTotal,
          phone: finalPhone,
          provider: paymentMethod === "momo" ? momoProvider : "card",
          customerName: finalCustomerName,
          customerEmail: finalCustomerEmail,
        });
      } catch (pawaErr) {
        console.warn("pawaPay gateway dispatch:", pawaErr);
      }
    }

    const orderData: PlacedOrder = {
      orderRef: generatedRef,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: finalCustomerName,
        email: finalCustomerEmail,
        phone: finalPhone,
        address: finalAddress,
        province,
        roofType,
        scheduleOption,
      },
      payment: {
        method: paymentMethod,
        momoProvider,
        momoPhone: finalPhone,
        gateway: "pawaPay (Cloudflare Edge)",
        status: "authorized",
      },
      items: checkoutItems,
      deliveryZone,
      deliveryCost,
      hardwareSubtotal,
      installationSubtotal,
      grandTotal,
    };

    setPlacedOrderSnapshot(orderData);
    saveOrder(orderData);

    // Save into authenticated user profile history and admin dashboard
    try {
      addOrder({
        id: generatedRef,
        customerName: finalCustomerName,
        customerEmail: finalCustomerEmail,
        items: checkoutItems.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.qty,
          price: i.price,
          image: i.image,
        })),
        total: grandTotal,
        subtotal: hardwareSubtotal + installationSubtotal,
        deliveryFee: deliveryCost,
        deliveryAddress: finalAddress,
        district: province === "lusaka" ? "Lusaka" : "Regional",
        province: province === "lusaka" ? "Lusaka Province" : `${province} Province`,
        phone: finalPhone,
        paymentMethod:
          paymentMethod === "momo"
            ? `Mobile Money (${momoProvider.toUpperCase()})`
            : paymentMethod === "card"
            ? "Card (3D Secure)"
            : paymentMethod === "staged"
            ? "70/30 Staged Financing"
            : paymentMethod === "layby"
            ? "Lay-By Reserve"
            : "Bank Transfer",
      });
    } catch (e) {
      console.error("Failed to add order to auth profile and admin ledger", e);
    }

    // EMPTY CART UPON ORDER COMPLETION
    clearCart();

    setIsProcessingPayment(false);
    setPaymentStatusText("");
    router.push("/order-confirmation");
  };

  // Dynamic calculations for staged and lay-by
  const confirmedGrandTotal = placedOrderSnapshot ? placedOrderSnapshot.grandTotal : grandTotal;
  const stage1Amount = Math.round(confirmedGrandTotal * 0.7);
  const stage2Amount = confirmedGrandTotal - stage1Amount;
  const laybyMonthlyAmount = Math.round(confirmedGrandTotal / 3);

  const displayOrderItems = placedOrderSnapshot?.items && placedOrderSnapshot.items.length > 0 ? placedOrderSnapshot.items : items;
  const displayHardware = placedOrderSnapshot ? placedOrderSnapshot.hardwareSubtotal : hardwareSubtotal;
  const displayInstall = placedOrderSnapshot ? placedOrderSnapshot.installationSubtotal : installationSubtotal;
  const displayDeliveryCost = placedOrderSnapshot ? placedOrderSnapshot.deliveryCost : deliveryCost;

  const whatsappConfirmationLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello Elleyhill Power Dispatch Desk, I have authorized my order:\n` +
      `Ref: #${activeOrderRef}\n` +
      `Customer: ${fullName}\n` +
      `Contact: +260 ${phone}\n` +
      `Site: ${address}, ${province.toUpperCase()} PROVINCE\n` +
      `Roof Material: ${roofType.toUpperCase()}\n` +
      `Schedule: ${
        scheduleOption === "fastest"
          ? "Within 48h (Fastest Window)"
          : scheduleOption === "scheduled"
          ? "Custom Date"
          : "Delivery First (Staged Setup)"
      }\n` +
      `Financing Gateway: ${
        paymentMethod === "momo"
          ? `Mobile Money (${momoProvider.toUpperCase()})`
          : paymentMethod === "card"
          ? "Credit/Debit Card (3D Secure)"
          : paymentMethod === "staged"
          ? `70/30 Staged Plan (ZMW ${stage1Amount.toLocaleString()} today)`
          : paymentMethod === "layby"
          ? `Lay-By Reserve (ZMW ${laybyMonthlyAmount.toLocaleString()} deposit)`
          : "Bank EFT Wire Proforma"
      }\n` +
      `Items:\n` +
      displayOrderItems.map((i) => `• ${i.qty}x ${i.name}`).join("\n") +
      `\nTotal Authorized: ZMW ${confirmedGrandTotal.toLocaleString()}\n` +
      `Please confirm technician dispatch team staging.`
  )}`;

  return (
    <div className="bg-surface font-body-lg text-body-lg text-on-surface antialiased min-h-screen pt-[72px]">
      <main className="w-full bg-surface min-h-[calc(100vh-72px)] flex items-center justify-center p-4 md:p-gutter">
        <div className="flex flex-col w-full max-w-[1380px] mx-auto py-6 md:py-8">
          {/* Progress Stepper Header */}
          <header className="w-full mb-8 md:mb-10">
            <div className="flex items-center justify-between gap-4 relative">
              {/* Step 1 Indicator */}
              <div
                onClick={() => currentStep > 1 && setCurrentStep(1)}
                className={`flex-1 flex items-center gap-3 ${
                  currentStep > 1 ? "cursor-pointer" : ""
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-technical-data text-technical-data shadow-sm ${
                    currentStep > 1
                      ? "bg-secondary text-on-secondary"
                      : "bg-primary text-on-primary font-bold"
                  }`}
                >
                  {currentStep > 1 ? (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  ) : (
                    "1"
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-technical-data text-[11px] uppercase tracking-wider text-outline">
                    Step 01 / 02
                  </span>
                  <span className="font-headline-md text-[15px] font-semibold text-on-surface truncate">
                    Site &amp; Delivery Details
                  </span>
                </div>
              </div>

              <div
                className={`hidden sm:block w-16 h-0.5 ${
                  currentStep >= 2 ? "bg-secondary" : "bg-surface-container-highest"
                }`}
              ></div>

              {/* Step 2 Indicator */}
              <div
                className={`flex-1 flex items-center gap-3 ${
                  currentStep === 2 ? "" : "opacity-40"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-technical-data text-technical-data font-bold shadow-sm ${
                    currentStep === 2
                      ? "bg-tertiary-fixed text-on-tertiary-fixed"
                      : "bg-surface-container-high text-on-surface"
                  }`}
                >
                  2
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-technical-data text-[11px] uppercase tracking-wider text-secondary font-bold">
                    {currentStep === 2 ? "Step 02 / Active" : "Step 02 / 02"}
                  </span>
                  <span className="font-headline-md text-[15px] font-bold text-on-surface truncate">
                    Payment &amp; Authorization
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* EMPTY CART GUARD: Do not proceed if cart is empty */}
          {items.length === 0 ? (
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-sm border border-border-light text-center max-w-2xl mx-auto my-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[36px]">remove_shopping_cart</span>
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-secondary font-technical-data text-xs font-bold uppercase tracking-wider mb-1">
                  Cart Empty
                </div>
                <h2 className="font-headline-md text-2xl font-bold text-primary">
                  Your Cart is Currently Empty
                </h2>
                <p className="font-body-sm text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  You cannot proceed to checkout without items in your cart. Please select a hybrid solar inverter, lithium battery, or complete package from our store to begin.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs uppercase font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">solar_power</span>
                  <span>Browse Solar Catalog</span>
                </Link>
                <Link
                  href="/calculator"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary border border-border-light font-label-cta text-xs uppercase font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calculate</span>
                  <span>Solar Sizing Calculator</span>
                </Link>
              </div>
            </div>
          ) : currentStep === 1 && !isAuthenticated ? (
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-sm border border-border-light text-center max-w-2xl mx-auto my-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">account_circle</span>
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary font-technical-data text-xs font-bold uppercase tracking-wider mb-1">
                  Authentication Required
                </div>
                <h2 className="font-headline-md text-2xl font-bold text-primary">
                  Sign In to Access Site &amp; Delivery Details
                </h2>
                <p className="font-body-sm text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  You must be signed in with a verified account to access Step 1 (Site &amp; Delivery Details) and schedule engineering staging in Zambia.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/login?redirect=/checkout"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs uppercase font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">login</span>
                  <span>Sign In to Account</span>
                </Link>
                <Link
                  href="/signup?redirect=/checkout"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary border border-border-light font-label-cta text-xs uppercase font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>Create Free Account</span>
                </Link>
              </div>
              <div className="pt-2">
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-1.5 font-technical-data text-xs text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                  <span>Return to Shopping Cart</span>
                </Link>
              </div>
            </div>
          ) : currentStep === 1 && !hasSavedAddress ? (
            <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl shadow-sm border border-amber-200 text-center max-w-2xl mx-auto my-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">add_location_alt</span>
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-technical-data text-xs font-bold uppercase tracking-wider mb-1">
                  Delivery Address Required
                </div>
                <h2 className="font-headline-md text-2xl font-bold text-primary">
                  Add Installation Address to Proceed
                </h2>
                <p className="font-body-sm text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
                  You are signed in as <strong className="text-primary">{user?.fullName || user?.email}</strong>, but haven&apos;t added an installation or delivery address to your account profile yet. Please configure your address to proceed with Step 1 (Site &amp; Delivery Details).
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link
                  href="/profile"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs uppercase font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_location</span>
                  <span>Add Address in Profile</span>
                </Link>
                <Link
                  href="/cart"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-surface-container hover:bg-surface-container-high text-primary border border-border-light font-label-cta text-xs uppercase font-bold tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  <span>Back to Cart</span>
                </Link>
              </div>
            </div>
          ) : currentStep === 1 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <form id="step1-form" onSubmit={handleStep1Submit} className="lg:col-span-7 flex flex-col gap-6">
                {/* Confirmation Intro Alert */}
                <div className="p-4 rounded-2xl bg-secondary-container/30 border border-secondary/30 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-technical-data text-xs uppercase font-bold text-secondary">
                      Profile &amp; Site Final Confirmation
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                      Please confirm your verified contact credentials and installation destination loaded from your Elleyhill account profile before selecting your payment method.
                    </p>
                  </div>
                </div>

                {/* 1. Verified Customer & Contact Information */}
                <section className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-border-light space-y-5">
                  <div className="flex items-center justify-between border-b border-border-light pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-technical-data font-bold text-sm shadow-sm">
                        1
                      </div>
                      <div>
                        <h2 className="font-headline-md text-base md:text-lg text-on-surface font-bold">
                          Verified Contact Credentials
                        </h2>
                        <p className="font-body-sm text-xs text-on-surface-variant">
                          Official recipient details for VAT invoices, order updates &amp; warranty certificate.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="inline-flex items-center gap-1 text-xs font-technical-data text-primary hover:underline font-bold"
                    >
                      <span className="material-symbols-outlined text-[14px]">edit</span>
                      <span>Edit Profile</span>
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-surface-container-low border border-border-light space-y-1">
                      <span className="font-technical-data text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Full Name / Account Entity
                      </span>
                      <div className="font-technical-data text-sm font-bold text-primary truncate">
                        {user?.fullName || fullName || "Registered User"}
                      </div>
                      <div className="text-[11px] text-secondary font-medium uppercase tracking-wider">
                        {user?.role === "admin"
                          ? "Administrator"
                          : user?.accountType && user.accountType !== "residential"
                          ? `${user.accountType} Account`
                          : "Verified Account"}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low border border-border-light space-y-1">
                      <span className="font-technical-data text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Official Billing Email
                      </span>
                      <div className="font-technical-data text-sm font-bold text-primary truncate">
                        {user?.email || email}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-status-success font-medium">
                        <span className="material-symbols-outlined text-[13px]">verified</span>
                        <span>{user?.emailVerified ? "Verified Email" : "Linked Login ID"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dispatch Contact Phone Input & WhatsApp Alerts */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block font-technical-data text-xs uppercase text-on-surface tracking-wider font-semibold mb-2">
                        Technician &amp; SMS Dispatch Phone <span className="text-secondary">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-3 bg-surface-container-high rounded-xl text-on-surface font-technical-data text-sm font-semibold select-none border border-border-light">
                          <span className="text-base leading-none">🇿🇲</span>
                          <span>+260</span>
                        </div>
                        <div className="relative flex-1">
                          <input
                            type="tel"
                            name="tel"
                            id="checkout-phone"
                            autoComplete="tel"
                            inputMode="tel"
                            className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-on-surface font-body-lg placeholder:text-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all border border-border-light"
                            pattern="[0-9 ]{9,12}"
                            placeholder="97 183 8038"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <p className="font-body-sm text-[11px] text-on-surface-variant mt-1.5">
                        Logistics drivers will contact this number 60 minutes prior to staging arrival.
                      </p>
                    </div>

                    <label className="flex items-start gap-3.5 p-4 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors group border border-border-light">
                      <input
                        checked={whatsappAlerts}
                        onChange={(e) => setWhatsappAlerts(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary accent-secondary"
                        type="checkbox"
                      />
                      <div className="text-xs font-body-sm text-on-surface">
                        <span className="font-semibold block text-on-surface">
                          Opt-in to real-time WhatsApp logistics alerts (+260 {phone || "Phone"})
                        </span>
                        Receive live dispatch updates, digital commissioning reports, and warranty certificates.
                      </div>
                    </label>
                  </div>
                </section>

                {/* 2. Verified Installation & Delivery Site */}
                <section className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-border-light space-y-5">
                  <div className="flex items-center justify-between border-b border-border-light pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-technical-data font-bold text-sm shadow-sm">
                        2
                      </div>
                      <div>
                        <h2 className="font-headline-md text-base md:text-lg text-on-surface font-bold">
                          Verified Installation Destination
                        </h2>
                        <p className="font-body-sm text-xs text-on-surface-variant">
                          Confirmed destination for heavy equipment unloading &amp; technician staging.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="inline-flex items-center gap-1 text-xs font-technical-data text-primary hover:underline font-bold"
                    >
                      <span className="material-symbols-outlined text-[14px]">add_location</span>
                      <span>Manage Sites</span>
                    </Link>
                  </div>

                  {/* Multiple saved address selector if available */}
                  {user?.savedAddresses && user.savedAddresses.length > 1 && (
                    <div className="space-y-2">
                      <span className="font-technical-data text-xs text-on-surface-variant uppercase font-bold tracking-wider">
                        Select from your Saved Sites:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {user.savedAddresses.map((addr) => {
                          const isSelected = address === addr.fullAddress;
                          return (
                            <div
                              key={addr.id}
                              onClick={() => {
                                setAddress(addr.fullAddress);
                                const prov = addr.province || "Lusaka Province";
                                setProvince(prov.toLowerCase().includes("lusaka") ? "lusaka" : "copperbelt");
                                setDeliveryZone(prov.toLowerCase().includes("lusaka") ? "lusaka" : "copperbelt");
                              }}
                              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                                isSelected
                                  ? "bg-secondary-container/30 border-secondary ring-2 ring-secondary/20 shadow-xs"
                                  : "bg-surface-container-low border-border-light hover:bg-surface-container"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="font-technical-data text-xs font-bold text-primary">
                                  {addr.label}
                                </span>
                                {isSelected && (
                                  <span className="text-secondary material-symbols-outlined text-[16px]">
                                    check_circle
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-on-surface-variant line-clamp-1">{addr.fullAddress}</p>
                              <p className="text-[11px] text-on-surface-variant font-medium mt-1">
                                {addr.district}, {addr.province}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Active Verified Address Card */}
                  <div className="p-5 rounded-2xl bg-surface-container-low border border-secondary/40 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-secondary">
                          <span className="material-symbols-outlined text-[22px]">location_on</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary-container text-secondary border border-secondary/20">
                              {defaultAddress?.label || "Primary Verified Site"}
                            </span>
                            <span className="text-xs font-bold text-status-success flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">verified</span>
                              Site Confirmed
                            </span>
                          </div>
                          <p className="font-technical-data text-base font-bold text-primary pt-0.5">
                            {address || primaryAddressText}
                          </p>
                          <p className="font-body-sm text-xs text-on-surface-variant">
                            {[districtText, province.toUpperCase() + " PROVINCE"].filter(Boolean).join(" • ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border-light flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-technical-data text-xs font-bold text-primary">
                        <span className="material-symbols-outlined text-secondary text-[16px]">local_shipping</span>
                        <span>
                          {province === "lusaka"
                            ? "Lusaka Central Hub Staging (Within 48h)"
                            : "Regional Convoy Logistics Staging"}
                        </span>
                      </div>
                      <span className="font-technical-data text-xs font-bold text-secondary">
                        {province === "lusaka"
                          ? hardwareSubtotal >= 78000
                            ? "100% FREE Dispatch Unlocked"
                            : "ZMW 750 Standard Dispatch"
                          : "ZMW 2,500 Regional Dispatch"}
                      </span>
                    </div>
                  </div>
                </section>

                {/* 3. Installation Details (Only if user opted for installation) */}
                {hasInstallation && (
                  <section className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-border-light space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-technical-data font-bold text-sm shadow-sm">
                        3
                      </div>
                      <div>
                        <h2 className="font-headline-md text-base md:text-lg text-on-surface font-bold">
                          Installation Details
                        </h2>
                        <p className="font-body-sm text-xs text-on-surface-variant">
                          Structural specifics for solar mounting brackets and engineering safety equipment.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block font-technical-data text-xs uppercase text-on-surface tracking-wider font-semibold mb-2">
                          Mounting Surface / Roof Material <span className="text-secondary">*</span>
                        </label>
                        <div className="relative">
                          <select
                            className="w-full appearance-none px-4 py-3 bg-surface-container-low rounded-xl text-on-surface font-body-lg focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all pr-10 border border-border-light"
                            required
                            value={roofType}
                            onChange={(e) => setRoofType(e.target.value)}
                          >
                            <option value="ibr">IBR Profile Sheet Iron (Standard Clamps)</option>
                            <option value="corrugated">Standard Corrugated Iron (Hanger Bolts)</option>
                            <option value="tile">Concrete / Clay Roof Tile (Stainless Hooks)</option>
                            <option value="ground">Ground Mount / Open Yard Rigging</option>
                            <option value="flat">Concrete Flat Roof Deck (Ballasted Mounts)</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>

                      {/* Schedule Preference */}
                      <div>
                        <label className="block font-technical-data text-xs uppercase text-on-surface tracking-wider font-semibold mb-2">
                          Installation Schedule Window Preference
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <label
                            onClick={() => setScheduleOption("fastest")}
                            className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                              scheduleOption === "fastest"
                                ? "bg-secondary-container/30 border-secondary ring-2 ring-secondary/20"
                                : "bg-surface-container-low border-border-light hover:bg-secondary-container/20"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-label-cta text-xs text-on-surface font-bold">Fastest Window</span>
                              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                            </div>
                            <div className="font-headline-md text-base text-secondary font-bold mb-1">Within 48h</div>
                            <p className="font-body-sm text-[11px] text-on-surface-variant">
                              Engineers arrive in priority batch from Lusaka Hub.
                            </p>
                          </label>

                          <label
                            onClick={() => setScheduleOption("scheduled")}
                            className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                              scheduleOption === "scheduled"
                                ? "bg-secondary-container/30 border-secondary ring-2 ring-secondary/20"
                                : "bg-surface-container-low border-border-light hover:bg-secondary-container/20"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-label-cta text-xs text-on-surface font-bold">Custom Date</span>
                              <span className="material-symbols-outlined text-outline text-sm">calendar_today</span>
                            </div>
                            <div className="font-headline-md text-base text-on-surface font-bold mb-1">Select Day</div>
                            <p className="font-body-sm text-[11px] text-on-surface-variant">
                              Coordinate with your ongoing architectural works.
                            </p>
                          </label>

                          <label
                            onClick={() => setScheduleOption("staged")}
                            className={`relative flex flex-col p-4 rounded-xl cursor-pointer transition-all border ${
                              scheduleOption === "staged"
                                ? "bg-secondary-container/30 border-secondary ring-2 ring-secondary/20"
                                : "bg-surface-container-low border-border-light hover:bg-secondary-container/20"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-label-cta text-xs text-on-surface font-bold">Staged Setup</span>
                              <span className="material-symbols-outlined text-outline text-sm">inventory_2</span>
                            </div>
                            <div className="font-headline-md text-base text-on-surface font-bold mb-1">Delivery First</div>
                            <p className="font-body-sm text-[11px] text-on-surface-variant">
                              Store equipment on-site now; commission later on notice.
                            </p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </form>

              {/* Order Summary Sidebar for Step 1 */}
              <aside className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-md flex flex-col gap-6 border border-border-light">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Order Summary</h3>
                    <span className="font-technical-data text-xs bg-surface-container-high text-on-surface-variant font-semibold px-2.5 py-1 rounded-full">
                      {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
                    </span>
                  </div>

                  {/* Items Breakdown */}
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                    {items.length === 0 ? (
                      <div className="text-center py-6 text-on-surface-variant text-sm">
                        Your cart is empty.{" "}
                        <Link href="/shop" className="text-secondary font-bold hover:underline">
                          Browse catalog
                        </Link>
                      </div>
                    ) : (
                      items.map((item) => {
                        const itemInstallCost =
                          item.installationIncluded && item.installationPrice
                            ? item.installationPrice * item.qty
                            : 0;
                        const itemTotal = item.price * item.qty + itemInstallCost;

                        return (
                          <div
                            key={item.id}
                            className="flex gap-4 items-center bg-surface-container-low p-3.5 rounded-xl border border-border-light"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              className="w-16 h-16 rounded-lg object-contain bg-surface-lowest shrink-0 p-1"
                              src={item.image}
                              alt={item.name}
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-label-cta text-sm text-on-surface truncate font-bold">
                                {item.name}
                              </h4>
                              <p className="font-body-sm text-xs text-on-surface-variant truncate">
                                {item.description || item.tag}
                              </p>
                              <div className="flex items-center justify-between mt-1.5">
                                <span className="font-technical-data text-xs text-secondary font-semibold">
                                  Qty: {item.qty} {item.installationIncluded ? "• Pro Install" : ""}
                                </span>
                                <span className="font-technical-data text-sm font-bold text-on-surface">
                                  ZMW {itemTotal.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-2.5 pt-4 bg-surface-container-low p-4 rounded-xl border border-border-light">
                    <div className="flex justify-between items-center text-sm font-body-sm text-on-surface-variant">
                      <span>Hardware Subtotal</span>
                      <span className="font-technical-data text-on-surface font-semibold">
                        ZMW {hardwareSubtotal.toLocaleString()}
                      </span>
                    </div>

                    {installationSubtotal > 0 && (
                      <div className="flex justify-between items-center text-sm font-body-sm text-on-surface-variant">
                        <span>Professional Installation</span>
                        <span className="font-technical-data text-secondary font-semibold">
                          + ZMW {installationSubtotal.toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-sm font-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1.5">
                        <span>Shipping &amp; Logistics</span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container">
                          {province === "lusaka" ? "Lusaka Zone" : "Regional Zone"}
                        </span>
                      </span>
                      <span className={`font-technical-data font-bold uppercase tracking-wider ${province === "lusaka" && deliveryCost === 0 ? "text-status-success" : "text-secondary"}`}>
                        {province === "lusaka"
                          ? deliveryCost === 0
                            ? "FREE (> K78k)"
                            : "ZMW 750"
                          : "ZMW 2,500"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-sm font-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1">
                        <span>16% ZRA Statutory VAT</span>
                        <span className="material-symbols-outlined text-xs text-outline cursor-help" title="Clean energy solar equipment zero-rated in Zambia">
                          info
                        </span>
                      </span>
                      <span className="font-technical-data text-status-success font-semibold">0% Zero-Rated</span>
                    </div>

                    <div className="h-px bg-surface-container-high my-2"></div>
                    <div className="flex justify-between items-end pt-1">
                      <div>
                        <span className="font-headline-md text-xs uppercase tracking-widest text-on-surface-variant block font-bold">
                          Total Due
                        </span>
                        <span className="font-technical-data text-xs text-secondary font-medium">
                          Includes Rigging &amp; Sign-off
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-lg text-2xl md:text-3xl text-primary font-bold tracking-tight">
                          ZMW {grandTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Primary CTA */}
                  <div className="pt-2">
                    <button
                      className={`w-full py-4 px-6 rounded-full font-label-cta text-label-cta tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 group font-bold ${
                        items.length === 0
                          ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-50"
                          : "bg-tertiary-fixed text-primary hover:shadow-md hover:bg-tertiary-fixed-dim active:scale-[0.99] cursor-pointer"
                      }`}
                      form="step1-form"
                      type="submit"
                      disabled={items.length === 0}
                    >
                      <span>CONTINUE TO PAYMENT METHOD</span>
                      <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </button>
                    <p className="font-body-sm text-center text-xs text-on-surface-variant mt-3 flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        lock
                      </span>
                      Next: Select Bank Wire, MTN/Airtel Money, or Solar Asset Loan
                    </p>
                  </div>

                  {/* Trust Signals */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-center font-technical-data text-[11px] text-on-surface-variant">
                    <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col items-center justify-center gap-1 border border-border-light">
                      <span className="material-symbols-outlined text-secondary text-base">verified</span>
                      <span>ERB &amp; ZABS Certified</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface-container-low flex flex-col items-center justify-center gap-1 border border-border-light">
                      <span className="material-symbols-outlined text-secondary text-base">shield</span>
                      <span>10-Yr Linear Output Guarantee</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          ) : null}

          {/* STEP 2: Payment & Financing Gateway */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Gateways Accordion/Tabs (7 Columns) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-technical-data text-xs uppercase font-bold tracking-wider text-secondary">
                        OFFICIAL PAYMENT SWITCH
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-technical-data text-[10px] font-bold uppercase border border-primary/20">
                        Instant &amp; Secure
                      </span>
                    </div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                      Select Payment Gateway
                    </h1>
                    <p className="font-body-sm text-body-sm text-text-secondary mt-1">
                      Secure, instant multi-channel settlements under Bank of Zambia compliance oversight.
                    </p>
                  </div>
                  <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-technical-data text-[12px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                    256-Bit TLS Secured
                  </span>
                </div>

                {/* Accordion Option 1: Mobile Money via pawaPay (Default Selected) */}
                <div
                  className={`payment-card rounded-xl bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 border ${
                    paymentMethod === "momo"
                      ? "border-secondary ring-2 ring-secondary/20"
                      : "border-border-light hover:border-neutral-300"
                  }`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setPaymentMethod("momo")}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        checked={paymentMethod === "momo"}
                        onChange={() => setPaymentMethod("momo")}
                        className="w-5 h-5 accent-secondary cursor-pointer mt-0.5"
                        name="payment_method"
                        type="radio"
                      />
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-headline-md text-headline-md text-on-surface font-bold">Mobile Money</span>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-technical-data text-[11px] font-bold">
                            Instant STK Push
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                          MTN MoMo, Airtel Money &amp; Zamtel Kwacha direct automated push PIN authorization.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className="px-2.5 py-1 rounded bg-surface-container font-technical-data text-[11px] font-bold text-on-surface tracking-wide">
                        MTN MoMo
                      </span>
                      <span className="px-2.5 py-1 rounded bg-error-container font-technical-data text-[11px] font-bold text-error tracking-wide">
                        Airtel
                      </span>
                      <span className="px-2.5 py-1 rounded bg-brand-light-tint font-technical-data text-[11px] font-bold text-brand-primary-green tracking-wide">
                        Zamtel
                      </span>
                    </div>
                  </div>

                  {paymentMethod === "momo" && (
                    <div className="mt-6 pt-5 bg-surface-container-low rounded-lg p-5 border border-border-light">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-technical-data text-[12px] uppercase text-outline tracking-wider font-semibold">
                          Select Mobile Money Carrier
                        </span>
                        <span className="text-[11px] font-technical-data text-secondary font-bold">
                          Instant Push PIN
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                        <label
                          onClick={() => setMomoProvider("mtn")}
                          className={`flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest cursor-pointer shadow-sm border transition-all ${
                            momoProvider === "mtn"
                              ? "border-secondary ring-2 ring-secondary/20 bg-secondary-container/20"
                              : "border-border-light hover:bg-surface-container"
                          }`}
                        >
                          <input
                            checked={momoProvider === "mtn"}
                            onChange={() => setMomoProvider("mtn")}
                            className="accent-secondary"
                            name="momo_provider"
                            type="radio"
                          />
                          <div className="flex flex-col">
                            <span className="font-headline-md text-[13px] text-on-surface font-semibold">MTN Zambia</span>
                            <span className="font-technical-data text-[10px] text-outline">096 / 076 series</span>
                          </div>
                        </label>
                        <label
                          onClick={() => setMomoProvider("airtel")}
                          className={`flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest cursor-pointer shadow-sm border transition-all ${
                            momoProvider === "airtel"
                              ? "border-secondary ring-2 ring-secondary/20 bg-secondary-container/20"
                              : "border-border-light hover:bg-surface-container"
                          }`}
                        >
                          <input
                            checked={momoProvider === "airtel"}
                            onChange={() => setMomoProvider("airtel")}
                            className="accent-secondary"
                            name="momo_provider"
                            type="radio"
                          />
                          <div className="flex flex-col">
                            <span className="font-headline-md text-[13px] text-on-surface font-semibold">Airtel Money</span>
                            <span className="font-technical-data text-[10px] text-outline">097 / 077 series</span>
                          </div>
                        </label>
                        <label
                          onClick={() => setMomoProvider("zamtel")}
                          className={`flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest cursor-pointer shadow-sm border transition-all ${
                            momoProvider === "zamtel"
                              ? "border-secondary ring-2 ring-secondary/20 bg-secondary-container/20"
                              : "border-border-light hover:bg-surface-container"
                          }`}
                        >
                          <input
                            checked={momoProvider === "zamtel"}
                            onChange={() => setMomoProvider("zamtel")}
                            className="accent-secondary"
                            name="momo_provider"
                            type="radio"
                          />
                          <div className="flex flex-col">
                            <span className="font-headline-md text-[13px] text-on-surface font-semibold">Zamtel Kwacha</span>
                            <span className="font-technical-data text-[10px] text-outline">095 / 075 series</span>
                          </div>
                        </label>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block font-technical-data text-[12px] font-bold uppercase text-on-surface tracking-wider">
                            Subscriber Mobile Number
                          </label>
                          {detectMomoProvider(momoPhone) ? (
                            <span className="font-technical-data text-[11px] text-secondary font-semibold flex items-center gap-1 bg-secondary-container/60 px-2 py-0.5 rounded">
                              <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
                              <span>Auto-detected: {momoProvider.toUpperCase()}</span>
                            </span>
                          ) : (
                            <span className="font-technical-data text-[10px] text-outline">
                              Auto-switches to MTN / Airtel / Zamtel
                            </span>
                          )}
                        </div>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 font-technical-data text-body-sm font-semibold text-text-secondary">
                            +260
                          </span>
                          <input
                            className="w-full pl-14 pr-4 py-3 rounded-lg bg-surface-container-lowest font-technical-data text-on-surface text-body-lg focus:outline-none focus:bg-surface-bright shadow-sm border border-border-light"
                            placeholder="97 183 8038"
                            type="tel"
                            value={momoPhone}
                            onChange={handleMomoPhoneChange}
                          />
                        </div>
                      </div>
                      <div className="mt-4 p-3.5 rounded-lg bg-secondary-container/40 flex items-center gap-3 text-on-secondary-container border border-secondary/20">
                        <span className="material-symbols-outlined text-[20px] shrink-0 text-secondary">
                          phonelink_ring
                        </span>
                        <p className="font-body-sm text-[13px] leading-snug">
                          An instant push notification will be sent to your handset to authorize{" "}
                          <strong className="font-technical-data font-bold">ZMW {grandTotal.toLocaleString()}</strong> with your secure MoMo PIN.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion Option 2: Card via pawaPay */}
                <div
                  className={`payment-card rounded-xl bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 border ${
                    paymentMethod === "card"
                      ? "border-secondary ring-2 ring-secondary/20"
                      : "border-border-light hover:border-neutral-300"
                  }`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="w-5 h-5 accent-secondary cursor-pointer mt-0.5"
                        name="payment_method"
                        type="radio"
                      />
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-headline-md text-headline-md text-on-surface font-bold">Credit / Debit Card</span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-outline font-technical-data text-[11px] font-bold">
                            3D-Secure
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                          Visa, Mastercard, &amp; dual-currency cards processed via bank-grade 3D-Secure encryption.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-surface-container-high font-headline-md text-[13px] font-bold text-on-surface">
                        VISA
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high font-headline-md text-[13px] font-bold text-error">
                        MC
                      </span>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="mt-6 pt-5 bg-surface-container-low rounded-lg p-5 border border-border-light">
                      <div className="space-y-4">
                        <div>
                          <label className="block font-technical-data text-[12px] font-bold uppercase text-on-surface tracking-wider mb-1">
                            Card Number
                          </label>
                          <div className="relative flex items-center">
                            <input
                              className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-technical-data text-on-surface text-body-lg focus:outline-none shadow-sm border border-border-light"
                              placeholder="4532 •••• •••• 8841"
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                            <span className="material-symbols-outlined absolute right-3 text-outline">
                              credit_card
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-technical-data text-[12px] font-bold uppercase text-on-surface tracking-wider mb-1">
                              Cardholder Name
                            </label>
                            <input
                              className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-technical-data uppercase text-on-surface text-body-sm focus:outline-none shadow-sm border border-border-light"
                              placeholder="FULL NAME ON CARD"
                              type="text"
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block font-technical-data text-[12px] font-bold uppercase text-on-surface tracking-wider mb-1">
                                Expiry
                              </label>
                              <input
                                className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-technical-data text-on-surface text-body-sm focus:outline-none shadow-sm text-center border border-border-light"
                                placeholder="MM / YY"
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block font-technical-data text-[12px] font-bold uppercase text-on-surface tracking-wider mb-1">
                                CVV
                              </label>
                              <input
                                className="w-full px-4 py-3 rounded-lg bg-surface-container-lowest font-technical-data text-on-surface text-body-sm focus:outline-none shadow-sm text-center border border-border-light"
                                maxLength={4}
                                placeholder="•••"
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-outline font-technical-data text-[12px]">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          verified_user
                        </span>
                        <span>Protected by Verified by Visa &amp; Mastercard Identity Check 3D Secure.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion Option 3: 70 / 30 Staged Milestone Plan */}
                <div
                  className={`payment-card rounded-xl bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 border ${
                    paymentMethod === "staged"
                      ? "border-secondary ring-2 ring-secondary/20"
                      : "border-border-light hover:border-neutral-300"
                  }`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setPaymentMethod("staged")}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        checked={paymentMethod === "staged"}
                        onChange={() => setPaymentMethod("staged")}
                        className="w-5 h-5 accent-secondary cursor-pointer mt-0.5"
                        name="payment_method"
                        type="radio"
                      />
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-headline-md text-headline-md text-on-surface font-bold">
                            70 / 30 Staged Project Plan
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-technical-data text-[11px] font-bold uppercase tracking-wider">
                            Recommended for Turnkey
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                          Staged milestone financing engineered for full inverter and commercial installs.
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-[24px]">
                      account_balance_wallet
                    </span>
                  </div>

                  {paymentMethod === "staged" && (
                    <div className="mt-6 pt-5 bg-surface-container-low rounded-lg p-5 border border-border-light">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-border-light">
                          <div>
                            <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-technical-data text-[11px] font-bold">
                              Stage 1: Due Today
                            </span>
                            <h4 className="font-headline-md text-[20px] font-bold text-on-surface mt-2">
                              ZMW {stage1Amount.toLocaleString()} <span className="text-sm font-normal text-outline">(70%)</span>
                            </h4>
                            <p className="font-body-sm text-[13px] text-text-secondary mt-1">
                              Locks dedicated Lusaka warehouse inventory and reserves your certified electrical engineering crew.
                            </p>
                          </div>
                          <span className="mt-3 inline-flex items-center gap-1 font-technical-data text-[12px] text-secondary font-semibold">
                            <span className="material-symbols-outlined text-[16px]">lock_open</span>
                            Immediate Allocation
                          </span>
                        </div>
                        <div className="p-4 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between opacity-90 border border-border-light">
                          <div>
                            <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-technical-data text-[11px] font-bold">
                              Stage 2: Post-Install
                            </span>
                            <h4 className="font-headline-md text-[20px] font-bold text-on-surface mt-2">
                              ZMW {stage2Amount.toLocaleString()} <span className="text-sm font-normal text-outline">(30%)</span>
                            </h4>
                            <p className="font-body-sm text-[13px] text-text-secondary mt-1">
                              Payable strictly upon final commissioning, inverter sync verification, and safety sign-off.
                            </p>
                          </div>
                          <span className="mt-3 inline-flex items-center gap-1 font-technical-data text-[12px] text-outline">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            Pre-Commission Hold
                          </span>
                        </div>
                      </div>
                      <label className="flex items-start gap-3 mt-4 pt-3 cursor-pointer">
                        <input
                          checked={acceptStagedAgreement}
                          onChange={(e) => setAcceptStagedAgreement(e.target.checked)}
                          className="mt-1 accent-secondary"
                          type="checkbox"
                        />
                        <span className="font-body-sm text-[13px] text-on-surface">
                          I accept the Elleyhill Power Turnkey Milestone Agreement for staged installation and handover verification.
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                {/* Accordion Option 4: Lay-By Reserve Plan */}
                <div
                  className={`payment-card rounded-xl bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 border ${
                    paymentMethod === "layby"
                      ? "border-secondary ring-2 ring-secondary/20"
                      : "border-border-light hover:border-neutral-300"
                  }`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setPaymentMethod("layby")}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        checked={paymentMethod === "layby"}
                        onChange={() => setPaymentMethod("layby")}
                        className="w-5 h-5 accent-secondary cursor-pointer mt-0.5"
                        name="payment_method"
                        type="radio"
                      />
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-headline-md text-headline-md text-on-surface font-bold">
                            Lay-By Reserve (Zero Interest)
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-technical-data text-[11px] font-bold">
                            3 - 6 Months
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                          Kit hardware guaranteed at current price; warehouse preserves units until final installment.
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[24px]">warehouse</span>
                  </div>

                  {paymentMethod === "layby" && (
                    <div className="mt-6 pt-5 bg-surface-container-low rounded-lg p-5 border border-border-light">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-surface-container-lowest shadow-sm border border-border-light">
                        <div>
                          <span className="font-technical-data text-[12px] uppercase tracking-wider text-outline font-bold">
                            Fixed Schedule
                          </span>
                          <h4 className="font-headline-md text-headline-md text-on-surface mt-0.5 font-bold">
                            3 Monthly Installments
                          </h4>
                          <p className="font-body-sm text-[13px] text-text-secondary">
                            ZMW {laybyMonthlyAmount.toLocaleString()} / month over 90 days. Zero finance fees.
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="font-headline-lg text-[28px] font-bold text-secondary">
                            ZMW {laybyMonthlyAmount.toLocaleString()}
                          </span>
                          <span className="block font-technical-data text-[11px] text-outline">
                            First Deposit Due Today
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion Option 5: Direct Wire / EFT Proforma */}
                <div
                  className={`payment-card rounded-xl bg-surface-container-lowest p-6 shadow-sm transition-all duration-200 border ${
                    paymentMethod === "wire"
                      ? "border-secondary ring-2 ring-secondary/20"
                      : "border-border-light hover:border-neutral-300"
                  }`}
                >
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setPaymentMethod("wire")}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        checked={paymentMethod === "wire"}
                        onChange={() => setPaymentMethod("wire")}
                        className="w-5 h-5 accent-secondary cursor-pointer mt-0.5"
                        name="payment_method"
                        type="radio"
                      />
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-headline-md text-headline-md text-on-surface font-bold">
                            Direct Bank Wire / EFT
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-outline font-technical-data text-[11px] font-bold">
                            Proforma Invoice
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                          Instant Proforma generation for ABSA Zambia or Standard Bank corporate clearing.
                        </p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-[24px]">receipt_long</span>
                  </div>

                  {paymentMethod === "wire" && (
                    <div className="mt-6 pt-5 bg-surface-container-low rounded-lg p-5 border border-border-light">
                      <div className="p-4 rounded-lg bg-surface-container-lowest shadow-sm space-y-3 border border-border-light">
                        <div className="flex justify-between items-center text-[13px]">
                          <span className="text-text-secondary">Beneficiary Bank:</span>
                          <span className="font-technical-data font-bold text-on-surface">
                            Standard Bank Zambia PLC / ABSA
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                          <span className="text-text-secondary">Account Name:</span>
                          <span className="font-technical-data font-bold text-on-surface">
                            Elleyhill Power Solutions Ltd
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                          <span className="text-text-secondary">Reference Code:</span>
                          <span className="font-technical-data font-bold text-secondary">
                            {activeOrderRef || `EHP-${new Date().getFullYear()}-0001`}
                          </span>
                        </div>
                      </div>
                      <p className="font-body-sm text-[12px] text-outline mt-3">
                        A commercial proforma tax invoice with stamped clearing numbers will be generated upon confirmation.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Review & Authorization (5 Columns) */}
              <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
                {/* Address/Site Quick Review Card */}
                <div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex items-start justify-between border border-border-light">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">
                      location_on
                    </span>
                    <div>
                      <span className="font-technical-data text-[11px] uppercase tracking-wider text-outline font-bold">
                        Site &amp; Delivery
                      </span>
                      <p className="font-headline-md text-[15px] font-bold text-on-surface mt-0.5">
                        {address || "Plot 104, Kabulonga, Lusaka"}
                      </p>
                      <p className="font-body-sm text-[13px] text-text-secondary">
                        +260 {phone || "97 183 8038"} • {province.toUpperCase()} PROVINCE
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="font-technical-data text-[12px] font-bold uppercase text-secondary underline hover:text-on-surface cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

                {/* Main Commercial Order Breakdown Card */}
                <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm flex flex-col justify-between border border-border-light">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-border-light">
                      <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                        Commercial Order Summary
                      </h3>
                      <span className="font-technical-data text-[12px] text-outline font-semibold">
                        {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"}
                      </span>
                    </div>

                    {/* Package Item Preview List */}
                    <div className="space-y-3 py-4 border-b border-border-light max-h-60 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg bg-surface-container shrink-0 overflow-hidden relative flex items-center justify-center p-1 border border-border-light">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              className="w-full h-full object-contain"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-headline-md text-[14px] font-bold text-on-surface truncate">
                              {item.name}
                            </h4>
                            <div className="flex items-center justify-between text-xs font-technical-data text-text-secondary mt-0.5">
                              <span>Qty: {item.qty}</span>
                              <span className="font-bold text-on-surface">
                                ZMW {(item.price * item.qty).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Breakdown Line Items */}
                    <div className="space-y-3 pt-4 font-body-sm text-[14px]">
                      <div className="flex justify-between items-center text-text-secondary">
                        <span>Hardware &amp; Storage Subtotal</span>
                        <span className="font-technical-data font-semibold text-on-surface">
                          ZMW {hardwareSubtotal.toLocaleString()}
                        </span>
                      </div>
                      {installationSubtotal > 0 && (
                        <div className="flex justify-between items-center text-text-secondary">
                          <span>Certified Installation &amp; Cabling</span>
                          <span className="font-technical-data font-semibold text-secondary">
                            + ZMW {installationSubtotal.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-text-secondary">
                        <span>Delivery &amp; Heavy Logistics</span>
                        <span className={`font-technical-data font-bold uppercase text-[12px] ${province === "lusaka" && deliveryCost === 0 ? "text-status-success" : "text-primary"}`}>
                          {province === "lusaka"
                            ? deliveryCost === 0
                              ? "Complimentary (> K78k)"
                              : "+ ZMW 750"
                            : "+ ZMW 2,500"}
                        </span>
                      </div>
                    </div>

                    {/* Total Calculation */}
                    <div className="mt-6 pt-5 bg-surface-container-low rounded-lg p-4 border border-border-light">
                      <div className="flex justify-between items-baseline">
                        <span className="font-headline-md text-[16px] font-bold text-on-surface">
                          Total Authorized
                        </span>
                        <div className="text-right">
                          <span className="font-technical-data text-[11px] text-outline block">
                            Inclusive of 0% Zero-Rated Clean Tech VAT
                          </span>
                          <span className="font-headline-lg text-[30px] font-bold text-primary">
                            ZMW {grandTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="mt-6 flex flex-col gap-4">
                    {paymentStatusText && (
                      <div className="p-3 rounded-xl bg-secondary-container text-on-secondary-container font-technical-data text-xs flex items-center gap-2 animate-pulse border border-secondary/20">
                        <span className="material-symbols-outlined text-secondary text-base">cloud_sync</span>
                        <span>{paymentStatusText}</span>
                      </div>
                    )}

                    <button
                      onClick={handleStep2Submit}
                      disabled={isProcessingPayment || items.length === 0}
                      className={`w-full py-4 px-6 rounded-full font-label-cta text-label-cta tracking-wide transition-all duration-200 transform shadow-md flex items-center justify-center gap-2 font-bold ${
                        isProcessingPayment || items.length === 0
                          ? "bg-neutral-300 text-neutral-600 cursor-not-allowed opacity-60"
                          : "bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-on-tertiary-fixed hover:-translate-y-0.5 cursor-pointer"
                      }`}
                    >
                      {isProcessingPayment ? (
                        <>
                          <span className="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                          <span>PROCESSING PAYMENT...</span>
                        </>
                      ) : (
                        <>
                          <span>AUTHORIZE PAYMENT &amp; COMPLETE ORDER</span>
                          <span className="material-symbols-outlined text-[20px]">bolt</span>
                        </>
                      )}
                    </button>

                    {/* Guarantee Badge */}
                    <div className="p-3 rounded-lg bg-surface-container-low flex items-center gap-3 border border-border-light">
                      <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">
                        verified
                      </span>
                      <p className="font-body-sm text-[12px] text-text-secondary">
                        Backed by Elleyhill&apos;s <strong className="text-on-surface">10-Year Hardware Warranty</strong> and standard 14-Day Change-of-Mind Guarantee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
