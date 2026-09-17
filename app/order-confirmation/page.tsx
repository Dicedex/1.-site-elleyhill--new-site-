"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart, WHATSAPP_PHONE_NUMBER, WHATSAPP_PHONE_DISPLAY } from "@/context/CartContext";

export default function OrderConfirmationPage() {
  const { lastOrder, items, grandTotal, hardwareSubtotal, installationSubtotal } = useCart();
  const [toastVisible, setToastVisible] = useState(false);

  const orderRef = lastOrder ? lastOrder.orderRef : "EHP-2026-8842";
  const displayItems = lastOrder && lastOrder.items.length > 0 ? lastOrder.items : items;
  const displayGrandTotal = lastOrder ? lastOrder.grandTotal : grandTotal || 90000;
  const displayHardware = lastOrder ? lastOrder.hardwareSubtotal : hardwareSubtotal || 85500;
  const displayInstallation = lastOrder ? lastOrder.installationSubtotal : installationSubtotal || 4500;
  const customerAddress = lastOrder?.customer?.address || "Plot 18/B Leopard's Hill Access Road, Kabulonga";
  const customerProvince = lastOrder?.customer?.province || "lusaka";
  const paymentMethodName = lastOrder?.payment?.method ? lastOrder.payment.method.toUpperCase() : "MTN MOMO";

  const copyOrderRef = () => {
    navigator.clipboard.writeText(orderRef);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2200);
  };

  const whatsappTrackingLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello Elleyhill Power Dispatch Desk, I am inquiring about tracking for order #${orderRef} for ${
      lastOrder?.customer?.fullName || "Mwape Chilufya"
    } in ${customerProvince.toUpperCase()}.`
  )}`;

  const whatsappEngineerLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello Engineer Bwalya / Elleyhill Dispatch, reaching out regarding Order #${orderRef} scheduled for ${customerAddress}.`
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
                      Field Engineers Scheduled
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
                      Order Confirmed &amp; Engineering Scheduled!
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

                {/* Big Hero Visual Icon & Live Dispatch Badge */}
                <div className="flex flex-col items-center justify-center gap-4 flex-shrink-0 bg-surface-container-low p-8 rounded-2xl md:w-72 text-center shadow-inner border border-border-light">
                  <div className="w-24 h-24 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[54px]">check</span>
                  </div>
                  <div className="space-y-1">
                    <div className="font-technical-data text-[12px] uppercase tracking-widest text-secondary font-bold">
                      Estimated Arrival
                    </div>
                    <div className="font-headline-md text-headline-md text-primary font-bold">
                      Tomorrow, 08:30
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      {customerProvince === "lusaka" ? "Kabulonga, Lusaka Sector 4" : "Regional Priority Dispatch"}
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-lowest py-2 px-3 rounded-lg text-left flex items-center justify-between border border-border-light">
                    <span className="font-technical-data text-[12px] text-on-surface-variant">
                      Live Dispatch SLA
                    </span>
                    <span className="font-technical-data text-[12px] text-status-success font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success"></span> Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Grid: Order Manifest, Lead Engineer & Warranty Vault */}
          <section className="w-full px-4 md:px-margin-desktop py-8 bg-surface">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Manifest & Financials (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
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
                        <span>Engineering Dispatch &amp; Installation</span>
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

                {/* Safety Guarantee */}
                <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex items-center gap-5 border border-border-light">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[32px]">shield</span>
                  </div>
                  <div>
                    <div className="font-headline-md text-[18px] text-primary font-bold">
                      Zambian Grid Compliance Protected
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Every system is installed in strict accordance with the Energy Regulation Board (ERB) Solar Energy Framework and verified by the Engineering Institution of Zambia (EIZ).
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Lead Engineer & Digital Warranty (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Lead Engineer Card */}
                <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm space-y-6 border border-border-light">
                  <div className="flex items-center justify-between pb-2 border-b border-border-light">
                    <div>
                      <span className="font-technical-data text-technical-data uppercase text-secondary tracking-wider font-semibold">
                        Field Operations
                      </span>
                      <div className="font-headline-md text-headline-md text-primary font-bold">
                        Assigned Lead Engineer
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-[26px]">badge</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-md text-headline-md flex-shrink-0 font-bold">
                      BM
                    </div>
                    <div>
                      <div className="font-headline-md text-[18px] text-primary font-bold">
                        Bwalya Mwila
                      </div>
                      <div className="font-technical-data text-[12px] text-secondary font-semibold">
                        Senior Photovoltaic Engineer
                      </div>
                      <div className="font-technical-data text-[12px] text-on-surface-variant">
                        ERB Reg #8842 • EIZ Member #19044
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-container-low space-y-2 border border-border-light">
                    <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-status-success">
                          radio_button_checked
                        </span>
                        Field Status
                      </span>
                      <span className="font-technical-data text-technical-data text-primary font-bold">
                        En Route to Hub Depot
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                        Dispatch Vehicle
                      </span>
                      <span className="font-technical-data text-technical-data text-primary">
                        Toyota Hilux (ALB 3291 ZM)
                      </span>
                    </div>
                  </div>

                  <a
                    className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-status-success hover:brightness-105 text-on-secondary font-label-cta text-label-cta uppercase transition-all shadow-md font-bold"
                    href={whatsappEngineerLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>Direct WhatsApp Engineer</span>
                  </a>
                </div>

                {/* Digital Warranty Vault */}
                <div className="bg-primary text-on-primary rounded-3xl p-8 shadow-md relative overflow-hidden space-y-6">
                  <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-surface-tint/20 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-technical-data text-technical-data uppercase text-tertiary-fixed tracking-wider font-semibold">
                        Digital Protection Vault
                      </span>
                      <div className="font-headline-md text-headline-md text-on-primary font-bold">
                        Active Warranties
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-container text-tertiary-fixed flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">verified</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-primary-container text-on-primary flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-tint/30 text-tertiary-fixed flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">battery_charging_full</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-headline-md text-[15px] text-on-primary font-bold">
                            10-Year Battery Warranty
                          </span>
                          <span className="font-technical-data text-[12px] text-tertiary-fixed font-bold">
                            Active
                          </span>
                        </div>
                        <p className="font-body-sm text-[13px] text-on-primary-container mt-0.5">
                          LiFePO4 cell integrity guarantee &gt; 6,000 cycles at 80% DoD.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-primary-container text-on-primary flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-tint/30 text-tertiary-fixed flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-headline-md text-[15px] text-on-primary font-bold">
                            5-Year Inverter Protection
                          </span>
                          <span className="font-technical-data text-[12px] text-tertiary-fixed font-bold">
                            Active
                          </span>
                        </div>
                        <p className="font-body-sm text-[13px] text-on-primary-container mt-0.5">
                          Full swap replacement on motherboard and pure sine wave transformer components.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-body-sm text-on-primary-container border-t border-neutral-700">
                    <span className="font-technical-data text-[12px]">Cert: #WZ-8842-2026-ZM</span>
                    <Link
                      className="text-tertiary-fixed hover:underline font-technical-data text-[12px] flex items-center gap-1"
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
                  href="mailto:support@elleyhill.co.zm"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  support@elleyhill.co.zm
                </a>
              </div>
            </div>
          </section>

          {/* Bottom Navigation Actions Section */}
          <section className="w-full px-4 md:px-margin-desktop py-12 bg-surface">
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
      </main>
    </div>
  );
}
