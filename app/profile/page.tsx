"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, SavedAddress } from "@/context/AuthContext";
import {
  User,
  ShieldCheck,
  ShoppingBag,
  MapPin,
  Settings,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  Zap,
  Building2,
  Home,
  Tractor,
  Download,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  AlertCircle,
  FileText,
  BadgeCheck,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    logout,
    updateProfile,
    addSavedAddress,
    deleteSavedAddress,
    setDefaultAddress,
    loginWithDemo,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "warranties" | "addresses" | "settings">("overview");

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddrLabel, setNewAddrLabel] = useState("");
  const [newAddrFull, setNewAddrFull] = useState("");
  const [newAddrDistrict, setNewAddrDistrict] = useState("Lusaka");
  const [newAddrProvince, setNewAddrProvince] = useState("Lusaka Province");
  const [newAddrPhone, setNewAddrPhone] = useState("");
  const [newAddrIsDefault, setNewAddrIsDefault] = useState(false);

  // Settings Edit State
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editTpin, setEditTpin] = useState("");
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Sync settings inputs with user state
  React.useEffect(() => {
    if (user) {
      setEditName(user.fullName || "");
      setEditPhone(user.phone || "");
      setEditCompany(user.companyName || "");
      setEditTpin(user.tpin || "");
    }
  }, [user]);

  // If not logged in, show welcoming auth gate
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-surface-container-low text-on-surface pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl border border-border-light shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center mx-auto text-primary">
            <User className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-charcoal font-headline">Client Portal</h1>
          <p className="text-sm text-on-surface-variant">
            Sign in to view your solar system warranties, tracking updates for Lusaka dispatch, and registered installation sites.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/login"
              className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm text-center shadow-md shadow-primary/20 transition-all"
            >
              Sign In to Your Account
            </Link>
            <Link
              href="/signup"
              className="w-full py-3 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal font-semibold text-sm text-center transition-all"
            >
              Create New Account
            </Link>
          </div>

          <div className="pt-6 border-t border-border-light text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">
              Or Preview with a 1-Click Demo Profile:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => loginWithDemo("residential")}
                className="p-3 rounded-xl bg-surface-container-low border border-border-light hover:border-primary text-left text-xs transition-colors cursor-pointer"
              >
                <div className="font-bold text-charcoal">Mwape (6kW)</div>
                <div className="text-[10px] text-on-surface-variant">Residential Client</div>
              </button>
              <button
                onClick={() => loginWithDemo("commercial")}
                className="p-3 rounded-xl bg-surface-container-low border border-border-light hover:border-secondary text-left text-xs transition-colors cursor-pointer"
              >
                <div className="font-bold text-charcoal">Kafue Agri (50kW)</div>
                <div className="text-[10px] text-on-surface-variant">Commercial Farm</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      fullName: editName,
      phone: editPhone,
      companyName: editCompany,
      tpin: editTpin,
    });
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLabel || !newAddrFull) return;

    addSavedAddress({
      label: newAddrLabel,
      fullAddress: newAddrFull,
      district: newAddrDistrict,
      province: newAddrProvince,
      contactPhone: newAddrPhone || user.phone,
      isDefault: newAddrIsDefault,
    });

    setNewAddrLabel("");
    setNewAddrFull("");
    setNewAddrPhone("");
    setNewAddrIsDefault(false);
    setIsAddressModalOpen(false);
  };

  const renderAccountBadge = () => {
    switch (user.accountType) {
      case "commercial":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary-light text-secondary border border-secondary/20">
            <Building2 className="w-3.5 h-3.5" />
            Commercial Client
          </span>
        );
      case "agricultural":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary-light text-secondary border border-secondary/20">
            <Tractor className="w-3.5 h-3.5" />
            Agricultural Client
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-light text-primary border border-primary/20">
            <Home className="w-3.5 h-3.5" />
            Residential Client
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface pt-24 md:pt-28 pb-16">
      {/* Top Banner & User Header */}
      <div className="border-b border-border-light bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary-light border border-primary/20 flex items-center justify-center text-primary text-2xl font-bold shadow-sm shrink-0">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-charcoal font-headline">
                    {user.fullName}
                  </h1>
                  {renderAccountBadge()}
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-outline" />
                    <span>{user.primaryDistrict}, {user.primaryProvince}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/shop"
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm shadow-primary/20"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>Browse Solar Kits</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-outline" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border-light">
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-light">
              <div className="text-[11px] text-on-surface-variant uppercase font-bold">Active Warranties</div>
              <div className="text-xl font-bold text-charcoal mt-0.5">{user.warranties.length} Units</div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-light">
              <div className="text-[11px] text-on-surface-variant uppercase font-bold">Orders &amp; Dispatch</div>
              <div className="text-xl font-bold text-primary mt-0.5">{user.orders.length} Records</div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-light">
              <div className="text-[11px] text-on-surface-variant uppercase font-bold">Saved Sites</div>
              <div className="text-xl font-bold text-secondary mt-0.5">{user.savedAddresses.length} Addresses</div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-light">
              <div className="text-[11px] text-on-surface-variant uppercase font-bold">Client Status</div>
              <div className="text-xl font-bold text-secondary mt-0.5 flex items-center gap-1.5">
                <BadgeCheck className="w-5 h-5 text-secondary" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabbed Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border-light overflow-x-auto no-scrollbar gap-2 sm:gap-4 pb-px">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "overview"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>System Overview</span>
          </button>

          <button
            onClick={() => setActiveTab("warranties")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "warranties"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Warranty Vault ({user.warranties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "orders"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders &amp; Dispatch ({user.orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "addresses"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Site Addresses ({user.savedAddresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "settings"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="mt-8 space-y-8 animate-fadeIn">
            {/* Warranty Status Banner */}
            <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-light border border-secondary/20 text-secondary text-xs font-bold mb-3">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Hardware Warranty Active</span>
                  </div>
                  <h2 className="text-xl font-bold text-charcoal font-headline">
                    Tier-1 Equipment Protected under Factory Guarantee
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-1 max-w-xl">
                    All Greenrich Lithium storage units and Deye Hybrid inverters registered under your profile carry full manufacturer warranty and local technical support in Zambia.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("warranties")}
                  className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-bold flex items-center gap-2 self-start md:self-auto transition-all cursor-pointer"
                >
                  <span>View All Certificates</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>

            {/* Grid of Recent Warranties & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Registered Hardware Quick List */}
              <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Registered Solar Equipment</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("warranties")}
                    className="text-xs text-primary hover:underline font-bold"
                  >
                    View details
                  </button>
                </div>

                {user.warranties.length === 0 ? (
                  <div className="text-center py-8 text-on-surface-variant text-xs">
                    No registered hardware in your vault yet. Place an order or contact support to register existing hardware.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {user.warranties.slice(0, 3).map((w) => (
                      <div
                        key={w.id}
                        className="p-3.5 rounded-xl bg-surface-container-low border border-border-light flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-sm text-charcoal truncate">{w.productName}</div>
                          <div className="text-xs text-on-surface-variant mt-0.5">
                            SN: <span className="text-charcoal font-mono">{w.serialNumber}</span> • {w.warrantyPeriodYears}-Year Coverage
                          </div>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold px-2 py-1 rounded bg-secondary-light text-secondary border border-secondary/20">
                          {w.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Orders / Dispatch Quick List */}
              <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-secondary" />
                    <span>Recent Equipment Orders</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-secondary hover:underline font-bold"
                  >
                    View history
                  </button>
                </div>

                {user.orders.length === 0 ? (
                  <div className="text-center py-8 text-on-surface-variant text-xs">
                    You have not placed any orders yet.{" "}
                    <Link href="/shop" className="text-primary font-bold hover:underline">
                      Shop our solar packages
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {user.orders.slice(0, 3).map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3.5 rounded-xl bg-surface-container-low border border-border-light flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-sm text-charcoal">{ord.id}</div>
                          <div className="text-xs text-on-surface-variant mt-0.5">
                            {ord.date} • K{ord.total.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-on-surface-variant mt-1">
                            {ord.items.length} item(s) • Tracking: <span className="font-mono text-secondary font-bold">{ord.trackingNumber}</span>
                          </div>
                        </div>
                        <span className="shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary-light text-primary border border-primary/20">
                          {ord.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Support Banner */}
            <div className="p-6 rounded-2xl bg-white border border-border-light shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-secondary-light text-secondary flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-charcoal">Need an On-Site Engineering Assessment?</h4>
                  <p className="text-xs text-on-surface-variant">Our Lusaka certified technicians can inspect your distribution board or calculate peak load.</p>
                </div>
              </div>
              <Link
                href="/calculator"
                className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-bold whitespace-nowrap transition-colors"
              >
                Run Solar Calculator
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: DIGITAL WARRANTY VAULT */}
        {activeTab === "warranties" && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-charcoal font-headline">Digital Warranty Vault</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Official manufacturer warranty certificates for all installed hardware with serial number registration.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-secondary bg-secondary-light px-3 py-1.5 rounded-lg border border-secondary/20 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Official ZABS / ERB Standard
                </span>
              </div>
            </div>

            {user.warranties.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border-light p-12 text-center shadow-sm">
                <ShieldCheck className="w-12 h-12 text-outline mx-auto mb-3" />
                <h3 className="text-base font-bold text-charcoal">No Registered Warranties</h3>
                <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
                  When you purchase an Elleyhill hybrid solar system or battery, its serial numbers and digital certificate will automatically appear here.
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs"
                >
                  Explore Solar Packages
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.warranties.map((w) => (
                  <div
                    key={w.id}
                    className="bg-white rounded-2xl border border-border-light p-5 flex flex-col justify-between shadow-sm hover:border-primary/40 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-surface-container text-secondary border border-border-light">
                          {w.category}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary-light text-secondary border border-secondary/20 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {w.status}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-charcoal group-hover:text-primary transition-colors">
                        {w.productName}
                      </h3>

                      {w.systemCapacity && (
                        <div className="text-xs text-on-surface-variant font-medium mt-1">
                          Capacity: <span className="text-charcoal font-semibold">{w.systemCapacity}</span>
                        </div>
                      )}

                      <div className="mt-4 space-y-2 pt-3 border-t border-border-light text-xs">
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Serial Number:</span>
                          <span className="font-mono text-charcoal font-bold text-[11px]">{w.serialNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Installed:</span>
                          <span className="text-charcoal font-medium">{w.installationDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Coverage Term:</span>
                          <span className="text-secondary font-bold">{w.warrantyPeriodYears} Years (Expires {w.expiryDate})</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-on-surface-variant">Certificate:</span>
                          <span className="font-mono text-secondary font-bold text-[11px]">{w.certificateNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border-light flex items-center justify-between">
                      <button
                        onClick={() => alert(`Warranty Certificate ${w.certificateNumber} for ${w.productName} is verified in Elleyhill Zambia Registry.`)}
                        className="text-xs text-primary hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Certificate</span>
                      </button>
                      <span className="text-[10px] text-on-surface-variant">Lusaka Registry</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDERS & DISPATCH */}
        {activeTab === "orders" && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-charcoal font-headline">Orders &amp; Dispatch History</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Track dispatch status, carrier tracking numbers, and proforma invoices for your solar purchases.
                </p>
              </div>
              <Link
                href="/shop"
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs self-start sm:self-auto transition-all shadow-sm"
              >
                + New Order
              </Link>
            </div>

            {user.orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border-light p-12 text-center shadow-sm">
                <ShoppingBag className="w-12 h-12 text-outline mx-auto mb-3" />
                <h3 className="text-base font-bold text-charcoal">No Orders Found</h3>
                <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
                  You haven't placed an order yet. Select a hybrid system, inverter, or lithium battery from our store.
                </p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs"
                >
                  Browse Store
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-border-light p-6 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-border-light gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-base font-bold text-charcoal font-mono">{order.id}</span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20 font-bold">
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-on-surface-variant mt-1">
                          Placed on <span className="text-charcoal font-medium">{order.date}</span> • Payment via <span className="text-charcoal font-medium">{order.paymentMethod}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div className="text-xs text-on-surface-variant">Total Value</div>
                          <div className="text-lg font-bold text-primary">K{order.total.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="py-4 space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 max-w-xl">
                            <span className="w-6 h-6 rounded bg-surface-container flex items-center justify-center font-bold text-primary">
                              {item.quantity}x
                            </span>
                            <span className="text-charcoal font-medium">{item.name}</span>
                          </div>
                          <div className="font-bold text-charcoal font-mono">
                            K{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dispatch & Delivery SLA */}
                    <div className="pt-4 border-t border-border-light bg-surface-container-low -mx-6 -mb-6 p-6 rounded-b-2xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <div className="text-on-surface-variant uppercase text-[10px] font-bold">Tracking Number</div>
                        <div className="font-mono text-secondary font-bold mt-0.5">{order.trackingNumber}</div>
                      </div>
                      <div>
                        <div className="text-on-surface-variant uppercase text-[10px] font-bold">Delivery Point</div>
                        <div className="text-charcoal font-medium mt-0.5 truncate">{order.deliveryAddress} ({order.district})</div>
                      </div>
                      <div>
                        <div className="text-on-surface-variant uppercase text-[10px] font-bold">Estimated SLA</div>
                        <div className="text-secondary font-bold mt-0.5 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{order.estimatedDelivery}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SITE ADDRESSES */}
        {activeTab === "addresses" && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-charcoal font-headline">Saved Installation Sites</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Manage multiple residential properties, farm pump stations, or commercial branch locations for delivery &amp; installation.
                </p>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Installation Site</span>
              </button>
            </div>

            {user.savedAddresses.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border-light p-12 text-center shadow-sm">
                <MapPin className="w-12 h-12 text-outline mx-auto mb-3" />
                <h3 className="text-base font-bold text-charcoal">No Sites Saved</h3>
                <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
                  Save your home, business or farm address for fast 1-click checkout and Lusaka delivery routing.
                </p>
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="mt-4 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs cursor-pointer"
                >
                  Add Your First Site
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-sm ${
                      addr.isDefault
                        ? "bg-white border-primary ring-1 ring-primary/20"
                        : "bg-white border-border-light hover:border-border-medium"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-charcoal text-base">{addr.label}</h3>
                          {addr.isDefault && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-light text-primary border border-primary/20">
                              Primary Default Site
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => deleteSavedAddress(addr.id)}
                          className="text-on-surface-variant hover:text-error p-1 transition-colors cursor-pointer"
                          title="Delete Site"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-on-surface-variant space-y-1.5">
                        <div className="text-charcoal font-medium">{addr.fullAddress}</div>
                        <div>
                          {addr.district}, {addr.province}
                        </div>
                        <div className="text-on-surface-variant flex items-center gap-1.5 pt-1">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <span className="text-charcoal font-medium">{addr.contactPhone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-border-light flex items-center justify-between">
                      {!addr.isDefault ? (
                        <button
                          onClick={() => setDefaultAddress(addr.id)}
                          className="text-xs text-primary hover:underline font-bold cursor-pointer"
                        >
                          Set as Primary Site
                        </button>
                      ) : (
                        <span className="text-[11px] text-secondary flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active Default
                        </span>
                      )}
                      <span className="text-[10px] text-on-surface-variant">Zambia Dispatch Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ACCOUNT SETTINGS */}
        {activeTab === "settings" && (
          <div className="mt-8 max-w-2xl bg-white rounded-2xl border border-border-light p-6 sm:p-8 shadow-xl animate-fadeIn">
            <h2 className="text-xl font-bold text-charcoal font-headline mb-1">Account &amp; Profile Settings</h2>
            <p className="text-xs text-on-surface-variant mb-6">
              Update your contact credentials, company details, or tax identifiers.
            </p>

            {settingsSuccess && (
              <div className="mb-6 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-secondary text-xs animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Profile updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Email Address (Login ID)
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-border-medium text-sm text-on-surface-variant cursor-not-allowed font-sans"
                />
                <span className="text-[10px] text-on-surface-variant mt-1 block">Contact support if you need to change your primary login email.</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                  Contact Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-sans"
                />
              </div>

              {user.accountType !== "residential" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={editCompany}
                      onChange={(e) => setEditCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                      ZRA TPIN
                    </label>
                    <input
                      type="text"
                      value={editTpin}
                      onChange={(e) => setEditTpin(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-primary/20 cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ADD SITE ADDRESS MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-border-light rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-charcoal font-headline mb-1">Add Installation Site Address</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Add a delivery destination or project site for solar hardware dispatch.
            </p>

            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  Site Label / Location Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lusaka Farm Stand, Kabulonga Residence"
                  value={newAddrLabel}
                  onChange={(e) => setNewAddrLabel(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  Physical Plot / Street Address *
                </label>
                <input
                  type="text"
                  placeholder="Plot 1048, Leopards Hill Road"
                  value={newAddrFull}
                  onChange={(e) => setNewAddrFull(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Province *
                  </label>
                  <input
                    type="text"
                    value={newAddrProvince}
                    onChange={(e) => setNewAddrProvince(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    District / Town *
                  </label>
                  <input
                    type="text"
                    value={newAddrDistrict}
                    onChange={(e) => setNewAddrDistrict(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  Site Contact Phone
                </label>
                <input
                  type="text"
                  placeholder={user.phone}
                  value={newAddrPhone}
                  onChange={(e) => setNewAddrPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-sans"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="defaultSite"
                  checked={newAddrIsDefault}
                  onChange={(e) => setNewAddrIsDefault(e.target.checked)}
                  className="w-4 h-4 rounded border-border-medium text-primary focus:ring-primary accent-primary"
                />
                <label htmlFor="defaultSite" className="text-xs text-on-surface-variant cursor-pointer font-medium">
                  Set this as my primary installation address
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant hover:text-charcoal text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md shadow-primary/20 cursor-pointer"
                >
                  Save Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
