import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Solar Installation Projects Portfolio | Lusaka & Nationwide Zambia",
  description:
    "View our verified turnkey solar installations across Zambia: residential solar in Lusaka (Woodlands, Roma, Leopards Hill), commercial rooftop solar, and off-grid agricultural micro-grids in Mazabuka.",
  keywords: [
    "Solar Projects Zambia",
    "Solar Installations Lusaka Portfolio",
    "Commercial Solar Installations Zambia",
    "Agricultural Solar Projects Mazabuka",
    "Residential Solar Case Studies Lusaka",
  ],
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: "Solar Energy Projects Portfolio Zambia | Elleyhill Power",
    description:
      "Explore real-world solar engineering projects across Lusaka, the Copperbelt, and Southern Province.",
    url: `${SITE_URL}/projects`,
    images: [{ url: `${SITE_URL}/images/logo.png`, alt: "Elleyhill Power Projects" }],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
