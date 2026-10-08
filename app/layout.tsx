import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import {
  SITE_URL,
  MASTER_KEYWORDS,
  getLocalBusinessSchema,
  getWebsiteSchema,
  getOrganizationSchema,
} from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elleyhill Power Zambia | #1 Solar Panels, Inverters & Lithium Storage Lusaka & Southern Africa",
    template: "%s | Elleyhill Power Zambia",
  },
  description:
    "Leading solar energy engineering provider in Lusaka, serving Zambia and surrounding nations (DRC Congo, Zimbabwe, Malawi, Botswana, Mozambique, Namibia). Tier-1 JA Solar panels, Greenrich & Growatt hybrid inverters, LiFePO4 batteries, and cross-border solar solutions.",
  keywords: MASTER_KEYWORDS,
  authors: [{ name: "Elleyhill Power Zambia", url: SITE_URL }],
  creator: "Elleyhill Power Zambia",
  publisher: "Elleyhill Power Zambia",
  applicationName: "Elleyhill Power Zambia",
  category: "Solar Energy, Power Backup & Cross-Border Supply",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Elleyhill Power Zambia | #1 Solar Panels, Inverters & Lithium Storage Lusaka & Southern Africa",
    description:
      "Engineered hybrid solar kits, lithium LiFePO4 storage, Tier-1 solar panels, and turnkey certified installations across Lusaka, Zambia, and surrounding Southern & Central African countries.",
    url: SITE_URL,
    siteName: "Elleyhill Power Zambia",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Elleyhill Power Zambia - Tier-1 Solar Hardware & Regional Supply",
      },
    ],
    locale: "en_ZM",
    type: "website",
    countryName: "Zambia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elleyhill Power Zambia | #1 Solar Systems & Lithium Storage Lusaka & SADC",

    description:
      "Turnkey solar solutions engineered for Zambia. Tier-1 hardware with 10-year warranty. Fast delivery & installation in Lusaka & nationwide.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
  other: {
    "geo.region": "ZM-09",
    "geo.placename": "Lusaka, Zambia",
    "geo.position": "-15.3982;28.3294",
    "ICBM": "-15.3982, 28.3294",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = getLocalBusinessSchema();
  const websiteSchema = getWebsiteSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        {/* Geo Meta Tags for Lusaka & Zambia High Search Visibility */}
        <meta name="geo.region" content="ZM-09" />
        <meta name="geo.placename" content="Lusaka, Zambia" />
        <meta name="geo.position" content="-15.3982;28.3294" />
        <meta name="ICBM" content="-15.3982, 28.3294" />

        {/* Global Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="bg-surface-container-lowest antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Header />
            <CartDrawer />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
            <WhatsAppWidget />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

