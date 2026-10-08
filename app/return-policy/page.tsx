import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Return Policy - Elleyhill Power Zambia",
  description:
    "Review our 7-day inspection window, hardware return criteria, RMA authorization process, and warranty replacement terms at Elleyhill Power Zambia.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="bg-surface text-on-surface font-body-lg min-h-screen flex flex-col antialiased">
      <main className="pt-[80px] md:pt-[100px] pb-16 px-4 md:px-margin-desktop max-w-container-max mx-auto flex-grow w-full">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-technical-data text-secondary uppercase tracking-wider mb-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Legal &amp; Support</span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-4">
            Return &amp; Refund Policy
          </h1>
          <p className="font-body-lg text-on-surface-variant">
            Last updated: September 2026. We are committed to supplying high-performance Tier-1 solar hardware. Here is everything you need to know about returns, swaps, and refunds.
          </p>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">inventory_2</span>
                1. 7-Day Unopened Equipment Returns
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed mb-4">
                Customers may return uninstalled, unopened solar equipment (such as solar modules, unopened battery units, or boxed inverters) within <strong>7 calendar days</strong> of delivery or showroom collection for a refund or store credit, subject to:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2 text-body-sm text-on-surface-variant leading-relaxed">
                <li>Hardware must remain in its original, undamaged manufacturer packaging with all factory seals intact.</li>
                <li>All documentation, mounting accessories, MC4 connectors, and safety seals must be included.</li>
                <li>Proof of purchase (invoice or digital order number) must accompany the return.</li>
                <li>A standard 10% restocking and technical bench-testing fee may apply to cover inspection procedures.</li>
              </ul>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">published_with_changes</span>
                2. Defective Hardware &amp; Rapid Warranty Swaps
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed mb-4">
                If equipment is found to be defective upon arrival or during authorized commissioning:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2 text-body-sm text-on-surface-variant leading-relaxed mb-4">
                <li>Our technical engineering team conducts prompt bench diagnostics at our East Park Mall Showroom or Kitwe Branch.</li>
                <li>Confirmed factory defects are eligible for immediate replacement or repair under manufacturer warranty.</li>
                <li>We stock replacement inverters and battery modules locally in Lusaka to minimize downtime.</li>
              </ul>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Learn more on our <Link href="/warranty" className="text-secondary font-medium underline">Warranty Page</Link>.
              </p>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">block</span>
                3. Non-Returnable Items &amp; Exclusions
              </h2>
              <ul className="list-disc pl-5 flex flex-col gap-2 text-body-sm text-on-surface-variant leading-relaxed">
                <li>Cut-to-order solar DC cables, custom trunking, or pre-commissioned electrical switchgear.</li>
                <li>Equipment that has been installed, energized, or modified by non-certified third-party contractors.</li>
                <li>Damage resulting from lightning strikes, electrical grid surges without certified SPD protection, or physical drops.</li>
                <li>Completed engineering design audits and on-site labor services once rendered.</li>
              </ul>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">assignment_return</span>
                4. Return Process &amp; RMA Authorization
              </h2>
              <div className="flex flex-col gap-3 text-body-sm text-on-surface-variant leading-relaxed">
                <p>To initiate a return or swap request:</p>
                <ol className="list-decimal pl-5 flex flex-col gap-2">
                  <li>Contact our technical support via WhatsApp at <strong>+260 97 183 8038</strong> or email <strong>support@elleyhillzm.com</strong> with your order reference.</li>

                  <li>Our service desk issues a Return Merchandise Authorization (RMA) tracking reference.</li>
                  <li>Bring the items to <strong>Unit 4A block A East Park Mall, Lusaka</strong> or our Copperbelt branch for bench validation.</li>
                  <li>Approved refunds are processed via the original payment method (Bank Transfer or Mobile Money) within 5 business days.</li>
                </ol>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6">
              <h3 className="font-headline-md text-primary mb-3">Need to Request a Return?</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Message our RMA dispatch desk for immediate support or bring your equipment to East Park Mall.
              </p>
              <div className="flex flex-col gap-3 font-technical-data text-xs">
                <div className="p-3 bg-surface-bright rounded-lg border border-border-light">
                  <span className="font-semibold text-primary block">Lusaka Showroom &amp; RMA</span>
                  <span className="text-on-surface-variant">Unit 4A block A East Park Mall, Lusaka</span>
                  <span className="text-primary block mt-1">Mon - Fri: 08:00 - 17:00 | Sat: 09:00 - 14:00</span>
                </div>
                <a
                  href="https://wa.me/260971838038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-status-success text-white rounded-lg font-label-cta hover:opacity-95 transition-opacity"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  WhatsApp RMA Desk
                </a>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6">
              <h3 className="font-headline-md text-primary mb-3">Related Documents</h3>
              <div className="flex flex-col gap-2 font-body-sm">
                <Link href="/terms" className="text-primary hover:text-secondary underline decoration-secondary transition-colors">
                  &rarr; Terms &amp; Conditions
                </Link>
                <Link href="/privacy" className="text-primary hover:text-secondary underline decoration-secondary transition-colors">
                  &rarr; Privacy Policy
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
