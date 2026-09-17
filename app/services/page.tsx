"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SERVICES, Service } from "@/data/services";
import { Wrench, Sun, ShieldCheck, Leaf, CheckCircle, ArrowRight, Phone, MessageSquare } from "lucide-react";

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
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-14 md:py-20 text-center">
          <span className="inline-block bg-primary-green bg-opacity-20 text-primary-green font-technical-data text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-primary-green/30">
            Certified Solar Engineering &amp; EPC Services
          </span>
          <h1 className="font-display-hero text-display-hero-mobile md:text-display-hero text-primary mb-stack-md">
            Turnkey Engineering &amp; Professional Installation
          </h1>
          <p className="font-body-lg text-body-lg text-neutral-600 max-w-3xl mx-auto mb-stack-lg">
            Standard-setting hybrid solar solutions engineered for residential homes, agricultural farms,
            and commercial enterprise across Zambia. Certified by ERB &amp; EIZ.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-technical-data text-text-secondary">
            <span className="flex items-center gap-1.5 bg-surface-container-low px-3.5 py-1.5 rounded-full border border-border-light">
              <CheckCircle className="w-4 h-4 text-brand-status-green" /> EIZ &amp; ERB Certified Engineers
            </span>
            <span className="flex items-center gap-1.5 bg-surface-container-low px-3.5 py-1.5 rounded-full border border-border-light">
              <CheckCircle className="w-4 h-4 text-brand-status-green" /> De-ionized Purified Water Cleaning
            </span>
            <span className="flex items-center gap-1.5 bg-surface-container-low px-3.5 py-1.5 rounded-full border border-border-light">
              <CheckCircle className="w-4 h-4 text-brand-status-green" /> Thermal Hot-Spot Drone Audits
            </span>
          </div>
        </section>

        {/* 4 Core Services Grid */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const isSelected = service.slug === selectedServiceSlug;
              return (
                <div
                  key={service.slug}
                  onClick={() => setSelectedServiceSlug(service.slug)}
                  className={`bento-card rounded-2xl p-6 cursor-pointer transition-all border text-left flex flex-col justify-between ${
                    isSelected
                      ? "border-primary-green bg-surface-container-lowest shadow-hover-card ring-2 ring-primary-green/20"
                      : "border-border-light bg-surface-container-lowest hover:border-neutral-300"
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-light-tint flex items-center justify-center mb-5 text-primary-green">
                      {service.icon}
                    </div>
                    {service.price && (
                      <span className="inline-block bg-accent-yellow/20 text-primary font-technical-data text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3">
                        {service.price}
                      </span>
                    )}
                    <h3 className="font-headline-md text-lg text-primary font-bold mb-2">
                      {service.title}
                    </h3>
                    <p className="font-body-sm text-text-secondary text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  <button
                    className={`font-label-cta text-xs py-2 px-3.5 rounded-lg flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-surface-container text-primary hover:bg-surface-container-high"
                    }`}
                  >
                    <span>{isSelected ? "Active Details" : "View Breakdown"}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Selected Service Detailed Deep Dive */}
        <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-20">
          <div className="bg-surface-container-lowest rounded-3xl border border-border-light p-8 md:p-12 shadow-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 pb-8 border-b border-border-light">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-brand-light-tint text-primary-green">
                    {selectedService.icon}
                  </div>
                  <div>
                    <h2 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">
                      {selectedService.title}
                    </h2>
                    {selectedService.price && (
                      <span className="text-primary-green font-technical-data text-sm font-semibold">
                        Starting at {selectedService.price}
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-body-lg text-neutral-600 text-base md:text-lg leading-relaxed mt-4">
                  {selectedService.details.introduction}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <a
                  href={whatsappGeneralLink(selectedService.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary-green hover:bg-[#007038] text-white font-label-cta text-sm px-6 py-3.5 rounded-full transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" /> Book Consultation
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-primary font-label-cta text-sm px-6 py-3.5 rounded-full transition-colors"
                >
                  <Phone className="w-4 h-4" /> Contact Engineers
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
              {/* Key Aspects */}
              <div>
                <h3 className="font-headline-md text-lg text-primary font-bold mb-5 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary-green" /> Key Engineering Standards
                </h3>
                <ul className="space-y-3.5">
                  {selectedService.details.keyAspects.map((aspect, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-neutral-700">
                      <span className="w-5 h-5 rounded-full bg-brand-light-tint text-primary-green flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </span>
                      <span>{aspect}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Expect / Process */}
              <div>
                <h3 className="font-headline-md text-lg text-primary font-bold mb-5 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary-green" /> {selectedService.details.whatToExpect.title}
                </h3>
                <div className="space-y-3">
                  {selectedService.details.whatToExpect.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-surface-container-low border border-border-light text-sm text-neutral-700 leading-relaxed"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Cleaning Calculator Section (K70 / Panel) */}
        <section
          className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-14 bg-brand-light-tint rounded-3xl border border-border-light relative overflow-hidden mb-16"
          id="cleaning-booking"
        >
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block bg-surface-container text-primary font-technical-data text-xs uppercase px-3 py-1 rounded-full mb-3">
              Official Rate: K70 per Panel
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-3">
              Solar Panel Cleaning Instant Estimator
            </h2>
            <p className="font-body-lg text-body-lg text-text-secondary">
              Restore up to 30% lost energy output from dust, soot, and bird droppings with our
              de-ionized spot-free water wash.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-surface-container-lowest rounded-2xl border border-border-light p-8 shadow-sm">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="panel-slider" className="font-headline-md text-sm text-primary font-semibold">
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
                className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-brand-primary-green"
              />
              <div className="flex justify-between text-[11px] font-technical-data text-text-secondary mt-1">
                <span>4 Panels (Min)</span>
                <span>20 Panels</span>
                <span>50 Panels</span>
                <span>100+ Panels</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-container-low border border-border-light mb-6">
              <div>
                <span className="font-technical-data text-xs text-text-secondary uppercase block">
                  Service Unit Price
                </span>
                <span className="font-headline-md text-base text-primary font-semibold">
                  ZMW 70 / panel
                </span>
              </div>
              <div className="sm:text-right">
                <span className="font-technical-data text-xs text-text-secondary uppercase block">
                  Estimated Total
                </span>
                <span className="font-display-hero text-2xl text-primary-green font-bold">
                  ZMW {cleaningCost.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-6 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-status-green flex-shrink-0" />
                <span>Includes 100% de-ionized water &amp; anti-scratch solar bristle scrub</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-status-green flex-shrink-0" />
                <span>Full physical inspection of mounting brackets, cabling, and MC4 connectors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-status-green flex-shrink-0" />
                <span>Before &amp; After efficiency verification report</span>
              </div>
            </div>

            <a
              href={whatsappCleaningLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full font-label-cta text-sm py-4 px-6 rounded-full bg-accent-yellow text-primary hover:scale-[0.98] transition-transform font-bold text-center flex items-center justify-center gap-2 shadow-sm"
            >
              <i
                className="fa-brands fa-whatsapp text-lg"
                style={{ color: "rgb(37, 211, 102)" }}
              />
              BOOK CLEANING FOR ZMW {cleaningCost.toLocaleString()} VIA WHATSAPP &rarr;
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
