import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Commercial & Agricultural Solar Case Studies Zambia | Elleyhill Power",
  description:
    "Engineering case studies: See how commercial enterprises, farms, and homes in Zambia eliminate load shedding downtime with Elleyhill Power hybrid solar solutions.",
  alternates: {
    canonical: `${SITE_URL}/case-studies`,
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
