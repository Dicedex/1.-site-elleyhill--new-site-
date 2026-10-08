"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart, WHATSAPP_PHONE_NUMBER, WHATSAPP_PHONE_DISPLAY } from "@/context/CartContext";

export default function OrderConfirmationPage() {
  const { lastOrder, items, grandTotal, hardwareSubtotal, installationSubtotal } = useCart();
  const [toastVisible, setToastVisible] = useState(false);

  const orderRef = lastOrder ? lastOrder.orderRef : "EHP-PENDING";
  const displayItems = lastOrder && lastOrder.items.length > 0 ? lastOrder.items : items;
  const displayGrandTotal = lastOrder ? lastOrder.grandTotal : grandTotal || 0;
  const displayHardware = lastOrder ? lastOrder.hardwareSubtotal : hardwareSubtotal || 0;
  const displayInstallation = lastOrder ? lastOrder.installationSubtotal : installationSubtotal || 0;
  const customerAddress = lastOrder?.customer?.address || "Delivery Site Address, Zambia";
  const customerProvince = lastOrder?.customer?.province || "lusaka";
  const paymentMethodName = lastOrder?.payment?.method ? lastOrder.payment.method.toUpperCase() : "CONFIRMED";

  const copyOrderRef = () => {
    navigator.clipboard.writeText(orderRef);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2200);
  };

  const whatsappTrackingLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello Elleyhill Power Dispatch Desk, I am inquiring about tracking for order #${orderRef} for ${
      lastOrder?.customer?.fullName || "Valued Customer"
    } in ${customerProvince.toUpperCase()}.`
  )}`;

  return (
    <div className="bg-surface font-body-lg text-body-lg text-on-surface antialiased min-h-screen pt-[72px]">
      {/* Notification Toast */}
      <div
        className={`fixed top-24 right-8 z-50 bg-primary text-on-primary px-5 py-3 rounded-full shadow-xl transition-all duration-300 flex items-center gap-3 ${
          toastVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        id="copy-toast"
      >
        <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
          check_circle
        </span>
        <span className="font-technical-data text-technical-data">
          Order reference copied to clipboard!
        </span>
      </div>

      <main className="w-full bg-surface min-h-[calc(100vh-72px)]">
        <div className="flex flex-col w-full">
          {/* SCREEN-ONLY UI: STRICTLY HIDDEN WHEN PRINTING PDF */}
          <div className="screen-only print:hidden flex flex-col w-full">
            {/* Breadcrumb / Stepper Progress Header */}
            <section className="w-full bg-surface-container-low px-4 md:px-margin-desktop py-8 border-b border-border-light">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6">
                <div>
                  <span className="font-technical-data text-technical-data text-secondary uppercase tracking-widest flex items-center gap-2 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-status-success animate-ping"></span>
                    Transaction Authorized &amp; Verified
                  </span>
                  <div className="font-headline-md text-headline-md text-primary mt-1 tracking-tight font-bold">
                    Checkout Sequence Complete
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm border border-border-light">
                  <span className="font-technical-data text-technical-data text-on-surface-variant uppercase">
                    Order Ref:
                  </span>
                  <span className="font-headline-md text-headline-md text-primary tracking-wider font-bold">
                    #{orderRef}
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

              {/* Checkout Stepper Progress */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                {/* Step 1 (Completed) */}
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center gap-4 border border-border-light">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-technical-data text-[12px] uppercase tracking-wider text-secondary font-bold">
                      Step 01 • Completed
                    </div>
                    <div className="font-headline-md text-[16px] text-primary truncate font-semibold">
                      Customer &amp; Site Details
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {customerProvince.toUpperCase()} Province Dispatch
                    </div>
                  </div>
                </div>

                {/* Step 2 (Completed) */}
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex items-center gap-4 border border-border-light">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-technical-data text-[12px] uppercase tracking-wider text-secondary font-bold">
                      Step 02 • Completed
                    </div>
                    <div className="font-headline-md text-[16px] text-primary truncate font-semibold">
                      Payment Clearance
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {paymentMethodName} Gateway Verified
                    </div>
                  </div>
                </div>

                {/* Step 3 (Active / Current) */}
                <div className="bg-primary text-on-primary p-4 rounded-xl shadow-md flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0 font-bold">
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-technical-data text-[12px] uppercase tracking-wider text-tertiary-fixed font-bold">
                      Step 03 • Confirmed
                    </div>
                    <div className="font-headline-md text-[16px] text-on-primary truncate font-semibold">
                      Dispatch &amp; Deployment
                    </div>
                    <div className="font-body-sm text-body-sm text-on-primary-container truncate">
                      Dispatch Scheduled
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hero Success Banner Section */}
          <section className="w-full px-4 md:px-margin-desktop py-12 bg-surface">
            <div className="max-w-[1200px] mx-auto bg-surface-container-lowest rounded-3xl p-8 md:p-14 shadow-sm relative overflow-hidden border border-border-light">
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
                    <h1 className="font-display-hero text-[34px] md:text-[52px] leading-[1.08] text-primary tracking-tight font-bold">
                      Order Confirmed &amp; Delivery Scheduled!
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                      Order reference{" "}
                      <span className="font-headline-md text-primary text-[17px] font-semibold">
                        #{orderRef}
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
                      href={whatsappTrackingLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                      <span>Track Dispatch on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Grid: Ordered Equipment, Lead Engineer & Warranty Vault */}
          <section className="w-full px-4 md:px-margin-desktop py-8 bg-surface screen-only">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Manifest & Financials (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm space-y-6 border border-border-light">
                  <div className="flex items-center justify-between pb-4 border-b border-border-light">
                    <div>
                      <div className="font-headline-md text-headline-md text-primary font-bold">
                        Ordered Equipment
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-technical-data text-technical-data font-bold">
                      PAID IN FULL
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-4">
                    {displayItems.map((item) => {
                      const itemTotal =
                        item.price * item.qty +
                        (item.installationIncluded && item.installationPrice
                          ? item.installationPrice * item.qty
                          : 0);

                      return (
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
                                {item.description || item.tag} {item.installationIncluded ? "• Pro Installation Included" : ""}
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-headline-md text-[16px] text-primary font-bold">
                              ZMW {itemTotal.toLocaleString()}
                            </div>
                            <div className="font-technical-data text-[12px] text-on-surface-variant">
                              Qty: {item.qty} {item.qty === 1 ? "Unit" : "Units"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Financial Totals */}
                  <div className="p-5 rounded-2xl bg-surface-container space-y-3 border border-border-light">
                    <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                      <span>Equipment Subtotal</span>
                      <span className="font-technical-data text-technical-data font-medium text-primary">
                        ZMW {displayHardware.toLocaleString()}
                      </span>
                    </div>
                    {displayInstallation > 0 && (
                      <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                        <span>Dispatch &amp; Installation</span>
                        <span className="font-technical-data text-technical-data font-medium text-secondary">
                          + ZMW {displayInstallation.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                      <span>Logistics &amp; Staging</span>
                      <span className="text-status-success font-technical-data text-technical-data font-bold uppercase">
                        {customerProvince === "lusaka" ? "Included Free" : "ZMW 2,500"}
                      </span>
                    </div>
                    <div className="flex justify-between font-body-sm text-body-sm text-on-surface-variant">
                      <span>Statutory Clean Tech Zero VAT Rate</span>
                      <span className="font-technical-data text-technical-data font-medium text-primary">
                        ZMW 0.00 (0%)
                      </span>
                    </div>
                    <div className="pt-3 border-t border-border-light flex justify-between items-baseline">
                      <div>
                        <span className="font-headline-md text-[18px] text-primary font-bold">
                          Total Amount Settled
                        </span>
                        <span className="block font-technical-data text-[12px] text-secondary">
                          Via {paymentMethodName} (Ref: #{orderRef})
                        </span>
                      </div>
                      <div className="font-headline-lg text-[28px] text-primary font-bold tracking-tight">
                        ZMW {displayGrandTotal.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Installation Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-surface-container-low space-y-1 border border-border-light">
                      <div className="font-technical-data text-[11px] uppercase tracking-wider text-on-surface-variant">
                        Installation Site
                      </div>
                      <div className="font-headline-md text-[15px] text-primary font-bold">
                        {customerProvince.toUpperCase()}, Zambia
                      </div>
                      <p className="font-body-sm text-[13px] text-on-surface-variant">
                        {customerAddress}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-surface-container-low space-y-1 border border-border-light">
                      <div className="font-technical-data text-[11px] uppercase tracking-wider text-on-surface-variant">
                        ZESCO Backup Configuration
                      </div>
                      <div className="font-headline-md text-[15px] text-primary font-bold">
                        Automatic Changeover (ATS)
                      </div>
                      <p className="font-body-sm text-[13px] text-on-surface-variant">
                        &lt; 10ms seamless transfer uninterrupted power
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Digital Warranty Vault (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Digital Warranty Vault */}
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm space-y-6 border border-border-light relative overflow-hidden">
                  <div className="flex items-center justify-between pb-2 border-b border-border-light">
                    <div>
                      <span className="font-technical-data text-technical-data uppercase text-secondary tracking-wider font-semibold">
                        Equipment Warranty Protection
                      </span>
                      <div className="font-headline-md text-headline-md text-primary font-bold">
                        Active Warranties
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">verified</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-surface-container-low border border-border-light flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[20px]">battery_charging_full</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-headline-md text-[16px] text-on-surface font-bold">
                            10-Year Battery Warranty
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-secondary font-technical-data text-[12px] font-bold">
                            Active
                          </span>
                        </div>
                        <p className="font-body-sm text-[13px] text-on-surface-variant mt-1">
                          LiFePO4 cell integrity guarantee &gt; 6,000 cycles at 80% DoD.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-surface-container-low border border-border-light flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary-container text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[20px]">bolt</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-headline-md text-[16px] text-on-surface font-bold">
                            5-Year Inverter Protection
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-secondary font-technical-data text-[12px] font-bold">
                            Active
                          </span>
                        </div>
                        <p className="font-body-sm text-[13px] text-on-surface-variant mt-1">
                          Full swap replacement on motherboard and pure sine wave transformer components.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-body-sm text-on-surface-variant border-t border-border-light">
                    <span className="font-technical-data text-[12px] font-medium text-on-surface">
                      Cert: #{orderRef !== "EHP-PENDING" ? orderRef.replace("ORD-", "WAR-").replace("EHP-", "EHP-WAR-") : "EHP-WAR-2026-0001"}
                    </span>
                    <Link
                      className="text-secondary hover:text-primary font-technical-data text-[12px] font-bold flex items-center gap-1 transition-colors"
                      href="/warranty"
                    >
                      View Terms <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hub & Regional Support Strip */}
          <section className="w-full px-4 md:px-margin-desktop py-8 bg-surface">
            <div className="max-w-[1200px] mx-auto bg-surface-container-low rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-border-light">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest text-secondary flex items-center justify-center flex-shrink-0 shadow-sm border border-border-light">
                  <span className="material-symbols-outlined text-[24px]">storefront</span>
                </div>
                <div>
                  <div className="font-headline-md text-[18px] text-primary font-bold">
                    Lusaka Showroom &amp; Central Hub
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Unit 4A block A East Park Mall, Lusaka • Mon - Fri: 08:00 - 17:00 | Sat: 09:00 - 14:00 CAT
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <a
                  className="inline-flex items-center gap-2 font-technical-data text-technical-data text-primary hover:text-secondary transition-colors"
                  href="tel:+260971838038"
                >
                  <span className="material-symbols-outlined text-[18px]">phone</span>
                  {WHATSAPP_PHONE_DISPLAY}
                </a>
                <span className="text-outline-variant">|</span>
                <a
                  className="inline-flex items-center gap-2 font-technical-data text-technical-data text-primary hover:text-secondary transition-colors"
                  href="mailto:support@elleyhillzm.com"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  support@elleyhillzm.com
                </a>
              </div>
            </div>
          </section>

          {/* Bottom Navigation Actions Section */}
          <section className="w-full px-4 md:px-margin-desktop py-12 bg-surface screen-only">
            <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-technical-data text-technical-data transition-colors shadow-sm border border-border-light"
                  href="/shop"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>Return to Shop Catalog</span>
                </Link>
                <Link
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-lowest hover:bg-surface-container text-primary font-technical-data text-technical-data transition-colors shadow-sm border border-border-light"
                  href="/calculator"
                >
                  <span className="material-symbols-outlined text-[18px]">calculate</span>
                  <span>View Solar Calculator</span>
                </Link>
                <Link
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-hover font-technical-data text-technical-data transition-colors shadow-sm"
                  href="/profile"
                >
                  <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  <span>View Saved Invoices in Profile</span>
                </Link>
              </div>
              <div>
                <Link
                  className="inline-flex items-center gap-2 font-technical-data text-technical-data text-secondary hover:text-primary transition-colors underline decoration-secondary"
                  href="/contact"
                >
                  <span className="material-symbols-outlined text-[18px]">help_center</span>
                  <span>Access Customer Support &amp; Hub Locator</span>
                </Link>
              </div>
            </div>
          </section>
        </div>

          {/* =========================================================================
              SINGLE-SHEET OFFICIAL TAX INVOICE (Rendered strictly when printing/PDF)
              ========================================================================= */}
          <div className="hidden print:block printable-invoice-sheet font-sans text-charcoal bg-white p-6 max-w-full text-xs">
            {/* Header with Company Logo / Title & Tax Invoice Meta */}
            <div className="flex justify-between items-start pb-4 border-b-2 border-primary">
              <div>
                <div className="text-xl font-bold text-primary tracking-tight">
                  ELLEYHILL POWER SOLUTIONS LTD
                </div>
                <div className="text-[11px] text-on-surface-variant leading-tight mt-0.5">
                  Industrial &amp; Commercial Solar Engineering Zambia<br />
                  East Park Mall, Great East Road, Lusaka • support@elleyhillzm.com • +260 971 838 038
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-bold text-primary uppercase tracking-wider">
                  OFFICIAL TAX INVOICE
                </div>
                <div className="text-[11px] font-mono mt-0.5">
                  <div><strong>Invoice Ref:</strong> #{orderRef}</div>
                  <div><strong>Date:</strong> {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date())}</div>
                  <div><strong>ZRA TPIN:</strong> 1003482910</div>
                </div>
              </div>
            </div>

            {/* Client & Dispatch Details */}
            <div className="grid grid-cols-2 gap-6 py-4 border-b border-border-light text-[11px]">
              <div>
                <div className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">
                  BILLED &amp; DELIVERED TO:
                </div>
                <div className="font-bold text-sm text-charcoal">{lastOrder?.customer?.fullName || "Valued Client"}</div>
                <div className="text-on-surface-variant mt-0.5">{customerAddress}</div>
                <div className="text-on-surface-variant">{customerProvince.toUpperCase()} PROVINCE, ZAMBIA</div>
                {lastOrder?.customer?.phone && (
                  <div className="text-primary font-semibold mt-0.5">+260 {lastOrder.customer.phone}</div>
                )}
                {lastOrder?.customer?.email && (
                  <div className="text-on-surface-variant">{lastOrder.customer.email}</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-secondary uppercase tracking-wider mb-1">
                  PAYMENT &amp; DISPATCH STATUS:
                </div>
                <div><strong>Payment Status:</strong> <span className="text-status-success font-bold">PAID &amp; AUTHORIZED</span></div>
                <div><strong>Payment Method:</strong> {paymentMethodName}</div>
                <div><strong>Delivery Zone:</strong> {customerProvince === "lusaka" ? "Lusaka Rapid Logistics" : "Regional Priority Dispatch"}</div>
                <div><strong>Warranty Terms:</strong> 10-Year Comprehensive Hardware Guarantee</div>
              </div>
            </div>

            {/* Items Table */}
            <div className="py-4 border-b border-border-light">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-border-medium text-[10px] uppercase font-bold text-on-surface-variant">
                    <th className="py-1.5">Item Description</th>
                    <th className="py-1.5 text-center">Qty</th>
                    <th className="py-1.5 text-right">Unit Price (ZMW)</th>
                    <th className="py-1.5 text-right">Total (ZMW)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {displayItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2">
                        <div className="font-bold text-charcoal">{item.name}</div>
                        {item.installationIncluded && (
                          <div className="text-[10px] text-secondary font-medium">+ Certified Professional Installation &amp; Audit</div>
                        )}
                      </td>
                      <td className="py-2 text-center">{item.qty}</td>
                      <td className="py-2 text-right font-mono">
                        {(item.price + (item.installationIncluded && item.installationPrice ? item.installationPrice : 0)).toLocaleString()}
                      </td>
                      <td className="py-2 text-right font-mono font-bold">
                        {((item.price + (item.installationIncluded && item.installationPrice ? item.installationPrice : 0)) * item.qty).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Breakdown */}
            <div className="py-3 flex justify-end">
              <div className="w-64 space-y-1 text-[11px] text-right">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Equipment Subtotal:</span>
                  <span className="font-mono font-medium">ZMW {displayHardware.toLocaleString()}</span>
                </div>
                {displayInstallation > 0 && (
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Installation &amp; Mounting:</span>
                    <span className="font-mono font-medium text-secondary">+ ZMW {displayInstallation.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Logistics &amp; Delivery:</span>
                  <span className="font-mono font-medium">
                    {lastOrder?.deliveryCost === 0 ? "FREE (Included)" : `ZMW ${(lastOrder?.deliveryCost || 0).toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Clean Tech Statutory VAT (0%):</span>
                  <span className="font-mono font-medium text-status-success">ZMW 0.00 (Zero-Rated)</span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-primary text-sm font-bold">
                  <span className="text-primary uppercase">Total Settled:</span>
                  <span className="text-primary font-mono text-base">ZMW {displayGrandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer Security / Terms */}
            <div className="pt-4 border-t border-border-light text-[10px] text-on-surface-variant flex justify-between items-center">
              <div>
                Official Electronic Receipt &amp; Tax Document. Certified under ERB &amp; EIZ Engineering Standards.
              </div>
              <div className="font-mono font-bold text-secondary">
                ELLEYHILL POWER ZAMBIA
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
