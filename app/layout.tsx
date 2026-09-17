import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://elleyhill.co.zm"),
  title: {
    default: "Elleyhill Power Zambia - Tier-1 Hybrid Solar & Lithium Storage",
    template: "%s | Elleyhill Power Zambia",
  },
  description:
    "Standard-setting hybrid solar systems, Tier-1 JA Solar panels, and Greenrich lithium batteries engineered for homes, agriculture, and commercial enterprises across Zambia.",
  keywords: [
    "Solar Zambia",
    "Solar Panels Lusaka",
    "Hybrid Solar Systems Zambia",
    "Greenrich Battery Zambia",
    "JA Solar Panels Zambia",
    "Load Shedding Solar Solutions",
    "Solar Installation Lusaka",
    "Commercial Solar Zambia",
  ],
  authors: [{ name: "Elleyhill Power Zambia" }],
  openGraph: {
    title: "Elleyhill Power Zambia - Modern Industrial Solar Solutions",
    description:
      "Engineered hybrid solar kits, lithium storage, and turnkey certified installations across Zambia.",
    url: "https://elleyhill.co.zm",
    siteName: "Elleyhill Power Zambia",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Elleyhill Power Zambia",
      },
    ],
    locale: "en_ZM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elleyhill Power Zambia - Solar Systems & Lithium Storage",
    description:
      "Turnkey solar solutions engineered for Zambia. Tier-1 hardware with 10-year warranty.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="bg-surface-container-lowest antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <CartDrawer />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  );
}
