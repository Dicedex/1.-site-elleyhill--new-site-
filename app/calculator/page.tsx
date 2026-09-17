"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { APPLIANCE_DATA } from "@/data/appliances";
import { PRODUCTS } from "@/data/products";

interface SelectedAppliance {
  name: string;
  wattage: number;
  qty: number;
}

const hoursMapping: Record<number, number> = {
  1: 4,
  2: 8,
  3: 12,
  4: 24,
};

export default function SolarCalculatorPage() {
  const [profile, setProfile] = useState<"household" | "company" | "industrial">("household");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sliderVal, setSliderVal] = useState<number>(2);

  // Initial preset for household
  const [selectedItems, setSelectedItems] = useState<SelectedAppliance[]>([
    { name: "LED Bulb", wattage: 10, qty: 10 },
    { name: "Television (LED)", wattage: 100, qty: 2 },
    { name: "Refrigerator (Double Door)", wattage: 250, qty: 1 },
    { name: "Deep Freezer", wattage: 200, qty: 1 },
    { name: "Router", wattage: 10, qty: 1 },
    { name: "Water Pump (1 HP)", wattage: 750, qty: 1 },
    { name: "Microwave (Standard)", wattage: 1100, qty: 0 },
    { name: "Air Conditioner (1.5 Ton)", wattage: 1600, qty: 0 },
  ]);

  const updateQty = (name: string, delta: number) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, qty: Math.max(0, item.qty + delta) } : item
      )
    );
  };

  const addItem = (app: { name: string; wattage: number }) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.name === app.name);
      if (existing) {
        return prev.map((i) => (i.name === app.name ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { name: app.name, wattage: app.wattage, qty: 1 }];
    });
    setSearchQuery("");
  };

  const removeItem = (name: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.name !== name));
  };

  // Switch profile preset
  const switchProfile = (newProfile: "household" | "company" | "industrial") => {
    setProfile(newProfile);
    if (newProfile === "household") {
      setSelectedItems([
        { name: "LED Bulb", wattage: 10, qty: 10 },
        { name: "Television (LED)", wattage: 100, qty: 2 },
        { name: "Refrigerator (Double Door)", wattage: 250, qty: 1 },
        { name: "Deep Freezer", wattage: 200, qty: 1 },
        { name: "Router", wattage: 10, qty: 1 },
        { name: "Water Pump (1 HP)", wattage: 750, qty: 1 },
      ]);
    } else if (newProfile === "company") {
      setSelectedItems([
        { name: "Desktop Computer", wattage: 200, qty: 8 },
        { name: "Office LED Lights", wattage: 12, qty: 20 },
        { name: "Server Rack (Standard)", wattage: 1500, qty: 1 },
        { name: "Split Air Conditioner", wattage: 1500, qty: 2 },
        { name: "Network Switch (24-port)", wattage: 60, qty: 2 },
        { name: "Wi-Fi Router", wattage: 15, qty: 2 },
        { name: "Multifunction Printer/Copier", wattage: 600, qty: 1 },
      ]);
    } else {
      setSelectedItems([
        { name: "3-Phase Motor (5 HP)", wattage: 3700, qty: 1 },
        { name: "Air Compressor (5 HP)", wattage: 4000, qty: 1 },
        { name: "Industrial Water Pump (5 HP)", wattage: 4000, qty: 1 },
        { name: "High-Bay LED Lighting", wattage: 150, qty: 12 },
        { name: "Welding Machine (Arc)", wattage: 5000, qty: 0 },
      ]);
    }
  };

  // Search through all appliances in the current profile
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const pool = APPLIANCE_DATA[profile] || [];
    return pool
      .filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 8);
  }, [profile, searchQuery]);

  // Calculations
  const totalWatts = selectedItems.reduce((acc, curr) => acc + curr.wattage * curr.qty, 0);
  const runningKw = (totalWatts / 1000).toFixed(2);
  const peakLoadKw = totalWatts > 0 ? ((totalWatts * 1.5) / 1000).toFixed(1) : "0.0";
  const peakLoadNum = parseFloat(peakLoadKw);

  // Recommended Inverter
  let recommendedInverter = "6.0";
  let recommendedProduct = PRODUCTS.find((p) => p.slug === "6kw-standard-home-comfort-kit" || p.slug === "5kw-standard-home-comfort-kit") || PRODUCTS[0];

  if (peakLoadNum > 15.0) {
    recommendedInverter = "20.0";
    recommendedProduct = PRODUCTS.find((p) => p.slug === "greenrich-hybrid-inverter-8kw") || PRODUCTS[0];
  } else if (peakLoadNum > 8.0) {
    recommendedInverter = "12.0";
    recommendedProduct = PRODUCTS.find((p) => p.slug === "greenrich-hybrid-inverter-8kw") || PRODUCTS[0];
  } else if (peakLoadNum > 5.0) {
    recommendedInverter = "8.0";
    recommendedProduct = PRODUCTS.find((p) => p.slug === "greenrich-hybrid-inverter-8kw") || PRODUCTS[0];
  } else if (peakLoadNum > 3.5) {
    recommendedInverter = "6.0";
    recommendedProduct = PRODUCTS.find((p) => p.slug === "greenrich-hybrid-inverter-6kw") || PRODUCTS[0];
  } else {
    recommendedInverter = "6.0";
    recommendedProduct = PRODUCTS.find((p) => p.slug === "6kw-standard-home-comfort-kit" || p.slug === "5kw-standard-home-comfort-kit") || PRODUCTS[0];
  }

  const hours = hoursMapping[sliderVal] || 8;
  const estDailyDrawKwh = (totalWatts > 0 ? (totalWatts * hours * 0.5) / 1000 : 0).toFixed(1);
  const batteryRequiredKwh = (parseFloat(estDailyDrawKwh) * 1.25).toFixed(1);

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col">
      <main className="flex-grow pt-[80px] md:pt-[100px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-stack-lg">
        {/* Wizard Header & Profile Switcher */}
        <div className="mb-stack-lg flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary uppercase tracking-tight">
                Solar System Sizing Calculator
              </h1>
              <p className="text-on-surface-variant font-body-sm mt-1">
                Engineered for load shedding in Zambia. Select your property profile and appliances to estimate load and recommended system specs.
              </p>
            </div>

            {/* Profile Selector */}
            <div className="inline-flex bg-surface-container-low p-1.5 rounded-full border border-border-light shrink-0">
              <button
                onClick={() => switchProfile("household")}
                className={`px-4 py-2 rounded-full font-label-cta text-xs transition-colors ${
                  profile === "household"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                Residential
              </button>
              <button
                onClick={() => switchProfile("company")}
                className={`px-4 py-2 rounded-full font-label-cta text-xs transition-colors ${
                  profile === "company"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                Commercial / Office
              </button>
              <button
                onClick={() => switchProfile("industrial")}
                className={`px-4 py-2 rounded-full font-label-cta text-xs transition-colors ${
                  profile === "industrial"
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                Industrial / Farm
              </button>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Appliance Inventory (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-stack-lg">
            {/* Appliance Search & Add Bar */}
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-5 shadow-sm relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-headline-md text-base text-primary font-bold">
                  Add Appliances from Database ({APPLIANCE_DATA[profile].length} Available)
                </h3>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${profile} appliances (e.g. Fridge, Pump, AC, Motor)...`}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-bright border border-border-light rounded-xl text-body-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Search Dropdown Results */}
              {searchResults.length > 0 && (
                <div className="absolute left-5 right-5 top-full mt-1 bg-surface-container-lowest border border-border-light rounded-xl shadow-xl z-30 max-h-60 overflow-y-auto divide-y divide-border-light">
                  {searchResults.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => addItem(item)}
                      className="px-4 py-3 flex justify-between items-center hover:bg-surface-container-low cursor-pointer transition-colors"
                    >
                      <span className="font-body-sm font-medium text-primary">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-technical-data">
                          {item.wattage} W
                        </span>
                        <span className="material-symbols-outlined text-primary-green text-sm">add_circle</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Configured Appliances List */}
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-border-light pb-3">
                <span className="font-technical-data text-xs uppercase tracking-wider text-on-surface-variant">
                  Selected Equipment ({selectedItems.filter((i) => i.qty > 0).length} Active)
                </span>
                <span className="font-technical-data text-xs text-primary font-bold">
                  Total Running: {runningKw} kW
                </span>
              </div>

              <div className="divide-y divide-border-light">
                {selectedItems.map((item) => (
                  <div key={item.name} className="py-3 flex justify-between items-center gap-4">
                    <div className="flex flex-col">
                      <span className="font-body-sm font-medium text-primary">{item.name}</span>
                      <span className="text-xs text-on-surface-variant font-technical-data">
                        {item.wattage}W each &bull; Total: {item.wattage * item.qty}W
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Counter Controls */}
                      <div className="flex items-center border border-border-light rounded-full overflow-hidden bg-surface-bright">
                        <button
                          onClick={() => updateQty(item.name, -1)}
                          className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container transition-colors disabled:opacity-30"
                          disabled={item.qty === 0}
                          aria-label={`Decrease ${item.name}`}
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-8 text-center font-technical-data text-sm font-bold text-primary">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.name, 1)}
                          className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container transition-colors"
                          aria-label={`Increase ${item.name}`}
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.name)}
                        className="text-on-surface-variant hover:text-red-500 p-1 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Load Shedding Duration Slider */}
            <div className="bg-surface-container-lowest border border-border-light rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-headline-md text-base text-primary">
                    Required Load-Shedding Backup Hours
                  </h4>
                  <p className="text-xs text-on-surface-variant font-body-sm">
                    How many hours of grid outage do you need battery power for each day?
                  </p>
                </div>
                <span className="bg-primary text-on-primary font-technical-data text-sm font-bold px-3 py-1 rounded-full">
                  {hours} Hours
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={sliderVal}
                onChange={(e) => setSliderVal(parseInt(e.target.value))}
                className="w-full accent-primary-green cursor-pointer h-2 bg-surface-container-high rounded-full"
              />

              <div className="flex justify-between text-xs text-on-surface-variant font-technical-data mt-2">
                <span>4h (Standard)</span>
                <span>8h (Frequent Outages)</span>
                <span>12h (Severe Outages)</span>
                <span>24h (100% Off-Grid)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Recommendation Board (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-stack-md lg:sticky lg:top-24">
            <div className="bg-surface-container-lowest border border-border-light rounded-2xl p-6 shadow-sm flex flex-col gap-6">
              <div className="border-b border-border-light pb-4">
                <span className="text-xs font-technical-data uppercase tracking-wider text-on-surface-variant block mb-1">
                  Live System Sizing
                </span>
                <h3 className="font-display-hero text-headline-md text-primary font-bold">
                  Recommended System Specs
                </h3>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface-bright border border-border-light rounded-xl">
                  <span className="text-xs text-on-surface-variant uppercase font-technical-data block">
                    Connected Load
                  </span>
                  <span className="font-display-hero text-2xl text-primary font-bold">
                    {totalWatts} W
                  </span>
                  <span className="text-[11px] text-on-surface-variant block mt-1">
                    Continuous draw
                  </span>
                </div>

                <div className="p-4 bg-surface-bright border border-border-light rounded-xl">
                  <span className="text-xs text-on-surface-variant uppercase font-technical-data block">
                    Est. Surge Peak
                  </span>
                  <span className="font-display-hero text-2xl text-primary font-bold">
                    {peakLoadKw} kW
                  </span>
                  <span className="text-[11px] text-on-surface-variant block mt-1">
                    Motor inrush headroom
                  </span>
                </div>

                <div className="p-4 bg-primary-green/10 border border-primary-green/30 rounded-xl">
                  <span className="text-xs text-primary uppercase font-technical-data block font-bold">
                    Rec. Inverter
                  </span>
                  <span className="font-display-hero text-2xl text-primary font-bold">
                    {recommendedInverter} kW
                  </span>
                  <span className="text-[11px] text-on-surface-variant block mt-1">
                    Pure Sine Wave Hybrid
                  </span>
                </div>

                <div className="p-4 bg-accent-yellow/20 border border-accent-yellow/50 rounded-xl">
                  <span className="text-xs text-primary uppercase font-technical-data block font-bold">
                    Rec. Battery
                  </span>
                  <span className="font-display-hero text-2xl text-primary font-bold">
                    {batteryRequiredKwh} kWh
                  </span>
                  <span className="text-[11px] text-on-surface-variant block mt-1">
                    LiFePO4 Lithium (80% DoD)
                  </span>
                </div>
              </div>

              {/* Recommended Hardware Card */}
              <div className="p-5 bg-surface-container-low border border-border-light rounded-2xl flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-green text-xl">
                    check_circle
                  </span>
                  <span className="font-label-cta text-xs uppercase tracking-wider text-primary font-bold">
                    Best Matching Hardware
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.name}
                    className="w-16 h-16 object-contain bg-white rounded-lg p-2 border border-border-light"
                  />
                  <div className="flex flex-col flex-1">
                    <span className="font-display-hero text-sm font-bold text-primary line-clamp-1">
                      {recommendedProduct.name}
                    </span>
                    <span className="text-xs text-on-surface-variant font-technical-data">
                      {recommendedProduct.category}
                    </span>
                    <span className="font-display-hero text-base font-bold text-primary mt-1">
                      {recommendedProduct.price}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href={
                      recommendedProduct.slug === "6kw-standard-home-comfort-kit" ||
                      recommendedProduct.slug === "5kw-standard-home-comfort-kit"
                        ? "/products/5kw-standard-home-comfort-kit"
                        : `/products/${recommendedProduct.slug}`
                    }
                    className="w-full bg-accent-yellow text-primary font-label-cta text-xs py-3 px-4 rounded-full text-center hover:scale-95 duration-100 transition-transform font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>VIEW RECOMMENDED BUNDLE</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </Link>

                  <a
                    href={`https://wa.me/260971838038?text=${encodeURIComponent(
                      `Hello Elleyhill Power, I calculated my load at ${totalWatts}W with ${hours}h backup requirement. My sizing recommends ${recommendedInverter}kW inverter with ${batteryRequiredKwh}kWh battery storage. Please advise on custom quotation.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-status-success text-white font-label-cta text-xs py-3 px-4 rounded-full text-center hover:scale-95 duration-100 transition-transform font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">chat</span>
                    <span>SHARE SIZING VIA WHATSAPP</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
