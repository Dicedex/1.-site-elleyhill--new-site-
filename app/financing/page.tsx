import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financing & Payment Options | ELLEYHILL POWER ZM",
  description:
    "Flexible, secure, and structured payment models designed to make modern industrial sustainability accessible for every home and business in Zambia.",
};

export default function FinancingPage() {
  return (
    <div className="bg-surface text-on-surface font-body-lg min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow pt-[80px] md:pt-[100px] pb-margin-desktop px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="text-center mb-stack-lg">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-4">
            Financing &amp; Payment Options
          </h1>
          <p className="font-body-lg text-body-lg text-neutral-grey-dark max-w-2xl mx-auto">
            Flexible, secure, and structured payment models designed to make
            modern industrial sustainability accessible for every home and
            business in Zambia.
          </p>
        </div>

        {/* Bento Grid Layout for Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-stack-lg">
          {/* Direct Payment */}
          <div className="bento-card bg-surface-container-lowest border border-border-light rounded-[12px] p-8 flex flex-col items-start h-full">
            <div className="bg-light-tint-grey p-4 rounded-full mb-6">
              <span
                className="material-symbols-outlined text-primary-green"
                data-icon="payments"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                payments
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-3">
              Direct Payment
            </h3>
            <p className="font-body-lg text-body-lg text-neutral-grey-dark mb-6 flex-grow">
              Immediate transaction completion via trusted networks. Secure, fast, and straightforward.
            </p>
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 border-b border-border-light pb-2">
                <span
                  className="material-symbols-outlined text-status-success"
                  data-icon="check_circle"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  MTN MoMo, Airtel Money &amp; Zamtel Kwacha
                </span>
              </div>
              <div className="flex items-center gap-3 border-b border-border-light pb-2">
                <span
                  className="material-symbols-outlined text-status-success"
                  data-icon="check_circle"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  Visa / Mastercard (3D-Secure)
                </span>
              </div>
              <div className="flex items-center gap-3 pb-2">
                <span
                  className="material-symbols-outlined text-status-success"
                  data-icon="check_circle"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  EFT Bank Transfer / Wire Proforma
                </span>
              </div>
            </div>
          </div>

          {/* 70/30 Project Plan */}
          <div className="bento-card bg-surface-container-lowest border border-primary-green rounded-[12px] p-8 flex flex-col items-start h-full lg:col-span-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary-green text-surface-container-lowest font-technical-data text-technical-data px-4 py-1 rounded-bl-lg">
              RECOMMENDED FOR INSTALLS
            </div>
            <div className="bg-light-tint-grey p-4 rounded-full mb-6 mt-4">
              <span
                className="material-symbols-outlined text-primary-green"
                data-icon="engineering"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                engineering
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-3">
              70 / 30 Staged Project Plan
            </h3>
            <p className="font-body-lg text-body-lg text-neutral-grey-dark mb-6 max-w-2xl">
              Ideal for full turnkey engineering installations. Secure your
              hardware and installation schedule with a deposit, and pay the
              balance only when you are 100% satisfied with the power flow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="bg-light-tint-grey rounded-lg p-6 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-cta text-label-cta text-primary">
                    Stage 1: Deposit
                  </span>
                  <span className="font-display-hero-mobile text-display-hero-mobile text-primary-green">
                    70%
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-neutral-grey-dark">
                  Due upon ordering. Secures hardware allocation and schedules
                  installation team.
                </p>
              </div>
              <div className="bg-light-tint-grey rounded-lg p-6 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-cta text-label-cta text-primary">
                    Stage 2: Balance
                  </span>
                  <span className="font-display-hero-mobile text-display-hero-mobile text-primary">
                    30%
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-neutral-grey-dark">
                  Due after final testing, site commissioning, and client
                  sign-off.
                </p>
              </div>
            </div>
          </div>

          {/* Lay-By Reserve Plan */}
          <div className="bento-card bg-surface-container-lowest border border-border-light rounded-[12px] p-8 flex flex-col items-start h-full lg:col-span-3">
            <div className="flex flex-col md:flex-row gap-8 items-start w-full">
              <div className="flex-shrink-0">
                <div className="bg-light-tint-grey p-4 rounded-full mb-6 inline-block">
                  <span
                    className="material-symbols-outlined text-primary-green"
                    data-icon="event_available"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    event_available
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-3">
                  Lay-By Reserve Plan
                </h3>
                <p className="font-body-lg text-body-lg text-neutral-grey-dark mb-6 max-w-md">
                  Lock in current prices and secure local warehouse stock while
                  paying over a flexible 3 to 6 month period. Hardware is
                  released upon final payment.
                </p>
              </div>
              <div className="flex-grow w-full border border-border-light rounded-lg p-6 bg-surface-bright">
                <h4 className="font-label-cta text-label-cta text-primary mb-4">
                  How it works:
                </h4>
                <ol className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-green text-surface-container-lowest flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <span className="font-label-cta text-label-cta text-primary block">
                        Select &amp; Reserve
                      </span>
                      <span className="font-body-sm text-body-sm text-neutral-grey-dark">
                        Choose your kit and pay initial deposit to reserve stock
                        in our local warehouse.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-green text-surface-container-lowest flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <span className="font-label-cta text-label-cta text-primary block">
                        Flexible Installments
                      </span>
                      <span className="font-body-sm text-body-sm text-neutral-grey-dark">
                        Pay the remaining balance over 3 to 6 months with zero
                        interest.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-green text-surface-container-lowest flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <span className="font-label-cta text-label-cta text-primary block">
                        Delivery / Installation
                      </span>
                      <span className="font-body-sm text-body-sm text-neutral-grey-dark">
                        Receive your hardware or schedule installation upon
                        completion of payment.
                      </span>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Secure Banner */}
        <div className="bg-light-tint-grey rounded-[12px] p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <span
            className="material-symbols-outlined text-primary text-4xl"
            data-icon="lock"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
          <div>
            <h4 className="font-label-cta text-label-cta text-primary">
              Secured Multi-Carrier Transactions Guaranteed
            </h4>
            <p className="font-body-sm text-body-sm text-neutral-grey-dark">
              All mobile money and digital card payments are routed through a secured multi-carrier switch with Bank of Zambia compliance and bank-grade 256-bit encryption.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

