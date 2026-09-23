"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserOrder, WarrantyRecord, InventoryItem, OrderItemSummary } from "@/context/AuthContext";
import {
  ShieldCheck,
  Zap,
  ShoppingBag,
  Package,
  Users,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  AlertTriangle,
  Plus,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  Building2,
  Home,
  Tractor,
  Sliders,
  LogOut,
  RefreshCw,
  FileText,
  Boxes,
  Activity,
  Edit,
  BadgeAlert,
  Trash2,
  Printer,
  Download,
  Check,
  ChevronRight,
  TrendingUp,
  MapPin,
  X,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    user,
    isAdmin,
    isAuthenticated,
    logout,
    allOrders,
    allWarranties,
    inventory,
    updateOrderStatus,
    createAdminOrder,
    deleteOrder,
    registerNewWarranty,
    deleteWarranty,
    updateInventoryStock,
    addNewInventoryItem,
    deleteInventoryItem,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "inventory" | "warranties" | "clients">("overview");

  // Search & Filters
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");
  const [inventorySearch, setInventorySearch] = useState("");
  const [warrantySearch, setWarrantySearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");

  // Modals
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState<UserOrder | null>(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<UserOrder | null>(null);
  const [selectedWarrantyForView, setSelectedWarrantyForView] = useState<WarrantyRecord | null>(null);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<InventoryItem | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isWarrantyModalOpen, setIsWarrantyModalOpen] = useState(false);
  const [isNewInventoryModalOpen, setIsNewInventoryModalOpen] = useState(false);

  // Edit Order State
  const [editStatus, setEditStatus] = useState<UserOrder["status"]>("Processing");
  const [editTracking, setEditTracking] = useState("");
  const [editEngineer, setEditEngineer] = useState("");

  // New Order State
  const [newOrderCustomer, setNewOrderCustomer] = useState("");
  const [newOrderPhone, setNewOrderPhone] = useState("");
  const [newOrderEmail, setNewOrderEmail] = useState("");
  const [newOrderAddress, setNewOrderAddress] = useState("");
  const [newOrderDistrict, setNewOrderDistrict] = useState("Lusaka");
  const [newOrderProvince, setNewOrderProvince] = useState("Lusaka Province");
  const [newOrderPayment, setNewOrderPayment] = useState("Bank Transfer / EFT");
  const [newOrderSelectedSku, setNewOrderSelectedSku] = useState(inventory[0]?.sku || "");
  const [newOrderQty, setNewOrderQty] = useState(1);
  const [newOrderEngineer, setNewOrderEngineer] = useState("Eng. Patrick Banda");

  // Warranty State
  const [newWarCustomer, setNewWarCustomer] = useState("");
  const [newWarEmail, setNewWarEmail] = useState("");
  const [newWarProduct, setNewWarProduct] = useState("Greenrich WM5000 4.96kWh Lithium Battery");
  const [newWarCategory, setNewWarCategory] = useState<WarrantyRecord["category"]>("Battery");
  const [newWarSerial, setNewWarSerial] = useState("");
  const [newWarCapacity, setNewWarCapacity] = useState("4.96 kWh");
  const [newWarYears, setNewWarYears] = useState(10);
  const [newWarInstaller, setNewWarInstaller] = useState("Elleyhill Certified Tech Team (Eng. Banda)");

  // New SKU State
  const [newSkuName, setNewSkuName] = useState("");
  const [newSkuCode, setNewSkuCode] = useState("");
  const [newSkuCategory, setNewSkuCategory] = useState<InventoryItem["category"]>("Battery");
  const [newSkuStock, setNewSkuStock] = useState(10);
  const [newSkuMinThreshold, setNewSkuMinThreshold] = useState(5);
  const [newSkuPrice, setNewSkuPrice] = useState(35000);
  const [newSkuBay, setNewSkuBay] = useState("Lusaka Depot - Bay B1");

  // Stock Adjustment Input
  const [newStockInput, setNewStockInput] = useState<number>(0);

  // Security Gate
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-surface-container-low text-on-surface pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl border border-border-light shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-red-500/10 text-red-600 border border-red-500/20">
              Restricted Operations Area
            </span>
            <h1 className="text-2xl font-bold text-charcoal font-headline mt-3">Admin Access Required</h1>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              This console is restricted to authorized Elleyhill Power engineering leads, dispatch managers, and inventory supervisors.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <Link
              href="/login?redirect=/admin"
              className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all text-center block"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In with Admin Credentials</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-border-light text-xs text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              ← Return to Public Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculated Metrics
  const totalRevenueZmw = allOrders.reduce((acc, ord) => acc + ord.total, 0);
  const pendingOrders = allOrders.filter((o) => o.status === "Processing");
  const dispatchedOrders = allOrders.filter((o) => o.status === "Dispatched");
  const commissionedOrders = allOrders.filter((o) => o.status === "Delivered & Commissioned");
  const lowStockItems = inventory.filter((i) => i.stockCount <= i.minThreshold);
  const totalInventoryValueZmw = inventory.reduce((acc, item) => acc + item.stockCount * item.unitPriceZmw, 0);

  // Derive unique clients list
  const clientMap = new Map<string, {
    name: string;
    email: string;
    phone: string;
    province: string;
    district: string;
    totalOrders: number;
    totalSpend: number;
    lastOrderDate: string;
  }>();

  allOrders.forEach((ord) => {
    const key = (ord.customerEmail || ord.customerName || "client").toLowerCase();
    const existing = clientMap.get(key);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpend += ord.total;
    } else {
      clientMap.set(key, {
        name: ord.customerName || "Online Client",
        email: ord.customerEmail || "N/A",
        phone: ord.phone,
        province: ord.province,
        district: ord.district,
        totalOrders: 1,
        totalSpend: ord.total,
        lastOrderDate: ord.date,
      });
    }
  });

  const clientsList = Array.from(clientMap.values()).filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.phone.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.district.toLowerCase().includes(clientSearch.toLowerCase())
  );

  // Filters
  const filteredOrders = allOrders.filter((ord) => {
    const matchesSearch =
      ord.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      (ord.customerName && ord.customerName.toLowerCase().includes(orderSearch.toLowerCase())) ||
      ord.district.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.trackingNumber.toLowerCase().includes(orderSearch.toLowerCase());
    const matchesStatus = orderStatusFilter === "all" || ord.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.sku.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.warehouseBay.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  const filteredWarranties = allWarranties.filter(
    (w) =>
      w.productName.toLowerCase().includes(warrantySearch.toLowerCase()) ||
      w.serialNumber.toLowerCase().includes(warrantySearch.toLowerCase()) ||
      w.certificateNumber.toLowerCase().includes(warrantySearch.toLowerCase()) ||
      (w.customerName && w.customerName.toLowerCase().includes(warrantySearch.toLowerCase()))
  );

  // Actions
  const handleSaveOrderStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForEdit) return;
    updateOrderStatus(selectedOrderForEdit.id, editStatus, editTracking, editEngineer);
    setSelectedOrderForEdit(null);
  };

  const handleCreateNewOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const item = inventory.find((i) => i.sku === newOrderSelectedSku) || inventory[0];
    const itemTotal = item ? item.unitPriceZmw * newOrderQty : 50000;

    createAdminOrder({
      customerName: newOrderCustomer,
      customerEmail: newOrderEmail || "walkin@elleyhill.zm",
      phone: newOrderPhone,
      deliveryAddress: newOrderAddress,
      district: newOrderDistrict,
      province: newOrderProvince,
      status: "Processing",
      paymentMethod: newOrderPayment,
      total: itemTotal,
      subtotal: itemTotal,
      deliveryFee: 0,
      assignedEngineer: newOrderEngineer,
      estimatedDelivery: "Dispatch staged from Lusaka Warehouse",
      items: [
        {
          id: item ? item.id : "item_custom",
          name: item ? item.name : "Custom Solar Hardware Package",
          quantity: newOrderQty,
          price: item ? item.unitPriceZmw : 50000,
        },
      ],
    });

    setIsNewOrderModalOpen(false);
    setNewOrderCustomer("");
    setNewOrderPhone("");
    setNewOrderAddress("");
  };

  const handleIssueWarranty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWarProduct || !newWarSerial) return;

    registerNewWarranty({
      customerName: newWarCustomer || "Commissioned Client",
      customerEmail: newWarEmail || "client@elleyhill.zm",
      productName: newWarProduct,
      category: newWarCategory,
      serialNumber: newWarSerial,
      installationDate: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date()),
      warrantyPeriodYears: Number(newWarYears),
      expiryDate: `${new Date().getFullYear() + Number(newWarYears)}`,
      status: "Active",
      systemCapacity: newWarCapacity,
      installerName: newWarInstaller,
    });

    setIsWarrantyModalOpen(false);
    setNewWarCustomer("");
    setNewWarSerial("");
  };

  const handleAddNewSku = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkuName || !newSkuCode) return;

    addNewInventoryItem({
      name: newSkuName,
      sku: newSkuCode.toUpperCase(),
      category: newSkuCategory,
      stockCount: Number(newSkuStock),
      reservedCount: 0,
      minThreshold: Number(newSkuMinThreshold),
      unitPriceZmw: Number(newSkuPrice),
      status: Number(newSkuStock) <= Number(newSkuMinThreshold) ? "Low Stock" : "In Stock",
      warehouseBay: newSkuBay,
    });

    setIsNewInventoryModalOpen(false);
    setNewSkuName("");
    setNewSkuCode("");
  };

  const handleQuickAdjustStock = (sku: string, delta: number) => {
    const item = inventory.find((i) => i.sku === sku);
    if (item) {
      updateInventoryStock(sku, item.stockCount + delta);
    }
  };

  const exportOrdersCsv = () => {
    const headers = "Order ID,Date,Customer,Phone,Address,Province,Status,Total ZMW,Tracking\n";
    const rows = allOrders
      .map(
        (o) =>
          `"${o.id}","${o.date}","${o.customerName || ""}","${o.phone}","${o.deliveryAddress}","${o.province}","${o.status}","${o.total}","${o.trackingNumber}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `elleyhill-orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getWhatsAppDispatchMessage = (ord: UserOrder) => {
    const text = `Hello ${ord.customerName || "Valued Client"}, this is Elleyhill Power Operations Desk.\nYour solar equipment order #${ord.id} status is: ${ord.status.toUpperCase()}.\nTracking ID: ${ord.trackingNumber}\nAssigned Engineer: ${ord.assignedEngineer || "Eng. Patrick Banda"}\nDelivery Destination: ${ord.deliveryAddress}.\nThank you for choosing Tier-1 Clean Energy!`;
    return `https://wa.me/260${ord.phone.replace(/[^0-9]/g, "").slice(-9)}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface pt-24 md:pt-28 pb-16">
      {/* Top Operations Bar */}
      <div className="border-b border-border-light bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-extrabold shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-charcoal font-headline">Elleyhill Operations Console</h1>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary-light text-primary border border-primary/20">
                    Admin Root
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                  <span>Lusaka HQ Depot • {user?.fullName || "Operations Administrator"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={exportOrdersCsv}
                className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title="Export Orders CSV"
              >
                <Download className="w-3.5 h-3.5 text-secondary" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <Link
                href="/profile"
                className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Users className="w-3.5 h-3.5 text-primary" />
                <span>Customer View</span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-border-light shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase font-bold">Total Revenue Pipeline</div>
            <div className="text-2xl sm:text-3xl font-bold text-primary mt-1 font-mono">
              ZMW {(totalRevenueZmw / 1000).toFixed(1)}k
            </div>
            <div className="text-[11px] text-secondary mt-2 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{allOrders.length} Total Registered Orders</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border-light shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase font-bold">Live Dispatches</div>
            <div className="text-2xl sm:text-3xl font-bold text-charcoal mt-1">
              {pendingOrders.length} <span className="text-xs text-on-surface-variant font-normal">Pending /</span> {dispatchedOrders.length} <span className="text-xs text-secondary font-bold">In Transit</span>
            </div>
            <div className="text-[11px] text-secondary mt-2 flex items-center gap-1 font-semibold">
              <Truck className="w-3.5 h-3.5" />
              <span>{commissionedOrders.length} Commissioned to Date</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border-light shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase font-bold">Active Warranties</div>
            <div className="text-2xl sm:text-3xl font-bold text-secondary mt-1 font-mono">
              {allWarranties.length} Certificates
            </div>
            <div className="text-[11px] text-secondary mt-2 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>10-Yr Linear Output Guarantee</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-border-light shadow-sm">
            <div className="text-xs text-on-surface-variant uppercase font-bold">Warehouse Valuation</div>
            <div className="text-2xl sm:text-3xl font-bold text-charcoal mt-1 font-mono">
              ZMW {(totalInventoryValueZmw / 1000000).toFixed(2)}M
            </div>
            <div className="text-[11px] text-amber-600 mt-2 flex items-center gap-1 font-semibold">
              {lowStockItems.length > 0 ? (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{lowStockItems.length} SKUs below minimum stock</span>
                </>
              ) : (
                <span className="text-status-success font-semibold">All SKUs Fully Stocked</span>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border-light overflow-x-auto no-scrollbar gap-2 sm:gap-4 pb-px">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "overview" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Command Center</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "orders" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Dispatch Desk ({allOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "inventory" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Hardware Inventory ({inventory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("warranties")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "warranties" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Warranty Registry ({allWarranties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-2 py-3 px-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "clients" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:text-charcoal"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Client Database ({clientsList.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW COMMAND CENTER */}
        {activeTab === "overview" && (
          <div className="mt-8 space-y-8 animate-fadeIn">
            {/* Quick Actions Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-border-light shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary animate-ping" />
                <span className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  Live Operations Quick Actions
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsNewOrderModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Create Walk-in / Proforma Order</span>
                </button>
                <button
                  onClick={() => setIsWarrantyModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Issue Warranty</span>
                </button>
                <button
                  onClick={() => setIsNewInventoryModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Boxes className="w-3.5 h-3.5 text-primary" />
                  <span>+ Add New SKU</span>
                </button>
              </div>
            </div>

            {/* Grid of Dispatch Queue & Stock Watch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Live Queue (8 Cols) */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-border-light shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
                    <Truck className="w-5 h-5 text-secondary" />
                    <span>Priority Dispatch & Engineering Deployments</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-primary hover:underline font-bold"
                  >
                    View All ({allOrders.length})
                  </button>
                </div>

                <div className="space-y-3">
                  {allOrders.slice(0, 5).map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-surface-container-low border border-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-border-medium transition-all"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-charcoal text-sm font-mono">{ord.id}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              ord.status === "Delivered & Commissioned"
                                ? "bg-status-success/10 text-status-success border border-status-success/30"
                                : ord.status === "Dispatched"
                                ? "bg-secondary-light text-secondary border border-secondary/30"
                                : "bg-amber-500/10 text-amber-700 border border-amber-500/30"
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <div className="text-xs text-charcoal font-medium mt-1 truncate">
                          {ord.customerName} • {ord.deliveryAddress} ({ord.district}, {ord.province})
                        </div>
                        <div className="text-[11px] text-on-surface-variant mt-0.5">
                          Engineer: <span className="text-primary font-medium">{ord.assignedEngineer || "Eng. Patrick Banda"}</span> • Tracking: <span className="font-mono text-secondary font-semibold">{ord.trackingNumber}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedOrderForInvoice(ord)}
                          className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-charcoal text-xs border border-border-light transition-colors"
                          title="Generate Proforma VAT Invoice"
                        >
                          <FileText className="w-3.5 h-3.5 text-secondary" />
                        </button>
                        <a
                          href={getWhatsAppDispatchMessage(ord)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-status-success/10 hover:bg-status-success/20 text-status-success border border-status-success/30 text-xs flex items-center gap-1 transition-colors"
                          title="Send WhatsApp Dispatch Notice"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => {
                            setSelectedOrderForEdit(ord);
                            setEditStatus(ord.status);
                            setEditTracking(ord.trackingNumber);
                            setEditEngineer(ord.assignedEngineer || "Eng. Patrick Banda");
                          }}
                          className="px-3 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                        >
                          Manage
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Inventory Watch (4 Cols) */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-border-light shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
                      <Boxes className="w-5 h-5 text-primary" />
                      <span>Stock Control</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab("inventory")}
                      className="text-xs text-primary hover:underline font-bold"
                    >
                      View All ({inventory.length})
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {inventory.slice(0, 6).map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-surface-container-low border border-border-light flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-charcoal truncate">{item.name}</div>
                          <div className="text-[10px] text-on-surface-variant truncate">{item.warehouseBay}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono font-bold text-charcoal">{item.stockCount}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleQuickAdjustStock(item.sku, -1)}
                              className="w-6 h-6 rounded bg-surface-container hover:bg-red-500/20 text-on-surface-variant hover:text-red-600 flex items-center justify-center font-bold text-xs border border-border-light transition-colors"
                              title="Decrease 1"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleQuickAdjustStock(item.sku, 1)}
                              className="w-6 h-6 rounded bg-surface-container hover:bg-status-success/20 text-on-surface-variant hover:text-status-success flex items-center justify-center font-bold text-xs border border-border-light transition-colors"
                              title="Increase 1"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border-light text-center">
                  <span className="text-[11px] text-on-surface-variant font-medium">
                    Depot Bay Inventory Auto-Syncing with Cart & Checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS & DISPATCH DESK */}
        {activeTab === "orders" && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-charcoal font-headline">Orders & Dispatch Registry</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Nationwide Zambian order management, technician tracking, and proforma VAT invoice generation.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search by ID, client, city..."
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
                  />
                </div>

                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered & Commissioned">Delivered & Commissioned</option>
                </select>

                <button
                  onClick={() => setIsNewOrderModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ New Order</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-low border-b border-border-light text-on-surface-variant uppercase font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Order ID & Date</th>
                      <th className="py-3.5 px-4">Customer & Contact</th>
                      <th className="py-3.5 px-4">Delivery Site</th>
                      <th className="py-3.5 px-4">Items / Capacity</th>
                      <th className="py-3.5 px-4">Total Value</th>
                      <th className="py-3.5 px-4">Tracking & Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-on-surface-variant">
                          No orders matching current filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-surface-container-lowest transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-charcoal font-mono">{ord.id}</div>
                            <div className="text-[11px] text-on-surface-variant">{ord.date}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-charcoal">{ord.customerName}</div>
                            <div className="text-[11px] text-on-surface-variant">{ord.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 max-w-[180px]">
                            <div className="text-charcoal truncate">{ord.deliveryAddress}</div>
                            <div className="text-[11px] text-secondary font-semibold">{ord.district}, {ord.province}</div>
                          </td>
                          <td className="py-3.5 px-4 max-w-[180px]">
                            <div className="text-charcoal truncate font-medium">
                              {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                            </div>
                            <div className="text-[10px] text-on-surface-variant">{ord.assignedEngineer || "Unassigned"}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-primary font-mono">K{ord.total.toLocaleString()}</div>
                            <div className="text-[10px] text-on-surface-variant">{ord.paymentMethod}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 ${
                                ord.status === "Delivered & Commissioned"
                                  ? "bg-status-success/10 text-status-success border border-status-success/30"
                                  : ord.status === "Dispatched"
                                  ? "bg-secondary-light text-secondary border border-secondary/30"
                                  : "bg-amber-500/10 text-amber-700 border border-amber-500/30"
                              }`}
                            >
                              {ord.status}
                            </span>
                            <div className="font-mono text-[10px] text-on-surface-variant">{ord.trackingNumber}</div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedOrderForInvoice(ord)}
                                className="p-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary border border-border-light transition-colors"
                                title="View Proforma Invoice"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                              <a
                                href={getWhatsAppDispatchMessage(ord)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-status-success/10 hover:bg-status-success/20 text-status-success border border-status-success/30 transition-colors"
                                title="Send WhatsApp Update"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => {
                                  setSelectedOrderForEdit(ord);
                                  setEditStatus(ord.status);
                                  setEditTracking(ord.trackingNumber);
                                  setEditEngineer(ord.assignedEngineer || "Eng. Patrick Banda");
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-[11px] font-bold transition-colors cursor-pointer shadow-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete order #${ord.id}?`)) {
                                    deleteOrder(ord.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-on-surface-variant hover:text-red-600 hover:bg-red-500/10 transition-colors"
                                title="Delete Order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HARDWARE INVENTORY */}
        {activeTab === "inventory" && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-charcoal font-headline">Hardware Stock & Warehouse Inventory</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Real-time stock counts for Deye Hybrid Inverters, Greenrich Lithium Batteries, and JA Solar Panels.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative min-w-[220px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search SKU, bay, hardware..."
                    value={inventorySearch}
                    onChange={(e) => setInventorySearch(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  onClick={() => setIsNewInventoryModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New SKU</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-border-light shadow-sm p-5 flex flex-col justify-between hover:border-border-medium transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-secondary-light text-secondary border border-secondary/20">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.stockCount <= item.minThreshold
                            ? "bg-amber-500/10 text-amber-700 border border-amber-500/30"
                            : "bg-status-success/10 text-status-success border border-status-success/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-charcoal mb-1">{item.name}</h3>
                    <div className="font-mono text-[11px] text-on-surface-variant">SKU: {item.sku}</div>

                    <div className="mt-4 p-3 rounded-xl bg-surface-container-low border border-border-light space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-on-surface-variant">Stock on Hand:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuickAdjustStock(item.sku, -1)}
                            className="w-6 h-6 rounded bg-surface-container hover:bg-red-500/20 text-on-surface-variant hover:text-red-600 flex items-center justify-center font-bold border border-border-light transition-colors"
                          >
                            -
                          </button>
                          <span className="font-bold text-charcoal font-mono text-base">{item.stockCount}</span>
                          <button
                            onClick={() => handleQuickAdjustStock(item.sku, 1)}
                            className="w-6 h-6 rounded bg-surface-container hover:bg-status-success/20 text-on-surface-variant hover:text-status-success flex items-center justify-center font-bold border border-border-light transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Warehouse Bay:</span>
                        <span className="text-charcoal font-medium truncate">{item.warehouseBay}</span>
                      </div>

                      <div className="flex justify-between pt-1 border-t border-border-light">
                        <span className="text-on-surface-variant">Unit Value:</span>
                        <span className="font-bold text-primary font-mono">ZMW {item.unitPriceZmw.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border-light flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedInventoryItem(item);
                        setNewStockInput(item.stockCount);
                      }}
                      className="text-xs text-primary hover:underline font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Set Exact Count</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove SKU ${item.sku} from inventory?`)) {
                          deleteInventoryItem(item.sku);
                        }
                      }}
                      className="text-on-surface-variant hover:text-red-600 p-1 transition-colors"
                      title="Delete SKU"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DIGITAL WARRANTY REGISTRY */}
        {activeTab === "warranties" && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-charcoal font-headline">Digital Warranty Registry & Issuer</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Manage certified 10-Year Lithium Battery and 5-Year Inverter serial certificates registered in Zambia.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative min-w-[220px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search Serial, Customer, Cert #..."
                    value={warrantySearch}
                    onChange={(e) => setWarrantySearch(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  onClick={() => setIsWarrantyModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Issue New Certificate</span>
                </button>
              </div>
            </div>

            {/* Warranties Table */}
            <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-low border-b border-border-light text-on-surface-variant uppercase font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Certificate #</th>
                      <th className="py-3.5 px-4">Client / Site</th>
                      <th className="py-3.5 px-4">Hardware Unit</th>
                      <th className="py-3.5 px-4">Serial Number</th>
                      <th className="py-3.5 px-4">Coverage Period</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    {filteredWarranties.map((w) => (
                      <tr key={w.id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-secondary">{w.certificateNumber}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-charcoal">{w.customerName || "Verified Client"}</div>
                          <div className="text-[11px] text-on-surface-variant">{w.customerEmail}</div>
                        </td>
                        <td className="py-3.5 px-4 max-w-[200px]">
                          <div className="text-charcoal font-medium truncate">{w.productName}</div>
                          <div className="text-[10px] text-on-surface-variant">{w.systemCapacity || w.category}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-charcoal text-[11px]">{w.serialNumber}</td>
                        <td className="py-3.5 px-4">
                          <div className="text-status-success font-bold">{w.warrantyPeriodYears} Years</div>
                          <div className="text-[10px] text-on-surface-variant">Installed: {w.installationDate}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-status-success/10 text-status-success border border-status-success/30">
                            {w.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedWarrantyForView(w)}
                              className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-charcoal text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 border border-border-light"
                            >
                              <FileText className="w-3 h-3" />
                              <span>View Certificate</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete warranty certificate ${w.certificateNumber}?`)) {
                                  deleteWarranty(w.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-on-surface-variant hover:text-red-600 transition-colors"
                              title="Delete Certificate"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CLIENT DATABASE & CRM */}
        {activeTab === "clients" && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-charcoal font-headline">Zambian Solar Client Database</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Customer profiles, total spent in ZMW, installation locations, and direct contact desk.
                </p>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="text"
                  placeholder="Search client name, phone, province..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal placeholder:text-on-surface-variant focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientsList.map((client, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-border-light shadow-sm p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-charcoal text-base">{client.name}</h3>
                        <div className="text-xs text-secondary font-semibold mt-0.5">{client.district}, {client.province}</div>
                      </div>
                      <span className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                        {client.name.charAt(0)}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs pt-2 border-t border-border-light">
                      <div className="flex items-center gap-1.5 text-charcoal font-medium">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <Mail className="w-3.5 h-3.5 text-secondary" />
                        <span className="truncate">{client.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-surface-container-low border border-border-light flex justify-between items-center text-xs">
                      <div>
                        <span className="text-on-surface-variant block text-[10px] uppercase font-bold">Total Orders</span>
                        <span className="font-bold text-charcoal">{client.totalOrders} Completed</span>
                      </div>
                      <div className="text-right">
                        <span className="text-on-surface-variant block text-[10px] uppercase font-bold">Lifetime Value</span>
                        <span className="font-bold text-primary font-mono">ZMW {client.totalSpend.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border-light flex items-center justify-between">
                    <a
                      href={`https://wa.me/260${client.phone.replace(/[^0-9]/g, "").slice(-9)}?text=Hello%20${encodeURIComponent(client.name)},%20this%20is%20Elleyhill%20Power%20Zambia.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-status-success hover:underline font-bold flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                    <span className="text-[10px] text-on-surface-variant font-medium">Active Client</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: EDIT / DISPATCH ORDER */}
      {selectedOrderForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-border-medium rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-charcoal font-headline mb-1">
              Update Dispatch #{selectedOrderForEdit.id}
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Client: <span className="text-charcoal font-semibold">{selectedOrderForEdit.customerName}</span> ({selectedOrderForEdit.phone})
            </p>

            <form onSubmit={handleSaveOrderStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  Order & Dispatch Status *
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as UserOrder["status"])}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-border-medium text-sm text-charcoal focus:outline-none focus:border-primary"
                >
                  <option value="Processing">Processing (Staging in Warehouse)</option>
                  <option value="Dispatched">Dispatched (En Route / Delivery Truck)</option>
                  <option value="Delivered & Commissioned">Delivered & Commissioned (Complete)</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  Carrier / Vehicle Tracking Code
                </label>
                <input
                  type="text"
                  value={editTracking}
                  onChange={(e) => setEditTracking(e.target.value)}
                  placeholder="e.g. EHP-LUS-0001"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-border-medium text-sm text-charcoal focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  Assigned Lead Technician / Engineer
                </label>
                <input
                  type="text"
                  value={editEngineer}
                  onChange={(e) => setEditEngineer(e.target.value)}
                  placeholder="e.g. Eng. Patrick Banda (ERB Registered)"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-border-medium text-sm text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForEdit(null)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md shadow-primary/20 cursor-pointer"
                >
                  Save Dispatch Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE PROFORMA VAT INVOICE */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-border-medium rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-6 border-b border-border-light">
              <div>
                <div className="text-xs font-bold text-primary tracking-widest uppercase">ELLEYHILL POWER ZAMBIA LTD</div>
                <h3 className="text-xl font-bold text-charcoal font-headline mt-1">Official Proforma Tax Invoice</h3>
                <div className="text-xs text-on-surface-variant font-mono mt-1">Ref: {selectedOrderForInvoice.id}</div>
              </div>
              <div className="text-right text-xs text-on-surface-variant space-y-0.5">
                <div>ZRA TPIN: <span className="text-charcoal font-mono font-bold">1003482910</span></div>
                <div>Date: <span className="text-charcoal">{selectedOrderForInvoice.date}</span></div>
                <div>Status: <span className="text-status-success font-bold">{selectedOrderForInvoice.status}</span></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-b border-border-light text-xs">
              <div>
                <div className="text-on-surface-variant uppercase font-bold text-[10px] mb-1">Billed & Delivered To:</div>
                <div className="font-bold text-charcoal text-sm">{selectedOrderForInvoice.customerName}</div>
                <div className="text-on-surface-variant mt-0.5">{selectedOrderForInvoice.deliveryAddress}</div>
                <div className="text-on-surface-variant">{selectedOrderForInvoice.district}, {selectedOrderForInvoice.province}</div>
                <div className="text-primary mt-1 font-semibold">{selectedOrderForInvoice.phone}</div>
              </div>

              <div>
                <div className="text-on-surface-variant uppercase font-bold text-[10px] mb-1">Dispatch Logistics:</div>
                <div className="text-charcoal font-mono font-medium">Tracking: {selectedOrderForInvoice.trackingNumber}</div>
                <div className="text-on-surface-variant mt-0.5">Payment: {selectedOrderForInvoice.paymentMethod}</div>
                <div className="text-on-surface-variant">Lead Engineer: {selectedOrderForInvoice.assignedEngineer || "Eng. Patrick Banda"}</div>
              </div>
            </div>

            {/* Invoice Line Items */}
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
                  {selectedOrderForInvoice.items.map((item, idx) => (
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
                <span className="font-mono text-charcoal font-bold">ZMW {selectedOrderForInvoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Logistics & Delivery:</span>
                <span className="font-mono text-status-success font-bold">
                  {selectedOrderForInvoice.deliveryFee === 0 ? "FREE (> K78,000)" : `ZMW ${selectedOrderForInvoice.deliveryFee.toLocaleString()}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">16% ZRA Statutory VAT:</span>
                <span className="font-mono text-status-success font-bold">0% (Clean Energy Zero-Rated)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border-light text-sm font-bold">
                <span className="text-charcoal uppercase">Grand Total:</span>
                <span className="text-primary text-base font-mono">ZMW {selectedOrderForInvoice.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border-light">
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
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

      {/* MODAL 3: VIEW DIGITAL WARRANTY CERTIFICATE */}
      {selectedWarrantyForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border-2 border-secondary/30 rounded-2xl max-w-lg w-full p-8 shadow-2xl relative text-center">
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
              Certificate No: {selectedWarrantyForView.certificateNumber}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-surface-container-low border border-border-light text-left text-xs space-y-2.5">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Registered Client:</span>
                <span className="text-charcoal font-bold">{selectedWarrantyForView.customerName || "Verified Client"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Hardware Model:</span>
                <span className="text-charcoal font-semibold truncate max-w-[220px]">{selectedWarrantyForView.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Serial Number:</span>
                <span className="font-mono text-secondary font-bold">{selectedWarrantyForView.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Installed Date:</span>
                <span className="text-charcoal">{selectedWarrantyForView.installationDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Guarantee Period:</span>
                <span className="text-status-success font-bold">{selectedWarrantyForView.warrantyPeriodYears} Years (Expires {selectedWarrantyForView.expiryDate})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Certified Installer:</span>
                <span className="text-charcoal">{selectedWarrantyForView.installerName || "Elleyhill Tech Team"}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedWarrantyForView(null)}
                className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => alert(`Certificate ${selectedWarrantyForView.certificateNumber} verified and ready for download.`)}
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: CREATE NEW ORDER */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-border-medium rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-charcoal font-headline mb-1">Create Offline / Walk-in Order</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Enter customer details and select hardware for direct Lusaka warehouse fulfillment.
            </p>

            <form onSubmit={handleCreateNewOrder} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Customer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Customer Name"
                    value={newOrderCustomer}
                    onChange={(e) => setNewOrderCustomer(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0977 000 000"
                    value={newOrderPhone}
                    onChange={(e) => setNewOrderPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  Delivery / Physical Site Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Plot 4812, Woodlands, Lusaka"
                  value={newOrderAddress}
                  onChange={(e) => setNewOrderAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Province
                  </label>
                  <input
                    type="text"
                    value={newOrderProvince}
                    onChange={(e) => setNewOrderProvince(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    District / Area
                  </label>
                  <input
                    type="text"
                    value={newOrderDistrict}
                    onChange={(e) => setNewOrderDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Select Hardware SKU *
                  </label>
                  <select
                    value={newOrderSelectedSku}
                    onChange={(e) => setNewOrderSelectedSku(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  >
                    {inventory.map((item) => (
                      <option key={item.sku} value={item.sku}>
                        {item.name} (K{item.unitPriceZmw.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newOrderQty}
                    onChange={(e) => setNewOrderQty(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  Payment Method
                </label>
                <select
                  value={newOrderPayment}
                  onChange={(e) => setNewOrderPayment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                >
                  <option value="Bank Transfer (EFT Confirmed)">Bank Transfer (EFT Confirmed)</option>
                  <option value="Mobile Money (MTN MoMo)">Mobile Money (MTN MoMo)</option>
                  <option value="Mobile Money (Airtel Money)">Mobile Money (Airtel Money)</option>
                  <option value="Cash / POS at Showroom">Cash / POS at Showroom</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md shadow-primary/20 cursor-pointer"
                >
                  Confirm & Stage Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ISSUE NEW WARRANTY */}
      {isWarrantyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-border-medium rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-charcoal font-headline mb-1">
              Issue Official Digital Warranty Certificate
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Registers solar equipment under manufacturer warranty in Zambia registry.
            </p>

            <form onSubmit={handleIssueWarranty} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Customer Name"
                    value={newWarCustomer}
                    onChange={(e) => setNewWarCustomer(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Customer Email
                  </label>
                  <input
                    type="email"
                    placeholder="customer@example.com"
                    value={newWarEmail}
                    onChange={(e) => setNewWarEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  Product Model & Hardware Name *
                </label>
                <input
                  type="text"
                  required
                  value={newWarProduct}
                  onChange={(e) => setNewWarProduct(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Hardware Category
                  </label>
                  <select
                    value={newWarCategory}
                    onChange={(e) => setNewWarCategory(e.target.value as WarrantyRecord["category"])}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  >
                    <option value="Battery">Lithium Battery</option>
                    <option value="Inverter">Hybrid Inverter</option>
                    <option value="Solar Panels">Solar Array</option>
                    <option value="Complete System">Turnkey Microgrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Coverage Years
                  </label>
                  <select
                    value={newWarYears}
                    onChange={(e) => setNewWarYears(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  >
                    <option value={10}>10 Years (Lithium Batteries)</option>
                    <option value={12}>12 Years (JA Solar Panels)</option>
                    <option value={5}>5 Years (Deye Inverters)</option>
                    <option value={3}>3 Years (Accessories)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Hardware Serial Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GR-WM50-2026-9812"
                    value={newWarSerial}
                    onChange={(e) => setNewWarSerial(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    System Capacity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4.96 kWh / 6 kW"
                    value={newWarCapacity}
                    onChange={(e) => setNewWarCapacity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
                <button
                  type="button"
                  onClick={() => setIsWarrantyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md shadow-primary/20 cursor-pointer"
                >
                  Issue & Register Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: ADD NEW INVENTORY SKU */}
      {isNewInventoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-border-medium rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-charcoal font-headline mb-1">Add New Hardware SKU</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Register a new hardware line in the Lusaka Warehouse inventory system.
            </p>

            <form onSubmit={handleAddNewSku} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Hardware Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deye 12kW 3-Phase Inverter"
                    value={newSkuName}
                    onChange={(e) => setNewSkuName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="DY-12K-3P-ZM"
                    value={newSkuCode}
                    onChange={(e) => setNewSkuCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Category
                  </label>
                  <select
                    value={newSkuCategory}
                    onChange={(e) => setNewSkuCategory(e.target.value as InventoryItem["category"])}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  >
                    <option value="Battery">Lithium Battery</option>
                    <option value="Inverter">Hybrid Inverter</option>
                    <option value="Solar Panels">Solar Panels</option>
                    <option value="Mounting & Accessories">Mounting & Accessories</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Warehouse Bay
                  </label>
                  <input
                    type="text"
                    value={newSkuBay}
                    onChange={(e) => setNewSkuBay(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Stock Initial
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={newSkuStock}
                    onChange={(e) => setNewSkuStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Min Threshold
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newSkuMinThreshold}
                    onChange={(e) => setNewSkuMinThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                    Price (ZMW)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={newSkuPrice}
                    onChange={(e) => setNewSkuPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-border-medium text-xs text-charcoal focus:outline-none focus:border-primary font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
                <button
                  type="button"
                  onClick={() => setIsNewInventoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md shadow-primary/20 cursor-pointer"
                >
                  Register SKU in Depot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 7: SET EXACT STOCK */}
      {selectedInventoryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-border-medium rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-charcoal font-headline mb-1">
              Adjust Physical Stock
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              {selectedInventoryItem.name} (<span className="font-mono text-secondary font-semibold">{selectedInventoryItem.sku}</span>)
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateInventoryStock(selectedInventoryItem.sku, newStockInput);
                setSelectedInventoryItem(null);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 uppercase">
                  New Physical Stock Count on Hand
                </label>
                <input
                  type="number"
                  min={0}
                  value={newStockInput}
                  onChange={(e) => setNewStockInput(Number(e.target.value))}
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-border-medium text-lg font-mono font-bold text-primary focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-light">
                <button
                  type="button"
                  onClick={() => setSelectedInventoryItem(null)}
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-md shadow-primary/20 cursor-pointer"
                >
                  Confirm Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
