import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Elleyhill Power Zambia",
  description:
    "Learn how Elleyhill Power Zambia collects, protects, and handles your personal information, energy audit data, and order history.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="font-body-lg text-on-surface-variant">
            Last updated: September 2026. At Elleyhill Power Zambia, we prioritize the protection and confidentiality of your personal and energy load data.
          </p>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">database</span>
                1. Information We Collect
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed mb-4">
                When you use our solar sizing calculator, request an engineering audit, place an order, or contact us, we collect:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2 text-body-sm text-on-surface-variant leading-relaxed">
                <li><strong>Contact details:</strong> Name, phone number, email address, and physical delivery address or property coordinates in Zambia.</li>
                <li><strong>Energy &amp; Load profile:</strong> Daily consumption estimates, appliance usage patterns, and sizing requirements generated via our calculator.</li>
                <li><strong>Order &amp; Warranty history:</strong> Inverter serial numbers, battery model designations, and installation inspection records.</li>
              </ul>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">security</span>
                2. How We Use &amp; Protect Your Data
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed mb-4">
                We use collected information solely for legitimate operational purposes:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2 text-body-sm text-on-surface-variant leading-relaxed mb-4">
                <li>Designing customized solar photovoltaic and battery storage architectures.</li>
                <li>Fulfilling orders, scheduling site dispatch, and facilitating authorized engineer visits.</li>
                <li>Sending real-time delivery notifications and logistics updates via WhatsApp.</li>
                <li>Managing manufacturer warranty registrations and tracking serial numbers for rapid swap-outs.</li>
              </ul>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                We implement bank-grade encryption and secure access controls. We do not sell, rent, or trade your personal information to third parties.
              </p>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">forum</span>
                3. WhatsApp &amp; Electronic Communications
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                Customers opting into WhatsApp notifications receive order tracking, dispatch alerts, and technical support updates. You may opt out of automated notifications at any time by replying directly to our official support channel (+260 96 653 7340).
              </p>
            </section>

            <section className="bg-surface-container-lowest border border-border-light rounded-xl p-6 md:p-8">
              <h2 className="font-headline-md text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">manage_accounts</span>
                4. Your Rights &amp; Access Requests
              </h2>
              <p className="text-body-sm text-on-surface-variant leading-relaxed">
                You have the right to request access to the personal data we hold about you, request corrections, or request deletion of unrequired records, subject to statutory tax and warranty record-keeping obligations in Zambia.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6">
              <h3 className="font-headline-md text-primary mb-3">Privacy Inquiries</h3>
              <p className="text-body-sm text-on-surface-variant mb-4">
                Contact our data compliance officer for inquiries regarding your information.
              </p>
              <div className="flex flex-col gap-3 font-technical-data text-xs">
                <div className="p-3 bg-surface-bright rounded-lg border border-border-light">
                  <span className="font-semibold text-primary block">Compliance Office</span>
                  <span className="text-on-surface-variant">Unit 4A block A East Park Mall, Lusaka</span>
                  <span className="text-primary block mt-1">support@elleyhillzm.com</span>
                </div>

                <a
                  href="https://wa.me/260971838038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-status-success text-white rounded-lg font-label-cta hover:opacity-95 transition-opacity"
                >
                  <span className="material-symbols-outlined text-base">chat</span>
                  WhatsApp Compliance
                </a>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6">
              <h3 className="font-headline-md text-primary mb-3">Related Documents</h3>
              <div className="flex flex-col gap-2 font-body-sm">
                <Link href="/terms" className="text-primary hover:text-secondary underline decoration-secondary transition-colors">
                  &rarr; Terms &amp; Conditions
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
