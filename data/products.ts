export type ProductVariant = {
  id: string;
  label: string;
  name?: string;
  price?: string;
  description?: string;
  features?: string[];
  image?: string;
  inStock?: boolean;
};

export type Product = {
  name: string;
  slug: string;
  category: "Complete Kits" | "Panels" | "Batteries" | "Inverters" | "Accessories" | "Portable";
  description: string;
  longDescription?: string;
  price: string;
  features: string[];
  whatsInTheBox?: string[];
  warranty?: string;
  image: string;
  aiHint?: string;
  inStock?: boolean;
  variantType?: "size" | "capacity" | "rating";
  variants?: ProductVariant[];
  defaultVariantId?: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "5kW Complete Solar System",
    slug: "5kw-standard-home-comfort-kit",
    category: "Complete Kits",
    description: "5kW Complete System: 5kW (200Ah) Greenrich Inverter, 1 x 5kWh (100Ah) 48V Lithium Battery, 8 x 545W Haitai Solar Panels. Excl. Protection Accessories, Excl. Installation.",
    longDescription: "Our signature 5kW Complete Hybrid Solar System engineered for uninterrupted home and business energy in Zambia. Includes a 5kW (200Ah) Greenrich Inverter, 1 x 5kWh (100Ah) 48V Lithium Battery, and 8 x 545W Haitai Solar Panels. Excl. Protection Accessories, Excl. Installation.",
    price: "K 65,806.00",
    features: [
      "5kW (200Ah) Greenrich Inverter",
      "1 x 5kWh (100Ah) 48V Lithium Battery",
      "8 x 545W Haitai Solar Panels",
      "Excl. Protection Accessories",
      "Excl. Installation"
    ],
    whatsInTheBox: [
      "1 x 5kW (200Ah) Greenrich Inverter",
      "1 x 5kWh (100Ah) 48V Lithium Battery",
      "8 x 545W Haitai Solar Panels",
      "Excl. Protection Accessories",
      "Excl. Installation"
    ],
    warranty: "10-Year Battery Warranty, 5-Year Inverter Warranty, 25-Year Panel Performance Warranty.",
    image: "/images/products/complete systems/5kw sys.png",
    aiHint: "complete system",
    inStock: true
  },
  {
    name: "5kW Growatt Complete Solar System",
    slug: "5kw-growatt-complete-solar-system",
    category: "Complete Kits",
    description: "5kW Growatt System: 5kW (200Ah) Growatt Inverter, 1 x 5kWh (100Ah) 48V Lithium Battery, 8 x 545W Haitai Solar Panels. Excl. Protection Accessories, Excl. Installation.",
    longDescription: "Cost-effective, high-reliability 5kW hybrid solar solution for Zambian homes and offices. Built with a 5kW (200Ah) Growatt SPF Inverter, 1 x 5kWh (100Ah) 48V LiFePO4 Lithium Battery, and 8 x 545W Haitai Monocrystalline Solar Panels (4.36kW Total Array). Excl. Protection Accessories, Excl. Installation.",
    price: "K 50,406.00",
    features: [
      "5kW (200Ah) Growatt Inverter",
      "1 x 5kWh (100Ah) 48V Lithium Battery",
      "8 x 545W Haitai Solar Panels",
      "Excl. Protection Accessories",
      "Excl. Installation"
    ],
    whatsInTheBox: [
      "1 x 5kW (200Ah) Growatt Inverter",
      "1 x 5kWh (100Ah) 48V Lithium Battery",
      "8 x 545W Haitai Solar Panels (4.36kW Array)",
      "User Manual & System Documentation",
      "Note: Excl. Protection Accessories & Excl. Installation"
    ],
    warranty: "10-Year Battery Warranty, 5-Year Inverter Warranty, 25-Year Solar Panel Warranty.",
    image: "/images/products/complete systems/5kw sys.png",
    aiHint: "growatt complete system",
    inStock: true
  },
  {
    name: "6kW Standard Home Comfort Kit",
    slug: "6kw-standard-home-comfort-kit",
    category: "Complete Kits",
    description: "Complete 6kW hybrid solar kit with 10kWh lithium storage and high-efficiency tier-1 panels.",
    longDescription: "Our signature, standard-setting home kit engineered for Zambia's power grid and load shedding conditions. Delivers seamless, automatic instant switching (<10ms) to ensure your home never goes dark. Powers refrigeration, entertainment, lighting, water pumps, and essential home appliances.",
    price: "K 85,500.00",
    features: [
      "6.0 kW Continuous Hybrid Inverter",
      "10.24 kWh LiFePO4 Lithium Battery (6000+ Cycles)",
      "8 x 605W JA Solar Bifacial Tier-1 Panels",
      "<10ms UPS-Grade Instant Transfer Switch",
      "Full IBR / Tile Mounting & DC Protection Kit"
    ],
    whatsInTheBox: [
      "1 x 6kW Hybrid Inverter",
      "2 x 5.12kWh / 1 x 10kWh Lithium Battery Module",
      "8 x 605W JA Solar Bifacial Monocrystalline Solar Panels",
      "1 x Pre-wired DC Combiner & AC Distribution Box",
      "1 x Complete Aluminum Roof Mounting Hardware Set",
      "Heavy-duty DC Battery Cables & MC4 Connectors",
      "Engineering Installation & Commissioning Guide"
    ],
    warranty: "10-Year Battery Warranty, 5-Year Inverter Warranty, 30-Year Bifacial Panel Performance Warranty.",
    image: "/images/products/complete systems/6kw sys.png",
    aiHint: "complete kit",
    inStock: true
  },
  {
    name: "8kW Complete Solar System",
    slug: "8kw-complete-solar-system",
    category: "Complete Kits",
    description: "8kW Complete System: 8kW (200Ah) Greenrich Inverter, 2 x 5kWh (100Ah) 48V Lithium Battery, 10 x 545W Haitai Solar Panels. Excl. Protection Accessories, Excl. Installation.",
    longDescription: "High-capacity 8kW Complete Hybrid Solar System engineered for large residential estates, commercial offices, and agricultural setups in Zambia. Includes an 8kW (200Ah) Greenrich Hybrid Inverter, 2 x 5kWh (100Ah) 48V LiFePO4 Lithium Batteries (10kWh total capacity), and 10 x 545W Haitai Solar Panels (5.45kW Array). Excl. Protection Accessories, Excl. Installation.",
    price: "K 104,712.00",
    features: [
      "8kW (200Ah) Greenrich Inverter",
      "2 x 5kWh (100Ah) 48V Lithium Battery",
      "10 x 545W Haitai Solar Panels",
      "Excl. Protection Accessories",
      "Excl. Installation"
    ],
    whatsInTheBox: [
      "1 x 8kW (200Ah) Greenrich Inverter",
      "2 x 5kWh (100Ah) 48V Lithium Battery Modules",
      "10 x 545W Haitai Solar Panels (5.45kW Total Solar Array)",
      "Inter-battery communication & power link cables",
      "Comprehensive System User & Safety Guide",
      "Note: Excl. Protection Accessories & Excl. Installation"
    ],
    warranty: "10-Year Battery Warranty, 5-Year Inverter Warranty, 25-Year Panel Performance Warranty.",
    image: "/images/products/complete systems/8kw sys.png",
    aiHint: "8kw complete system",
    inStock: true
  },
  {
    name: "12kW Deye 3P Complete Solar System",
    slug: "12kw-deye-3p-complete-solar-system",
    category: "Complete Kits",
    description: "12kW 3-Phase System: 12kW Deye 3P 48V Inverter, 2 x 10kWh (200Ah) 48V Lithium Battery, 18 x 545W Haitai Solar Panels. Excl. Protection Accessories, Excl. Installation.",
    longDescription: "Heavy-duty 12kW 3-Phase 48V Complete Hybrid Solar System for commercial buildings, agricultural processing, and high-demand properties in Zambia. Includes a 12kW Deye 3-Phase 48V Low Voltage Hybrid Inverter, 2 x 10kWh (200Ah) 48V Lithium Batteries (20kWh total LiFePO4 storage), and 18 x 545W Haitai Solar Panels (9.81kW Total Solar Array). Excl. Protection Accessories, Excl. Installation.",
    price: "K 180,956.00",
    features: [
      "12kW Deye 3P 48V Inverter",
      "2 x 10kWh (200Ah) 48V Lithium Battery",
      "18 x 545W Haitai Solar Panels",
      "Excl. Protection Accessories",
      "Excl. Installation"
    ],
    whatsInTheBox: [
      "1 x 12kW Deye 3-Phase 48V Low Voltage Hybrid Inverter",
      "2 x 10kWh (200Ah) 48V LiFePO4 High-Capacity Lithium Battery Banks",
      "18 x 545W Haitai Tier-1 Monocrystalline Solar Panels (9.81kW Array)",
      "Battery parallel connection links & CT sensors",
      "User Manual & 3-Phase System Documentation",
      "Note: Excl. Protection Accessories & Excl. Installation"
    ],
    warranty: "10-Year Battery Warranty, 5-Year Inverter Warranty, 25-Year Panel Performance Warranty.",
    image: "/images/products/complete systems/12kw sys.png",
    aiHint: "12kw 3-phase complete system",
    inStock: true
  },
  {
    name: "16kW Deye 1P Complete Solar System",
    slug: "16kw-deye-1p-complete-solar-system",
    category: "Complete Kits",
    description: "16kW Single-Phase System: 16kW Deye 1P 48V Inverter, 2 x 10kWh (200Ah) 48V Lithium Battery, 22 x 545W Haitai Solar Panels. Excl. Protection Accessories, Excl. Installation.",
    longDescription: "Ultra-high output 16kW Single-Phase 48V Complete Hybrid Solar System engineered for large residential estates, commercial lodges, and heavy single-phase industrial loads in Zambia. Includes a 16kW Deye Single-Phase 48V Low Voltage Hybrid Inverter, 2 x 10kWh (200Ah) 48V Lithium Batteries (20kWh total LiFePO4 storage), and 22 x 545W Haitai Monocrystalline Solar Panels (11.99kW Total Solar Array). Excl. Protection Accessories, Excl. Installation.",
    price: "K 203,556.00",
    features: [
      "16kW Deye 1P 48V Inverter",
      "2 x 10kWh (200Ah) 48V Lithium Battery",
      "22 x 545W Haitai Solar Panels",
      "Excl. Protection Accessories",
      "Excl. Installation"
    ],
    whatsInTheBox: [
      "1 x 16kW Deye Single-Phase 48V Hybrid Inverter",
      "2 x 10kWh (200Ah) 48V LiFePO4 High-Capacity Lithium Battery Banks",
      "22 x 545W Haitai Tier-1 Monocrystalline Solar Panels (11.99kW Array)",
      "Battery parallel connection links & CT sensors",
      "User Manual & Single-Phase System Documentation",
      "Note: Excl. Protection Accessories & Excl. Installation"
    ],
    warranty: "10-Year Battery Warranty, 5-Year Inverter Warranty, 25-Year Panel Performance Warranty.",
    image: "/images/products/complete systems/16kw sys.png",
    aiHint: "16kw single phase complete system",
    inStock: true
  },
  {
    name: "30kW Deye 3P Complete Solar System",
    slug: "30kw-deye-3p-complete-solar-system",
    category: "Complete Kits",
    description: "30kW 3-Phase System: 30kW Deye 3P 48V Inverter, 2 x 10kWh (200Ah) 48V Lithium Battery, 36 x 545W Haitai Solar Panels. Excl. Protection Accessories, Excl. Installation.",
    longDescription: "Commercial-grade 30kW 3-Phase 48V Complete Hybrid Solar System engineered for large agricultural operations, manufacturing hubs, mining offices, and high-demand commercial facilities in Zambia. Includes a 30kW Deye 3-Phase 48V Low Voltage Hybrid Inverter, 2 x 10kWh (200Ah) 48V Lithium Batteries (20kWh total LiFePO4 storage), and 36 x 545W Haitai Monocrystalline Solar Panels (19.62kW Total Solar Array). Excl. Protection Accessories, Excl. Installation.",
    price: "K 242,756.00",
    features: [
      "30kW Deye 3P 48V Inverter",
      "2 x 10kWh (200Ah) 48V Lithium Battery",
      "36 x 545W Haitai Solar Panels",
      "Excl. Protection Accessories",
      "Excl. Installation"
    ],
    whatsInTheBox: [
      "1 x 30kW Deye 3-Phase 48V Low Voltage Hybrid Inverter",
      "2 x 10kWh (200Ah) 48V LiFePO4 High-Capacity Lithium Battery Banks",
      "36 x 545W Haitai Tier-1 Monocrystalline Solar Panels (19.62kW Array)",
      "Battery parallel connection links & CT sensors",
      "User Manual & 3-Phase Commercial System Documentation",
      "Note: Excl. Protection Accessories & Excl. Installation"
    ],
    warranty: "10-Year Battery Warranty, 5-Year Inverter Warranty, 25-Year Panel Performance Warranty.",
    image: "/images/products/complete systems/30kw sys.png",
    aiHint: "30kw 3-phase complete system",
    inStock: true
  },
  {
    name: "605W JA Solar Bifacial Panels",
    slug: "605w-ja-solar-bifacial-panels",
    category: "Panels",
    description: "Tier-1 JA Solar 605W DeepBlue N-Type / MBB Bifacial dual-sided solar panels with up to +25% additional rear energy yield.",
    longDescription: "The JA Solar 605W Bifacial Monocrystalline Solar Panel represents the gold standard in Tier-1 commercial and high-capacity residential solar generation across Zambia. Built with advanced dual-glass bifacial architecture and multi-busbar (MBB) half-cut cell technology, it generates clean energy simultaneously from both its front and rear surfaces. By capturing ambient albedo reflection from roofs, gravel, and ground surfaces, it delivers up to 10% – 25% higher kWh output than standard monofacial modules. Features superior anti-PID protection, exceptional low-light response, and a low temperature coefficient (-0.35%/°C) optimized for tropical Zambian heat.",
    price: "K 2,200.00",
    features: [
      "605W Ultra-High STC Peak Power Output",
      "Bifacial Dual-Sided Light Capture (Up to +25% Energy Yield)",
      "JA Solar Tier-1 DeepBlue Multi-Busbar Half-Cut Cells",
      "Up to 22.0% Maximum Module Efficiency",
      "Robust Dual-Glass Design (5400 Pa Snow / 2400 Pa Wind)",
      "Low Temperature Coefficient (-0.35%/°C) for High Heat Performance",
      "IP68 Rated Junction Box with Genuine MC4-EVO2 Connectors",
      "Certified Resistance Against PID, Salt Mist, & Ammonia"
    ],
    whatsInTheBox: [
      "1 x JA Solar 605W Bifacial Monocrystalline Solar Panel",
      "Pre-assembled 1200mm IP68 UV-Resistant Leads with MC4 Connectors",
      "Factory Flash Test Quality & Calibration Certificate",
      "Comprehensive Installation & Earthing Manual"
    ],
    warranty: "30-Year Linear Power Warranty (Dual-Glass, ≤0.4% Annual Degradation), 12-Year Workmanship Guarantee.",
    image: "/images/products/panels.png",
    aiHint: "ja solar 605w bifacial panels",
    inStock: true
  },
  {
    name: "545W Haitai Solar Panels",
    slug: "545w-haitai-solar-panels",
    category: "Panels",
    description: "Tier-1 Haitai 545W Monocrystalline Half-Cut solar panels offering high conversion efficiency and robust weather endurance.",
    longDescription: "The Haitai 545W Monocrystalline Solar Panel is engineered for superior power density and long-term durability in southern African climates. Features half-cut cell technology that reduces resistance loss and minimizes shading impacts.",
    price: "K 1,950.00",
    features: [
      "545W High-Efficiency Monocrystalline Module",
      "Half-Cut Cell Architecture for Reduced Resistance",
      "High Temperature Resilience for Tropical Zambian Conditions",
      "Anti-PID & Salt Mist Certified",
      "IP68 Weatherproof Junction Box"
    ],
    whatsInTheBox: [
      "1 x 545W Haitai Tier-1 Monocrystalline Solar Panel",
      "Pre-crimped MC4 Solar Leads",
      "Installation & Safety Guide"
    ],
    warranty: "25-Year Linear Power Warranty, 12-Year Product Warranty.",
    image: "/images/products/panels.png",
    aiHint: "haitai solar panel",
    inStock: true
  },
  {
    name: "Greenrich UP5000 Lithium Battery",
    slug: "greenrich-up5000-lithium-battery",
    category: "Batteries",
    description: "Reliable and efficient 5kWh lithium battery from Greenrich, perfect for residential solar systems.",
    longDescription: "The Greenrich UP5000 is a top-tier 48V LFP battery module. It's designed for reliability and a long service life, making it a perfect match for residential energy storage systems. Its modular design allows for easy expansion.",
    price: "K 12,860.00",
    features: ["4.8kWh Nominal Energy", "51.2V System", "100Ah Capacity", "Long Cycle Life (6000+ cycles)", "CAN/RS485 Communication"],
    whatsInTheBox: ["1 x Greenrich UP5000 Battery Module", "1 x Inter-battery connection cable set", "1 x User Manual"],
    warranty: "10-Year Manufacturer's Warranty.",
    image: "/images/products/UP5000.png",
    aiHint: "solar battery",
    inStock: true
  },
  {
    name: "Greenrich WM5000 Wall Mounting Lithium Battery",
    slug: "greenrich-wm5000-wall-mounting-lithium-battery",
    category: "Batteries",
    description: "A space-saving wall-mountable 5kWh lithium battery. Sleek design and powerful performance.",
    price: "K 13,880.00",
    features: ["4.8kWh Nominal Energy", "Wall-Mount Design", "Integrated BMS", "Parallel Connection up to 16 units"],
    whatsInTheBox: ["1 x Greenrich WM5000 Battery", "1 x Wall mounting bracket", "Communication Cables", "User Manual"],
    warranty: "10-Year Manufacturer's Warranty.",
    image: "/images/products/Battery.png",
    aiHint: "wall battery",
    inStock: true
  },
  {
    name: "Greenrich UP6100 Lithium Battery",
    slug: "greenrich-up6100-lithium-battery",
    category: "Batteries",
    description: "A higher capacity 6.1kWh lithium battery for more demanding energy needs.",
    price: "K 15,390.00",
    features: ["6.1kWh Nominal Energy", "51.2V System", "120Ah Capacity", "High-Performance Cells"],
    image: "/images/products/UP6100.png",
    aiHint: "solar battery",
    inStock: true
  },
  {
    name: "SSRE EU10K 10kWh Battery",
    slug: "ssre-eu10k-10kwh-battery",
    category: "Batteries",
    description: "A high-capacity 10kWh battery from SSRE, ideal for larger homes and small businesses.",
    price: "K 24,000.00",
    features: ["10.24kWh Nominal Energy", "51.2V System", "200Ah Capacity", "Robust and reliable"],
    image: "/images/products/10k.png",
    aiHint: "large battery",
    inStock: true
  },
  {
    name: "Growatt SPF5000 Inverter",
    slug: "growatt-spf5000-inverter",
    category: "Inverters",
    description: "A reliable 5kW off-grid inverter from Growatt, known for its robust performance.",
    price: "K 9,400.00",
    features: ["5kW Power Output", "48V System", "High PV input voltage", "Built-in MPPT controller", "Parallel capability up to 6 units"],
    whatsInTheBox: ["1 x Growatt SPF5000 Inverter", "1 x User Manual & Installation Guide", "Wi-Fi Dongle (optional)"],
    warranty: "5-Year Standard Manufacturer Warranty.",
    image: "/images/products/growatt.png",
    aiHint: "power inverter",
    inStock: true
  },
  {
    name: "Greenrich Hybrid Inverter 6kW",
    slug: "greenrich-hybrid-inverter-6kw",
    category: "Inverters",
    description: "A powerful 6kW hybrid inverter from Greenrich, perfect for residential and small commercial use.",
    price: "K 15,270.00",
    features: ["6kW Hybrid Inverter", "48V System", "Pure Sine Wave", "Parallel capability"],
    image: "/images/products/Greenrich inverter.jpg",
    aiHint: "hybrid inverter",
    inStock: true
  },
  {
    name: "Greenrich Hybrid Inverter 8kW",
    slug: "greenrich-hybrid-inverter-8kw",
    category: "Inverters",
    description: "An 8kW hybrid inverter from Greenrich, offering high performance for larger systems.",
    price: "K 21,880.00",
    features: ["8kW Hybrid Inverter", "48V System", "Advanced MPPT tracking", "Grid-tie with backup"],
    image: "/images/products/Greenrich inverter.jpg",
    aiHint: "large inverter",
    inStock: true
  },
  {
    name: "KAPA Energie Q300 Portable Power Station",
    slug: "kapa-energie-q300-portable-power-station",
    category: "Portable",
    description: "Compact and lightweight power station for camping, and emergencies.",
    price: "K 3,800.00",
    features: ["300W Output", "Multiple Charging Ports", "Solar Charging Ready", "Easy to carry"],
    image: "/images/products/Q300.png",
    aiHint: "portable power",
    inStock: true
  },
  {
    name: "KAPA Energie Q600 Portable Power Station",
    slug: "kapa-energie-q600-portable-power-station",
    category: "Portable",
    description: "A versatile and powerful portable power station for all your outdoor adventures.",
    price: "K 5,800.00",
    features: ["600W Output", "AC/DC/USB Ports", "LCD Display", "Fast Recharging"],
    image: "/images/products/Q600.png",
    aiHint: "portable power",
    inStock: true
  },
  {
    name: "KAPA Energie Q2400 Portable Power Station",
    slug: "kapa-energie-q2400-portable-power-station",
    category: "Portable",
    description: "High-capacity power station to run demanding appliances and tools off-grid.",
    price: "K 12,000.00",
    features: ["2400W High Power Output", "Large Battery Capacity", "UPS Functionality", "Pure Sine Wave"],
    image: "/images/products/Q2400.png",
    aiHint: "large powerstation",
    inStock: true
  },
  {
    name: "Kapa Energie-Li 1000",
    slug: "kapa-energie-li-1000",
    category: "Portable",
    description: "A reliable lithium-based portable power solution with a built-in inverter.",
    price: "K 7,500.00",
    features: ["1000W Inverter", "Lithium Battery", "Compact Design", "Solar Compatible"],
    image: "/images/products/Kapa+Li.png",
    aiHint: "power station",
    inStock: true
  },
  {
    name: "Kapa Engeries 1000 (Gel Battery)",
    slug: "kapa-energies-1000-gel-battery",
    category: "Portable",
    description: "An affordable 1000W portable power station with a durable Gel battery.",
    price: "K 4,400.00",
    features: ["1000W Inverter", "Deep Cycle Gel Battery", "Multiple Outputs", "Cost-Effective"],
    image: "/images/products/gel.jpg",
    aiHint: "power station",
    inStock: true
  },
  {
    name: "DC Combiner Box",
    slug: "dc-combiner-box",
    category: "Accessories",
    description: "Heavy-duty DC combiner box for solar PV arrays with integrated surge protection and DC disconnects. Select size (5kW, 6kW, or 8kW).",
    longDescription: "Engineered specifically for solar PV installations in Zambia. Provides essential DC-side string fusing, overcurrent protection, and Type-II DC surge arrestors for 5kW, 6kW, and 8kW solar arrays. Pre-wired in an IP65 weatherproof enclosure for rapid, secure installation.",
    price: "K 5,000.00",
    features: [
      "Selectable 5kW, 6kW, or 8kW Array Ratings",
      "Type-II DC Surge Protection Device (SPD)",
      "High-Voltage DC String Breakers & Fuses",
      "IP65 Weatherproof & UV-Resistant Enclosure",
      "Pre-wired & Tested for Fast Commissioning"
    ],
    whatsInTheBox: [
      "1 x Pre-wired DC Combiner Box (Selected kW Size)",
      "Mounting Screws & Wall Plugs",
      "Factory QC & Commissioning Certificate"
    ],
    warranty: "2-Year Hardware Warranty",
    image: "/images/products/pv.jpg",
    aiHint: "electrical box",
    inStock: true,
    variantType: "size",
    defaultVariantId: "5kw",
    variants: [
      {
        id: "5kw",
        label: "5kW",
        name: "DC Combiner Box (5kW)",
        price: "K 5,000.00",
        description: "Essential DC protection & string combining for 5kW solar arrays."
      },
      {
        id: "6kw",
        label: "6kW",
        name: "DC Combiner Box (6kW)",
        price: "K 5,000.00",
        description: "Essential DC protection & string combining for 6kW solar arrays."
      },
      {
        id: "8kw",
        label: "8kW",
        name: "DC Combiner Box (8kW)",
        price: "K 5,000.00",
        description: "Essential DC protection & string combining for 8kW solar arrays."
      }
    ]
  },
  {
    name: "AC Combiner Box",
    slug: "ac-combiner-box",
    category: "Accessories",
    description: "Distribution board (DB) AC combiner box with circuit breakers and surge protection for hybrid solar inverters. Select size (5kW, 6kW, or 8kW).",
    longDescription: "Standard AC distribution board combiner box engineered for seamless inverter output and grid/generator changeover protection. Includes high-grade AC breakers, Type-II AC surge arrestor, and changeover switchgear for 5kW, 6kW, and 8kW inverter setups.",
    price: "K 4,000.00",
    features: [
      "Selectable 5kW, 6kW, or 8kW System Ratings",
      "AC Overcurrent & Short-Circuit Breakers",
      "Type-II AC Surge Protection Device (SPD)",
      "Bypass / Manual Changeover Switch Support",
      "Flame-Retardant Surface-Mounted Enclosure"
    ],
    whatsInTheBox: [
      "1 x Pre-wired AC Combiner Distribution Box (Selected kW Size)",
      "Mounting Hardware",
      "Commissioning & Circuit Diagram Labeling"
    ],
    warranty: "2-Year Hardware Warranty",
    image: "/images/products/combiner-box1.jpeg",
    aiHint: "circuit breaker",
    inStock: true,
    variantType: "size",
    defaultVariantId: "5kw",
    variants: [
      {
        id: "5kw",
        label: "5kW",
        name: "AC Combiner Box (5kW)",
        price: "K 4,000.00",
        description: "AC distribution and inverter protection for 5kW hybrid systems."
      },
      {
        id: "6kw",
        label: "6kW",
        name: "AC Combiner Box (6kW)",
        price: "K 4,000.00",
        description: "AC distribution and inverter protection for 6kW hybrid systems."
      },
      {
        id: "8kw",
        label: "8kW",
        name: "AC Combiner Box (8kW)",
        price: "K 4,000.00",
        description: "AC distribution and inverter protection for 8kW hybrid systems."
      }
    ]
  },
  {
    name: "Battery Cable with Lug",
    slug: "battery-cable-with-lug",
    category: "Accessories",
    description: "High-quality copper cable with pre-attached lugs for secure battery connections.",
    price: "K 1,000.00",
    features: ["Flexible Copper Wire", "Corrosion-Resistant Lugs", "Available in various lengths", "Ensures minimal power loss"],
    image: "/images/products/bat with lugs.png",
    aiHint: "copper cable",
    inStock: true
  },
  {
    name: "Disconnect Box 160A 48VDC",
    slug: "disconnect-box-160a-48vdc",
    category: "Accessories",
    description: "Safety disconnect switch for your 48V battery system.",
    price: "K 1,200.00",
    features: ["160A Rating", "48V DC Compatible", "Lockable Handle", "Essential Safety Device"],
    image: "/images/products/disconnector box.png",
    aiHint: "switch box",
    inStock: true
  },
  {
    name: "Riken Fuse 160A",
    slug: "riken-fuse-160a",
    category: "Accessories",
    description: "Reliable 160A fuse for protecting your solar components.",
    price: "K 160.00",
    features: ["160A Current Rating", "High-quality construction", "Protects against overcurrents", "Essential for system safety"],
    image: "/images/products/fuse.png",
    aiHint: "electrical fuse",
    inStock: true
  },
  {
    name: "IBR / Corrugated / Harvey - 4P Mounting Structure",
    slug: "ibr-corr-harvey-4p-mounting-structure",
    category: "Accessories",
    description: "Mounting structure for 4 panels on IBR, Corrugated, or Harvey tile roofs.",
    price: "K 2,200.00",
    features: ["For 4 Panels", "Suits metal sheet roofs", "Durable Aluminum", "Weather Resistant"],
    image: "/images/products/ibr.jpg",
    aiHint: "metal rack",
    inStock: true
  },
  {
    name: "Tile Roof - 4P Mounting Structure",
    slug: "tile-4p-mounting-structure",
    category: "Accessories",
    description: "Specialized mounting structure for 4 panels on tile roofs.",
    price: "K 2,600.00",
    features: ["For 4 Panels", "Designed for tile roofs", "Secure and Reliable", "Prevents roof damage"],
    image: "/images/products/tile-roof-mount.jpg",
    aiHint: "roof mount",
    inStock: true
  },
  {
    name: "200M Black - 6mm PV Cable",
    slug: "200m-black-6mm-pv-cable",
    category: "Accessories",
    description: "200-meter roll of black 6mm solar PV cable.",
    price: "K 4,000.00",
    features: ["200m Length", "6mm Gauge", "UV Resistant", "Double Insulated"],
    image: "/images/products/pv black.jpeg",
    aiHint: "black wire",
    inStock: true
  },
  {
    name: "200M Red - 6mm PV Cable",
    slug: "200m-red-6mm-pv-cable",
    category: "Accessories",
    description: "200-meter roll of red 6mm solar PV cable.",
    price: "K 4,000.00",
    features: ["200m Length", "6mm Gauge", "UV Resistant", "Double Insulated"],
    image: "/images/products/pv red.jpg",
    aiHint: "red wire",
    inStock: true
  },
  {
    name: "1M PV Cable Red (Per Meter)",
    slug: "1m-pv-cable-red-per-meter",
    category: "Accessories",
    description: "Red 6mm solar PV cable sold by the meter.",
    price: "K 35.00",
    features: ["Sold Per Meter", "6mm Gauge", "UV Resistant", "For custom lengths"],
    image: "/images/products/1m red.jpeg",
    aiHint: "red wire",
    inStock: true
  },
  {
    name: "1M PV Cable Black (Per Meter)",
    slug: "1m-pv-cable-black-per-meter",
    category: "Accessories",
    description: "Black 6mm solar PV cable sold by the meter.",
    price: "K 35.00",
    features: ["Sold Per Meter", "6mm Gauge", "UV Resistant", "For custom lengths"],
    image: "/images/products/1m black.png",
    aiHint: "black wire",
    inStock: true
  },
  {
    name: "MC4 Male & Female Connectors Set",
    slug: "mc4-male-female-connector",
    category: "Accessories",
    description: "Standard MC4 connectors for secure, weatherproof PV cable connections.",
    price: "K 30.00",
    features: ["Male & Female Pair", "IP67 Waterproof", "Easy to install", "Universal compatibility"],
    image: "/images/products/mc4-set.jpg",
    aiHint: "electrical connector",
    inStock: true
  },
  {
    name: "Eclipse Wall Mount Steel Bracket",
    slug: "eclipse-wall-mount-steel-bracket",
    category: "Accessories",
    description: "Sturdy steel wall mounting bracket for batteries or inverters.",
    price: "K 450.00",
    features: ["Heavy-duty Steel", "Wall Mountable", "Saves floor space", "Durable powder coating"],
    image: "/images/products/brackets.jpg",
    aiHint: "metal bracket",
    inStock: true
  },
  {
    name: "SSRE Cable - Battery to Battery Interlink",
    slug: "ssre-cable-battery-to-battery",
    category: "Accessories",
    description: "Short cable for safely connecting SSRE batteries in parallel.",
    price: "K 2,100.00",
    features: ["For Battery Interconnection", "Proper Gauge", "Pre-crimped Lugs", "Ensures safe connection"],
    image: "/images/products/ssre bat.jpeg",
    aiHint: "short cable",
    inStock: true
  },
  {
    name: "SSRE Cable Kit with Lugs",
    slug: "ssre-cable-kit-with-lugs",
    category: "Accessories",
    description: "Complete cable kit for connecting your SSRE battery bank to an inverter.",
    price: "K 2,000.00",
    features: ["Complete Kit", "Inverter to Battery", "Includes Lugs", "Simplifies Installation"],
    image: "/images/products/ssre kit.jpeg",
    aiHint: "cable kit",
    inStock: true
  }
];
