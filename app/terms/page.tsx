import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions - Elleyhill Power Zambia",
  description:
    "Review the terms and conditions governing hardware sales, installation contracts, and services provided by Elleyhill Power Zambia.",
};

export default function TermsPage() {
  return (
    <div className="bg-surface text-on-surface font-body-lg min-h-screen flex flex-col antialiased">
      <main className="pt-[80px] md:pt-[100px] pb-16 px-4 md:px-margin-desktop max-w-container-max mx-auto flex-grow w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-technical-data text-secondary uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Legal</span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="font-body-lg text-on-surface-variant">
            Last updated: September 2026. Please read these terms carefully before purchasing hardware, booking EPC installation, or utilizing services from Elleyhill Power Zambia.
          </p>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">gavel</span>
                1. General Overview &amp; Agreement
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed mb-4">
                These Terms and Conditions govern all purchases of solar photovoltaic modules, hybrid inverters, energy storage systems, and turnkey EPC installations supplied by Elleyhill Power Zambia (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;), registered in the Republic of Zambia.
              </p>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                By purchasing through our online portal, issuing a purchase order, or approving an engineering quotation, you agree to be bound by these provisions.
              </p>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">payments</span>
                2. Quotations, Pricing &amp; Currency
              </h2>
              <ul className="list-disc pl-5 flex flex-col gap-3 text-body-sm text-on-surface-variant leading-relaxed">
                <li>All prices are quoted in Zambian Kwacha (ZMW) unless explicitly stated otherwise in writing.</li>
                <li>Quotations remain valid for 14 calendar days from issuance due to exchange rate and commodity market fluctuations.</li>
                <li>Full payment or agreed financing drawdown documentation must be verified prior to hardware dispatch or site mobilization.</li>
              </ul>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">handyman</span>
                3. Engineering &amp; Installation Standards
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed mb-4">
                All electrical installations commissioned by our certified technicians comply with Zambian grid codes, ERB guidelines, and international IEC safety standards.
              </p>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Customers commissioning third-party electricians must ensure compliance with manufacturer wiring guidelines. Unauthorized modifications, incorrect DC cable sizing, or omission of required surge arrestors void system performance guarantees.
              </p>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                4. Warranties &amp; Claims
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed mb-4">
                Equipment warranties (including up to 30-year linear performance for JA Solar modules, 10-year battery design life, and 5-year inverter warranties) are honored through our East Park Mall Showroom and Copperbelt Swap Centers.
              </p>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                For detailed claim procedures and exclusions, please refer to our dedicated <Link href="/warranty" className="text-secondary font-medium underline">Warranty &amp; Return Policy</Link>.
              </p>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">account_balance</span>
                5. Governing Law &amp; Jurisdiction
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                These Terms shall be interpreted, construed, and enforced in accordance with the laws of the Republic of Zambia. Any dispute arising out of or in connection with these terms shall be submitted to the competent courts of Lusaka, Zambia.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6">
              <h3 className="font-headline-md text-primary mb-3">Questions about Terms?</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Our legal and customer support team is available at our East Park Mall Showroom or via direct WhatsApp.
              </p>
              <div className="flex flex-col gap-3 font-technical-data text-xs">
                <div className="p-3 bg-surface-bright rounded-lg border border-border-light">
                  <span className="font-semibold text-primary block">Lusaka Showroom</span>
                  <span className="text-on-surface-variant">Unit 4A block A East Park Mall, Lusaka</span>
                </div>
                <a
                  href="https://wa.me/260971838038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-status-success text-white rounded-lg font-label-cta hover:opacity-95 transition-opacity"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  WhatsApp Support
                </a>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6">
              <h3 className="font-headline-md text-primary mb-3">Related Documents</h3>
              <div className="flex flex-col gap-2 font-body-sm">
                <Link href="/privacy" className="text-primary hover:text-secondary underline decoration-secondary transition-colors">
                  &rarr; Privacy Policy
                </Link>
                <Link href="/return-policy" className="text-primary hover:text-secondary underline decoration-secondary transition-colors">
                  &rarr; Return Policy
                </Link>
                <Link href="/warranty" className="text-primary hover:text-secondary underline decoration-secondary transition-colors">
                  &rarr; Warranty &amp; Swap Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
