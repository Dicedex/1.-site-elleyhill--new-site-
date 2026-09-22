"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SERVICES, Service } from "@/data/services";
import {
  Wrench,
  Sun,
  ShieldCheck,
  Leaf,
  CheckCircle,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Zap,
  Clock,
  Award,
  MapPin,
  HelpCircle,
} from "lucide-react";

export default function ServicesPage() {
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>(SERVICES[0].slug);
  const [panelCount, setPanelCount] = useState<number>(12);

  const selectedService = SERVICES.find((s) => s.slug === selectedServiceSlug) || SERVICES[0];

  const cleaningCost = panelCount * 70;
  const whatsappCleaningLink = `https://wa.me/260971838038?text=${encodeURIComponent(
    `Hello Elleyhill Power, I would like to book a Solar Panel Cleaning service for ${panelCount} panels (Estimated: ZMW ${cleaningCost.toLocaleString()} @ K70/panel). Please confirm technician availability.`
  )}`;

  const whatsappGeneralLink = (serviceTitle: string) =>
    `https://wa.me/260971838038?text=${encodeURIComponent(
      `Hello Elleyhill Power, I am interested in inquiring about your "${serviceTitle}" engineering service. Could we schedule a consultation?`
    )}`;

  return (
    <div className="font-body-lg text-on-surface bg-surface-container-lowest antialiased min-h-screen flex flex-col">
      <main className="pt-[72px] pb-stack-lg flex-grow">
        {/* Hero Section */}
        <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface-container-lowest to-surface-container-lowest py-16 md:py-24 border-b border-border-light">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-technical-data text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border border-primary/20 font-bold">
              <Award className="w-3.5 h-3.5 text-secondary" /> Certified Solar Engineering &amp; EPC Services
            </span>
            <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-primary mb-stack-md max-w-4xl mx-auto">
              Turnkey Engineering, Field EPC &amp; Solar Maintenance
            </h1>
            <p className="font-body-lg text-body-lg text-neutral-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Standard-setting hybrid solar engineering for residential homes, commercial estates, and agricultural farms across Zambia. Certified by ERB &amp; EIZ.
            </p>

            {/* Quality Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-technical-data text-charcoal">
              <span className="flex items-center gap-1.5 bg-surface-container-lowest px-4 py-2 rounded-full border border-border-light shadow-xs font-medium">
                <CheckCircle className="w-4 h-4 text-brand-status-green" /> EIZ &amp; ERB Certified Engineers
              </span>
              <span className="flex items-center gap-1.5 bg-surface-container-lowest px-4 py-2 rounded-full border border-border-light shadow-xs font-medium">
                <CheckCircle className="w-4 h-4 text-brand-status-green" /> De-ionized Spot-Free Panel Wash
              </span>
              <span className="flex items-center gap-1.5 bg-surface-container-lowest px-4 py-2 rounded-full border border-border-light shadow-xs font-medium">
                <CheckCircle className="w-4 h-4 text-brand-status-green" /> Thermal Hot-Spot Diagnostics
              </span>
              <span className="flex items-center gap-1.5 bg-surface-container-lowest px-4 py-2 rounded-full border border-border-light shadow-xs font-medium">
                <CheckCircle className="w-4 h-4 text-brand-status-green" /> Nationwide Service Reach
              </span>
            </div>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-border-light/60">
              <div className="text-center p-3">
                <div className="font-display-hero text-2xl md:text-3xl text-primary font-bold">500+</div>
                <div className="text-xs text-text-secondary mt-0.5">Turnkey Systems Installed</div>
              </div>
              <div className="text-center p-3">
                <div className="font-display-hero text-2xl md:text-3xl text-primary font-bold">10,000+</div>
                <div className="text-xs text-text-secondary mt-0.5">Panels Cleaned &amp; Serviced</div>
              </div>
              <div className="text-center p-3">
                <div className="font-display-hero text-2xl md:text-3xl text-primary font-bold">99.8%</div>
                <div className="text-xs text-text-secondary mt-0.5">System Uptime Reliability</div>
              </div>
              <div className="text-center p-3">
                <div className="font-display-hero text-2xl md:text-3xl text-primary font-bold">24-48h</div>
                <div className="text-xs text-text-secondary mt-0.5">Rapid Field Support Dispatch</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Services Grid */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="font-technical-data text-xs text-secondary uppercase tracking-wider font-semibold">
                OUR CORE DISCIPLINES
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mt-1">
                Specialized Engineering Solutions
              </h2>
            </div>
            <p className="font-body-sm text-text-secondary text-sm max-w-md mt-2 md:mt-0">
              Select any service below to view detailed engineering standards, step-by-step process workflows, and direct booking options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const isSelected = service.slug === selectedServiceSlug;
              return (
                <div
                  key={service.slug}
                  onClick={() => setSelectedServiceSlug(service.slug)}
                  className={`group bento-card rounded-2xl overflow-hidden cursor-pointer transition-all border text-left flex flex-col justify-between ${
                    isSelected
                      ? "border-primary bg-surface-container-lowest shadow-hover-card ring-2 ring-primary/20"
                      : "border-border-light bg-surface-container-lowest hover:border-neutral-300 hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Service Image Header */}
                    <div className="relative w-full h-44 overflow-hidden bg-surface-container-low">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      
                      {service.price ? (
                        <span className="absolute top-3 right-3 bg-secondary text-white font-technical-data text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {service.price}
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 bg-primary/90 text-white font-technical-data text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                          EPC Certified
                        </span>
                      )}

                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/90 backdrop-blur-xs flex items-center justify-center text-primary shadow-xs p-1.5 [&>svg]:w-4 [&>svg]:h-4">
                          {service.icon}
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-headline-md text-base text-primary font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="font-body-sm text-text-secondary text-xs leading-relaxed line-clamp-3 mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      className={`w-full font-label-cta text-xs py-2.5 px-3.5 rounded-xl flex items-center justify-between transition-colors font-medium ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-surface-container text-charcoal group-hover:bg-primary group-hover:text-white"
                      }`}
                    >
                      <span>{isSelected ? "Active Service" : "Explore Details"}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Selected Service Detailed Deep Dive */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-20">
          <div className="bg-surface-container-lowest rounded-3xl border border-border-light p-6 md:p-10 shadow-sm overflow-hidden">
            {/* Header with Visual Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-border-light">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary [&>svg]:w-6 [&>svg]:h-6">
                    {selectedService.icon}
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-secondary font-technical-data font-bold">
                      ENGINEERING BREAKDOWN
                    </span>
                    <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">
                      {selectedService.title}
                    </h2>
                  </div>
                </div>

                <p className="font-body-lg text-neutral-600 text-sm md:text-base leading-relaxed mt-3">
                  {selectedService.details.introduction}
                </p>

                {selectedService.price && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-3.5 py-1.5 rounded-full text-xs font-technical-data font-bold text-secondary">
                    <Sparkles className="w-3.5 h-3.5" /> Starting Price: {selectedService.price}
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href={whatsappGeneralLink(selectedService.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-label-cta text-xs px-6 py-3 rounded-full transition-all shadow-md font-bold"
                  >
                    <MessageSquare className="w-4 h-4 text-brand-status-green" /> Book Via WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-cta text-xs px-6 py-3 rounded-full transition-colors font-medium border border-border-light"
                  >
                    <Phone className="w-4 h-4" /> Request Site Visit
                  </Link>
                </div>
              </div>

              {/* Visual Showcase Card */}
              <div className="lg:col-span-5">
                <div className="relative w-full h-64 md:h-72 rounded-2xl overflow-hidden shadow-md border border-border-light">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-technical-data uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                      Elleyhill Power Field EPC
                    </span>
                    <p className="text-xs text-neutral-200 mt-1">
                      Conducted by registered Zambian technicians using calibrated diagnostic tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Standards & Process Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
              {/* Key Aspects */}
              <div>
                <h3 className="font-headline-md text-base md:text-lg text-primary font-bold mb-5 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-secondary" /> Engineering Specifications &amp; Standards
                </h3>
                <ul className="space-y-3">
                  {selectedService.details.keyAspects.map((aspect, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-neutral-700 bg-surface-container-lowest p-3 rounded-xl border border-border-light/70 shadow-2xs">
                      <span className="w-5 h-5 rounded-full bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </span>
                      <span>{aspect}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Expect / Process */}
              <div>
                <h3 className="font-headline-md text-base md:text-lg text-primary font-bold mb-5 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-secondary" /> {selectedService.details.whatToExpect.title}
                </h3>
                <div className="space-y-3">
                  {selectedService.details.whatToExpect.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-surface-container-low border border-border-light text-xs md:text-sm text-neutral-700 leading-relaxed flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px] font-bold">
                        {idx + 1}
                      </span>
                      <span>{step.replace(/^\d+\.\s*/, "")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Cleaning Calculator Section (K70 / Panel) */}
        <section
          className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 mb-20"
          id="cleaning-booking"
        >
          <div className="bg-gradient-to-br from-surface-container-lowest to-surface-container-low rounded-3xl border border-border-light p-8 md:p-12 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Context & Image */}
              <div className="lg:col-span-6">
                <span className="inline-block bg-secondary/15 text-secondary font-technical-data text-xs uppercase px-3 py-1 rounded-full mb-3 font-bold border border-secondary/30">
                  OFFICIAL RATE: K70 PER PANEL
                </span>
                <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
                  Solar Panel Cleaning Calculator
                </h2>
                <p className="font-body-lg text-neutral-600 text-sm md:text-base leading-relaxed mb-6">
                  Dust, soot, and bird droppings reduce energy generation by up to 30%. Our team utilizes 100% de-ionized spot-free water filtration with non-abrasive solar brushes to restore full kWh output.
                </p>

                <div className="relative rounded-2xl overflow-hidden h-52 md:h-60 border border-border-light shadow-sm mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/services/cleaning.jpg"
                    alt="Professional Solar Panel Cleaning in Zambia"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <div className="font-headline-md text-sm font-bold">De-ionized Pure Water Wash</div>
                    <div className="text-[11px] text-neutral-300">Preserves anti-reflective glass coating &amp; warranty</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Calculator Widget */}
              <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl border border-border-light p-6 md:p-8 shadow-md">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="panel-slider" className="font-headline-md text-sm text-primary font-bold">
                      Number of Solar Panels
                    </label>
                    <span className="font-display-hero text-2xl text-primary font-bold">
                      {panelCount} Panels
                    </span>
                  </div>
                  <input
                    id="panel-slider"
                    type="range"
                    min="4"
                    max="100"
                    step="2"
                    value={panelCount}
                    onChange={(e) => setPanelCount(parseInt(e.target.value) || 4)}
                    className="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[11px] font-technical-data text-text-secondary mt-1.5 font-medium">
                    <span>4 (Min)</span>
                    <span>20 Panels</span>
                    <span>50 Panels</span>
                    <span>100+ Panels</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-surface-container-low border border-border-light mb-6">
                  <div>
                    <span className="font-technical-data text-[11px] text-text-secondary uppercase block font-medium">
                      Rate per Panel
                    </span>
                    <span className="font-headline-md text-base text-primary font-bold">
                      ZMW 70
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-technical-data text-[11px] text-text-secondary uppercase block font-medium">
                      Estimated Cost
                    </span>
                    <span className="font-display-hero text-2xl text-primary font-bold">
                      ZMW {cleaningCost.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-6 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-status-green flex-shrink-0" />
                    <span>Includes 100% de-ionized water &amp; anti-scratch solar bristle scrub</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-status-green flex-shrink-0" />
                    <span>Visual inspection of mounting brackets, cabling, and MC4 connectors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-status-green flex-shrink-0" />
                    <span>Before &amp; After efficiency report</span>
                  </div>
                </div>

                <a
                  href={whatsappCleaningLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full font-label-cta text-xs py-3.5 px-6 rounded-full bg-primary hover:bg-primary-hover text-white transition-all font-bold text-center flex items-center justify-center gap-2 shadow-md hover:scale-98"
                >
                  <MessageSquare className="w-4 h-4 text-brand-status-green" />
                  BOOK CLEANING (ZMW {cleaningCost.toLocaleString()}) VIA WHATSAPP &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Elleyhill Engineering Pillars */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-technical-data text-xs text-secondary uppercase tracking-wider font-semibold">
              ENGINEERING RIGOR
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mt-1">
              Why Homeowners &amp; Businesses Choose Our EPC Team
            </h2>
            <p className="font-body-sm text-text-secondary text-sm mt-2">
              We treat every solar installation as a critical utility-grade asset engineered to withstand Zambian grid fluctuations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bento-card bg-surface-container-lowest rounded-2xl border border-border-light p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-headline-md text-base text-primary font-bold mb-2">
                UPS-Grade Instant Switching
              </h3>
              <p className="font-body-sm text-text-secondary text-xs leading-relaxed">
                Seamless &lt;10ms automatic transfer switchover so your sensitive computers, hospital equipment, and home electronics never flicker during load shedding.
              </p>
            </div>

            <div className="bento-card bg-surface-container-lowest rounded-2xl border border-border-light p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-headline-md text-base text-primary font-bold mb-2">
                Complete DC &amp; AC Protection
              </h3>
              <p className="font-body-sm text-text-secondary text-xs leading-relaxed">
                Type-II surge arrestors, IP65 combiner boxes, dedicated earth spikes, and DC disconnect breakers installed on every single commissioned project.
              </p>
            </div>

            <div className="bento-card bg-surface-container-lowest rounded-2xl border border-border-light p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-headline-md text-base text-primary font-bold mb-2">
                Rapid SLA Maintenance
              </h3>
              <p className="font-body-sm text-text-secondary text-xs leading-relaxed">
                Dedicated Zambian technical support fleet with local spare inventory in Lusaka for fast warranty turnaround and routine preventative check-ups.
              </p>
            </div>
          </div>
        </section>

        {/* Service Coverage Areas */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
          <div className="bg-surface-container-low rounded-3xl p-8 md:p-10 border border-border-light flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-technical-data text-xs uppercase font-bold mb-1">
                <MapPin className="w-4 h-4" /> Nationwide Field Execution
              </div>
              <h3 className="font-headline-md text-xl md:text-2xl text-primary font-bold">
                Deploying Across Lusaka, Copperbelt &amp; Regional Zambia
              </h3>
              <p className="font-body-sm text-neutral-600 text-xs md:text-sm mt-1 max-w-xl">
                Our mobile field engineering crews travel across Lusaka Province, Copperbelt (Ndola, Kitwe), Southern Province (Choma, Livingstone), Central Province (Mkushi Farming Block), and North-Western.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-label-cta text-xs px-6 py-3.5 rounded-full transition-all shrink-0 shadow-md font-bold"
            >
              SCHEDULE A SITE VISIT &rarr;
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
