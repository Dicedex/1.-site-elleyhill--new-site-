import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Corporate Profile & Engineering Capability | Elleyhill Power Zambia",
  description:
    "Official corporate profile of Elleyhill Power Zambia. Technical specifications, accredited EPC capacity, Tier-1 partnerships, and energy transition solutions across Zambia.",
  alternates: {
    canonical: `${SITE_URL}/company-profile`,
  },
};

export default function CompanyProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
