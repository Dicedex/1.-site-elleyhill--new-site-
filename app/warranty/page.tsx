import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Warranty & Return Policy - Elleyhill Power ZM",
  description:
    "Our local Lusaka and Copperbelt teams ensure fast support and reliable warranties to keep your energy flowing. Lithium batteries, hybrid inverters, and solar panels warranty terms.",
};

export default function WarrantyPage() {
  return (
    <div className="bg-surface text-on-surface font-body-lg min-h-screen flex flex-col antialiased">
      {/* Main Content */}
      <main className="pt-[80px] md:pt-[100px] pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex-grow w-full">
        <div className="text-center mb-stack-lg">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-stack-sm">
            Return, Swap &amp; Warranty Policy
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            We stand behind our products. Our local Lusaka and Copperbelt teams
            ensure fast support and reliable warranties to keep your energy
            flowing.
          </p>
        </div>

        {/* Visual Claim Process Map */}
        <section className="mb-stack-lg">
          <h2 className="font-headline-md text-primary mb-stack-md">
            How a Warranty Claim or Return Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-gutter hover-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-green bg-opacity-20 flex items-center justify-center mb-stack-sm text-primary-green">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "32px" }}
                >
                  edit_document
                </span>
              </div>
              <div className="font-label-cta text-primary mb-2">STEP 1</div>
              <h3 className="font-headline-md text-primary mb-2">
                Submit Claim Form
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                Fill out online form or message our WhatsApp support team.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-gutter hover-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-green bg-opacity-20 flex items-center justify-center mb-stack-sm text-primary-green">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "32px" }}
                >
                  engineering
                </span>
              </div>
              <div className="font-label-cta text-primary mb-2">STEP 2</div>
              <h3 className="font-headline-md text-primary mb-2">
                Technical Assessment
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                Engineers inspect unit on-site or in our local workshop.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-gutter hover-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-green bg-opacity-20 flex items-center justify-center mb-stack-sm text-primary-green">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "32px" }}
                >
                  autorenew
                </span>
              </div>
              <div className="font-label-cta text-primary mb-2">STEP 3</div>
              <h3 className="font-headline-md text-primary mb-2">
                Fast Local Swap or Repair
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                If verified, item is repaired or swapped directly from local
                warehouse stock.
              </p>
            </div>
          </div>
        </section>

        {/* Warranty Coverage Table */}
        <section className="mb-stack-lg">
          <h2 className="font-headline-md text-primary mb-stack-md">
            Warranty Coverage
          </h2>
          <div className="bg-surface-container-lowest border border-border-light rounded-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-container-low border-b border-border-light font-label-cta text-primary">
                  <th className="p-stack-md font-bold">Component</th>
                  <th className="p-stack-md font-bold">Coverage Period</th>
                  <th className="p-stack-md font-bold">Key Terms</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-on-surface-variant">
                <tr className="border-b border-border-light">
                  <td className="p-stack-md font-medium text-primary">
                    Lithium Batteries (Greenrich)
                  </td>
                  <td className="p-stack-md">
                    <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-xs font-bold mr-2">
                      10-Year Warranty
                    </span>
                  </td>
                  <td className="p-stack-md">
                    6,000+ Cycles. Must be installed by certified professional.
                  </td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="p-stack-md font-medium text-primary">
                    Hybrid Inverters
                  </td>
                  <td className="p-stack-md">
                    <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-xs font-bold mr-2">
                      5-Year Warranty
                    </span>
                  </td>
                  <td className="p-stack-md">
                    Comprehensive Electrical Warranty. Subject to proper
                    grounding.
                  </td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="p-stack-md font-medium text-primary">
                    Solar Panels
                  </td>
                  <td className="p-stack-md">
                    <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-xs font-bold mr-2 block mb-1">
                      12-Year Workmanship
                    </span>
                    <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-xs font-bold block">
                      25-Year Linear Yield
                    </span>
                  </td>
                  <td className="p-stack-md">Guarantee on performance output.</td>
                </tr>
                <tr>
                  <td className="p-stack-md font-medium text-primary">
                    14-Day Change-of-Mind
                  </td>
                  <td className="p-stack-md">14 Days</td>
                  <td className="p-stack-md">
                    Unopened, sealed boxes eligible for 100% refund.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-stack-lg bg-surface-container-low rounded-xl p-gutter border border-border-light">
          <h2 className="font-headline-md text-primary mb-stack-sm">
            Need to initiate a claim?
          </h2>
          <p className="font-body-sm text-on-surface-variant mb-stack-md">
            Our local support team is ready to assist you quickly.
          </p>
          <div className="flex justify-center gap-stack-md flex-wrap">
            <button className="bg-accent-yellow text-primary font-label-cta py-3 px-6 rounded-full hover:scale-95 duration-100">
              SUBMIT CLAIM FORM
            </button>
            <a
              href={`https://wa.me/260971838038?text=${encodeURIComponent(
                "Hello Elleyhill Power, I would like to inquire about warranty registration and hardware protection."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border border-primary-green text-primary font-label-cta py-3 px-6 rounded-full hover:scale-95 duration-100 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-status-success">
                forum
              </span>
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

