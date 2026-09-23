"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, SavedAddress, UserOrder, WarrantyRecord } from "@/context/AuthContext";
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
  Printer,
  X,
  Search,
  Filter,
  Copy,
  Check,
  Battery,
  BatteryCharging,
  Sun,
  Activity,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  Wrench,
  Leaf,
  Share2,
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
    sendEmailVerificationCode,
    verifyEmailCode,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"warranties" | "orders" | "settings">("warranties");

  // Certificate and Invoice Modals
  const [selectedWarrantyForModal, setSelectedWarrantyForModal] = useState<WarrantyRecord | null>(null);
  const [selectedOrderForInvoiceModal, setSelectedOrderForInvoiceModal] = useState<UserOrder | null>(null);

  // Email Verification Modal State
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState("");
  const [verifyStep, setVerifyStep] = useState<"idle" | "sent" | "verifying" | "success" | "error">("idle");
  const [verifyError, setVerifyError] = useState("");
  const [verifyInfo, setVerifyInfo] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);

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
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Search, Filters & Clipboard copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [warrantySearch, setWarrantySearch] = useState("");
  const [warrantyCategoryFilter, setWarrantyCategoryFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Sync settings inputs with user state
  React.useEffect(() => {
    if (user) {
      setEditName(user.fullName || "");
      setEditPhone(user.phone || "");
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
          <h1 className="text-2xl sm:text-3xl font-bold text-charcoal font-headline">My Account</h1>
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
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleSendVerificationCode = async () => {
    if (!user?.email) return;
    setIsSendingCode(true);
    setVerifyError("");
    try {
      const res = await sendEmailVerificationCode(user.email);
      if (res.success) {
        setVerifyStep("sent");
        setVerifyInfo(res.message || `A 6-digit verification code was sent to ${user.email}.`);
      } else {
        setVerifyError(res.error || "Failed to send verification code. Please try again.");
      }
    } catch (err: unknown) {
      setVerifyError("Error connecting to verification service.");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyOtp.trim()) return;
    setVerifyStep("verifying");
    setVerifyError("");
    try {
      const res = await verifyEmailCode(verifyOtp.trim(), user?.email);
      if (res.success) {
        setVerifyStep("success");
        setTimeout(() => {
          setIsVerifyModalOpen(false);
          setVerifyStep("idle");
          setVerifyOtp("");
        }, 1600);
      } else {
        setVerifyStep("error");
        setVerifyError(res.error || "Invalid or expired 6-digit code. Please try again.");
      }
    } catch (err: unknown) {
      setVerifyStep("error");
      setVerifyError("Verification failed. Please try again.");
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      fullName: editName,
      phone: editPhone,
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
        return null;
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
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-secondary" />
                    <span className="font-medium text-charcoal">{user.email}</span>
                    {user.emailVerified ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <BadgeCheck className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setIsVerifyModalOpen(true);
                          handleSendVerificationCode();
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors cursor-pointer"
                        title="Click to verify your email"
                      >
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        <span>Unverified - Verify Now</span>
                      </button>
                    )}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border-light">
            <div
              onClick={() => setActiveTab("warranties")}
              className="p-4 rounded-2xl bg-surface-container-low border border-border-light hover:border-primary/40 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Active Warranties</span>
                <ShieldCheck className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-bold text-charcoal mt-1 font-headline">{user.warranties.length} Units</div>
              <div className="text-[11px] text-secondary font-medium mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% Factory Guaranteed
              </div>
            </div>

            <div
              onClick={() => setActiveTab("orders")}
              className="p-4 rounded-2xl bg-surface-container-low border border-border-light hover:border-primary/40 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Orders &amp; Dispatch</span>
                <Truck className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-bold text-primary mt-1 font-headline">{user.orders.length} Records</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">
                Lusaka Hub Verified
              </div>
            </div>

            <div
              onClick={() => setActiveTab("settings")}
              className="p-4 rounded-2xl bg-surface-container-low border border-border-light hover:border-secondary/40 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Saved Sites</span>
                <MapPin className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-bold text-secondary mt-1 font-headline">{user.savedAddresses.length} Addresses</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">
                Primary: {user.primaryDistrict}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-border-light shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-on-surface-variant uppercase font-bold tracking-wider">Account Status</span>
                <BadgeCheck className="w-4 h-4 text-secondary" />
              </div>
              {user.emailVerified ? (
                <div className="mt-1">
                  <div className="text-2xl font-bold text-secondary font-headline flex items-center gap-1.5">
                    <span>Verified</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    Cloudflare Edge Secured
                  </div>
                </div>
              ) : (
                <div className="mt-1">
                  <div className="text-lg font-bold text-amber-700 flex items-center gap-1 font-headline">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Unverified</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsVerifyModalOpen(true);
                      handleSendVerificationCode();
                    }}
                    className="text-[11px] text-primary hover:underline font-bold mt-0.5 block cursor-pointer"
                  >
                    Verify Email via OTP →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabbed Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border-light overflow-x-auto no-scrollbar gap-2 sm:gap-4 pb-px">
          <button
            onClick={() => setActiveTab("warranties")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "warranties"
                ? "border-primary text-primary"
                : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>My Warranties ({user.warranties.length})</span>
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
            <span>My Orders &amp; Tracking ({user.orders.length})</span>
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
            <span>Account &amp; Site Settings</span>
          </button>
        </div>

        {/* TAB 1: DIGITAL WARRANTY VAULT */}
        {activeTab === "warranties" && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-charcoal font-headline">My Warranty Certificates</h2>
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

            {/* Search and Category Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-border-light shadow-sm">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by hardware name, serial number (SN), or certificate ID..."
                  value={warrantySearch}
                  onChange={(e) => setWarrantySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-surface-container-low border border-border-light focus:bg-white focus:outline-none focus:border-primary text-charcoal"
                />
                {warrantySearch && (
                  <button
                    onClick={() => setWarrantySearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-charcoal cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {["all", "Inverter", "Battery", "Panel", "Kit"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setWarrantyCategoryFilter(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      warrantyCategoryFilter === cat
                        ? "bg-primary text-white shadow-sm"
                        : "bg-surface-container-low hover:bg-surface-container border border-border-light text-charcoal"
                    }`}
                  >
                    {cat === "all" ? "All Categories" : cat}
                  </button>
                ))}
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
                {user.warranties
                  .filter((w) => {
                    const matchesSearch =
                      w.productName.toLowerCase().includes(warrantySearch.toLowerCase()) ||
                      w.serialNumber.toLowerCase().includes(warrantySearch.toLowerCase()) ||
                      w.certificateNumber.toLowerCase().includes(warrantySearch.toLowerCase());
                    const matchesCat =
                      warrantyCategoryFilter === "all" ||
                      w.category.toLowerCase().includes(warrantyCategoryFilter.toLowerCase());
                    return matchesSearch && matchesCat;
                  })
                  .map((w) => (
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

                        <div className="mt-4 space-y-2.5 pt-3 border-t border-border-light text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Serial Number:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-charcoal font-bold text-[11px] bg-surface-container-low px-1.5 py-0.5 rounded border border-border-light">
                                {w.serialNumber}
                              </span>
                              <button
                                onClick={() => handleCopy(w.serialNumber, `sn-${w.id}`)}
                                className="text-on-surface-variant hover:text-primary p-0.5 transition-colors cursor-pointer"
                                title="Copy Serial Number"
                              >
                                {copiedKey === `sn-${w.id}` ? (
                                  <Check className="w-3.5 h-3.5 text-secondary" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Installed:</span>
                            <span className="text-charcoal font-medium">{w.installationDate}</span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-on-surface-variant">Coverage Term:</span>
                            <span className="text-secondary font-bold">{w.warrantyPeriodYears} Years (Expires {w.expiryDate})</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">Certificate:</span>
                            <span className="font-mono text-secondary font-bold text-[11px]">{w.certificateNumber}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-border-light flex items-center justify-between gap-2">
                        <button
                          onClick={() => setSelectedWarrantyForModal(w)}
                          className="text-xs text-primary hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </button>
                        <a
                          href={`https://wa.me/260971838038?text=Hello%20Elleyhill%20Support,%20I%20am%20requesting%20technical%20service%20for%20my%20${encodeURIComponent(w.productName)}%20(SN:%20${encodeURIComponent(w.serialNumber)}).`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-secondary hover:underline font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Wrench className="w-3.5 h-3.5" />
                          <span>Request Audit</span>
                        </a>
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

            {/* Order Search and Status Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-border-light shadow-sm">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Order ID, tracking number, or hardware name..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-surface-container-low border border-border-light focus:bg-white focus:outline-none focus:border-primary text-charcoal"
                />
                {orderSearch && (
                  <button
                    onClick={() => setOrderSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-charcoal cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {["all", "In Transit", "Delivered", "Processing"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setOrderStatusFilter(status)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      orderStatusFilter === status
                        ? "bg-primary text-white shadow-sm"
                        : "bg-surface-container-low hover:bg-surface-container border border-border-light text-charcoal"
                    }`}
                  >
                    {status === "all" ? "All Orders" : status}
                  </button>
                ))}
              </div>
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
                {user.orders
                  .filter((order) => {
                    const matchesSearch =
                      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                      order.trackingNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
                      order.items.some((it) => it.name.toLowerCase().includes(orderSearch.toLowerCase()));
                    const matchesStatus =
                      orderStatusFilter === "all" ||
                      order.status.toLowerCase().includes(orderStatusFilter.toLowerCase());
                    return matchesSearch && matchesStatus;
                  })
                  .map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl border border-border-light p-6 shadow-sm space-y-4"
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
                            <div className="text-lg font-bold text-primary font-headline">K{order.total.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>

                      {/* Visual Dispatch Stepper */}
                      <div className="p-4 rounded-xl bg-surface-container-low border border-border-light">
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                          <div className="text-primary flex flex-col items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span>1. Confirmed</span>
                          </div>
                          <div className="text-primary flex flex-col items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span>2. QA &amp; Packaging</span>
                          </div>
                          <div className={order.status.includes("Transit") || order.status.includes("Delivered") ? "text-primary flex flex-col items-center gap-1" : "text-slate-400 flex flex-col items-center gap-1"}>
                            <Truck className="w-4 h-4" />
                            <span>3. Lusaka Dispatch</span>
                          </div>
                          <div className={order.status.includes("Delivered") ? "text-secondary flex flex-col items-center gap-1" : "text-slate-400 flex flex-col items-center gap-1"}>
                            <ShieldCheck className="w-4 h-4" />
                            <span>4. Delivered / Setup</span>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="py-2 space-y-2.5">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2.5 max-w-xl">
                              <span className="w-6 h-6 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary text-xs">
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

                      {/* Dispatch & Delivery SLA & Actions */}
                      <div className="pt-4 border-t border-border-light bg-surface-container-low -mx-6 -mb-6 p-6 rounded-b-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
                          <div>
                            <div className="text-on-surface-variant uppercase text-[10px] font-bold">Tracking Number</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-mono text-secondary font-bold">{order.trackingNumber}</span>
                              <button
                                onClick={() => handleCopy(order.trackingNumber, `track-${order.id}`)}
                                className="text-on-surface-variant hover:text-primary p-0.5 cursor-pointer"
                                title="Copy Tracking Number"
                              >
                                {copiedKey === `track-${order.id}` ? (
                                  <Check className="w-3 h-3 text-secondary" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
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

                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-light">
                          <button
                            onClick={() => setSelectedOrderForInvoiceModal(order)}
                            className="px-3.5 py-2 rounded-xl bg-white hover:bg-surface-container border border-border-light text-charcoal text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                          >
                            <FileText className="w-3.5 h-3.5 text-primary" />
                            <span>View Invoice</span>
                          </button>
                          <a
                            href={`https://wa.me/260971838038?text=Hello%20Elleyhill%20Support,%20I%20am%20inquiring%20about%20my%20order%20${encodeURIComponent(order.id)}%20(Tracking:%20${encodeURIComponent(order.trackingNumber)}).`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-status-success/10 hover:bg-status-success/20 border border-status-success/30 text-status-success text-xs font-bold flex items-center gap-1.5 transition-all"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Lead Engineer</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: ACCOUNT & SITE SETTINGS */}
        {activeTab === "settings" && (
          <div className="mt-8 space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Account Credentials Form */}
              <div className="lg:col-span-5 bg-white rounded-2xl border border-border-light p-6 sm:p-8 shadow-sm h-fit">
                <h2 className="text-lg font-bold text-charcoal font-headline mb-1">Account &amp; Profile Info</h2>
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
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                        Email Address (Login ID)
                      </label>
                      {user.emailVerified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <BadgeCheck className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setIsVerifyModalOpen(true);
                            handleSendVerificationCode();
                          }}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-colors cursor-pointer"
                        >
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          Verify
                        </button>
                      )}
                    </div>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-border-medium text-sm text-on-surface-variant cursor-not-allowed font-sans"
                    />
                    <span className="text-[10px] text-on-surface-variant mt-1 block">
                      {user.emailVerified
                        ? "Verified for official order dispatches & warranty certificates."
                        : "Unverified. Verify email for official dispatch tracking and certificates."}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase tracking-wider">
                      Contact Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="tel"
                      id="profile-phone"
                      autoComplete="tel"
                      inputMode="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-border-medium text-sm text-charcoal focus:bg-white focus:outline-none focus:border-primary font-sans"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-primary/20 cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Site Addresses Manager */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white rounded-2xl border border-border-light p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border-light">
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold text-charcoal font-headline">Saved Installation Sites</h2>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Physical sites and delivery destinations for hardware dispatch &amp; engineering visits.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsAddressModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-2 self-start sm:self-auto transition-all cursor-pointer shadow-sm shadow-primary/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Site Address</span>
                    </button>
                  </div>

                  {user.savedAddresses.length === 0 ? (
                    <div className="py-12 text-center">
                      <MapPin className="w-10 h-10 text-outline mx-auto mb-3" />
                      <h3 className="text-sm font-bold text-charcoal">No Installation Sites Registered</h3>
                      <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
                        Save your residential roof, commercial warehouse, or agricultural pump site for fast 1-click order dispatch.
                      </p>
                      <button
                        onClick={() => setIsAddressModalOpen(true)}
                        className="mt-4 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal font-bold text-xs cursor-pointer transition-colors"
                      >
                        Add Your First Site
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      {user.savedAddresses.map((addr) => (
                        <div
                          key={addr.id}
                          className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                            addr.isDefault
                              ? "bg-surface-container-low border-primary/60 ring-1 ring-primary/20"
                              : "bg-surface-container-low border-border-light hover:border-border-medium"
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <h4 className="font-bold text-charcoal text-sm">{addr.label}</h4>
                                {addr.isDefault && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary-light text-primary border border-primary/20">
                                    Default
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => deleteSavedAddress(addr.id)}
                                className="text-on-surface-variant hover:text-error p-1 transition-colors cursor-pointer"
                                title="Delete Site"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-xs text-on-surface-variant space-y-1">
                              <div className="text-charcoal font-medium line-clamp-2">{addr.fullAddress}</div>
                              <div className="text-[11px]">
                                {addr.district}, {addr.province}
                              </div>
                              <div className="text-on-surface-variant flex items-center gap-1 pt-1 text-[11px]">
                                <Phone className="w-3 h-3 text-primary" />
                                <span className="text-charcoal">{addr.contactPhone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-border-light flex items-center justify-between text-xs">
                            {!addr.isDefault ? (
                              <button
                                onClick={() => setDefaultAddress(addr.id)}
                                className="text-[11px] text-primary hover:underline font-bold cursor-pointer"
                              >
                                Set Default
                              </button>
                            ) : (
                              <span className="text-[11px] text-secondary flex items-center gap-1 font-bold">
                                <CheckCircle2 className="w-3 h-3" /> Active Default
                              </span>
                            )}
                            <span className="text-[10px] text-outline">Verified</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
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

      {/* EMAIL VERIFICATION MODAL */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-border-light rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
            <div className="w-12 h-12 rounded-2xl bg-secondary-light border border-secondary/20 flex items-center justify-center text-secondary mb-4 mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-charcoal font-headline text-center mb-1">
              Verify Your Email Address
            </h3>
            <p className="text-xs text-on-surface-variant text-center mb-5">
              Securely verify <span className="font-semibold text-charcoal">{user.email}</span> via the Elleyhill Cloudflare Gateway.
            </p>

            {verifyStep === "success" ? (
              <div className="text-center py-6 space-y-3 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-charcoal">Email Verified Successfully!</h4>
                <p className="text-xs text-on-surface-variant">
                  Your profile and warranty registry are now fully verified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVerifyCodeSubmit} className="space-y-4">
                {verifyInfo && (
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
                    <span>{verifyInfo}</span>
                  </div>
                )}

                {verifyError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                    <span>{verifyError}</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                      6-Digit Security Code
                    </label>
                    <button
                      type="button"
                      onClick={handleSendVerificationCode}
                      disabled={isSendingCode}
                      className="text-xs text-primary hover:underline font-bold cursor-pointer disabled:opacity-50"
                    >
                      {isSendingCode ? "Sending..." : "Resend Code"}
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP code"
                    value={verifyOtp}
                    onChange={(e) => setVerifyOtp(e.target.value.replace(/\D/g, ""))}
                    autoFocus
                    required
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-border-medium text-center font-mono text-xl tracking-widest text-charcoal focus:bg-white focus:outline-none focus:border-primary"
                  />
                  <span className="text-[11px] text-on-surface-variant mt-1.5 block text-center">
                    Enter the 6-digit OTP generated by the worker gateway.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
                  <button
                    type="button"
                    onClick={() => {
                      setIsVerifyModalOpen(false);
                      setVerifyError("");
                      setVerifyInfo("");
                      setVerifyOtp("");
                    }}
                    className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant hover:text-charcoal text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={verifyStep === "verifying" || verifyOtp.length < 4}
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md shadow-primary/20 cursor-pointer disabled:opacity-50"
                  >
                    {verifyStep === "verifying" ? "Verifying Code..." : "Confirm & Verify Email"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DIGITAL WARRANTY CERTIFICATE MODAL */}
      {selectedWarrantyForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-2 border-secondary/30 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-secondary-light text-secondary flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="text-[11px] font-bold tracking-widest uppercase text-secondary">
              REPUBLIC OF ZAMBIA ENERGY REGISTRY
            </div>
            <h3 className="text-xl font-bold text-charcoal font-headline mt-1">
              Certificate of Hardware Warranty
            </h3>
            <div className="font-mono text-xs text-primary font-bold mt-1">
              Certificate No: {selectedWarrantyForModal.certificateNumber}
            </div>

            <div className="mt-5 p-4 rounded-xl bg-surface-container-low border border-border-light text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Registered Owner:</span>
                <span className="text-charcoal font-bold">{selectedWarrantyForModal.customerName || user.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Hardware Model:</span>
                <span className="text-charcoal font-semibold truncate max-w-[220px]">{selectedWarrantyForModal.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Serial Number:</span>
                <span className="font-mono text-secondary font-bold">{selectedWarrantyForModal.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Installed Date:</span>
                <span className="text-charcoal">{selectedWarrantyForModal.installationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Guarantee Period:</span>
                <span className="text-status-success font-bold">
                  {selectedWarrantyForModal.warrantyPeriodYears} Years (Expires {selectedWarrantyForModal.expiryDate})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Certified Installer:</span>
                <span className="text-charcoal">{selectedWarrantyForModal.installerName || "Elleyhill Technical Support Team"}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedWarrantyForModal(null)}
                className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROFORMA TAX INVOICE & DISPATCH MODAL */}
      {selectedOrderForInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-border-medium rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-6 border-b border-border-light">
              <div>
                <div className="text-xs font-bold text-primary tracking-widest uppercase">ELLEYHILL POWER ZAMBIA LTD</div>
                <h3 className="text-xl font-bold text-charcoal font-headline mt-1">Official Proforma Tax Invoice</h3>
                <div className="text-xs text-on-surface-variant font-mono mt-1">Ref: {selectedOrderForInvoiceModal.id}</div>
              </div>
              <div className="text-right text-xs text-on-surface-variant space-y-0.5">
                <div>ZRA TPIN: <span className="text-charcoal font-mono font-bold">1003482910</span></div>
                <div>Date: <span className="text-charcoal">{selectedOrderForInvoiceModal.date}</span></div>
                <div>Status: <span className="text-status-success font-bold">{selectedOrderForInvoiceModal.status}</span></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-b border-border-light text-xs">
              <div>
                <div className="text-on-surface-variant uppercase font-bold text-[10px] mb-1">Billed & Delivered To:</div>
                <div className="font-bold text-charcoal text-sm">{selectedOrderForInvoiceModal.customerName || user.fullName}</div>
                <div className="text-on-surface-variant mt-0.5">{selectedOrderForInvoiceModal.deliveryAddress}</div>
                <div className="text-on-surface-variant">{selectedOrderForInvoiceModal.district}, {selectedOrderForInvoiceModal.province}</div>
                <div className="text-primary mt-1 font-semibold">{selectedOrderForInvoiceModal.phone}</div>
              </div>

              <div>
                <div className="text-on-surface-variant uppercase font-bold text-[10px] mb-1">Dispatch Logistics:</div>
                <div className="text-charcoal font-mono font-medium">Tracking: {selectedOrderForInvoiceModal.trackingNumber}</div>
                <div className="text-on-surface-variant mt-0.5">Payment: {selectedOrderForInvoiceModal.paymentMethod}</div>
                <div className="text-on-surface-variant">Lead Engineer: {selectedOrderForInvoiceModal.assignedEngineer || "Eng. Patrick Banda"}</div>
              </div>
            </div>

            {/* Line items */}
            <div className="py-6 border-b border-border-light">
              <table className="w-full text-left text-xs">
                <thead className="text-on-surface-variant uppercase font-bold text-[10px] pb-2 border-b border-border-light">
                  <tr>
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Rate</th>
                    <th className="pb-2 text-right">Amount (ZMW)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {selectedOrderForInvoiceModal.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-3 text-charcoal font-medium">{item.name}</td>
                      <td className="py-3 text-center text-on-surface-variant">{item.quantity}</td>
                      <td className="py-3 text-right text-on-surface-variant font-mono">K{item.price.toLocaleString()}</td>
                      <td className="py-3 text-right text-charcoal font-bold font-mono">K{(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Section */}
            <div className="py-4 space-y-1.5 text-xs text-right">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal:</span>
                <span className="font-mono text-charcoal font-bold">ZMW {selectedOrderForInvoiceModal.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Logistics & Delivery:</span>
                <span className="font-mono text-status-success font-bold">
                  {selectedOrderForInvoiceModal.deliveryFee === 0 ? "FREE (Included)" : `ZMW ${selectedOrderForInvoiceModal.deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">16% ZRA Statutory VAT:</span>
                <span className="font-mono text-status-success font-bold">0% (Clean Energy Zero-Rated)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border-light text-sm font-bold">
                <span className="text-charcoal uppercase">Grand Total:</span>
                <span className="text-primary text-base font-mono">ZMW {selectedOrderForInvoiceModal.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border-light">
              <button
                onClick={() => setSelectedOrderForInvoiceModal(null)}
                className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
