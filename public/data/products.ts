
export type Product = {
  name: string;
  slug: string;
  category: "Panels" | "Batteries" | "Inverters" | "Accessories" | "Portable";
  description: string;
  longDescription?: string;
  price: string;
  features: string[];
  whatsInTheBox?: string[];
  warranty?: string;
  image: string;
  aiHint: string;
};

export const PRODUCTS: Product[] = [
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
    aiHint: "ja solar 605w bifacial panels"
  },
  {
    name: "Greenrich UP5000 Lithium Battery",
    slug: "greenrich-up5000-lithium-battery",
    category: "Batteries",
    description: "Reliable and efficient 5kWh lithium battery from Greenrich, perfect for residential solar systems.",
    longDescription: "The Greenrich UP5000 is a top-tier 48V LFP battery module. It's designed for reliability and a long service life, making it a perfect match for residential energy storage systems. Its modular design allows for easy expansion.",
    price: "K 19,394.00",
    features: ["4.8kWh Nominal Energy", "51.2V System", "100Ah Capacity", "Long Cycle Life (6000+ cycles)", "CAN/RS485 Communication"],
    whatsInTheBox: ["1 x Greenrich UP5000 Battery Module", "1 x Inter-battery connection cable set", "1 x User Manual"],
    warranty: "10-Year Manufacturer's Warranty.",
    image: "/images/products/UP5000.png",
    aiHint: "solar battery"
  },
  {
    name: "Greenrich WM5000 Wall Mounting Lithium Battery",
    slug: "greenrich-wm5000-wall-mounting-lithium-battery",
    category: "Batteries",
    description: "A space-saving wall-mountable 5kWh lithium battery. Sleek design and powerful performance.",
    price: "K 20,606.00",
    features: ["4.8kWh Nominal Energy", "Wall-Mount Design", "Integrated BMS", "Parallel Connection up to 16 units"],
    whatsInTheBox: ["1 x Greenrich WM5000 Battery", "1 x Wall mounting bracket", "Communication Cables", "User Manual"],
    warranty: "10-Year Manufacturer's Warranty.",
    image: "/images/products/Battery.png",
    aiHint: "wall battery"
  },
  {
    name: "Greenrich UP6100 Lithium Battery",
    slug: "greenrich-up6100-lithium-battery",
    category: "Batteries",
    description: "A higher capacity 6.1kWh lithium battery for more demanding energy needs.",
    price: "K 23,939.00",
    features: ["6.1kWh Nominal Energy", "51.2V System", "120Ah Capacity", "High-Performance Cells"],
    image: "/images/products/UP6100.png",
    aiHint: "solar battery"
  },
  {
    name: "SSRE EU10K 10kWh Battery",
    slug: "ssre-eu10k-10kwh-battery",
    category: "Batteries",
    description: "A high-capacity 10kWh battery from SSRE, ideal for larger homes and small businesses.",
    price: "K 37,878.00",
    features: ["10.24kWh Nominal Energy", "51.2V System", "200Ah Capacity", "Robust and reliable"],
    image: "/images/products/10k.png",
    aiHint: "large battery"
  },
  {
    name: "Growatt SPF5000 Inverter",
    slug: "growatt-spf5000-inverter",
    category: "Inverters",
    description: "A reliable 5kW off-grid inverter from Growatt, known for its robust performance.",
    price: "K 10,600.00",
    features: ["5kW Power Output", "48V System", "High PV input voltage", "Built-in MPPT controller", "Parallel capability up to 6 units"],
    whatsInTheBox: ["1 x Growatt SPF5000 Inverter", "1 x User Manual & Installation Guide", "Wi-Fi Dongle (optional)"],
    warranty: "5-Year Standard Manufacturer Warranty.",
    image: "/images/products/growatt.png",
    aiHint: "power inverter"
  },
  {
    name: "Greenrich Hybrid Inverter 6kW",
    slug: "greenrich-hybrid-inverter-6kw",
    category: "Inverters",
    description: "A powerful 6kW hybrid inverter from Greenrich, perfect for residential and small commercial use.",
    price: "K 26,000.00",
    features: ["6kW Hybrid Inverter", "48V System", "Pure Sine Wave", "Parallel capability"],
    image: "/images/products/Greenrich inverter.jpg",
    aiHint: "hybrid inverter"
  },
  {
    name: "Greenrich Hybrid Inverter 8kW",
    slug: "greenrich-hybrid-inverter-8kw",
    category: "Inverters",
    description: "An 8kW hybrid inverter from Greenrich, offering high performance for larger systems.",
    price: "K 39,500.00",
    features: ["8kW Hybrid Inverter", "48V System", "Advanced MPPT tracking", "Grid-tie with backup"],
    image: "/images/products/Greenrich inverter.jpg",
    aiHint: "large inverter"
  },
  {
    name: "KAPA Energie Q300 Portable Power Station",
    slug: "kapa-energie-q300-portable-power-station",
    category: "Portable",
    description: "Compact and lightweight power station for camping, and emergencies.",
    price: "K 4,303.43",
    features: ["300W Output", "Multiple Charging Ports", "Solar Charging Ready", "Easy to carry"],
    image: "/images/products/Q300.png",
    aiHint: "portable power"
  },
  {
    name: "KAPA Energie Q600 Portable Power Station",
    slug: "kapa-energie-q600-portable-power-station",
    category: "Portable",
    description: "A versatile and powerful portable power station for all your outdoor adventures.",
    price: "K 7,620.66",
    features: ["600W Output", "AC/DC/USB Ports", "LCD Display", "Fast Recharging"],
    image: "/images/products/Q600.png",
    aiHint: "portable power"
  },
  {
    name: "KAPA Energie Q2400 Portable Power Station",
    slug: "kapa-energie-q2400-portable-power-station",
    category: "Portable",
    description: "High-capacity power station to run demanding appliances and tools off-grid.",
    price: "K 26,896.44",
    features: ["2400W High Power Output", "Large Battery Capacity", "UPS Functionality", "Pure Sine Wave"],
    image: "/images/products/Q2400.png",
    aiHint: "large powerstation"
  },
  {
    name: "Kapa Energie-Li 1000",
    slug: "kapa-energie-li-1000",
    category: "Portable",
    description: "A reliable lithium-based portable power solution with a built-in inverter.",
    price: "K 15,689.59",
    features: ["1000W Inverter", "Lithium Battery", "Compact Design", "Solar Compatible"],
    image: "/images/products/Kapa+Li.png",
    aiHint: "power station"
  },
  {
    name: "Kapa Engeries 1000 (Gel Battery)",
    slug: "kapa-energies-1000-gel-battery",
    category: "Portable",
    description: "An affordable 1000W portable power station with a durable Gel battery.",
    price: "K 10,086.16",
    features: ["1000W Inverter", "Deep Cycle Gel Battery", "Multiple Outputs", "Cost-Effective"],
    image: "/images/products/gel.jpg",
    aiHint: "power station"
  },
  {
    name: "DC Combiner Box",
    slug: "dc-combiner-box",
    category: "Accessories",
    description: "Heavy-duty DC combiner box for solar PV arrays with integrated surge protection and DC disconnects. Select size (5kW, 6kW, or 8kW).",
    price: "K 5,000.00",
    features: [
      "Selectable 5kW, 6kW, or 8kW Array Ratings",
      "Type-II DC Surge Protection Device (SPD)",
      "High-Voltage DC String Breakers & Fuses",
      "IP65 Weatherproof & UV-Resistant Enclosure",
      "Pre-wired & Tested for Fast Commissioning"
    ],
    image: "/images/products/pv.jpg",
    aiHint: "electrical box"
  },
  {
    name: "AC Combiner Box",
    slug: "ac-combiner-box",
    category: "Accessories",
    description: "Distribution board (DB) AC combiner box with circuit breakers and surge protection for hybrid solar inverters. Select size (5kW, 6kW, or 8kW).",
    price: "K 4,000.00",
    features: [
      "Selectable 5kW, 6kW, or 8kW System Ratings",
      "AC Overcurrent & Short-Circuit Breakers",
      "Type-II AC Surge Protection Device (SPD)",
      "Bypass / Manual Changeover Switch Support",
      "Flame-Retardant Surface-Mounted Enclosure"
    ],
    image: "/images/products/combiner-box1.jpeg",
    aiHint: "circuit breaker"
  },
  {
    name: "Battery Cable with Lug",
    slug: "battery-cable-with-lug",
    category: "Accessories",
    description: "High-quality copper cable with pre-attached lugs for secure battery connections.",
    price: "K 1,542.39",
    features: ["Flexible Copper Wire", "Corrosion-Resistant Lugs", "Available in various lengths", "Ensures minimal power loss"],
    image: "/images/products/bat with lugs.png",
    aiHint: "copper cable"
  },
  {
    name: "Disconnect Box 160A 48VDC",
    slug: "disconnect-box-160a-48vdc",
    category: "Accessories",
    description: "Safety disconnect switch for your 48V battery system.",
    price: "K 1,679.99",
    features: ["160A Rating", "48V DC Compatible", "Lockable Handle", "Essential Safety Device"],
    image: "/images/products/disconnector box.png",
    aiHint: "switch box"
  },
  {
    name: "Riken Fuse 160A",
    slug: "riken-fuse-160a",
    category: "Accessories",
    description: "Reliable 160A fuse for protecting your solar components.",
    price: "K 169.60",
    features: ["160A Current Rating", "High-quality construction", "Protects against overcurrents", "Essential for system safety"],
    image: "/images/products/fuse.png",
    aiHint: "electrical fuse"
  },
  {
    name: "IBR / CORR / HARVEY - 4P - MOUNTING STRUCTURE",
    slug: "ibr-corr-harvey-4p-mounting-structure",
    category: "Accessories",
    description: "Mounting structure for 4 panels on IBR, Corrugated, or Harvey tile roofs.",
    price: "K 2,815.99",
    features: ["For 4 Panels", "Suits metal sheet roofs", "Durable Aluminum", "Weather Resistant"],
    image: "/images/products/ibr.jpg",
    aiHint: "metal rack"
  },
  {
    name: "TILE - 4P - MOUNTING STRUCTURE",
    slug: "tile-4p-mounting-structure",
    category: "Accessories",
    description: "Specialized mounting structure for 4 panels on tile roofs.",
    price: "K 4,614.38",
    features: ["For 4 Panels", "Designed for tile roofs", "Secure and Reliable", "Prevents roof damage"],
    image: "/images/products/tile-roof-mount.jpg",
    aiHint: "roof mount"
  },
  {
    name: "200M-BLACK - 6mm PV Cable",
    slug: "200m-black-6mm-pv-cable",
    category: "Accessories",
    description: "200-meter roll of black 6mm solar PV cable.",
    price: "K 5,605.20",
    features: ["200m Length", "6mm Gauge", "UV Resistant", "Double Insulated"],
    image: "/images/products/pv black.jpeg",
    aiHint: "black wire"
  },
  {
    name: "200M RED - 6mm PV Cable",
    slug: "200m-red-6mm-pv-cable",
    category: "Accessories",
    description: "200-meter roll of red 6mm solar PV cable.",
    price: "K 5,605.20",
    features: ["200m Length", "6mm Gauge", "UV Resistant", "Double Insulated"],
    image: "/images/products/pv red.jpg",
    aiHint: "red wire"
  },
  {
    name: "1M-PV Cable-RED Per Meter",
    slug: "1m-pv-cable-red-per-meter",
    category: "Accessories",
    description: "Red 6mm solar PV cable sold by the meter.",
    price: "K 35.00",
    features: ["Sold Per Meter", "6mm Gauge", "UV Resistant", "For custom lengths"],
    image: "/images/products/1m red.jpeg",
    aiHint: "red wire"
  },
  {
    name: "1M- PV Cable-Black Per Meter",
    slug: "1m-pv-cable-black-per-meter",
    category: "Accessories",
    description: "Black 6mm solar PV cable sold by the meter.",
    price: "K 35.00",
    features: ["Sold Per Meter", "6mm Gauge", "UV Resistant", "For custom lengths"],
    image: "/images/products/1m black.png",
    aiHint: "black wire"
  },
  {
    name: "MC4 Male & Female Connector",
    slug: "mc4-male-female-connector",
    category: "Accessories",
    description: "Standard MC4 connectors for secure, weatherproof PV cable connections.",
    price: "K 35.20",
    features: ["Male & Female Pair", "IP67 Waterproof", "Easy to install", "Universal compatibility"],
    image: "/images/products/mc4-set.jpg",
    aiHint: "electrical connector"
  },
  {
    name: "Eclipse Wall Mount Steel Bracket",
    slug: "eclipse-wall-mount-steel-bracket",
    category: "Accessories",
    description: "Sturdy steel wall mounting bracket for batteries or inverters.",
    price: "K 480.00",
    features: ["Heavy-duty Steel", "Wall Mountable", "Saves floor space", "Durable powder coating"],
    image: "/images/products/brackets.jpg",
    aiHint: "metal bracket"
  },
{
    name: "SSRE Cable - Battery to Battery",
    slug: "ssre-cable-battery-to-battery",
    category: "Accessories",
    description: "Short cable for safely connecting SSRE batteries in parallel.",
    price: "K 2,398.39",
    features: ["For Battery Interconnection", "Proper Gauge", "Pre-crimped Lugs", "Ensures safe connection"],
    image: "/images/products/ssre bat.jpeg",
    aiHint: "short cable"
},
{
    name: "SSRE Cable Kit with lugs",
    slug: "ssre-cable-kit-with-lugs",
    category: "Accessories",
    description: "Complete cable kit for connecting your SSRE battery bank to an inverter.",
    price: "K 3,013.20",
    features: ["Complete Kit", "Inverter to Battery", "Includes Lugs", "Simplifies Installation"],
    image: "/images/products/ssre kit.jpeg",
    aiHint: "cable kit"
  }
];
