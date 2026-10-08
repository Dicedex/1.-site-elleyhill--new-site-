import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solar Installation, Borehole Pumping & EPC Engineering Services | Zambia & Southern Africa",
  description:
    "Certified solar installation, agricultural borehole water pumping, commercial EPC energy audits, and solar panel maintenance in Lusaka, across Zambia, and neighboring SADC countries (Zimbabwe, DRC Congo, Malawi, Botswana). Guaranteed engineering precision.",
  keywords: [
    "Solar Installation Lusaka",
    "Solar EPC Contractor Zambia",
    "Solar EPC Southern Africa",
    "Solar Borehole Pumping Zambia",
    "Solar Water Pump Installation Lusaka",
    "Solar Panel Cleaning Service Lusaka",
    "Commercial Solar Installation Zambia",
    "Farm Solar Energy Zambia",
    "Mining Solar Engineering DRC Zambia",
    "Solar System Maintenance Southern Africa",
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: "Certified Solar Installation & EPC Services | Elleyhill Power Zambia & SADC",
    description:
      "Expert solar installations, agricultural borehole solutions, and turnkey commercial solar EPC services across Zambia and Southern Africa.",
    url: `${SITE_URL}/services`,
    images: [{ url: `${SITE_URL}/images/logo.png`, alt: "Elleyhill Power Services" }],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Solar Energy System Engineering, Installation & Regional Cross-Border Supply",
    provider: {
      "@type": "SolarEnergyCompany",
      name: "Elleyhill Power Zambia",
      url: SITE_URL,
    },
    areaServed: [
      { "@type": "Country", name: "Zambia" },
      { "@type": "Country", name: "Democratic Republic of the Congo" },
      { "@type": "Country", name: "Zimbabwe" },
      { "@type": "Country", name: "Malawi" },
      { "@type": "Country", name: "Botswana" },
      { "@type": "Country", name: "Mozambique" },
    ],

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Turnkey Solar EPC & Commercial Engineering",
            description: "Industrial and commercial solar design, procurement, and construction.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Hybrid Solar Installation",
            description: "Complete home solar installation with battery storage and instant automatic transfer switch.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Solar Borehole & Agricultural Pumping",
            description: "Off-grid borehole pump installation for irrigation and livestock.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Solar Panel Deep Cleaning & Maintenance",
            description: "Professional deionized panel cleaning and performance optimization.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      {children}
    </>
  );
}
