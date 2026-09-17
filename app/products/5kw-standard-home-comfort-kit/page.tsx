"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const galleryImages = [
  {
    url: "/images/products/Inverter.png",
    alt: "Elleyhill Power 5kW Hybrid Inverter with digital LCD screen and pure sine wave architecture.",
  },
  {
    url: "/images/products/UP5000.png",
    alt: "Greenrich UP5000 48V LiFePO4 Lithium Battery Module with high cycle life.",
  },
  {
    url: "/images/products/panels.png",
    alt: "Tier-1 605W JA Solar Bifacial High-Efficiency Solar Panels.",
  },
  {
    url: "/images/products/ssre kit.jpeg",
    alt: "Complete installation cable kit with pre-crimped lugs and DC protection box.",
  },
];


export default function ProductDetailPage() {
  const { openDrawer, addItem } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [installationOption, setInstallationOption] = useState<"professional" | "kit-only">("professional");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handleAddToCart = () => {
    const isProfessional = installationOption === "professional";
    addItem({
      id: "6kw-standard-home-comfort-kit",
      name: "6kW Standard Home Comfort Kit",
      price: 85500,
      originalPrice: 96000,
      image: "/images/products/Inverter.png",
      tag: "TIER 1 HARDWARE",
      stockStatus: "In Stock (Lusaka Warehouse)",
      description:
        "Includes 6kW Greenrich Hybrid Inverter, 10.24kWh LiFePO4 Battery, and 8x 605W JA Solar Bifacial Panels.",
      installationIncluded: isProfessional,
      installationOption: installationOption,
      installationPrice: 4500,
      qty: 1,
      slug: "5kw-standard-home-comfort-kit",
    });
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-lg antialiased pb-24 md:pb-0 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="mt-header-height-mobile md:mt-header-height-desktop max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg flex-grow">
        {/* Breadcrumbs */}
        <div className="mb-stack-lg flex items-center gap-2 text-body-sm text-on-surface-variant">
          <Link className="hover:text-primary hover:underline" href="/shop">
            Shop
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <Link className="hover:text-primary hover:underline" href="/shop">
            Complete Kits
          </Link>
          <span className="material-symbols-outlined text-sm">chevron_right</span>
          <span className="text-primary font-medium">
            5kW Standard Home Comfort Kit
          </span>
        </div>

        {/* Split Screen Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter lg:gap-16 items-start relative">
          {/* Left: Sticky Gallery */}
          <div className="md:sticky md:top-24 flex flex-col gap-4">
            {/* Main Image Stage */}
            <div className="relative w-full aspect-square bg-surface-bright rounded-xl border border-border-light overflow-hidden group">
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-300"
                data-alt={galleryImages[selectedImageIndex].alt}
                id="main-gallery-image"
                style={{
                  backgroundImage: `url('${galleryImages[selectedImageIndex].url}')`,
                }}
              ></div>
              {/* 360 Toggle */}
              <button className="absolute bottom-4 left-4 bg-surface-container-lowest/80 backdrop-blur-md border border-border-light text-primary px-4 py-2 rounded-full font-label-cta text-sm flex items-center gap-2 hover:bg-surface-container-lowest transition-colors shadow-sm">
                <span className="material-symbols-outlined text-lg">360</span>
                Interactive View
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden gallery-thumb focus:outline-none transition-all ${
                    selectedImageIndex === idx
                      ? "border-2 border-primary opacity-100"
                      : "border border-border-light hover:border-outline-variant opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    data-alt={img.alt}
                    style={{ backgroundImage: `url('${img.url}')` }}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Purchase Panel */}
          <div className="flex flex-col gap-stack-lg pt-4 md:pt-0">
            {/* Title & Status */}
            <div className="flex flex-col gap-2">
              <span className="text-on-surface-variant font-technical-data tracking-widest uppercase text-xs">
                ELLEYHILL POWER SYSTEM
              </span>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary">
                5kW Standard Home Comfort Kit
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-tertiary-fixed-dim">
                  <span className="material-symbols-outlined icon-fill text-sm">
                    star
                  </span>
                  <span className="material-symbols-outlined icon-fill text-sm">
                    star
                  </span>
                  <span className="material-symbols-outlined icon-fill text-sm">
                    star
                  </span>
                  <span className="material-symbols-outlined icon-fill text-sm">
                    star
                  </span>
                  <span className="material-symbols-outlined icon-fill text-sm">
                    star
                  </span>
                  <span className="text-on-surface-variant text-body-sm ml-1">
                    4.9 (28 Reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-status-success/10 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-status-success shadow-[0_0_8px_rgba(34,195,34,0.6)]"></span>
                  <span className="text-status-success font-technical-data text-xs">
                    In Stock
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex flex-col gap-1 border-b border-border-light pb-stack-lg">
              <div className="font-display-hero-mobile md:font-display-hero text-primary">
                ZMW 85,500
              </div>
              <div className="text-on-surface-variant text-body-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">payments</span>
                or 3-month Lay-By Available at ZMW 28,500/mo
              </div>
            </div>

            {/* Key Specs Bento Block */}
            <div className="bg-surface-bright rounded-xl p-6 border border-border-light flex flex-col gap-4">
              <h3 className="font-headline-md text-base text-primary">
                KEY SYSTEM SPECS
              </h3>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-0.5">
                    electric_bolt
                  </span>
                  <div>
                    <p className="font-technical-data text-primary">
                      5kW Hybrid Inverter (Greenrich)
                    </p>
                    <p className="text-body-sm text-on-surface-variant">
                      98% peak efficiency, 10ms UPS switchover.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-0.5">
                    battery_charging_full
                  </span>
                  <div>
                    <p className="font-technical-data text-primary">
                      4.95kWh LiFePO4 Battery Storage
                    </p>
                    <p className="text-body-sm text-on-surface-variant">
                      6,000+ Cycle Life, scalable up to 4 units.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary mt-0.5">
                    solar_power
                  </span>
                  <div>
                    <p className="font-technical-data text-primary">
                      3.63kW Solar Array (6x 605W JA Solar Bifacial)
                    </p>
                    <p className="text-body-sm text-on-surface-variant">
                      Dual-sided bifacial light absorption with up to +25% rear albedo gain.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Installation Options */}
            <div className="flex flex-col gap-4">
              <h3 className="font-headline-md text-base text-primary">
                SELECT INSTALLATION OPTION:
              </h3>
              <label
                onClick={() => setInstallationOption("kit-only")}
                className="relative flex cursor-pointer rounded-xl border border-border-light bg-surface-container-lowest p-4 hover:bg-surface-bright transition-colors"
              >
                <input
                  className="peer sr-only"
                  name="installation"
                  type="radio"
                  value="kit-only"
                  checked={installationOption === "kit-only"}
                  onChange={() => setInstallationOption("kit-only")}
                />
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center relative ${
                        installationOption === "kit-only"
                          ? "border-primary"
                          : "border-outline-variant"
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full bg-primary transition-opacity ${
                          installationOption === "kit-only"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-technical-data text-primary">
                        Kit Only (Self/Installer Setup)
                      </span>
                      <span className="text-body-sm text-on-surface-variant">
                        Hardware delivery only.
                      </span>
                    </div>
                  </div>
                  <span className="font-technical-data text-primary">
                    Included
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-colors ${
                    installationOption === "kit-only"
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                ></div>
              </label>

              <label
                onClick={() => setInstallationOption("professional")}
                className="relative flex cursor-pointer rounded-xl border border-border-light bg-surface-container-lowest p-4 hover:bg-surface-bright transition-colors"
              >
                <input
                  className="peer sr-only"
                  name="installation"
                  type="radio"
                  value="professional"
                  checked={installationOption === "professional"}
                  onChange={() => setInstallationOption("professional")}
                />
                <div className="flex w-full items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center relative ${
                        installationOption === "professional"
                          ? "border-primary"
                          : "border-outline-variant"
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full bg-primary transition-opacity ${
                          installationOption === "professional"
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      ></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-technical-data text-primary">
                        Full Professional Installation
                      </span>
                      <span className="text-body-sm text-on-surface-variant">
                        Certified Energy Audit + Setup
                      </span>
                    </div>
                  </div>
                  <span className="font-technical-data text-primary">
                    + ZMW 4,500
                  </span>
                </div>
                <div
                  className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-colors ${
                    installationOption === "professional"
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                ></div>
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full font-label-cta py-4 px-8 flex items-center justify-center gap-2 hover:scale-[0.98] transition-transform shadow-[0_4px_14px_rgba(245,227,136,0.4)] cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                ADD TO CART
              </button>
              <a
                href={`https://wa.me/260971838038?text=${encodeURIComponent(
                  `Hello Elleyhill Power, I am interested in inquiring about the 6kW Standard Home Comfort Kit (ZMW 85,500) with ${installationOption === "professional" ? "Professional Installation (+ZMW 4,500)" : "Kit-Only Delivery"}. Please provide availability and technical details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-surface-container-lowest border border-border-light text-primary rounded-full font-label-cta py-4 px-8 flex items-center justify-center gap-2 hover:bg-surface-bright transition-colors font-semibold"
              >
                <span
                  className="material-symbols-outlined text-status-success"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  chat
                </span>
                Inquire on WhatsApp
              </a>
            </div>

            {/* Trust micro-badges */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-light text-xs text-on-surface-variant font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  verified
                </span>{" "}
                10-Year Warranty
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  local_shipping
                </span>{" "}
                Nationwide Delivery
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">
                  support_agent
                </span>{" "}
                Local Support
              </span>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-24 md:h-32"></div>

        {/* What This System Powers (Bento Grid) */}
        <section className="mb-stack-lg md:mb-24">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-primary text-center">
              What This System Powers
            </h2>
            <p className="text-center text-on-surface-variant text-body-lg max-w-2xl mx-auto">
              Designed to seamlessly run an average Zambian household during
              prolonged load-shedding without compromising on comfort.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-gutter max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-surface-bright rounded-xl p-6 border border-border-light flex flex-col items-center text-center gap-3 interactive-card">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-border-light flex items-center justify-center text-primary mb-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl">
                  lightbulb
                </span>
              </div>
              <h4 className="font-technical-data text-primary text-base">
                LED Lighting
              </h4>
              <p className="text-body-sm text-on-surface-variant">
                Up to 20 internal &amp; external lights
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-bright rounded-xl p-6 border border-border-light flex flex-col items-center text-center gap-3 interactive-card">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-border-light flex items-center justify-center text-primary mb-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl">tv</span>
              </div>
              <h4 className="font-technical-data text-primary text-base">
                Entertainment
              </h4>
              <p className="text-body-sm text-on-surface-variant">
                65&quot; Smart TV, Decoder &amp; Soundbar
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-bright rounded-xl p-6 border border-border-light flex flex-col items-center text-center gap-3 interactive-card">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-border-light flex items-center justify-center text-primary mb-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl">
                  kitchen
                </span>
              </div>
              <h4 className="font-technical-data text-primary text-base">
                Refrigeration
              </h4>
              <p className="text-body-sm text-on-surface-variant">
                1x Double-Door Fridge/Freezer
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-bright rounded-xl p-6 border border-border-light flex flex-col items-center text-center gap-3 interactive-card">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-border-light flex items-center justify-center text-primary mb-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl">
                  ac_unit
                </span>
              </div>
              <h4 className="font-technical-data text-primary text-base">
                Deep Freezer
              </h4>
              <p className="text-body-sm text-on-surface-variant">
                1x Standard chest freezer
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-surface-bright rounded-xl p-6 border border-border-light flex flex-col items-center text-center gap-3 interactive-card">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-border-light flex items-center justify-center text-primary mb-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl">
                  microwave
                </span>
              </div>
              <h4 className="font-technical-data text-primary text-base">
                Microwave
              </h4>
              <p className="text-body-sm text-on-surface-variant">
                Intermittent usage (up to 1200W)
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-surface-bright rounded-xl p-6 border border-border-light flex flex-col items-center text-center gap-3 interactive-card">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest border border-border-light flex items-center justify-center text-primary mb-2 shadow-sm">
                <span className="material-symbols-outlined text-2xl">
                  water_drop
                </span>
              </div>
              <h4 className="font-technical-data text-primary text-base">
                Water Pump
              </h4>
              <p className="text-body-sm text-on-surface-variant">
                Up to 1HP Borehole or booster pump
              </p>
            </div>
          </div>
        </section>

        {/* Technical Accordions */}
        <section className="max-w-3xl mx-auto mb-stack-lg">
          <h2 className="font-headline-md text-primary mb-6">
            Technical Specifications
          </h2>
          <div className="border-t border-border-light">
            {/* Accordion Item 1 */}
            <div className="accordion-item border-b border-border-light">
              <button
                onClick={() => toggleAccordion(0)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
              >
                <span className="font-technical-data text-primary text-base group-hover:text-secondary transition-colors">
                  Inverter Electrical Specs
                </span>
                <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-transform duration-300">
                  {openAccordion === 0 ? "remove" : "add"}
                </span>
              </button>
              {openAccordion === 0 && (
                <div className="pb-6 text-body-sm text-on-surface-variant leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Rated Output Power: 5000W</li>
                    <li>Surge Power: 10000VA for 5 seconds</li>
                    <li>MPPT Voltage Range: 120VDC - 450VDC</li>
                    <li>Max Solar Input: 6000W</li>
                    <li>
                      Transfer Time: 10ms (Typical for computers); 20ms (For home
                      appliances)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion Item 2 */}
            <div className="accordion-item border-b border-border-light">
              <button
                onClick={() => toggleAccordion(1)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
              >
                <span className="font-technical-data text-primary text-base group-hover:text-secondary transition-colors">
                  Battery Capacity &amp; Lifecycle
                </span>
                <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-transform duration-300">
                  {openAccordion === 1 ? "remove" : "add"}
                </span>
              </button>
              {openAccordion === 1 && (
                <div className="pb-6 text-body-sm text-on-surface-variant leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Chemistry: Lithium Iron Phosphate (LiFePO4)</li>
                    <li>Nominal Energy: 4.95kWh</li>
                    <li>Usable Energy (90% DOD): 4.45kWh</li>
                    <li>Cycle Life: &gt;6,000 cycles at 25°C</li>
                    <li>Scalability: Parallel up to 4 units</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion Item 3 */}
            <div className="accordion-item border-b border-border-light">
              <button
                onClick={() => toggleAccordion(2)}
                className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
              >
                <span className="font-technical-data text-primary text-base group-hover:text-secondary transition-colors">
                  Warranty &amp; Guarantee Terms
                </span>
                <span className="material-symbols-outlined text-primary group-hover:text-secondary transition-transform duration-300">
                  {openAccordion === 2 ? "remove" : "add"}
                </span>
              </button>
              {openAccordion === 2 && (
                <div className="pb-6 text-body-sm text-on-surface-variant leading-relaxed">
                  <p className="mb-2">
                    We stand by our engineering. This kit includes our
                    comprehensive coverage:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Battery:</strong> 10-Year Local Warranty (or 6,000
                      cycles).
                    </li>
                    <li>
                      <strong>Inverter:</strong> 5-Year Comprehensive Electrical
                      Warranty.
                    </li>
                    <li>
                      <strong>Panels:</strong> 12-Year Workmanship / 30-Year Linear
                      Bifacial Performance Guarantee.
                    </li>
                    <li>
                      <strong>Installation:</strong> 1-Year Workmanship Guarantee
                      (if selected).
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion Item 4 */}
            <div className="accordion-item border-b border-border-light hover:bg-surface-bright transition-colors cursor-pointer flex items-center justify-between py-6 group">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">
                  picture_as_pdf
                </span>
                <span className="font-technical-data text-primary text-base">
                  Download Full Spec Sheet (PDF)
                </span>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:-translate-y-1 transition-transform">
                download
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Bottom Mobile Buy Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-border-light shadow-[0_-4px_24px_rgba(0,0,0,0.06)] z-40 p-4 md:hidden flex justify-between items-center pb-safe">
        <div className="flex flex-col">
          <span className="font-technical-data text-primary text-sm truncate w-40">
            5kW Standard Kit
          </span>
          <span className="font-display-hero-mobile text-lg text-primary">
            ZMW 85,500
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full font-label-cta py-3 px-6 shadow-sm active:scale-95 transition-transform font-bold cursor-pointer"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

