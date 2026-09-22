import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";

export default function Home() {
  return (
    <>
      {/* Main Content Canvas */}
      <main className="pt-[72px]">
        {/* Hero Section (Apple-style Full-width Banner) */}
        <section className="relative w-full h-[819px] md:h-[921px] flex flex-col justify-center items-center text-center px-margin-mobile md:px-margin-desktop overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full opacity-40 -z-10"
            data-alt="Ultra-clean background image of a modern home with solar panels integrated onto an IBR roof, set against a crisp sky. High-key lighting, bright light-mode aesthetic, sustainable architecture feel."
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZQXQMohlD4reuuamwF3xBc9rMC7lRj8Z5029CcN0tTpZxz21a6sW3VVYpnJpGmFSEZTawi_pnDpIUz39fnuQsPvqOUVOe0AnU7KpuH1480s1kSPf0l0cwtAdjsrCAAtbheZdI0qI5qO2sQR9KMowG30bj1BXcaZ5Vn72gR-fTlKcxB75IDgbMulc0fbyV9OlxoqOVdzUMmW17bDj2ZEKzn13eA3my3MaDGt92EJJhfRaJvjqFjl_n')",
            }}
          ></div>
          <div className="z-10 max-w-4xl mx-auto flex flex-col items-center">
            <span className="inline-block bg-secondary/15 text-secondary font-label-cta text-[12px] uppercase tracking-widest px-4 py-1.5 rounded-full mb-stack-lg border border-secondary/30">
              FRESH ENERGY INDEPENDENCE IN ZAMBIA
            </span>
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-charcoal mb-stack-md">
              Uninterrupted Power. <span className="block text-primary mt-1">Zero Compromise.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-neutral-grey-dark max-w-2xl mb-stack-lg">
              Standard-setting hybrid solar systems engineered for homes, farms,
              and enterprise across Zambia.
            </p>
            <div className="flex flex-col sm:flex-row gap-stack-md w-full sm:w-auto">
              <Link
                className="bg-primary hover:bg-primary-hover text-white font-label-cta text-label-cta px-8 py-4 rounded-full hover:scale-95 duration-100 transition-all w-full sm:w-auto text-center shadow-md"
                href="/shop"
              >
                SHOP SOLAR KITS &rarr;
              </Link>
              <Link
                className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-label-cta text-label-cta px-8 py-4 rounded-full transition-all w-full sm:w-auto text-center"
                href="/calculator"
              >
                BUILD YOUR SYSTEM
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Micro-cards */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg border-y border-border-light bg-surface-bright">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
            <div className="flex flex-col items-center gap-stack-sm p-4 bento-card rounded-lg bg-surface-container-lowest border border-border-light">
              <span className="material-symbols-outlined text-secondary text-3xl">
                verified
              </span>
              <span className="font-technical-data text-technical-data text-charcoal">
                10-Year Battery Warranty
              </span>
            </div>
            <div className="flex flex-col items-center gap-stack-sm p-4 bento-card rounded-lg bg-surface-container-lowest border border-border-light">
              <span className="material-symbols-outlined text-secondary text-3xl">
                bolt
              </span>
              <span className="font-technical-data text-technical-data text-charcoal">
                Instant &lt;10ms Switching
              </span>
            </div>
            <div className="flex flex-col items-center gap-stack-sm p-4 bento-card rounded-lg bg-surface-container-lowest border border-border-light">
              <span className="material-symbols-outlined text-secondary text-3xl">
                storefront
              </span>
              <span className="font-technical-data text-technical-data text-charcoal">
                Local Lusaka Stock
              </span>
            </div>
            <div className="flex flex-col items-center gap-stack-sm p-4 bento-card rounded-lg bg-surface-container-lowest border border-border-light">
              <span className="material-symbols-outlined text-secondary text-3xl">
                local_shipping
              </span>
              <span className="font-technical-data text-technical-data text-charcoal">
                Nationwide Delivery
              </span>
            </div>
          </div>
        </section>

        {/* What We Do: Core Engineering & Field Services */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-14 md:py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary font-technical-data text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-secondary/20">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Certified Solar Engineering &amp; Field Execution
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-charcoal">
                What We Do
              </h2>
              <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mt-2">
                Beyond supplying Tier-1 hardware, our Zambian certified engineers provide complete turnkey energy services for homes, businesses, and industrial farms.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-label-cta text-sm py-3 px-6 rounded-full bg-surface-container hover:bg-surface-container-high text-charcoal hover:text-primary transition-colors border border-border-light shrink-0 font-medium"
            >
              <span>Explore All Services</span>
              <span className="material-symbols-outlined text-base">&rarr;</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1: Installation */}
            <Link
              href="/services"
              className="bg-surface-container-lowest border border-border-light rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                  <img
                    src="/images/services/installation.jpg"
                    alt="Turnkey Solar Panel Installation in Zambia"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="font-technical-data text-[10px] font-bold text-white uppercase tracking-wider bg-black/50 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Turnkey EPC
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-charcoal group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">build</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-headline-md text-lg text-charcoal font-bold mb-2 group-hover:text-primary transition-colors">
                    Solar Panel Installation
                  </h3>
                  <p className="font-body-sm text-sm text-text-secondary leading-relaxed mb-4">
                    Full custom design, structural roof/ground mounting, DC combiner cabling, inverter synchronization, and safety compliance.
                  </p>
                  <ul className="space-y-1.5 text-xs text-text-secondary mb-2">
                    <li className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-status-success text-sm">check_circle</span>
                      <span>Residential &amp; Commercial</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-status-success text-sm">check_circle</span>
                      <span>Zambian Grid Code Compliant</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <div className="font-label-cta text-xs py-2.5 px-4 rounded-full bg-surface-container text-charcoal group-hover:bg-primary group-hover:text-white transition-all text-center font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                  <span>Learn More &rarr;</span>
                </div>
              </div>
            </Link>

            {/* Service 2: Cleaning */}
            <Link
              href="/services#cleaning-booking"
              className="bg-surface-container-lowest border-2 border-accent-yellow/60 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-[0_16px_32px_rgba(185,212,50,0.2)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer relative"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                  <img
                    src="/images/services/cleaning.jpg"
                    alt="Professional Solar Panel Cleaning in Zambia"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="font-technical-data text-[10px] font-bold text-charcoal uppercase tracking-wider bg-accent-yellow px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-xs">local_fire_department</span>
                      K70 per Panel
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/60 backdrop-blur-md text-white font-technical-data text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border border-white/20">
                      High Demand
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-yellow text-charcoal shadow-md flex items-center justify-center group-hover:bg-white transition-colors">
                      <span className="material-symbols-outlined text-xl">cleaning_services</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-headline-md text-lg text-charcoal font-bold mb-2 group-hover:text-primary transition-colors">
                    Solar Panel Cleaning
                  </h3>
                  <p className="font-body-sm text-sm text-text-secondary leading-relaxed mb-4">
                    Restore up to 30% lost output. We use 100% de-ionized purified water and anti-scratch bristles to eliminate dust, soot, and bird droppings.
                  </p>
                  <ul className="space-y-1.5 text-xs text-text-secondary mb-2">
                    <li className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-status-success text-sm">check_circle</span>
                      <span>De-ionized Spot-Free Wash</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-status-success text-sm">check_circle</span>
                      <span>Before &amp; After Power Report</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <div className="font-label-cta text-xs py-2.5 px-4 rounded-full bg-accent-yellow text-charcoal hover:bg-[#A8C425] group-hover:shadow-md transition-all text-center font-bold flex items-center justify-center gap-1.5">
                  <span>Instant Estimator &rarr;</span>
                </div>
              </div>
            </Link>

            {/* Service 3: Maintenance & Support */}
            <Link
              href="/warranty"
              className="bg-surface-container-lowest border border-border-light rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                  <img
                    src="/images/services/maintenance.jpg"
                    alt="Solar Maintenance and Inverter Diagnostics in Zambia"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="font-technical-data text-[10px] font-bold text-white uppercase tracking-wider bg-black/50 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Rapid Swap
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-charcoal group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">verified_user</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-headline-md text-lg text-charcoal font-bold mb-2 group-hover:text-primary transition-colors">
                    Maintenance &amp; Support
                  </h3>
                  <p className="font-body-sm text-sm text-text-secondary leading-relaxed mb-4">
                    Multi-point system health diagnostics, inverter firmware updates, battery cell balancing, and rapid local replacement under warranty.
                  </p>
                  <ul className="space-y-1.5 text-xs text-text-secondary mb-2">
                    <li className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-status-success text-sm">check_circle</span>
                      <span>East Park Mall Swap Center</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-status-success text-sm">check_circle</span>
                      <span>Copperbelt Technical Branch</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <div className="font-label-cta text-xs py-2.5 px-4 rounded-full bg-surface-container text-charcoal group-hover:bg-primary group-hover:text-white transition-all text-center font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                  <span>Warranty &amp; Plans &rarr;</span>
                </div>
              </div>
            </Link>

            {/* Service 4: Energy Auditing */}
            <Link
              href="/calculator"
              className="bg-surface-container-lowest border border-border-light rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                  <img
                    src="/images/services/audit.jpg"
                    alt="Commercial Solar Energy Auditing and Sizing"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="font-technical-data text-[10px] font-bold text-white uppercase tracking-wider bg-black/50 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      Precision Sizing
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <div className="w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-charcoal group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">query_stats</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-headline-md text-lg text-charcoal font-bold mb-2 group-hover:text-primary transition-colors">
                    Energy Auditing &amp; Sizing
                  </h3>
                  <p className="font-body-sm text-sm text-text-secondary leading-relaxed mb-4">
                    Comprehensive load logging, utility bill audits, generator hybrid integration, and customized financial payback modeling.
                  </p>
                  <ul className="space-y-1.5 text-xs text-text-secondary mb-2">
                    <li className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-status-success text-sm">check_circle</span>
                      <span>Free Online Sizing Calculator</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-status-success text-sm">check_circle</span>
                      <span>Commercial Feasibility Studies</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <div className="font-label-cta text-xs py-2.5 px-4 rounded-full bg-surface-container text-charcoal group-hover:bg-primary group-hover:text-white transition-all text-center font-semibold flex items-center justify-center gap-1.5 shadow-sm">
                  <span>Size Your System &rarr;</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Category Grid (Nike-style Spotlight) */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-stack-lg text-center">
            Explore Hardware Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
            <Link
              className="group block relative h-80 rounded-2xl overflow-hidden bento-card bg-surface-container-low border border-border-light"
              href="/shop?category=Complete+Kits"
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <h3 className="font-headline-md text-headline-md text-white group-hover:text-primary-green transition-colors">
                  Complete Kits
                </h3>
                <p className="font-body-sm text-body-sm text-neutral-200 mt-1">
                  Inverter + Lithium + Panels
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/products/complete systems/5kw sys.png"
                alt="Complete Solar Kits Zambia"
              />
            </Link>
            <Link
              className="group block relative h-80 rounded-2xl overflow-hidden bento-card bg-surface-container-low border border-border-light"
              href="/shop?category=Batteries"
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <h3 className="font-headline-md text-headline-md text-white group-hover:text-primary-green transition-colors">
                  Lithium Batteries
                </h3>
                <p className="font-body-sm text-body-sm text-neutral-200 mt-1">
                  Greenrich &amp; High-Voltage LiFePO4
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/products/UP5000.png"
                alt="Lithium Solar Batteries"
              />
            </Link>
            <Link
              className="group block relative h-80 rounded-2xl overflow-hidden bento-card bg-surface-container-low border border-border-light"
              href="/shop?category=Inverters"
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <h3 className="font-headline-md text-headline-md text-white group-hover:text-primary-green transition-colors">
                  Hybrid Inverters
                </h3>
                <p className="font-body-sm text-body-sm text-neutral-200 mt-1">
                  Single &amp; 3-Phase Pure Sine Wave
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/products/Inverter.png"
                alt="Hybrid Solar Inverters"
              />
            </Link>
            <Link
              className="group block relative h-80 rounded-2xl overflow-hidden bento-card bg-surface-container-low border border-border-light"
              href="/shop?category=Portable"
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                <h3 className="font-headline-md text-headline-md text-white group-hover:text-primary-green transition-colors">
                  Portable Power
                </h3>
                <p className="font-body-sm text-body-sm text-neutral-200 mt-1">
                  Plug &amp; Play Load-shedding Backup
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/images/products/Q2400.png"
                alt="Portable Power Stations"
              />
            </Link>
          </div>
        </section>

        {/* Bento Grid: Featured System Showcase (5kW Complete System) */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-stack-lg">
            <div>
              <span className="inline-block bg-secondary/15 text-secondary font-technical-data text-[12px] uppercase tracking-widest px-3.5 py-1 rounded-full mb-2 border border-secondary/30 font-bold">
                COMPLETE TURNKEY HARDWARE
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                Featured: 5kW Complete System
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
                5kW (200Ah) Inverter + 5kWh (100Ah) 48V Lithium Battery + 8x 545W Haitai Solar Panels.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-gutter h-auto md:h-[600px]">
            {/* Card 1 (Large - Inverter Core) */}
            <div className="md:col-span-2 md:row-span-2 rounded-[16px] bg-background p-8 relative overflow-hidden bento-card flex flex-col justify-between border border-border-light">
              <div className="z-10 max-w-sm">
                <span className="inline-block bg-primary text-on-primary font-technical-data text-[12px] uppercase px-3 py-1 rounded-full mb-4 font-bold">
                  5KW (200AH) INVERTER CORE
                </span>
                <h3 className="font-headline-md text-[30px] leading-tight text-primary font-bold mb-2">
                  5kW (200Ah) Greenrich Inverter
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Pure sine wave hybrid inverter with 10ms seamless UPS automatic grid switchover.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-charcoal font-semibold">
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low border border-border-light">
                    8x 545W Haitai Solar Panels
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-container-low border border-border-light">
                    4.36kW Total Solar Array
                  </span>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute bottom-4 right-4 w-1/2 md:w-2/5 object-contain z-0 filter drop-shadow-xl"
                src="/images/products/Inverter.png"
                alt="5kW Greenrich Hybrid Inverter"
              />
            </div>
            {/* Card 2 (Upper Right - Battery Storage) */}
            <div className="rounded-[16px] bg-surface-container-low p-6 bento-card border border-border-light relative overflow-hidden flex flex-col justify-between h-[288px]">
              <div className="z-10">
                <span className="inline-block bg-secondary text-white font-technical-data text-[12px] uppercase px-3 py-1 rounded-full mb-3 font-bold">
                  48V LITHIUM STORAGE
                </span>
                <h4 className="font-headline-md text-xl text-primary font-bold">
                  1 x 5kWh (100Ah) 48V Battery
                </h4>
                <p className="font-body-sm text-[13px] text-on-surface-variant mt-1">
                  LiFePO4 Chemistry | 6,000+ Cycle Life | 10-Yr Warranty.
                </p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute bottom-2 right-2 w-1/2 object-contain z-0 filter drop-shadow-md"
                src="/images/products/UP5000.png"
                alt="5kWh 100Ah 48V Lithium Battery"
              />
            </div>
            {/* Card 4 (Lower Right - Price & Quick Buy) */}
            <div className="rounded-[16px] bg-surface-container-lowest p-6 bento-card border border-secondary/30 flex flex-col justify-center items-center text-center h-[288px]">
              <span className="bg-secondary/10 text-secondary font-technical-data text-[12px] px-3 py-1 rounded-full mb-2 flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>{" "}
                IN STOCK (LUSAKA)
              </span>
              <div className="font-display-hero text-headline-md text-primary font-bold mb-1">
                ZMW 65,806
              </div>
              <div className="text-[11px] text-charcoal font-medium mb-4 space-y-0.5">
                <div>Excl. Protection Accessories</div>
                <div>Excl. Installation</div>
              </div>
              <Link
                className="bg-primary hover:bg-primary-hover text-white font-label-cta text-label-cta px-6 py-3 rounded-full hover:scale-95 duration-100 transition-all w-full shadow-md block text-center font-bold"
                href="/products/5kw-standard-home-comfort-kit"
              >
                VIEW SYSTEM DETAILS &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Hardware Showcase from Catalog */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-margin-desktop">
          <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8">
            <div>
              <span className="font-technical-data text-xs text-secondary uppercase tracking-wider font-semibold">
                In-Stock Lusaka Warehouse
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-charcoal mt-1">
                Best-Selling Hardware
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-label-cta text-charcoal hover:text-primary flex items-center gap-1 text-sm mt-3 sm:mt-0 font-medium transition-colors"
            >
              View Full Catalog ({PRODUCTS.length} items) &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "605w-ja-solar-bifacial-panels",
              "greenrich-up5000-lithium-battery",
              "growatt-spf5000-inverter",
              "kapa-energie-q2400-portable-power-station",
              "545w-haitai-solar-panels",
              "greenrich-hybrid-inverter-8kw",
              "ssre-eu10k-10kwh-battery",
              "db-combiner-box-5kw",
            ]
              .map((slug) => PRODUCTS.find((p) => p.slug === slug))
              .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p))
              .map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group bento-card bg-surface-container-lowest rounded-2xl border border-border-light p-5 flex flex-col justify-between hover:shadow-hover-card transition-all"
                >
                  <div>
                    <div className="relative w-full h-44 rounded-xl bg-surface-container-low mb-4 overflow-hidden flex items-center justify-center p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-surface-container-lowest/90 backdrop-blur-sm text-charcoal font-technical-data text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-border-light shadow-xs">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-sm text-charcoal font-semibold group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="font-body-sm text-text-secondary text-xs mt-1.5 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-border-light flex items-center justify-between">
                    <div>
                      <span className="font-technical-data text-[10px] text-text-secondary uppercase block">
                        Price
                      </span>
                      <span className="font-headline-md text-base text-primary font-bold">
                        {product.price}
                      </span>
                    </div>
                    <span className="font-label-cta text-xs py-1.5 px-3 rounded-full bg-surface-container text-charcoal group-hover:bg-primary group-hover:text-white transition-colors font-medium">
                      View Specs
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Interactive Calculator Teaser */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-margin-desktop">
          <div className="bg-secondary/10 rounded-[16px] p-margin-desktop flex flex-col md:flex-row items-center justify-between gap-stack-lg border border-secondary/20">
            <div className="max-w-xl">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-charcoal mb-stack-md">
                Not sure what size system you need?
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">
                Use our 2-minute load calculator to select your appliances and
                find your perfect solar kit match.
              </p>
              <a
                className="inline-flex bg-primary hover:bg-primary-hover text-white font-label-cta text-label-cta px-8 py-4 rounded-full hover:scale-95 duration-100 transition-all shadow-md items-center gap-2 font-bold"
                href="/calculator"
              >
                LAUNCH CALCULATOR{" "}
                <span className="material-symbols-outlined text-[18px]">
                  calculate
                </span>
              </a>
            </div>
            <div className="w-full md:w-1/3 h-64 bg-surface-container-lowest rounded-xl border border-border-light shadow-sm p-6 flex flex-col justify-center relative overflow-hidden">
              {/* Abstract representation of a calculator/slider UI */}
              <div className="w-full bg-surface-container-high h-2 rounded-full mb-8 relative">
                <div className="absolute left-0 top-0 h-full w-2/3 bg-primary rounded-full"></div>
                <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-6 h-6 bg-surface-container-lowest border-2 border-primary rounded-full shadow-md"></div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="font-technical-data text-on-surface-variant text-[12px] uppercase">
                    Est. Load
                  </div>
                  <div className="font-display-hero text-headline-md text-primary font-bold">
                    3.4 kW
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-technical-data text-on-surface-variant text-[12px] uppercase">
                    Rec. Inverter
                  </div>
                  <div className="font-display-hero text-headline-md text-primary">
                    5.0 kW
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

