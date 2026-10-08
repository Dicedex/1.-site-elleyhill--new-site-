import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact & Showroom Locator Lusaka | Elleyhill Power Zambia",
  description:
    "Visit our flagship solar showroom at Unit 4A Block A East Park Mall, Lusaka. Connect directly with solar engineers on WhatsApp (+260 97 183 8038) for quotes, system sizing, and hardware support across Zambia.",
  keywords: [
    "Contact Solar Company Lusaka",
    "Solar Showroom East Park Mall",
    "Elleyhill Power Phone Number",
    "Solar Engineers Lusaka",
    "Solar Store Location Zambia",
    "Solar Hardware Quotation Zambia",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact & Showroom Locator Lusaka | Elleyhill Power Zambia",
    description:
      "Visit East Park Mall showroom or call/WhatsApp +260 97 183 8038 for instant quotes & expert solar consultations.",
    url: `${SITE_URL}/contact`,
    images: [{ url: `${SITE_URL}/images/logo.png`, alt: "Contact Elleyhill Power Zambia" }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Elleyhill Power Zambia",
    url: `${SITE_URL}/contact`,
    mainEntity: {
      "@type": "LocalBusiness",
      name: "Elleyhill Power Zambia",
      telephone: "+260971838038",
      email: "support@elleyhill.co.zm",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit 4A Block A, East Park Mall, Great East Road",
        addressLocality: "Lusaka",
        addressRegion: "Lusaka Province",
        postalCode: "10101",
        addressCountry: "ZM",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -15.3982,
        longitude: 28.3294,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      {children}
    </>
  );
}
