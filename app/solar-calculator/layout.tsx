import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solar Power Sizing Tool Zambia | Calculate Daily kWh & Inverter Size",
  description:
    "Free Zambia solar calculator tool. Estimate home and farm power requirements, battery storage duration, and panel array capacity in Lusaka.",
  alternates: {
    canonical: `${SITE_URL}/solar-calculator`,
  },
};

export default function SolarCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
