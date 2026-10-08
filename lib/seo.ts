export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elleyhill.co.zm";
export const SITE_NAME = "Elleyhill Power Zambia";

export const COMPANY_DETAILS = {
  name: "Elleyhill Power Zambia",
  legalName: "Elleyhill Power Zambia Limited",
  alternateName: [
    "Elleyhill Power ZM",
    "Elleyhill Solar Zambia",
    "Elleyhill Power",
    "Elleyhill Solar Lusaka",
    "Elleyhill Power Southern Africa",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/logo.png`,
  telephone: "+260971838038",
  displayPhone: "+260 97 183 8038",
  email: "support@elleyhill.co.zm",
  salesEmail: "sales@elleyhill.co.zm",
  priceRange: "$$",
  currenciesAccepted: "ZMW, USD, ZAR",
  paymentAccepted: "Cash, Credit Card, Debit Card, Bank Transfer, MTN MoMo, Airtel Money, Zamtel Kwacha, Wire Transfer",
  address: {
    streetAddress: "Unit 4A Block A, East Park Mall, Great East Road",
    addressLocality: "Lusaka",
    addressRegion: "Lusaka Province",
    postalCode: "10101",
    addressCountry: "ZM",
  },
  geo: {
    latitude: -15.3982,
    longitude: 28.3294,
  },
  openingHours: [
    "Mo-Fr 08:00-17:00",
    "Sa 09:00-14:00",
  ],
  // Hyper-Local Lusaka Sub-districts, All Zambian Provinces, and SADC Cross-Border Nations
  areaServed: [
    // 1. Lusaka Urban Metro & Neighborhoods (Primary Target)
    "Kabulonga, Lusaka",
    "Roma, Lusaka",
    "Rhodes Park, Lusaka",
    "Mass Media, Lusaka",
    "Woodlands, Lusaka",
    "Chelston, Lusaka",
    "Industrial Area, Lusaka",
    "Sunningdale, Lusaka",
    "Lusaka West, Lusaka",
    "Leopards Hill, Lusaka",
    "Silverest, Lusaka",
    "Meanwood, Lusaka",
    "Olympia, Lusaka",
    "Makeni, Lusaka",
    "Ibex Hill, Lusaka",
    "New Kasama, Lusaka",
    "Avondale, Lusaka",
    "Longacres, Lusaka",
    "Northmead, Lusaka",
    "Lusaka, Zambia",

    // 2. Nationwide Zambia Commercial & Agricultural Hubs
    "Copperbelt, Zambia",
    "Ndola, Zambia",
    "Kitwe, Zambia",
    "Chingola, Zambia",
    "Mufulira, Zambia",
    "Luanshya, Zambia",
    "Livingstone, Zambia",
    "Mazabuka, Zambia",
    "Choma, Zambia",
    "Kabwe, Zambia",
    "Solwezi, Zambia",
    "Kasama, Zambia",
    "Chipata, Zambia",
    "Mongu, Zambia",
    "Mansa, Zambia",
    "Zambia",

    // 3. Surrounding Southern & Central African Regional Markets
    "Democratic Republic of the Congo",
    "Lubumbashi, DRC",
    "Kolwezi, DRC",
    "Kasumbalesa, DRC",
    "Zimbabwe",
    "Harare, Zimbabwe",
    "Bulawayo, Zimbabwe",
    "Victoria Falls, Zimbabwe",
    "Malawi",
    "Lilongwe, Malawi",
    "Blantyre, Malawi",
    "Mzuzu, Malawi",
    "Mozambique",
    "Tete, Mozambique",
    "Botswana",
    "Gaborone, Botswana",
    "Francistown, Botswana",
    "Kasane, Botswana",
    "Namibia",
    "Windhoek, Namibia",
    "Katima Mulilo, Namibia",
    "Tanzania",
    "Dar es Salaam, Tanzania",
    "Mbeya, Tanzania",
    "Tunduma, Tanzania",
    "Angola",
    "Southern Africa",
    "SADC Region",
    "COMESA Region",
    "Global",
  ],
  countriesServed: [
    { name: "Zambia", code: "ZM" },
    { name: "Democratic Republic of the Congo", code: "CD" },
    { name: "Zimbabwe", code: "ZW" },
    { name: "Malawi", code: "MW" },
    { name: "Mozambique", code: "MZ" },
    { name: "Botswana", code: "BW" },
    { name: "Namibia", code: "NA" },
    { name: "Tanzania", code: "TZ" },
    { name: "Angola", code: "AO" },
  ],
  sameAs: [
    "https://facebook.com/elleyhillpowerzambia",
    "https://instagram.com/elleyhillpowerzambia",
    "https://linkedin.com/company/elleyhill-power-zambia",
    "https://tiktok.com/@elleyhillpowerzambia",
  ],
};

export const MASTER_KEYWORDS = [
  // 1. Transactional & Hyper-Local (Lusaka Dominance)
  "buy solar inverter Lusaka",
  "lithium battery price Lusaka",
  "solar panels for sale Lusaka",
  "solar installation Kabulonga Lusaka",
  "solar inverter Woodlands Lusaka",
  "solar battery Roma Lusaka",
  "solar system Rhodes Park Lusaka",
  "solar backup Mass Media Lusaka",
  "solar panels Chelston Lusaka",
  "solar Industrial Area Lusaka",
  "solar Sunningdale Lusaka",
  "solar Lusaka West",
  "solar Makeni Lusaka",
  "solar Leopards Hill Lusaka",
  "solar Silverest Lusaka",
  
  // 2. Commercial & High Value
  "solar panel installation Zambia",
  "borehole solar pump system Lusaka",
  "commercial solar installers Zambia",
  "solar EPC contractors Zambia",
  "agricultural solar irrigation Mazabuka",
  "mining solar power Copperbelt DRC",
  "EIZ certified solar engineers Lusaka",
  "ERB compliant solar installations Zambia",
  
  // 3. Problem-Solving & Urgent (Load Shedding Zero-Intent)
  "best solar backup for load shedding",
  "how to keep fridge running during load shedding",
  "how to power borehole pump during load shedding",
  "power station for apartment Lusaka",
  "solar battery for 12 hour load shedding",
  "deep freezer solar power requirement",
  "solar system sizing calculator Zambia",
  
  // 4. Brand & Model Specific
  "Greenrich 5kWh lithium battery Zambia",
  "Greenrich battery 1.5C discharge Lusaka",
  "Growatt hybrid inverter Lusaka",
  "Deye hybrid inverter Zambia",
  "Sunsynk inverter Lusaka",
  "JA Solar bifacial panels Zambia",
  "Haitai monocrystalline solar panels Lusaka",
  "5kW complete solar system price Zambia",
  "6kW standard home comfort kit Lusaka",
  "8kW hybrid solar kit Zambia",
  "10kW commercial solar system Lusaka",
  
  // 5. Cross-Border & Regional Southern Africa
  "Solar Supplier Southern Africa",
  "Solar Panels Harare Zimbabwe",
  "Lithium Battery Lubumbashi DRC",
  "Inverters Kolwezi DRC",
  "Solar Power Malawi Lilongwe",
  "Solar Equipment Blantyre Malawi",
  "Solar Systems Botswana Gaborone",
  "Solar Panels Kasane Kazungula",
  "Cross border solar supply Zambia",
  "Export solar hardware Southern Africa",
  "SADC solar distributors",
];

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": [
      "LocalBusiness",
      "SolarEnergyContractor",
      "SolarEnergyEquipmentSupplier",
      "Store",
      "ElectricalContractor",
    ],
    "@id": `${SITE_URL}/#localbusiness`,
    name: COMPANY_DETAILS.name,
    legalName: COMPANY_DETAILS.legalName,
    alternateName: COMPANY_DETAILS.alternateName,
    url: COMPANY_DETAILS.url,
    logo: COMPANY_DETAILS.logo,
    image: [
      `${SITE_URL}/images/logo.png`,
    ],
    telephone: COMPANY_DETAILS.telephone,
    email: COMPANY_DETAILS.email,
    priceRange: COMPANY_DETAILS.priceRange,
    currenciesAccepted: COMPANY_DETAILS.currenciesAccepted,
    paymentAccepted: COMPANY_DETAILS.paymentAccepted,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_DETAILS.address.streetAddress,
      addressLocality: COMPANY_DETAILS.address.addressLocality,
      addressRegion: COMPANY_DETAILS.address.addressRegion,
      postalCode: COMPANY_DETAILS.address.postalCode,
      addressCountry: COMPANY_DETAILS.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_DETAILS.geo.latitude,
      longitude: COMPANY_DETAILS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    areaServed: [
      ...COMPANY_DETAILS.countriesServed.map((c) => ({
        "@type": "Country",
        name: c.name,
      })),
      ...COMPANY_DETAILS.areaServed.map((area) => ({
        "@type": "Place",
        name: area,
      })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solar Hardware, Engineering Installations & Regional Cross-Border Supply",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Complete Hybrid Solar Systems (5kW, 6kW, 8kW, 10kW, 12kW)",
        },
        {
          "@type": "OfferCatalog",
          name: "Lithium LiFePO4 Energy Storage Batteries (Greenrich 1.5C, Dyness, Pylontech)",
        },
        {
          "@type": "OfferCatalog",
          name: "Tier-1 Monocrystalline Solar Panels (JA Solar, Haitai, Canadian Solar)",
        },
        {
          "@type": "OfferCatalog",
          name: "Hybrid & Off-Grid Solar Inverters (Growatt, Deye, Sunsynk, Greenrich)",
        },
        {
          "@type": "OfferCatalog",
          name: "Solar Borehole Pumping & Agricultural Irrigation Solutions",
        },
        {
          "@type": "OfferCatalog",
          name: "Certified Commercial & Industrial Solar EPC Installations (EIZ & ERB Compliant)",
        },
        {
          "@type": "OfferCatalog",
          name: "Cross-Border Solar Freight & SADC Regional Equipment Supply",
        },
      ],
    },
    knowsAbout: [
      "Load Shedding Mitigation",
      "Solar Borehole Pumping Systems",
      "LiFePO4 Lithium Battery Storage",
      "Tier-1 Photovoltaic Panels",
      "Hybrid Inverter Synchronization",
      "Commercial Rooftop Solar EPC",
      "EIZ Certified Electrical Engineering",
    ],
    sameAs: COMPANY_DETAILS.sameAs,
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: COMPANY_DETAILS.name,
    alternateName: "Elleyhill Power ZM",
    description:
      "Zambia's premier solar energy engineering provider. Tier-1 hybrid solar systems, Greenrich 1.5C lithium batteries, Growatt & Deye inverters, and certified load shedding installations in Lusaka and across Southern Africa.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/shop?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en-ZM", "en-ZW", "en-MW", "en-BW", "fr-CD"],
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY_DETAILS.name,
    legalName: COMPANY_DETAILS.legalName,
    alternateName: "Elleyhill Power ZM",
    url: SITE_URL,
    logo: COMPANY_DETAILS.logo,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY_DETAILS.telephone,
        contactType: "customer service",
        areaServed: ["ZM", "ZW", "CD", "MW", "MZ", "BW", "NA", "TZ", "AO"],
        availableLanguage: ["English", "French", "Bemba", "Nyanja", "Shona"],
      },
      {
        "@type": "ContactPoint",
        telephone: COMPANY_DETAILS.telephone,
        contactType: "sales",
        areaServed: ["ZM", "ZW", "CD", "MW", "MZ", "BW", "NA", "TZ", "AO"],
        availableLanguage: ["English", "French"],
      },
    ],
    sameAs: COMPANY_DETAILS.sameAs,
  };
}
