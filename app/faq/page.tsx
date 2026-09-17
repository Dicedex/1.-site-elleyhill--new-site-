"use client";

import React, { useState } from "react";
import Link from "next/link";

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: React.ReactNode;
}

const faqData: FaqItem[] = [
  {
    id: "size-system",
    category: "sizing",
    question: "How do I calculate the right size system for my home?",
    answer: (
      <span>
        To find the perfect system size, you need to calculate your total
        essential load and desired backup time. We recommend using our{" "}
        <Link className="text-brand-green hover:underline" href="/calculator">
          Interactive Solar Calculator
        </Link>
        . Generally, a standard 5kW hybrid kit with a 5kWh lithium battery is
        sufficient to power essential appliances (LED lights, TV, fridge, Wi-Fi)
        during typical load shedding periods.
      </span>
    ),
  },
  {
    id: "borehole-pump",
    category: "sizing",
    question: "Can the 5kW kit handle a borehole pump?",
    answer:
      "Yes, our 5kW Greenrich Hybrid Inverter can handle a standard 1HP (approx. 0.75kW) borehole pump effortlessly, as it is designed to manage high inductive startup surges. However, we advise against running it simultaneously with other heavy loads like microwaves or large air conditioners to prevent overload.",
  },
  {
    id: "cloudy-days",
    category: "sizing",
    question: "What happens during consecutive cloudy days?",
    answer:
      "Our hybrid systems are designed to utilize grid power to charge the batteries when solar yield is low. If grid power is also unavailable (load shedding), the system relies purely on the stored battery capacity. For areas prone to extended bad weather or frequent off-grid scenarios, we recommend increasing your battery storage capacity.",
  },
  {
    id: "cycle-life",
    category: "warranties",
    question: "Are your batteries guaranteed for a specific number of cycles?",
    answer:
      "Absolutely. Our premium Greenrich Lithium-Ion batteries come with a 10-Year Local Warranty and are rated for over 6,000 cycles at optimal discharge rates, ensuring long-term reliability for your investment.",
  },
  {
    id: "layby-payments",
    category: "payments",
    question: "How does the Lay-By reserve plan work?",
    answer:
      "Our Lay-By reserve plan allows you to secure local warehouse stock and lock in current pricing with an initial deposit. You can pay the balance over 3 to 6 months with 0% interest, and hardware is delivered/installed upon final payment.",
  },
  {
    id: "staged-plan",
    category: "payments",
    question: "What is the 70/30 Staged Project Plan?",
    answer:
      "For full engineering installations, 70% is due upon ordering to secure hardware allocation and schedule the installation team. The final 30% balance is payable only after site commissioning, testing, and your full client sign-off.",
  },
  {
    id: "tech-support",
    category: "support",
    question: "How do I get technical assistance if my inverter shows a fault code?",
    answer:
      "Our local Lusaka and Copperbelt technical teams provide direct remote diagnostics and on-site support. You can reach our engineers instantly via WhatsApp or phone for expedited troubleshooting.",
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<string | null>("size-system");

  const toggleItem = (id: string) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat =
      activeCategory === "all" ||
      item.category === activeCategory ||
      (activeCategory === "sizing" && (item.category === "sizing" || item.category === "warranties"));
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.answer === "string" &&
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-background text-on-background font-body-lg min-h-screen flex flex-col antialiased">
      {/* Main Content Canvas */}
      <main className="flex-grow pt-[80px] md:pt-[100px] pb-margin-desktop px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {/* Header & Search Section */}
        <div className="mb-stack-lg text-center max-w-3xl mx-auto">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary mb-stack-sm">
            Frequently Asked Questions
          </h1>
          <p className="font-body-lg text-text-secondary mb-stack-lg">
            Find answers to common questions about our solar systems, load
            shedding solutions, and financing options.
          </p>
          <div className="relative w-full max-w-2xl mx-auto">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-border-light bg-surface-container-lowest focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 font-body-sm transition-all shadow-sm"
              placeholder="Search load shedding, batteries, warranties, or payment methods..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-stack-sm mb-stack-lg">
          <button
            onClick={() => setActiveCategory("sizing")}
            className={`px-6 py-2 rounded-full font-label-cta text-sm transition-all shadow-sm ${
              activeCategory === "sizing" || activeCategory === "all"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest text-text-secondary border border-border-light hover:border-brand-green"
            }`}
          >
            Load Shedding &amp; System Sizing
          </button>
          <button
            onClick={() => setActiveCategory("payments")}
            className={`px-6 py-2 rounded-full font-label-cta text-sm transition-all shadow-sm ${
              activeCategory === "payments"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest text-text-secondary border border-border-light hover:border-brand-green"
            }`}
          >
            Payments &amp; Lay-By
          </button>
          <button
            onClick={() => setActiveCategory("warranties")}
            className={`px-6 py-2 rounded-full font-label-cta text-sm transition-all shadow-sm ${
              activeCategory === "warranties"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest text-text-secondary border border-border-light hover:border-brand-green"
            }`}
          >
            Installations &amp; Warranties
          </button>
          <button
            onClick={() => setActiveCategory("support")}
            className={`px-6 py-2 rounded-full font-label-cta text-sm transition-all shadow-sm ${
              activeCategory === "support"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest text-text-secondary border border-border-light hover:border-brand-green"
            }`}
          >
            Technical Support
          </button>
        </div>

        {/* FAQ Accordion Layout (Bento-inspired container) */}
        <div className="max-w-4xl mx-auto bg-surface-container-lowest rounded-2xl border border-border-light shadow-sm p-6 md:p-8">
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`accordion-item ${
                    idx < filteredFaqs.length - 1
                      ? "border-b border-border-light pb-4"
                      : ""
                  } ${idx > 0 ? "pt-2" : ""}`}
                >
                  <button
                    className="w-full flex justify-between items-center text-left focus:outline-none"
                    onClick={() => toggleItem(faq.id)}
                  >
                    <span className="font-headline-md text-lg text-primary">
                      {faq.question}
                    </span>
                    <span className="material-symbols-outlined text-primary">
                      {isOpen ? "remove" : "add"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pt-4 pb-2">
                      <p className="font-body-sm text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Teaser (Bento Card) */}
        <div className="mt-stack-lg max-w-4xl mx-auto bg-surface-bright rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border border-border-light shadow-sm">
          <div className="mb-4 md:mb-0">
            <h3 className="font-headline-md text-xl text-primary mb-2">
              Still have questions?
            </h3>
            <p className="font-body-sm text-text-secondary">
              Our engineering team is ready to assist you directly.
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <a
              href="mailto:info@elleyhillpower.zm"
              className="w-full md:w-auto px-6 py-3 rounded-full bg-surface-container-lowest border border-brand-green text-primary font-label-cta text-sm hover:-translate-y-0.5 transition-transform shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              Email Us
            </a>
            <a
              href="#"
              className="w-full md:w-auto px-6 py-3 rounded-full bg-status-success text-on-primary font-label-cta text-sm hover:-translate-y-0.5 transition-transform shadow-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
              WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

