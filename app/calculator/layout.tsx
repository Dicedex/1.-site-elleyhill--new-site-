import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solar System Sizing Calculator Zambia | Calculate Load Shedding Backup",
  description:
    "Free interactive solar calculator for Zambia. Calculate exact inverter capacity, lithium battery storage (kWh), and solar panels required for your home, farm, or business in Lusaka & across Zambia.",
  keywords: [
    "Solar Calculator Zambia",
    "Solar Sizing Tool Lusaka",
    "Calculate Solar Battery Size Zambia",
    "Load Shedding Backup Calculator",
    "Solar Inverter Sizer Zambia",
    "Home Solar Cost Calculator Lusaka",
  ],
  alternates: {
    canonical: `${SITE_URL}/calculator`,
  },
  openGraph: {
    title: "Interactive Solar System Sizing Calculator | Elleyhill Power Zambia",
    description:
      "Size your home or business solar power system in 60 seconds. Get instant recommended inverter, battery, and panel kits tailored for Zambian load shedding.",
    url: `${SITE_URL}/calculator`,
    images: [{ url: `${SITE_URL}/images/logo.png`, alt: "Solar Calculator Zambia" }],
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
