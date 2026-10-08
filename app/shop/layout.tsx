import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shop Solar Kits, Lithium Batteries & Inverters | Lusaka Zambia & Regional Export",
  description:
    "Explore our complete inventory of Tier-1 solar panels, Greenrich LiFePO4 lithium batteries, Growatt & Deye hybrid inverters, and accessories. Fast pickup in Lusaka & cross-border export freight to Zimbabwe, DRC Congo, Malawi, Botswana, and Mozambique.",
  keywords: [
    "Shop Solar Zambia",
    "Buy Solar Panels Lusaka",
    "Solar Panels Harare Zimbabwe",
    "Lithium Battery Lubumbashi DRC",
    "Greenrich Battery Lusaka",
    "Growatt Inverters Southern Africa",
    "Deye Inverters Zimbabwe",
    "Hybrid Solar Kits SADC",
    "Solar Store East Park Mall Lusaka",
    "Cross border solar supplier Africa",
  ],
  alternates: {
    canonical: `${SITE_URL}/shop`,
  },
  openGraph: {
    title: "Shop Tier-1 Solar Hardware & Lithium Storage | Elleyhill Power Zambia & SADC",
    description:
      "Buy genuine solar inverters, lithium batteries, bifacial panels, and accessories in Lusaka with delivery across Zambia and neighboring Southern African countries.",
    url: `${SITE_URL}/shop`,
    images: [{ url: `${SITE_URL}/images/logo.png`, alt: "Elleyhill Power Shop" }],
  },
};


export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
