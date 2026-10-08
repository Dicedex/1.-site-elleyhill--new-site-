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
    name: "Pylontech Battery Pelio 5.12Kwh (Lifepo4) 1C",
    slug: "pylontech-battery-pelio-5-12kwh-lifepo4-1c",
    category: "Batteries",
    description: "Ultra-slim 5.12kWh 51.2V LiFePO4 residential battery with 1C continuous discharge rate, 95% DoD, and IP65 indoor/outdoor rating.",
    longDescription: "The Pylontech Pelio-L-5.12 is an ultra-slim, high-performance 5.12kWh 51.2V Lithium Iron Phosphate (LiFePO4) battery module engineered for modern residential and light commercial solar installations in Zambia. Boasts a full 1C continuous charge/discharge rating (5.12kW output per unit), 95% usable Depth of Discharge, 6,000+ cycle life, built-in Wi-Fi for 24/7 cloud monitoring, and modular expansion up to 20 units (102.4 kWh).",
    price: "K 16,236.00",
    features: [
      "5.12 kWh Nominal Capacity (51.2V, 100Ah LiFePO4)",
      "1C High-Rate Continuous Charge & Discharge (5.12kW Output)",
      "95% Usable Depth of Discharge (DoD)",
      "6,000+ Cycles at 25°C with Grade-A LiFePO4 Chemistry",
      "Ultra-Slim Modern Form Factor (Floor or Wall Mountable)",
      "Scalable up to 20 Modules in Parallel (102.4 kWh Total)",
      "Integrated Wi-Fi for 24/7 Smartphone App Monitoring",
      "IP65 Rated Enclosure for Flexible Indoor or Outdoor Mounting"
    ],
    whatsInTheBox: [
      "1 x Pylontech Pelio-L-5.12 5.12kWh Battery Unit",
      "1 x Inter-Unit Power Connection Cable Set",
      "1 x CAN/RS485 Inverter Communication Cable",
      "1 x Wall / Floor Mounting Hardware Kit",
      "1 x User Manual & Warranty Documentation"
    ],
    warranty: "10-Year Manufacturer Warranty",
    image: "/images/products/pylontech-pelio-5.12kwh.png",
    aiHint: "pylontech pelio 5.12kwh battery",
    inStock: true
  },
  {
    name: "Pylontech Battery Hm3A180 5.6Kw Hv",
    slug: "pylontech-battery-hm3a180-5-6kw-hv",
    category: "Batteries",
    description: "Commercial high-voltage 5.68kWh 38.4V 148Ah LiFePO4 battery module for Pylontech PowerCube industrial energy storage systems.",
    longDescription: "The Pylontech HM3A180 is a high-voltage commercial-grade LiFePO4 battery module delivering 5.68kWh (38.4V, 148Ah) of energy storage. Designed for integration into Pylontech PowerCube M3A high-voltage racks, it powers large-scale 3-phase commercial and industrial solar hybrid systems with unmatched thermal stability, high discharge currents, and multi-tier BMS protection.",
    price: "K 15,560.00",
    features: [
      "5.68 kWh Nominal Energy Storage (38.4V, 148Ah)",
      "High-Voltage (HV) Series Architecture for Commercial Systems",
      "Engineered for Pylontech PowerCube-M3A Industrial Racks",
      "90% Usable Depth of Discharge with LiFePO4 Chemistry",
      "Multi-Tier Intelligent BMS Protection",
      "CANBUS, Modbus RTU & TCP/IP High-Speed Communication",
      "Slide-In Modular Rack Mount Form Factor for Rapid Deployment",
      "Built for High Charge/Discharge Currents in C&I Installations"
    ],
    whatsInTheBox: [
      "1 x Pylontech HM3A180 5.68kWh HV Battery Module",
      "1 x High-Voltage Inter-Module Power Connection Link",
      "1 x Rack Grounding Wire & Communication Link Cable",
      "1 x Technical Manual & QC Report"
    ],
    warranty: "10-Year Manufacturer Warranty",
    image: "/images/products/pylontech-hm3a180.png",
    aiHint: "pylontech hm3a180 hv battery",
    inStock: true
  },
  {
    name: "Champion 1 – 12V 100Ah Gel Battery",
    slug: "champion-1-12v-100ah-gel-battery",
    category: "Batteries",
    description: "Maintenance-free 12V 100Ah deep cycle sealed gel battery engineered for reliable solar backup, UPS, and inverter systems.",
    longDescription: "The Champion 1 12V 100Ah Deep Cycle Gel Battery is a dependable, maintenance-free energy storage unit designed for residential solar backup, inverter trolleys, and UPS systems in Zambia. Utilizes advanced silica gel electrolyte technology for superior deep discharge recovery, minimal self-discharge, and high resilience to temperature variations.",
    price: "K 3,240.00",
    features: [
      "12V 100Ah (1200Wh) Deep Cycle Gel Technology",
      "Maintenance-Free Valve Regulated Sealed (VRLA) Design",
      "Exceptional Recovery from Deep Discharges",
      "Low Self-Discharge Rate for Extended Shelf Life",
      "Heavy-Duty Lead-Calcium Alloy Plates for Long Life",
      "Vibration-Resistant & Leak-Proof Robust ABS Housing",
      "Standard M8 Screw Terminals for Easy Cable Attachment",
      "Ideal for Solar Inverters, Backup Power Stations, & UPS"
    ],
    whatsInTheBox: [
      "1 x Champion 1 12V 100Ah Deep Cycle Gel Battery",
      "2 x Terminal Bolts & Washers (M8)",
      "2 x Terminal Protective Covers",
      "1 x Product Datasheet & Care Instructions"
    ],
    warranty: "1-Year Product Warranty",
    image: "/images/products/champion-12v-100ah-gel.jpg",
    aiHint: "champion 12v 100ah gel battery",
    inStock: true
  },
  {
    name: "Champion 1 – 12.8V 200Ah Lithium",
    slug: "champion-1-12-8v-200ah-lithium-battery",
    category: "Batteries",
    description: "High-capacity 12.8V 200Ah (2560Wh) LiFePO4 lithium battery with built-in smart BMS, 4000+ cycles, and series/parallel support.",
    longDescription: "The Champion 1 12.8V 200Ah Lithium Battery delivers 2560Wh of clean, high-density energy storage using premium Grade-A LiFePO4 cells. Engineered as a lightweight, long-lasting drop-in replacement for bulky lead-acid and gel batteries, it features a built-in Smart BMS with 100A continuous discharge, 400A peak discharge, 4000+ cycle life, and series/parallel connectivity for 24V or 48V battery banks.",
    price: "K 6,700.00",
    features: [
      "12.8V 200Ah (2560Wh) Grade-A LiFePO4 Energy Capacity",
      "4,000+ Deep Cycles at 80% Depth of Discharge",
      "Integrated Smart Battery Management System (BMS)",
      "100A Continuous Discharge / 400A Peak Surge Current",
      "Supports Series & Parallel Configurations (Up to 48V Banks)",
      "Ultralight Design (Up to 70% Lighter Than 200Ah Lead-Acid)",
      "Fast Recharging Capability with Solar or AC Mains Chargers",
      "IP65 Weatherproof Sealed Casing with Carrying Handles"
    ],
    whatsInTheBox: [
      "1 x Champion 1 12.8V 200Ah LiFePO4 Lithium Battery",
      "2 x M8 Terminal Bolts with Lock Washers",
      "1 x User Guide & Battery Configuration Manual"
    ],
    warranty: "3-Year Product Warranty",
    image: "/images/products/champion-12.8v-200ah-lithium.jpg",
    aiHint: "champion 12.8v 200ah lithium battery",
    inStock: true
  },
  {
    name: "Champion 1 – 12.8V 100Ah lithium",
    slug: "champion-1-12-8v-100ah-lithium-battery",
    category: "Batteries",
    description: "Lightweight 12.8V 100Ah (1280Wh) LiFePO4 deep cycle battery with integrated BMS protection and 3500+ cycle life.",
    longDescription: "The Champion 1 12.8V 100Ah Lithium Iron Phosphate (LiFePO4) Battery provides 1280Wh of high-efficiency energy storage for solar installations, backup inverter kits, and mobile power stations. Equipped with a built-in BMS protecting against over-charge, over-discharge, over-current, and short circuits, delivering up to 10x longer cycle life than traditional lead-acid batteries.",
    price: "K 7,100.00",
    features: [
      "12.8V 100Ah (1280Wh) High-Density LiFePO4 Chemistry",
      "3,500+ Deep Cycles at 80% Depth of Discharge",
      "Advanced Built-in Smart BMS for Total Cell Protection",
      "100A Continuous Discharge (300A Surge Peak)",
      "Series Scalable for 12V, 24V, 36V, or 48V Inverter Setups",
      "Drop-in Replacement for 100Ah Gel & AGM Batteries",
      "Rapid Full Recharge in Under 2.5 Hours",
      "Robust IP65 Sealed Casing with Ergonomic Carry Handle"
    ],
    whatsInTheBox: [
      "1 x Champion 1 12.8V 100Ah LiFePO4 Lithium Battery",
      "2 x M8 Terminal Bolts & Insulated Terminal Covers",
      "1 x User & Safety Guide"
    ],
    warranty: "3-Year Product Warranty",
    image: "/images/products/champion-12.8v-100ah-lithium.jpg",
    aiHint: "champion 12.8v 100ah lithium battery",
    inStock: true
  },
  {
    name: "Pylontech Li-ion Battery UF5000 v2",
    slug: "pylontech-li-ion-battery-uf5000-v2",
    category: "Batteries",
    description: "Upgraded 4.8kWh 48V 100Ah rack-mounted LiFePO4 battery module with 95% DoD, 6000+ cycles, and multi-brand inverter communication.",
    longDescription: "The Pylontech UF5000 v2 (UP5000 v2) is a 48V 4.8kWh (100Ah) lithium iron phosphate battery module designed for premium residential and commercial energy storage. Boasting an upgraded BMS, 95% usable Depth of Discharge, 6,000+ cycle life, and seamless CAN/RS485 integration with leading hybrid inverters (Growatt, Deye, Victron, GoodWe). Up to 16 units can be connected in parallel without an external hub.",
    price: "K 18,900.00",
    features: [
      "4.8 kWh Nominal Storage Capacity (48V, 100Ah LiFePO4)",
      "Upgraded V2 High-Efficiency Cell Architecture",
      "95% Usable Depth of Discharge (DoD)",
      "6,000+ Cycles at 90% DoD (25°C ambient)",
      "Standard 19-Inch 3U Rack-Mount Design",
      "Parallel Scalability up to 16 Units per String (76.8 kWh)",
      "Universal Compatibility with Top Tier Hybrid Inverters",
      "Dual CAN / RS485 Communication Ports"
    ],
    whatsInTheBox: [
      "1 x Pylontech UF5000 v2 (48V 100Ah) Lithium Battery",
      "1 x Inter-Battery Power Cable Set (Positive & Negative)",
      "1 x Inter-Battery RJ45 Communication Cable",
      "1 x Grounding Wire & Rack Mounting Ear Brackets",
      "1 x User Manual & Warranty Document"
    ],
    warranty: "10-Year Manufacturer Warranty",
    image: "/images/products/pylontech-uf5000-v2.png",
    aiHint: "pylontech uf5000 v2 battery",
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
    name: "Growcol Offgrid Inverter – Mks Iv 6Kw Twin 48V",
    slug: "growcol-offgrid-inverter-mks-iv-6kw-twin-48v",
    category: "Inverters",
    description: "High-performance 6kW 48V off-grid pure sine wave inverter featuring dual AC outputs for smart load management and wide MPPT solar input.",
    longDescription: "The Growcol MKS IV 6kW Twin is a next-generation off-grid hybrid inverter designed for resilient energy independence in Zambia. Features dual AC outputs (Twin) allowing critical and non-critical loads to be smartly managed. Equipped with an ultra-wide high-voltage MPPT solar charge controller (up to 450VDC), customizable RGB status ring, large color LCD, and built-in Wi-Fi for remote monitoring.",
    price: "K 8,825.00",
    features: [
      "6.0 kW (6000W) Pure Sine Wave Continuous Output",
      "48V DC Battery Architecture",
      "Dual AC Outputs for Smart Load Shedding Management",
      "High-Voltage MPPT (Up to 450VDC / 6000W PV Input)",
      "Customizable RGB LED Status Ring with 4.3\" Color LCD",
      "Built-in Wi-Fi for Android & iOS Mobile Monitoring",
      "Parallel Scalability up to 9 Units (Single & 3-Phase)",
      "Battery-Independent Operation Mode"
    ],
    whatsInTheBox: [
      "1 x Growcol MKS IV 6kW Twin 48V Off-Grid Inverter",
      "1 x Integrated Wi-Fi Communication Module",
      "1 x Current Sharing & Parallel Communication Cables",
      "1 x Wall Mounting Bracket & Hardware",
      "1 x User & Installation Manual"
    ],
    warranty: "2-Year Manufacturer Warranty",
    image: "/images/products/growcol-mks-iv-6kw.png",
    aiHint: "growcol mks iv 6kw inverter",
    inStock: true
  },
  {
    name: "Growcol Offgrid Inverter – Vm 3Kva Value 2.4Kw 24V",
    slug: "growcol-offgrid-inverter-vm-3kva-value-2-4kw-24v",
    category: "Inverters",
    description: "Compact and reliable 3kVA / 2.4kW 24V off-grid pure sine wave inverter with integrated MPPT solar charger and smart battery management.",
    longDescription: "The Growcol VM 3kVA Value is a cost-effective, high-reliability 2.4kW 24V pure sine wave inverter tailored for residential home backup and small business loads in Zambia. Includes an integrated MPPT solar charge controller, configurable AC/Solar input priorities, auto-restart on grid recovery, and comprehensive overcurrent protection.",
    price: "K 4,975.00",
    features: [
      "3000VA / 2400W (2.4kW) Pure Sine Wave Output",
      "24V DC Low-Voltage Battery Interface",
      "Built-in 1000W MPPT Solar Charge Controller",
      "Selectable Input Voltage Range for Appliances & PCs",
      "Configurable AC/Solar Input Priority via LCD",
      "Compatible with Mains Grid Voltage or Generator",
      "Auto-Restart on AC Mains Recovery",
      "Smart Battery Charger to Optimize Battery Performance"
    ],
    whatsInTheBox: [
      "1 x Growcol VM 3kVA (2.4kW) 24V Inverter",
      "1 x AC Input & Battery Connection Terminal Covers",
      "1 x Mounting Hardware Set",
      "1 x User Guide & Warranty Card"
    ],
    warranty: "2-Year Manufacturer Warranty",
    image: "/images/products/growcol-vm-3kva.png",
    aiHint: "growcol vm 3kva inverter",
    inStock: true
  },
  {
    name: "Growcol Offgrid Inverter - Max li 8kw 48v",
    slug: "growcol-offgrid-inverter-max-ii-8kw-48v",
    category: "Inverters",
    description: "Heavy-duty 8kW 48V off-grid pure sine wave inverter with dual MPPTs, high PV capacity, and advanced parallel capability.",
    longDescription: "The Growcol MAX II 8kW 48V is an ultra-high capacity off-grid inverter engineered for demanding residential estates, commercial lodges, and agricultural backup in Zambia. Features dual MPPT solar trackers supporting up to 8000W PV input, a 5-inch color touch LCD with RGB ring, CAN/RS485 BMS communication, and parallel support for up to 6 units.",
    price: "K 17,650.00",
    features: [
      "8000W (8kW) Continuous Pure Sine Wave Output",
      "48V DC Battery System Compatibility",
      "Dual MPPT Solar Trackers (Up to 8000W Max PV Input)",
      "5\" Colored LCD Screen with Touch Interface & LED Ring",
      "Built-in Wi-Fi for Real-Time Remote Monitoring",
      "Battery-Independent Power Delivery Mode",
      "Parallel Scalability up to 6 Units (Single or 3-Phase)",
      "Integrated BMS Communication (CAN-BUS & RS485)"
    ],
    whatsInTheBox: [
      "1 x Growcol MAX II 8kW 48V Off-Grid Inverter",
      "1 x Wi-Fi Antenna / Communication Dongle",
      "1 x Parallel Communication Cable Kit",
      "1 x Heavy-Duty Wall Mounting Bracket & Fasteners",
      "1 x Comprehensive User Manual"
    ],
    warranty: "2-Year Manufacturer Warranty",
    image: "/images/products/growcol-max-ii-8kw.png",
    aiHint: "growcol max 8kw inverter",
    inStock: true
  },
  {
    name: "Mars 5Kw All In One Inverter",
    slug: "mars-5kw-all-in-one-inverter",
    category: "Inverters",
    description: "Integrated 5kW hybrid all-in-one inverter energy storage solution with pure sine wave output, solar MPPT, and instant UPS transfer.",
    longDescription: "The Mars 5kW All-In-One Hybrid Inverter combines a high-efficiency 5000W inverter, intelligent solar MPPT charge controller, and UPS transfer switch into a single streamlined unit. Engineered for seamless residential and commercial backup during load shedding, it seamlessly coordinates energy flow between solar panels, 48V lithium batteries, and the utility grid.",
    price: "K 24,720.00",
    features: [
      "5.0 kW (5000W) Pure Sine Wave Hybrid Inverter",
      "Streamlined All-in-One Compact Architecture",
      "Wide MPPT Voltage Range for Optimized Solar Harvesting",
      "<10ms Seamless UPS Automatic Transfer Switch",
      "48V LiFePO4 Lithium Battery BMS Compatibility",
      "Configurable Priority Modes: Solar, Utility, Generator, Battery",
      "Smart Remote Monitoring via WiFi / RS485 Interface",
      "Comprehensive Overload, Short Circuit & Surge Protection"
    ],
    whatsInTheBox: [
      "1 x Mars 5kW All-In-One Hybrid Inverter",
      "1 x Wi-Fi Communication Module",
      "1 x Wall Mounting Bracket & Fasteners",
      "1 x Battery Connection Cable Kit",
      "1 x User & Installation Manual"
    ],
    warranty: "3-Year Manufacturer Warranty",
    image: "/images/products/mars-5kw-all-in-one.webp",
    aiHint: "mars 5kw hybrid inverter",
    inStock: true
  },
  {
    name: "Goodwe-Et-50Kw-Three Phase-Hybrid Inverter",
    slug: "goodwe-et-50kw-three-phase-hybrid-inverter",
    category: "Inverters",
    description: "Commercial 50kW 3-phase high-voltage hybrid inverter with 4 MPPTs, 150% DC oversizing, and industrial UPS-level backup.",
    longDescription: "The GoodWe ET 50kW (GW50K-ET-10) is a high-voltage commercial and industrial 3-phase hybrid inverter designed for factories, lodges, farms, and large commercial operations in Zambia. Features 4 independent MPPTs, support for up to 75kW PV input (150% oversizing), high-voltage battery storage (200V - 800V DC), peak shaving, and parallel scaling up to 500kW.",
    price: "K 75,900.00",
    features: [
      "50kW (50,000W) Three-Phase Nominal AC Output (GW50K-ET)",
      "Up to 75,000W (150%) DC Solar Array Input Oversizing",
      "4 Independent MPPT Trackers (1000V Max DC Voltage)",
      "High-Voltage Battery Interface (200V - 800V DC)",
      "Max 100A / 55kW Fast Charge and Discharge Rate",
      "UPS-Level Auto Transfer Switching (<10ms with STS)",
      "Intelligent Peak Shaving, Time-of-Use & Generator Integration",
      "Commercial IP66 Weatherproof Aluminum Casing",
      "Parallel Scalable from 50kW up to 500kW Capacity"
    ],
    whatsInTheBox: [
      "1 x GoodWe GW50K-ET 50kW Three-Phase Hybrid Inverter",
      "1 x Wi-Fi / LAN Smart Communication Module",
      "1 x Smart Meter & 3-Phase CT Sensors",
      "1 x Industrial Wall Mounting Bracket & Fixings",
      "1 x Factory Calibration Certificate & Documentation"
    ],
    warranty: "5-Year Standard Manufacturer Warranty",
    image: "/images/products/goodwe-et-50kw.png",
    aiHint: "goodwe 50kw commercial hybrid inverter",
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
    name: "MARS PORTABLE POWER SOLUTION 1000W (EXCL. BATTERY)",
    slug: "mars-portable-power-solution-1000w-excl-battery",
    category: "Portable",
    description: "Compact 1000W plug-and-play portable inverter power solution with multi-output ports and rapid AC/solar charging (sold excluding battery).",
    longDescription: "The Mars Portable Power Solution 1000W is a versatile mobile backup power unit engineered for load shedding, camping, and mobile work stations in Zambia. Designed with an external battery compartment that allows you to connect any 12V Gel, AGM, or Lithium battery of your choice. Delivers clean 1000W pure sine wave electricity to keep TVs, decoders, laptops, lighting, and Wi-Fi routers running seamlessly.",
    price: "K 6,412.00",
    features: [
      "1000W Pure Sine Wave AC Power Output",
      "External Battery Design (Compatible with 12V Gel or Lithium Batteries)",
      "Fast AC Grid Charging & Solar MPPT Input Supported",
      "Multiple 230V AC Sockets, Fast USB Ports, & 12V DC Outlets",
      "Clear LCD Display Showing Real-Time Load & Battery Level",
      "Automatic UPS Transfer Switching (<15ms)",
      "Overload, Overheat, Short Circuit & Deep Discharge Safeguards",
      "Compact, Portable Design with Carrying Handles"
    ],
    whatsInTheBox: [
      "1 x Mars 1000W Portable Power Station Inverter Unit",
      "1 x AC Power Charging Cable",
      "1 x Heavy-Duty Battery Connection Cables with Terminals",
      "1 x User Guide (Note: Battery Sold Separately)"
    ],
    warranty: "1-Year Hardware Warranty",
    image: "/images/products/mars-portable-1000w.png",
    aiHint: "mars portable power 1000w",
    inStock: true
  },
  {
    name: "Mars Portable Power Solution 2000W (Excl. Battery)",
    slug: "mars-portable-power-solution-2000w-excl-battery",
    category: "Portable",
    description: "Versatile 2000W pure sine wave mobile backup trolley with solar MPPT and seamless automatic UPS transfer (sold excl. battery).",
    longDescription: "The Mars Portable Power Solution 2000W is an essential mobile backup solution for Zambian homes and businesses during load shedding. Delivers 2000W of pure sine wave power to run TV entertainment centers, refrigeration, computers, decoders, and home lighting. Features a robust wheeled trolley design with an open battery compartment supporting 24V Gel, AGM, or Lithium battery banks.",
    price: "K 12,075.00",
    features: [
      "2000W Continuous Pure Sine Wave AC Output",
      "External Battery Design (Compatible with 24V Gel or Lithium Batteries)",
      "Integrated AC Grid Fast Charger + Solar MPPT Controller",
      "Instant Automatic UPS Switching During Power Grid Outages",
      "Smooth Heavy-Duty Caster Wheels & Pull Handle for Portability",
      "Large Digital LCD Screen Showing System Status & Battery Voltage",
      "Overload, Overcharge, Short Circuit & High-Temp Safety Protection",
      "Plug & Play Operation with Multiple AC Output Sockets"
    ],
    whatsInTheBox: [
      "1 x Mars 2000W Mobile Inverter Power Station Unit",
      "1 x AC Mains Input Cable",
      "1 x Heavy-Duty Battery Terminal Cables",
      "1 x User & Setup Manual (Note: Battery Sold Separately)"
    ],
    warranty: "1-Year Hardware Warranty",
    image: "/images/products/mars-portable-2000w.jpg",
    aiHint: "mars portable 2000w power solution",
    inStock: true
  },
  {
    name: "Mars Portable Power Solution 3000W (Excl. Battery)",
    slug: "mars-portable-power-solution-3000w-excl-battery",
    category: "Portable",
    description: "Heavy-duty 3000W pure sine wave inverter mobile trolley with solar MPPT, high surge capacity, and automatic UPS backup (excl. battery).",
    longDescription: "The Mars Portable Power Solution 3000W is a heavy-duty mobile backup unit designed for powering demanding home and office equipment including refrigerators, deep freezers, power tools, water dispensers, and office computing setups during load shedding in Zambia. Built on a heavy-duty caster-wheeled trolley with an external battery compartment that accepts 24V or 48V Gel, AGM, or LiFePO4 lithium batteries.",
    price: "K 13,800.00",
    features: [
      "3000W Heavy-Duty Pure Sine Wave Continuous Output",
      "High Surge Capability for Compressors, Fridges & Power Tools",
      "External Battery Architecture (Pair with 24V/48V Lithium or Gel Batteries)",
      "Integrated High-Efficiency Solar MPPT Charge Controller",
      "Automatic Instant Transfer Switch (<15ms) for Continuous Backup",
      "Heavy-Duty Mobile Trolley Frame with 360° Lockable Swivel Wheels",
      "Multi-Function LCD Display for Voltage, Load % & Battery Health",
      "Comprehensive Overload, Short Circuit & Overheat Protection"
    ],
    whatsInTheBox: [
      "1 x Mars 3000W Inverter Trolley Unit",
      "1 x AC Mains Power Cable",
      "1 x Heavy-Gauge Battery Interlink & Connecting Cables",
      "1 x User & Installation Guide (Note: Battery Sold Separately)"
    ],
    warranty: "1-Year Hardware Warranty",
    image: "/images/products/mars-portable-3000w.jpg",
    aiHint: "mars portable 3000w power solution",
    inStock: true
  },
  {
    name: "Jieyo 1200W Portable Power Station",
    slug: "jieyo-1200w-portable-power-station",
    category: "Portable",
    description: "Compact 1200W / 1280Wh LiFePO4 portable power station with ≤10ms UPS transfer, fast AC charging, and multi-port output array.",
    longDescription: "The Jieyo 1200W Portable Power Station (JY1280) is an all-in-one solar-ready mobile energy storage system featuring a 1280Wh Grade-A LiFePO4 battery pack and 1200W pure sine wave inverter. Provides ultra-fast UPS switching (≤10ms) during power cuts, 8,000+ cycle lifespan, 60W USB-C PD fast charging, 12V DC ports, and quick 2-3 hour AC mains recharging.",
    price: "K 7,245.00",
    features: [
      "1200W Continuous Pure Sine Wave AC Power Output",
      "1280Wh High-Capacity Grade-A LiFePO4 Internal Battery",
      "8,000+ Ultra-Long Cycle Life (at 80% DoD)",
      "Bidirectional Inverter for Fast AC Wall Recharging (2-3 Hours)",
      "Ultra-Fast UPS Auto-Switchover (≤10ms Transfer Time)",
      "Full Port Selection: 230V AC Sockets, 60W USB-C PD, USB QC, 12V Car Port",
      "Solar Charging Input Supported (Up to 400W MPPT Solar Input)",
      "Smart Multi-Color LCD Display with Real-Time Wattage & Battery Meter"
    ],
    whatsInTheBox: [
      "1 x Jieyo 1200W (1280Wh) Portable Power Station",
      "1 x AC Wall Charging Cable",
      "1 x 12V Car Charging Cable",
      "1 x Solar MC4 to DC Charging Cable",
      "1 x User Manual & Warranty Card"
    ],
    warranty: "2-Year Product Warranty",
    image: "/images/products/jieyo-1200w-power-station.jpg",
    aiHint: "jieyo 1200w portable power station",
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
