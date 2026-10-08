import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Load Shedding & Solar Energy Sizing FAQs Zambia | Elleyhill Power ZM",
  description:
    "Definitive answers to solar load shedding calculations, 1HP borehole pump startup currents, deep freezer battery requirements, Greenrich 1.5C lithium discharge rates, and EIZ-certified installation standards in Lusaka, Zambia.",
  keywords: [
    "Solar FAQ Zambia",
    "Load Shedding Sizing Lusaka",
    "Borehole pump solar inverter size",
    "Deep freezer solar battery consumption",
    "Greenrich 1.5C battery Lusaka",
    "5kW inverter load capacity Zambia",
    "Solar battery for 12 hours load shedding",
    "EIZ certified solar contractors Zambia",
  ],
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: "Load Shedding & Solar System Sizing Guide (FAQ) | Elleyhill Power ZM",
    description:
      "Engineered answers for sizing home and business solar backup in Lusaka, Copperbelt, and Southern Africa.",
    url: `${SITE_URL}/faq`,
    images: [{ url: `${SITE_URL}/images/logo.png`, alt: "Elleyhill Power FAQs" }],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What can a 5kW to 6kW hybrid solar system power simultaneously in Lusaka?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 5kW or 6kW hybrid solar system with a 5kWh to 10kWh lithium battery comfortably powers standard home LED lighting, Wi-Fi router, entertainment/TVs, double-door refrigerator/freezer, security electric fence/cameras, and a 1HP borehole water pump (run during daytime solar peak).",
        },
      },
      {
        "@type": "Question",
        name: "How much battery storage do I need for 8 to 12 hours of load shedding in Zambia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For an average Zambian household consuming 500W to 800W of continuous essential load (fridge, lights, Wi-Fi, fans, TV), an 8-hour outage requires 4.0kWh to 6.4kWh of usable lithium storage (e.g. 1x 5.12kWh Greenrich battery), while a 12-hour outage requires 8kWh to 10.24kWh of storage (e.g. 2x 5.12kWh or 1x 10kWh Greenrich battery).",
        },
      },
      {
        "@type": "Question",
        name: "Can a solar system power a 1HP or 1.5HP borehole pump in Zambia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Standard 1HP (approx. 750W) and 1.5HP (approx. 1100W) submersible borehole pumps have an inductive startup surge of 3x to 5x their running wattage. A 5kW or 6kW Greenrich/Growatt pure sine wave hybrid inverter delivers up to 10kVA surge power to start and run the borehole pump effortlessly.",
        },
      },
      {
        "@type": "Question",
        name: "How much power does a deep freezer consume during load shedding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A modern domestic chest freezer consumes approximately 100W to 200W when the compressor is running (approx. 1.2kWh to 2.4kWh per 24-hour cycle). It requires an inverter capable of handling an initial 600W to 1200W startup spike, which is standard on all our hybrid kits.",
        },
      },
      {
        "@type": "Question",
        name: "What certifications should a solar installer have in Zambia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Zambia, legitimate professional solar EPC contractors must be registered with the Engineering Institution of Zambia (EIZ), certified by the Energy Regulation Board (ERB), and employ licensed electrical technicians complying with ZABS (Zambia Bureau of Standards) electrical wiring codes.",
        },
      },
      {
        "@type": "Question",
        name: "What is the warranty and cycle life on Greenrich lithium batteries in Zambia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Greenrich lithium LiFePO4 batteries feature a 10-Year Local Warranty and are rated for over 6,000 cycles at 80% Depth of Discharge with a 1.5C high-discharge capability.",
        },
      },
      {
        "@type": "Question",
        name: "Do you supply and freight solar hardware to Zimbabwe, DRC, Malawi, and Botswana?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Elleyhill Power provides export-ready quotes and bonded cross-border freight from our Lusaka hub to the Democratic Republic of Congo (Lubumbashi/Kolwezi), Zimbabwe (Harare/Bulawayo), Malawi (Lilongwe), and Botswana (Kazungula/Kasane).",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {children}
    </>
  );
}
