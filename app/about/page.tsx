import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us | Leading Solar Energy & Storage Company Zambia",
  description:
    "Elleyhill Power Zambia is Zambia's trusted leader in Tier-1 hybrid solar systems, LiFePO4 lithium batteries, and accredited solar engineering. Headquartered in Lusaka with nationwide delivery and certified EPC installations.",
  keywords: [
    "About Elleyhill Power",
    "Solar Energy Company Zambia",
    "Solar Providers Lusaka",
    "Tier-1 Solar Engineering Zambia",
    "Solar Contractors Lusaka",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About Elleyhill Power Zambia | Tier-1 Solar Engineering",
    description:
      "Powering Zambia's energy resilience with certified engineering, reliable lithium storage, and high-performance solar installations.",
    url: `${SITE_URL}/about`,
    images: [{ url: `${SITE_URL}/images/logo.png`, alt: "About Elleyhill Power Zambia" }],
  },
};



export default function AboutUsPage() {
  return (
    <div className="bg-surface text-on-surface font-body-lg antialiased pt-[72px] min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[614px] min-h-[400px] flex items-center justify-center bg-inverse-surface overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div
              className="bg-cover bg-center w-full h-full opacity-40"
              data-alt="A wide, sweeping cinematic shot of Elleyhill Power's modern engineering headquarters and warehouse in Lusaka, Zambia. The building features clean architectural lines, large glass windows reflecting a bright blue sky, and a vast array of sleek black solar panels neatly arranged on the roof. In the foreground, a diverse team of professional engineers in pristine uniforms and hard hats stand confidently. The lighting is natural, bright, and high-contrast, evoking a sense of corporate trustworthiness, technological advancement, and sustainable energy."
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBv2sJ8lxrA70uT4frCnnB1t-0-LB0bzNfJ3JyTRakL4hK9k6e9OLo2wYFhEEpZaPRk-7GQh7_2HAzLL0FCzEFLJ9ylqZtPwEv3qoIHGLSsTC4a-iNLQMT09tj5T4Bc1TJ-KPYxJ1ZZlWTQLkBIMaXf3L7bj6nZP82juMheNtWRaUeUD92Q1qRxOzRbbyZwdMIBJ8eO5-zVmNeMq44Mz49q4x3TBqDpIe1818SD_cj8VFUfOUh65UBN')",
              }}
            ></div>
          </div>
          <div className="relative z-10 max-w-container-max mx-auto px-margin-desktop text-center">
            <h1 className="font-display-hero text-display-hero text-on-primary mb-stack-md drop-shadow-lg">
              Powering Zambia&apos;s Energy Resilience
            </h1>
            <p className="font-body-lg text-body-lg text-inverse-on-surface max-w-2xl mx-auto drop-shadow">
              Engineered solutions. Reliable storage. Trusted across residential,
              commercial, and agricultural sectors.
            </p>
          </div>
        </section>

        {/* Bento Grid of Trust */}
        <section className="py-stack-lg px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">
              The Trust Architecture
            </h2>
            <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto">
              Built on a foundation of accredited engineering, robust local
              infrastructure, and tier-1 global partnerships.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Card 1 */}
            <div className="bg-surface-bright border border-border-light rounded-xl p-stack-lg flex flex-col hover-lift">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center mb-stack-md text-secondary">
                <span className="material-symbols-outlined text-[28px]">
                  verified
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm">
                ERB &amp; EIZ CERTIFIED
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Accredited engineering &amp; electrical compliance. Our
                installations meet the highest national safety and performance
                standards.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-bright border border-border-light rounded-xl p-stack-lg flex flex-col hover-lift">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center mb-stack-md text-secondary">
                <span className="material-symbols-outlined text-[28px]">
                  precision_manufacturing
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm">
                TIER-1 DIRECT DISTRIBUTION
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Direct partnership with Greenrich &amp; Tier-1 global solar
                manufacturers, ensuring you receive authentic, top-grade
                equipment.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-bright border border-border-light rounded-xl p-stack-lg flex flex-col hover-lift">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center mb-stack-md text-secondary">
                <span className="material-symbols-outlined text-[28px]">
                  warehouse
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm">
                LOCAL WAREHOUSE &amp; STOCK
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                On-ground inventory in Lusaka &amp; Copperbelt. We maintain
                robust stock levels to prevent delays and keep your projects
                moving.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-bright border border-border-light rounded-xl p-stack-lg flex flex-col hover-lift">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center mb-stack-md text-secondary">
                <span className="material-symbols-outlined text-[28px]">
                  build
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm">
                IN-HOUSE REPAIR &amp; SWAP CENTER
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Local replacement stock ready in Lusaka &amp; Copperbelt. Our
                certified technicians handle repairs and warranty swaps without
                long import delays.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

