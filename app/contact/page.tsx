"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WHATSAPP_PHONE_NUMBER } from "@/data/config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-surface font-body-lg text-body-lg text-on-surface antialiased selection:bg-secondary selection:text-on-secondary min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="pt-[80px] md:pt-[100px] pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex-grow w-full">
        {/* Page Header */}
        <div className="mb-stack-lg md:mb-16 max-w-2xl">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-stack-sm">
            Contact &amp; Showroom Locator
          </h1>
          <p className="font-body-lg text-body-lg text-text-secondary">
            Visit our local hubs in Lusaka and the Copperbelt for in-person
            technical assessments, or reach out to our engineering team
            directly.
          </p>
        </div>

        {/* Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Column: Locations & Map */}
          <div className="lg:col-span-7 flex flex-col gap-stack-lg">
            {/* Bento Grid for Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              {/* Lusaka HQ Card */}
              <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6 group hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="w-12 h-12 bg-surface-bright rounded-lg flex items-center justify-center mb-4 border border-border-light group-hover:border-secondary transition-colors">
                  <span className="material-symbols-outlined text-secondary text-2xl">
                    storefront
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">
                  Lusaka Showroom (HQ)
                </h3>
                <p className="font-body-sm text-body-sm text-text-secondary mb-4 h-10">
                  Unit 4A block A East Park Mall, Lusaka
                </p>
                <div className="flex flex-col gap-3 font-technical-data text-technical-data text-primary">
                  <a
                    href="https://wa.me/260971838038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-secondary transition-colors"
                  >
                    <i
                      className="fa-brands fa-whatsapp text-lg"
                      style={{ color: "rgb(37, 211, 102)" }}
                    />
                    <span>+260 97 183 8038</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      schedule
                    </span>
                    <span>Mon - Fri: 08:00 - 17:00 | Sat: 09:00 - 14:00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-success text-lg">
                      check_circle
                    </span>
                    <span className="text-status-success">
                      Full Showroom &amp; Live Demos
                    </span>
                  </div>
                </div>
              </div>

              {/* Copperbelt Card */}
              <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6 group hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="w-12 h-12 bg-surface-bright rounded-lg flex items-center justify-center mb-4 border border-border-light group-hover:border-secondary transition-colors">
                  <span className="material-symbols-outlined text-secondary text-2xl">
                    warehouse
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-2">
                  Copperbelt Branch
                </h3>
                <p className="font-body-sm text-body-sm text-text-secondary mb-4 h-10">
                  Light Industrial, 456 Mining Ave, Kitwe, Zambia
                </p>
                <div className="flex flex-col gap-3 font-technical-data text-technical-data text-primary">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      call
                    </span>
                    <span>+260 96 987 6543</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">
                      schedule
                    </span>
                    <span>Mon-Fri: 08:30 - 16:30</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-status-success text-lg">
                      check_circle
                    </span>
                    <span className="text-status-success">
                      Swap Center Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Integrated Map Container */}
            <div
              className="w-full h-80 rounded-xl overflow-hidden border border-border-light relative group bg-surface-container-low"
              data-location="East Park Mall, Lusaka, Zambia"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                data-alt="A highly detailed top-down view of a modern industrial warehouse compound in Lusaka, Zambia, styled like a crisp minimalist satellite map. The image uses a high-key light mode aesthetic with subtle green and stark white tones. A sharp, geometric dark green location pin rests precisely over the main warehouse roof. Bright, clear daylight illuminates the structured layout."
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqksXn_v0id8Ye0zhvbjuLiip1SNuHfuvEcx90cLVNmCHs6t2nOMNt5Tqa1SgfpTcQ2DHdJKybp62dHWCli-llNpmzn5xViLkNsMkgm4ZFJZqGu-aCGeeRozkUKS7UFhjaV-gxDJqbslZAgiQgvmWuo4lpeK5yfuz1Oqiw4DrUTOuDM6_yVhTr4y3fezjQ9Yup89HwXHgzZFPmMCUHpi8_w1xHvM0k83s7lZfphovmfKJFUXieNzCc')",
                }}
              ></div>
              {/* Map Overlay Controls */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  aria-label="Zoom in"
                  className="bg-surface-container-lowest text-primary p-2 rounded shadow-md hover:bg-surface-bright border border-border-light transition-colors"
                >
                  <span className="material-symbols-outlined">zoom_in</span>
                </button>
                <button
                  aria-label="Zoom out"
                  className="bg-surface-container-lowest text-primary p-2 rounded shadow-md hover:bg-surface-bright border border-border-light transition-colors"
                >
                  <span className="material-symbols-outlined">zoom_out</span>
                </button>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-xl">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{
                    fontSize: "48px",
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  location_on
                </span>
              </div>
            </div>

            {/* Official Social Channels Card */}
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-secondary text-2xl">
                  share
                </span>
                <div>
                  <h3 className="font-headline-md text-headline-md text-primary">
                    Connect on Social Media
                  </h3>
                  <p className="font-body-sm text-body-sm text-text-secondary">
                    Follow Elleyhill Power Zambia for video walkthroughs, client installations, and company updates.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <a
                  href="https://facebook.com/elleyhillpowerzambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-bright hover:bg-surface-container-low border border-border-light hover:border-secondary hover:text-secondary transition-all group"
                >
                  <svg className="w-5 h-5 fill-current text-primary group-hover:text-secondary transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-xs font-semibold text-primary group-hover:text-secondary">Facebook</span>
                </a>

                <a
                  href="https://instagram.com/elleyhillpowerzambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-bright hover:bg-surface-container-low border border-border-light hover:border-secondary hover:text-secondary transition-all group"
                >
                  <svg className="w-5 h-5 fill-current text-primary group-hover:text-secondary transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span className="text-xs font-semibold text-primary group-hover:text-secondary">Instagram</span>
                </a>

                <a
                  href="https://linkedin.com/company/elleyhill-power-zambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-bright hover:bg-surface-container-low border border-border-light hover:border-secondary hover:text-secondary transition-all group"
                >
                  <svg className="w-5 h-5 fill-current text-primary group-hover:text-secondary transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-xs font-semibold text-primary group-hover:text-secondary">LinkedIn</span>
                </a>

                <a
                  href="https://tiktok.com/@elleyhillpowerzambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-bright hover:bg-surface-container-low border border-border-light hover:border-secondary hover:text-secondary transition-all group"
                >
                  <svg className="w-5 h-5 fill-current text-primary group-hover:text-secondary transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.38a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.45v-6.9a8.16 8.16 0 0 0 5.63 2.25v-3.47a4.85 4.85 0 0 1-2.92-1.34 4.87 4.87 0 0 1-1.08-4z" />
                  </svg>
                  <span className="text-xs font-semibold text-primary group-hover:text-secondary">TikTok</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Contact Form */}
          <div className="lg:col-span-5">
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-8 sticky top-24 shadow-sm hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300">
              <div className="mb-8">
                <h2 className="font-headline-md text-headline-md text-primary mb-2">
                  Direct Inquiry
                </h2>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  Fill out the form below and an Elleyhill engineer will contact
                  you within 24 hours.
                </p>
              </div>
              {submitted ? (
                <div className="p-6 bg-secondary-container/30 border border-secondary rounded-xl text-center space-y-4">
                  <span className="material-symbols-outlined text-status-success text-4xl">
                    check_circle
                  </span>
                  <h3 className="font-headline-md text-primary text-lg font-bold">
                    Inquiry Received
                  </h3>
                  <p className="font-body-sm text-text-secondary text-sm">
                    Thank you, {formData.name || "Customer"}. Our engineering
                    team will review your requirements and be in touch shortly.
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                      `Hello Elleyhill Power, I just submitted an inquiry on your website:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Service: ${formData.service || "General Solar Inquiry"}\n• Message: ${formData.message || "Requesting consultation"}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-status-success text-white rounded-full font-label-cta text-xs uppercase font-bold hover:opacity-95 transition-opacity shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>Fast-Track on WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
                  {/* Input Field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-technical-data text-technical-data text-text-secondary">
                      Full Name / Company
                    </label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-surface-container-lowest border border-border-light rounded-[12px] px-4 py-3 font-body-lg text-body-lg text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-outline-variant"
                      placeholder="E.g. John Doe"
                      type="text"
                    />
                  </div>
                  {/* Input Field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-technical-data text-technical-data text-text-secondary">
                      Phone Number
                    </label>
                    <input
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-surface-container-lowest border border-border-light rounded-[12px] px-4 py-3 font-body-lg text-body-lg text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-outline-variant"
                      placeholder="+260 9X XXX XXXX"
                      type="tel"
                    />
                  </div>
                  {/* Select Field */}
                  <div className="flex flex-col gap-2">
                    <label className="font-technical-data text-technical-data text-text-secondary">
                      Service Requested
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full bg-surface-container-lowest border border-border-light rounded-[12px] px-4 py-3 font-body-lg text-body-lg text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all appearance-none"
                      >
                        <option disabled value="">
                          Select an option...
                        </option>
                        <option>Solar Kit Purchase</option>
                        <option>Commercial Engineering Audit</option>
                        <option>Warranty Claim / Swap</option>
                        <option>General Support</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                  {/* Textarea */}
                  <div className="flex flex-col gap-2">
                    <label className="font-technical-data text-technical-data text-text-secondary">
                      Message Details
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-surface-container-lowest border border-border-light rounded-[12px] px-4 py-3 font-body-lg text-body-lg text-primary outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-outline-variant resize-none"
                      placeholder="Provide any relevant details about your load requirements or issue..."
                      rows={4}
                    ></textarea>
                  </div>
                  {/* Submit CTA */}
                  <button
                    className="mt-4 w-full bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full py-4 font-label-cta text-label-cta hover:bg-tertiary-fixed-dim hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex items-center justify-center gap-2"
                    type="submit"
                  >
                    SUBMIT INQUIRY
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

