"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart, WHATSAPP_PHONE_NUMBER, WHATSAPP_PHONE_DISPLAY, PlacedOrder } from "@/context/CartContext";

type Step = 1 | 2 | 3;
type PaymentMethod = "momo" | "card" | "staged" | "layby" | "wire";
type MomoProvider = "mtn" | "airtel";

export default function CheckoutPage() {
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
  } = useCart();

  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Step 1: Site & Contact Form State
  const [email, setEmail] = useState("procurement@enterprise.zm");
  const [phone, setPhone] = useState("97 183 8038");
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [fullName, setFullName] = useState("Mwape Chilufya");
  const [address, setAddress] = useState("Plot 104, Leopard's Hill Rd, Kabulonga");
  const [province, setProvince] = useState("lusaka");
  const [roofType, setRoofType] = useState("ibr");
  const [accessNotes, setAccessNotes] = useState("Heavy-duty boom gate clearance. Inverter wall in garage.");
  const [scheduleOption, setScheduleOption] = useState<"fastest" | "scheduled" | "staged">("fastest");

  // Step 2: Payment Gateway Form State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");
  const [momoProvider, setMomoProvider] = useState<MomoProvider>("mtn");
  const [momoPhone, setMomoPhone] = useState("97 183 8038");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("MWAPE CHILUFYA");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [acceptStagedAgreement, setAcceptStagedAgreement] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const [activeOrderRef, setActiveOrderRef] = useState("EHP-2026-8842");

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
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `EHP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setActiveOrderRef(generatedRef);

    const orderData: PlacedOrder = {
      orderRef: generatedRef,
      createdAt: new Date().toISOString(),
      customer: {
        fullName,
        email,
        phone,
        address,
        province,
        roofType,
        accessNotes,
        scheduleOption,
      },
      payment: {
        method: paymentMethod,
        momoProvider,
        momoPhone,
        status: "authorized",
      },
      items: items.length > 0 ? items : [],
      deliveryZone,
      deliveryCost,
      hardwareSubtotal,
      installationSubtotal,
      grandTotal,
    };

    saveOrder(orderData);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dynamic calculations for staged and lay-by
  const stage1Amount = Math.round(grandTotal * 0.7);
  const stage2Amount = grandTotal - stage1Amount;
  const laybyMonthlyAmount = Math.round(grandTotal / 3);

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
      items.map((i) => `• ${i.qty}x ${i.name}`).join("\n") +
      `\nTotal Authorized: ZMW ${grandTotal.toLocaleString()}\n` +
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
                    Step 01 / 03
                  </span>
                  <span className="font-headline-md text-[15px] font-semibold text-on-surface truncate">
                    Site &amp; Delivery Details
                  </span>
                </div>
              </div>

              <div
                className={`hidden sm:block w-12 h-0.5 ${
                  currentStep >= 2 ? "bg-secondary-container" : "bg-surface-container-highest"
                }`}
              ></div>

              {/* Step 2 Indicator */}
              <div
                onClick={() => currentStep > 2 && setCurrentStep(2)}
                className={`flex-1 flex items-center gap-3 ${
                  currentStep === 2
                    ? ""
                    : currentStep > 2
                    ? "cursor-pointer"
                    : "opacity-40"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-technical-data text-technical-data font-bold shadow-sm ${
                    currentStep === 2
                      ? "bg-tertiary-fixed text-on-tertiary-fixed"
                      : currentStep > 2
                      ? "bg-secondary text-on-secondary"
                      : "bg-surface-container-high text-on-surface"
                  }`}
                >
                  {currentStep > 2 ? (
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  ) : (
                    "2"
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-technical-data text-[11px] uppercase tracking-wider text-secondary font-bold">
                    {currentStep === 2 ? "Step 02 / Active" : "Step 02 / 03"}
                  </span>
                  <span className="font-headline-md text-[15px] font-bold text-on-surface truncate">
                    Payment &amp; Financing
                  </span>
                </div>
              </div>

              <div
                className={`hidden sm:block w-12 h-0.5 ${
                  currentStep >= 3 ? "bg-secondary-container" : "bg-surface-container-highest"
                }`}
              ></div>

              {/* Step 3 Indicator */}
              <div
                className={`flex-1 flex items-center gap-3 ${
                  currentStep === 3 ? "" : "opacity-40"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-technical-data text-technical-data font-bold ${
                    currentStep === 3
                      ? "bg-secondary text-on-secondary shadow-sm"
                      : "bg-surface-container-high text-on-surface"
                  }`}
                >
                  3
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-technical-data text-[11px] uppercase tracking-wider text-outline">
                    Step 03 / Next
                  </span>
                  <span className="font-headline-md text-[15px] font-semibold text-on-surface truncate">
                    Commissioning Order
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* STEP 1: Site & Customer Information */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <form id="step1-form" onSubmit={handleStep1Submit} className="lg:col-span-7 flex flex-col gap-8">
                {/* 1. Contact Information */}
                <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm border border-border-light">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-technical-data font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                        Contact Information
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        For engineering dispatch, warranty registration, and delivery status.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    <div>
                      <label className="block font-technical-data text-xs uppercase text-on-surface tracking-wider font-semibold mb-2">
                        Email Address <span className="text-secondary">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
                          mail
                        </span>
                        <input
                          className="w-full pl-11 pr-4 py-3 bg-surface-container-low rounded-xl text-on-surface font-body-lg placeholder:text-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all border border-border-light"
                          placeholder="engineering-procurement@domain.zm"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1.5">
                        Official VAT invoice and warranty card will be dispatched here.
                      </p>
                    </div>

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
                            className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-on-surface font-body-lg placeholder:text-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all border border-border-light"
                            pattern="[0-9 ]{9,12}"
                            placeholder="97 183 8038"
                            required
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant mt-1.5">
                        Used by our logistics team 60 mins before arrival on installation day.
                      </p>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start gap-3.5 p-4 rounded-xl bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors group border border-border-light">
                        <input
                          checked={whatsappAlerts}
                          onChange={(e) => setWhatsappAlerts(e.target.checked)}
                          className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary accent-secondary"
                          type="checkbox"
                        />
                        <div className="text-xs font-body-sm text-on-surface">
                          <span className="font-semibold block text-on-surface">
                            Opt-in to real-time WhatsApp logistics alerts
                          </span>
                          Receive live GPS tracking of the solar array delivery truck, digital commissioning reports, and scheduled inverter maintenance pings.
                        </div>
                      </label>
                    </div>
                  </div>
                </section>

                {/* 2. Site Location */}
                <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm border border-border-light">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-technical-data font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                        Site &amp; Installation Location
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Zambia site specifics for crane unloading and engineering crew staging.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block font-technical-data text-xs uppercase text-on-surface tracking-wider font-semibold mb-2">
                        Full Name / Registered Entity Name <span className="text-secondary">*</span>
                      </label>
                      <input
                        className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-on-surface font-body-lg placeholder:text-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all border border-border-light"
                        placeholder="e.g., Mwape Chilufya or Kafue Agri Holdings Ltd."
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-technical-data text-xs uppercase text-on-surface tracking-wider font-semibold mb-2">
                        Site / Street Address <span className="text-secondary">*</span>
                      </label>
                      <input
                        className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-on-surface font-body-lg placeholder:text-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all border border-border-light"
                        placeholder="Plot No., Street Name, Area (e.g. Plot 104 Leopard’s Hill Rd, Kabulonga)"
                        required
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block font-technical-data text-xs uppercase text-on-surface tracking-wider font-semibold mb-2">
                        Province / Territory <span className="text-secondary">*</span>
                      </label>
                      <div className="relative">
                        <select
                          className="w-full appearance-none px-4 py-3 bg-surface-container-low rounded-xl text-on-surface font-body-lg focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all pr-10 border border-border-light"
                          required
                          value={province}
                          onChange={(e) => handleProvinceChange(e.target.value)}
                        >
                          <option value="lusaka">
                            Lusaka Province ({hardwareSubtotal >= 78000 ? "FREE Dispatch > K78,000" : "ZMW 750 - FREE > K78,000"})
                          </option>
                          <option value="copperbelt">Copperbelt Province (+ZMW 2,500)</option>
                          <option value="central">Central Province (+ZMW 2,500)</option>
                          <option value="southern">Southern Province (+ZMW 2,500)</option>
                          <option value="eastern">Eastern Province (+ZMW 2,500)</option>
                          <option value="north-western">North-Western Province (+ZMW 2,500)</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

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
                          <option value="ibr">IBR Profile Sheet Iron</option>
                          <option value="corrugated">Standard Corrugated Iron</option>
                          <option value="tile">Concrete / Clay Roof Tile</option>
                          <option value="ground">Ground Mount / Open Yard Steel Rig</option>
                          <option value="flat">Concrete Flat Roof Deck</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-technical-data text-xs uppercase text-on-surface tracking-wider font-semibold mb-2">
                        Gate Access &amp; Rigging Instructions (Optional)
                      </label>
                      <textarea
                        className="w-full px-4 py-3 bg-surface-container-low rounded-xl text-on-surface font-body-lg placeholder:text-outline/60 focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary transition-all resize-none border border-border-light"
                        placeholder="e.g., Heavy duty boom gate security clearance needed. Inverter wall is inside the garage, dual 3-phase DB board located at rear entrance."
                        rows={3}
                        value={accessNotes}
                        onChange={(e) => setAccessNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </section>

                {/* 3. Schedule Preference */}
                <section className="bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-sm border border-border-light">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-technical-data font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                        Installation Schedule Window
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Select how soon our certified PV engineers should deploy to the site.
                      </p>
                    </div>
                  </div>

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
                        <span className="font-label-cta text-sm text-on-surface font-bold">Fastest Window</span>
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      </div>
                      <div className="font-headline-md text-lg text-secondary font-bold mb-1">Within 48h</div>
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        Engineers arrive in priority batch. High-readiness team.
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
                        <span className="font-label-cta text-sm text-on-surface font-bold">Custom Date</span>
                        <span className="material-symbols-outlined text-outline text-sm">calendar_today</span>
                      </div>
                      <div className="font-headline-md text-lg text-on-surface font-bold mb-1">Select Day</div>
                      <p className="font-body-sm text-xs text-on-surface-variant">
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
                        <span className="font-label-cta text-sm text-on-surface font-bold">Staged Setup</span>
                        <span className="material-symbols-outlined text-outline text-sm">inventory_2</span>
                      </div>
                      <div className="font-headline-md text-lg text-on-surface font-bold mb-1">Delivery First</div>
                      <p className="font-body-sm text-xs text-on-surface-variant">
                        Store equipment on-site now; commission later on notice.
                      </p>
                    </label>
                  </div>
                </section>
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
                      className="w-full py-4 px-6 rounded-full bg-tertiary-fixed text-primary font-label-cta text-label-cta tracking-wider shadow-sm hover:shadow-md hover:bg-tertiary-fixed-dim active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer font-bold"
                      form="step1-form"
                      type="submit"
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
          )}

          {/* STEP 2: Payment & Financing Gateway */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Gateways Accordion/Tabs (7 Columns) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-2">
                  <div>
                    <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                      Select Financing Gateway
                    </h1>
                    <p className="font-body-sm text-body-sm text-text-secondary mt-1">
                      Industrial &amp; residential energy systems authorized via licensed Bank of Zambia channels.
                    </p>
                  </div>
                  <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-technical-data text-[12px] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
                    256-Bit TLS Secured
                  </span>
                </div>

                {/* Accordion Option 1: Mobile Money (Default Selected) */}
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
                            0% Processing Fee
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                          MTN MoMo &amp; Airtel Money Zambia automated push authorization.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-surface-container font-technical-data text-[12px] font-bold text-on-surface tracking-wide">
                        MTN MoMo
                      </span>
                      <span className="px-2.5 py-1 rounded bg-error-container font-technical-data text-[12px] font-bold text-error tracking-wide">
                        airtel
                      </span>
                    </div>
                  </div>

                  {paymentMethod === "momo" && (
                    <div className="mt-6 pt-5 bg-surface-container-low rounded-lg p-5 border border-border-light">
                      <span className="font-technical-data text-[12px] uppercase text-outline tracking-wider font-semibold">
                        Carrier Gateway
                      </span>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <label
                          onClick={() => setMomoProvider("mtn")}
                          className={`flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest cursor-pointer shadow-sm border ${
                            momoProvider === "mtn" ? "border-secondary ring-1 ring-secondary" : "border-border-light"
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
                            <span className="font-headline-md text-[14px] text-on-surface font-semibold">MTN Zambia</span>
                            <span className="font-technical-data text-[11px] text-outline">+260 96 / 076 series</span>
                          </div>
                        </label>
                        <label
                          onClick={() => setMomoProvider("airtel")}
                          className={`flex items-center gap-3 p-3 rounded-lg bg-surface-container-lowest cursor-pointer shadow-sm border ${
                            momoProvider === "airtel" ? "border-secondary ring-1 ring-secondary" : "border-border-light"
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
                            <span className="font-headline-md text-[14px] text-on-surface font-semibold">Airtel Money</span>
                            <span className="font-technical-data text-[11px] text-outline">+260 97 / 077 series</span>
                          </div>
                        </label>
                      </div>
                      <div className="mt-4">
                        <label className="block font-technical-data text-[12px] font-bold uppercase text-on-surface tracking-wider mb-1">
                          Subscriber Mobile Number
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 font-technical-data text-body-sm font-semibold text-text-secondary">
                            +260
                          </span>
                          <input
                            className="w-full pl-14 pr-4 py-3 rounded-lg bg-surface-container-lowest font-technical-data text-on-surface text-body-lg focus:outline-none focus:bg-surface-bright shadow-sm border border-border-light"
                            placeholder="97 183 8038"
                            type="tel"
                            value={momoPhone}
                            onChange={(e) => setMomoPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mt-4 p-3.5 rounded-lg bg-secondary-container/40 flex items-center gap-3 text-on-secondary-container border border-secondary/20">
                        <span className="material-symbols-outlined text-[20px] shrink-0 text-secondary">
                          phonelink_ring
                        </span>
                        <p className="font-body-sm text-[13px] leading-snug">
                          You will receive an instant push prompt on your handset to approve{" "}
                          <strong className="font-technical-data font-bold">ZMW {grandTotal.toLocaleString()}</strong> with your secure PIN.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accordion Option 2: Card */}
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
                            Instant Release
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-text-secondary mt-0.5">
                          Visa, Mastercard, &amp; local Kwacha dual-currency cards.
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
                              placeholder="MWAPE CHILUFYA"
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
                            ELH-ORD-9942
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
                      <div className="flex justify-between items-center text-text-secondary">
                        <span>Engineering Commissioning SLA</span>
                        <span className="font-technical-data font-bold text-status-success uppercase text-[12px]">
                          Included
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
                    <button
                      onClick={handleStep2Submit}
                      className="w-full py-4 px-6 rounded-full bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-cta text-label-cta tracking-wide transition-all duration-200 transform hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2 font-bold cursor-pointer"
                    >
                      <span>AUTHORIZE PAYMENT &amp; COMPLETE ORDER</span>
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
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

          {/* STEP 3: Order Confirmed & Commissioning Order */}
          {currentStep === 3 && (
            <div className="flex flex-col w-full space-y-10">
              {/* Notification Toast */}
              {toastVisible && (
                <div className="fixed top-24 right-8 z-50 bg-primary text-on-primary px-5 py-3 rounded-full shadow-xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                    check_circle
                  </span>
                  <span className="font-technical-data text-technical-data">
                    Order reference copied to clipboard!
                  </span>
                </div>
              )}

              {/* Breadcrumb / Stepper Progress Header */}
              <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-border-light">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border-light">
                  <div>
                    <span className="font-technical-data text-technical-data text-secondary uppercase tracking-widest flex items-center gap-2 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-status-success animate-ping"></span>
                      Transaction Authorized &amp; Verified
                    </span>
                    <div className="font-headline-md text-2xl md:text-3xl text-primary mt-1 tracking-tight font-bold">
                      Checkout Sequence Complete
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm border border-border-light">
                    <span className="font-technical-data text-technical-data text-on-surface-variant uppercase">
                      Order Ref:
                    </span>
                    <span className="font-headline-md text-headline-md text-primary tracking-wider font-bold">
                      #{activeOrderRef}
                    </span>
                    <button
                      className="text-on-surface-variant hover:text-primary transition-colors flex items-center cursor-pointer"
                      onClick={copyOrderRef}
                      title="Copy Reference"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                  <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center gap-4 border border-border-light">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-technical-data text-[11px] uppercase tracking-wider text-secondary font-bold">
                        Step 01 • Completed
                      </div>
                      <div className="font-headline-md text-[15px] text-primary truncate font-semibold">
                        Customer &amp; Site Details
                      </div>
                      <div className="font-body-sm text-xs text-on-surface-variant truncate">
                        {address || "Lusaka Residential Grid"}
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center gap-4 border border-border-light">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
                      <span className="material-symbols-outlined text-[20px]">check</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-technical-data text-[11px] uppercase tracking-wider text-secondary font-bold">
                        Step 02 • Completed
                      </div>
                      <div className="font-headline-md text-[15px] text-primary truncate font-semibold">
                        Payment Clearance
                      </div>
                      <div className="font-body-sm text-xs text-on-surface-variant truncate">
                        {paymentMethod === "momo" ? "MTN / Airtel MoMo Verified" : `${paymentMethod.toUpperCase()} Settled`}
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary text-on-primary p-4 rounded-xl shadow-md flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0 font-bold">
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-technical-data text-[11px] uppercase tracking-wider text-tertiary-fixed font-bold">
                        Step 03 • Confirmed
                      </div>
                      <div className="font-headline-md text-[15px] text-on-primary truncate font-semibold">
                        Dispatch &amp; Deployment
                      </div>
                      <div className="font-body-sm text-xs text-on-primary-container truncate">
                        Field Engineers Scheduled
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Success Banner */}
              <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden border border-border-light">
                <div className="absolute -right-24 -top-24 w-96 h-96 bg-secondary-fixed/40 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -left-12 -bottom-12 w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                  <div className="max-w-2xl space-y-5">
                    <div className="inline-flex items-center gap-3 bg-secondary-container px-4 py-2 rounded-full text-on-secondary-container">
                      <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                      </div>
                      <span className="font-technical-data text-technical-data uppercase font-bold tracking-wider">
                        Industrial Commission Scheduled
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h1 className="font-display-hero text-[34px] md:text-[50px] leading-[1.08] text-primary tracking-tight font-bold">
                        Order Confirmed &amp; Engineering Scheduled!
                      </h1>
                      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                        Order reference{" "}
                        <span className="font-headline-md text-primary text-[17px] font-semibold">
                          #{activeOrderRef}
                        </span>
                        . Thank you for partnering with Elleyhill Power Zambia for your clean energy independence.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            window.print();
                          }
                        }}
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-cta text-label-cta tracking-wide uppercase transition-all shadow-sm font-bold cursor-pointer"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                        <span>Download PDF Tax Invoice</span>
                      </button>
                      <a
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-secondary text-on-secondary hover:bg-secondary/90 font-label-cta text-label-cta tracking-wide uppercase transition-all shadow-sm font-bold"
                        href={whatsappConfirmationLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                        <span>Track Dispatch on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-4 flex-shrink-0 bg-surface-container-low p-8 rounded-2xl md:w-72 text-center shadow-inner border border-border-light">
                    <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[48px]">check</span>
                    </div>
                    <div className="space-y-1">
                      <div className="font-technical-data text-[12px] uppercase tracking-widest text-secondary font-bold">
                        Estimated Arrival
                      </div>
                      <div className="font-headline-md text-headline-md text-primary font-bold">
                        Tomorrow, 08:30 CAT
                      </div>
                      <div className="font-body-sm text-xs text-on-surface-variant">
                        {province === "lusaka" ? "Lusaka Rapid Sector" : `${province.toUpperCase()} Regional Convoy`}
                      </div>
                    </div>
                    <div className="w-full bg-surface-container-lowest py-2 px-3 rounded-lg text-left flex items-center justify-between border border-border-light">
                      <span className="font-technical-data text-xs text-on-surface-variant">
                        Live Dispatch SLA
                      </span>
                      <span className="font-technical-data text-xs text-status-success font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span> Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Manifest Section */}
              <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm space-y-6 border border-border-light">
                <div className="flex items-center justify-between pb-4 border-b border-border-light">
                  <div>
                    <span className="font-technical-data text-technical-data uppercase text-secondary tracking-wider font-semibold">
                      Statement of Equipment
                    </span>
                    <div className="font-headline-md text-headline-md text-primary font-bold">
                      Order Manifest
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-technical-data text-technical-data font-bold">
                    PAID &amp; AUTHORIZED
                  </span>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between gap-4 border border-border-light"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center flex-shrink-0 border border-border-light p-1">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-headline-md text-[16px] text-primary font-bold">
                            {item.name}
                          </div>
                          <div className="font-body-sm text-body-sm text-on-surface-variant">
                            {item.description || item.tag} {item.installationIncluded ? "• Full Pro Installation" : ""}
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-headline-md text-[16px] text-primary font-bold">
                          ZMW {(item.price * item.qty + (item.installationIncluded && item.installationPrice ? item.installationPrice * item.qty : 0)).toLocaleString()}
                        </div>
                        <div className="font-technical-data text-[12px] text-on-surface-variant">
                          Qty: {item.qty}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-surface-container space-y-3 border border-border-light">
                  <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                    <span>Equipment Subtotal</span>
                    <span className="font-technical-data text-technical-data font-medium text-primary">
                      ZMW {hardwareSubtotal.toLocaleString()}
                    </span>
                  </div>
                  {installationSubtotal > 0 && (
                    <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                      <span>Certified Installation &amp; Commissioning</span>
                      <span className="font-technical-data text-technical-data font-medium text-secondary">
                        + ZMW {installationSubtotal.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                    <span>Logistics &amp; Delivery</span>
                    <span className="text-status-success font-technical-data text-technical-data font-bold uppercase">
                      {province === "lusaka"
                        ? deliveryCost === 0
                          ? "Included Free (> K78k)"
                          : "ZMW 750"
                        : "ZMW 2,500"}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-border-light flex justify-between items-baseline">
                    <div>
                      <span className="font-headline-md text-[18px] text-primary font-bold">
                        Total Amount Settled
                      </span>
                      <span className="block font-technical-data text-[12px] text-secondary">
                        Authorized via {paymentMethod.toUpperCase()} (Ref: #{activeOrderRef})
                      </span>
                    </div>
                    <div className="font-headline-lg text-[28px] text-primary font-bold tracking-tight">
                      ZMW {grandTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-technical-data text-xs font-bold transition-colors shadow-sm border border-border-light"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Return to Catalog</span>
                </Link>
                <Link
                  href="/order-confirmation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-technical-data text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm"
                >
                  <span>View Dedicated Order Confirmation Page</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
