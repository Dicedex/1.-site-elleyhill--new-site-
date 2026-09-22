"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type AccountType = "residential" | "commercial" | "agricultural";
export type UserRole = "admin" | "customer";

export interface SavedAddress {
  id: string;
  label: string; // e.g. "Main Residence", "Kafue Farm Pump Station"
  fullAddress: string;
  district: string;
  province: string;
  contactPhone: string;
  isDefault: boolean;
}

export interface WarrantyRecord {
  id: string;
  customerName?: string;
  customerEmail?: string;
  productName: string;
  category: "Battery" | "Inverter" | "Solar Panels" | "Complete System";
  serialNumber: string;
  installationDate: string;
  warrantyPeriodYears: number;
  expiryDate: string;
  status: "Active" | "Pending Inspection" | "Expired";
  systemCapacity?: string;
  installerName?: string;
  certificateNumber: string;
}

export interface OrderItemSummary {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface UserOrder {
  id: string;
  customerName?: string;
  customerEmail?: string;
  date: string;
  items: OrderItemSummary[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  status: "Processing" | "Dispatched" | "Delivered & Commissioned" | "Cancelled";
  deliveryAddress: string;
  district: string;
  province: string;
  phone: string;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
  assignedEngineer?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: "Battery" | "Inverter" | "Solar Panels" | "Mounting & Accessories";
  stockCount: number;
  reservedCount: number;
  minThreshold: number;
  unitPriceZmw: number;
  status: "In Stock" | "Low Stock" | "Shipment En Route";
  warehouseBay: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role?: UserRole;
  accountType: AccountType;
  companyName?: string;
  tpin?: string;
  primaryProvince: string;
  primaryDistrict: string;
  primaryAddress: string;
  avatarUrl?: string;
  joinedDate: string;
  savedAddresses: SavedAddress[];
  warranties: WarrantyRecord[];
  orders: UserOrder[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  signup: (userData: Omit<UserProfile, "id" | "joinedDate" | "warranties" | "orders" | "savedAddresses">, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => Promise<void>;
  addSavedAddress: (address: Omit<SavedAddress, "id">) => void;
  deleteSavedAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: {
    id?: string;
    customerName?: string;
    customerEmail?: string;
    items: OrderItemSummary[];
    total: number;
    subtotal: number;
    deliveryFee: number;
    deliveryAddress: string;
    district: string;
    province: string;
    phone: string;
    paymentMethod: string;
    assignedEngineer?: string;
    trackingNumber?: string;
  }) => UserOrder;
  loginWithDemo: (type: "residential" | "commercial" | "admin") => void;

  // Admin Specific Controls
  allOrders: UserOrder[];
  allWarranties: WarrantyRecord[];
  inventory: InventoryItem[];
  updateOrderStatus: (orderId: string, status: UserOrder["status"], trackingNumber?: string, engineer?: string) => void;
  createAdminOrder: (order: Omit<UserOrder, "id" | "date" | "trackingNumber">) => UserOrder;
  deleteOrder: (orderId: string) => void;
  registerNewWarranty: (warrantyData: Omit<WarrantyRecord, "id" | "certificateNumber">) => WarrantyRecord;
  deleteWarranty: (id: string) => void;
  updateInventoryStock: (sku: string, newStock: number) => void;
  addNewInventoryItem: (item: Omit<InventoryItem, "id">) => void;
  deleteInventoryItem: (sku: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial Master Data for Admin
const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: "inv_01",
    name: "Greenrich WM5000 4.96kWh High-Output Lithium Battery (1.5C)",
    sku: "GR-WM5000-ZM",
    category: "Battery",
    stockCount: 42,
    reservedCount: 8,
    minThreshold: 10,
    unitPriceZmw: 42000,
    status: "In Stock",
    warehouseBay: "Lusaka Depot - Bay B2",
  },
  {
    id: "inv_02",
    name: "Greenrich UP5000 4.96kWh Wall-Mount Lithium Battery",
    sku: "GR-UP5000-ZM",
    category: "Battery",
    stockCount: 28,
    reservedCount: 6,
    minThreshold: 10,
    unitPriceZmw: 38500,
    status: "In Stock",
    warehouseBay: "Lusaka Depot - Bay B3",
  },
  {
    id: "inv_03",
    name: "Greenrich HV-Cabinet 40kWh Industrial Storage Rack",
    sku: "GR-HV40K-ZM",
    category: "Battery",
    stockCount: 4,
    reservedCount: 2,
    minThreshold: 2,
    unitPriceZmw: 295000,
    status: "In Stock",
    warehouseBay: "Lusaka Heavy Rigging Yard",
  },
  {
    id: "inv_04",
    name: "Deye 6kW Low Voltage Hybrid Inverter (SUN-6K-SG04LP1)",
    sku: "DY-6K-LV-ZM",
    category: "Inverter",
    stockCount: 35,
    reservedCount: 12,
    minThreshold: 8,
    unitPriceZmw: 36000,
    status: "In Stock",
    warehouseBay: "Lusaka Depot - Bay I1",
  },
  {
    id: "inv_05",
    name: "Deye 8kW Low Voltage Hybrid Inverter (SUN-8K-SG01LP1)",
    sku: "DY-8K-LV-ZM",
    category: "Inverter",
    stockCount: 18,
    reservedCount: 5,
    minThreshold: 6,
    unitPriceZmw: 46500,
    status: "In Stock",
    warehouseBay: "Lusaka Depot - Bay I2",
  },
  {
    id: "inv_06",
    name: "Deye 50kW 3-Phase Commercial Hybrid Inverter (SUN-50K-SG01HP3)",
    sku: "DY-50K-HV-ZM",
    category: "Inverter",
    stockCount: 3,
    reservedCount: 1,
    minThreshold: 2,
    unitPriceZmw: 185000,
    status: "Low Stock",
    warehouseBay: "Lusaka Heavy Rigging Yard",
  },
  {
    id: "inv_07",
    name: "JA Solar 550W Deep Blue 3.0 MBB Mono Panels (Tier-1)",
    sku: "JA-550M-MBB",
    category: "Solar Panels",
    stockCount: 480,
    reservedCount: 120,
    minThreshold: 100,
    unitPriceZmw: 3100,
    status: "In Stock",
    warehouseBay: "Lusaka Depot - Pallet Rack P1-P4",
  },
  {
    id: "inv_08",
    name: "JA Solar 605W Bifacial Double-Glass Tier-1 Panels",
    sku: "JA-605W-BF",
    category: "Solar Panels",
    stockCount: 12,
    reservedCount: 8,
    minThreshold: 50,
    unitPriceZmw: 3600,
    status: "Shipment En Route",
    warehouseBay: "Container Transit (Durban -> Lusaka)",
  },
];

const DEMO_RESIDENTIAL_USER: UserProfile = {
  id: "usr_zm_98412",
  fullName: "Mwape Chilufya",
  email: "mwape.chilufya@gmail.com",
  phone: "0977 452 819",
  role: "customer",
  accountType: "residential",
  primaryProvince: "Lusaka Province",
  primaryDistrict: "Lusaka (Woodlands)",
  primaryAddress: "Plot 4812, Independence Avenue, Woodlands, Lusaka",
  joinedDate: "January 2024",
  savedAddresses: [
    {
      id: "addr_1",
      label: "Main Residence (Woodlands)",
      fullAddress: "Plot 4812, Independence Avenue, Woodlands",
      district: "Lusaka",
      province: "Lusaka Province",
      contactPhone: "0977 452 819",
      isDefault: true,
    },
    {
      id: "addr_2",
      label: "Family House (Silverest)",
      fullAddress: "Stand 204, Great East Road Corridor, Silverest",
      district: "Chongwe",
      province: "Lusaka Province",
      contactPhone: "0966 812 300",
      isDefault: false,
    },
  ],
  warranties: [
    {
      id: "war_01",
      customerName: "Mwape Chilufya",
      customerEmail: "mwape.chilufya@gmail.com",
      productName: "Greenrich WM5000 4.96kWh High-Output Lithium Battery",
      category: "Battery",
      serialNumber: "GR-WM50-2024-08942",
      installationDate: "12 Feb 2024",
      warrantyPeriodYears: 10,
      expiryDate: "12 Feb 2034",
      status: "Active",
      systemCapacity: "4.96 kWh / 1.5C Discharge",
      installerName: "Elleyhill Certified Tech Team (Eng. Banda)",
      certificateNumber: "EHP-WAR-2024-00412",
    },
    {
      id: "war_02",
      customerName: "Mwape Chilufya",
      customerEmail: "mwape.chilufya@gmail.com",
      productName: "Deye 6kW Low Voltage Hybrid Inverter (SUN-6K-SG04LP1)",
      category: "Inverter",
      serialNumber: "DY-6K-2024-33109",
      installationDate: "12 Feb 2024",
      warrantyPeriodYears: 5,
      expiryDate: "12 Feb 2029",
      status: "Active",
      systemCapacity: "6 kW Single-Phase",
      installerName: "Elleyhill Certified Tech Team",
      certificateNumber: "EHP-WAR-2024-00413",
    },
    {
      id: "war_03",
      customerName: "Mwape Chilufya",
      customerEmail: "mwape.chilufya@gmail.com",
      productName: "JA Solar 550W Deep Blue 3.0 Tier-1 Mono MBB (x12 Panels)",
      category: "Solar Panels",
      serialNumber: "JA-550M-SET-4412",
      installationDate: "12 Feb 2024",
      warrantyPeriodYears: 12,
      expiryDate: "12 Feb 2036",
      status: "Active",
      systemCapacity: "6.6 kWp Solar Array",
      installerName: "Elleyhill Certified Tech Team",
      certificateNumber: "EHP-WAR-2024-00414",
    },
  ],
  orders: [
    {
      id: "ORD-2024-8841",
      customerName: "Mwape Chilufya",
      customerEmail: "mwape.chilufya@gmail.com",
      date: "10 Feb 2024",
      items: [
        {
          id: "sys_6kw_complete",
          name: "6kW Tier-1 Residential Hybrid Backup Package (Deye + Greenrich 5kWh + 12x JA 550W)",
          quantity: 1,
          price: 115000,
        },
      ],
      total: 115000,
      subtotal: 115000,
      deliveryFee: 0,
      status: "Delivered & Commissioned",
      deliveryAddress: "Plot 4812, Independence Avenue, Woodlands, Lusaka",
      district: "Lusaka",
      province: "Lusaka Province",
      phone: "0977 452 819",
      paymentMethod: "Bank Transfer (Proforma Invoice)",
      trackingNumber: "EHP-EXP-08841",
      estimatedDelivery: "Delivered 12 Feb 2024",
      assignedEngineer: "Eng. Patrick Banda",
    },
  ],
};

const DEMO_COMMERCIAL_USER: UserProfile = {
  id: "usr_zm_30491",
  fullName: "Kafue Agri-Holdings Ltd",
  companyName: "Kafue Agri-Holdings Limited",
  tpin: "1002948210",
  email: "operations@kafueagri.com",
  phone: "0971 838 038",
  role: "customer",
  accountType: "agricultural",
  primaryProvince: "Southern Province",
  primaryDistrict: "Mazabuka / Kafue Basin",
  primaryAddress: "Farm 449B, Sugar Cane Belt Road, Mazabuka District",
  joinedDate: "October 2023",
  savedAddresses: [
    {
      id: "addr_c1",
      label: "Irrigation Pump Station 1 (Mazabuka)",
      fullAddress: "Farm 449B, Riverside Pump Section",
      district: "Mazabuka",
      province: "Southern Province",
      contactPhone: "0971 838 038",
      isDefault: true,
    },
    {
      id: "addr_c2",
      label: "Cold Chain Logistics Hub (Lusaka West)",
      fullAddress: "Plot 12, Mumbwa Road Industrial Area",
      district: "Lusaka",
      province: "Lusaka Province",
      contactPhone: "0971 838 038",
      isDefault: false,
    },
  ],
  warranties: [
    {
      id: "war_c1",
      customerName: "Kafue Agri-Holdings Ltd",
      customerEmail: "operations@kafueagri.com",
      productName: "Greenrich HV-Cabinet 40kWh Industrial Storage Rack",
      category: "Battery",
      serialNumber: "GR-HV-40K-2023-0012",
      installationDate: "20 Nov 2023",
      warrantyPeriodYears: 10,
      expiryDate: "20 Nov 2033",
      status: "Active",
      systemCapacity: "40 kWh High-Voltage",
      installerName: "Elleyhill Heavy Engineering Division",
      certificateNumber: "EHP-WAR-2023-COM082",
    },
    {
      id: "war_c2",
      customerName: "Kafue Agri-Holdings Ltd",
      customerEmail: "operations@kafueagri.com",
      productName: "Deye 50kW 3-Phase Commercial Hybrid Inverter (SUN-50K-SG01HP3)",
      category: "Inverter",
      serialNumber: "DY-50K-2023-99014",
      installationDate: "20 Nov 2023",
      warrantyPeriodYears: 5,
      expiryDate: "20 Nov 2028",
      status: "Active",
      systemCapacity: "50 kW 3-Phase 380V/400V",
      installerName: "Elleyhill Heavy Engineering Division",
      certificateNumber: "EHP-WAR-2023-COM083",
    },
  ],
  orders: [
    {
      id: "ORD-2023-1092",
      customerName: "Kafue Agri-Holdings Ltd",
      customerEmail: "operations@kafueagri.com",
      date: "14 Nov 2023",
      items: [
        {
          id: "sys_50kw_comm",
          name: "50kW Turnkey Solar Irrigation & Cold-Storage Microgrid Package",
          quantity: 1,
          price: 480000,
        },
      ],
      total: 480000,
      subtotal: 480000,
      deliveryFee: 0,
      status: "Delivered & Commissioned",
      deliveryAddress: "Farm 449B, Sugar Cane Belt Road, Mazabuka District",
      district: "Mazabuka",
      province: "Southern Province",
      phone: "0971 838 038",
      paymentMethod: "Corporate Bank Transfer",
      trackingNumber: "EHP-FREIGHT-4402",
      estimatedDelivery: "Delivered & Commissioned 20 Nov 2023",
      assignedEngineer: "Elleyhill EPC Lead Engineer",
    },
  ],
};

const DEMO_ADMIN_USER: UserProfile = {
  id: "adm_zm_001",
  fullName: "Elleyhill Operations Admin",
  email: "admin@elleyhill.co.zm",
  phone: "0971 838 038",
  role: "admin",
  accountType: "commercial",
  companyName: "Elleyhill Power Zambia - HQ Operations",
  tpin: "1003482910",
  primaryProvince: "Lusaka Province",
  primaryDistrict: "Lusaka (Showgrounds / Great East)",
  primaryAddress: "Elleyhill Energy Hub, Great East Road & East Park Mall Depot",
  joinedDate: "October 2022",
  savedAddresses: [],
  warranties: [],
  orders: [],
};

const INITIAL_ALL_ORDERS: UserOrder[] = [
  ...DEMO_RESIDENTIAL_USER.orders,
  ...DEMO_COMMERCIAL_USER.orders,
  {
    id: "ORD-2026-9214",
    customerName: "Dr. Mutale Chisenga",
    customerEmail: "mutale.chisenga@unza.zm",
    date: "16 Sep 2026",
    items: [
      {
        id: "sys_8kw_deye",
        name: "8kW Deye Low Voltage Hybrid Inverter + Greenrich 10kWh Dual Rack",
        quantity: 1,
        price: 138000,
      },
    ],
    total: 138000,
    subtotal: 138000,
    deliveryFee: 0,
    status: "Processing",
    deliveryAddress: "Stand 49, Kabulonga Extension, Lusaka",
    district: "Lusaka",
    province: "Lusaka Province",
    phone: "0978 912 344",
    paymentMethod: "Airtel Money (+260978912344)",
    trackingNumber: "EHP-LUS-9214",
    estimatedDelivery: "Technician Dispatch Scheduled Today",
    assignedEngineer: "Eng. Patrick Banda",
  },
  {
    id: "ORD-2026-9180",
    customerName: "Copperbelt Medical Clinic",
    customerEmail: "supplies@cbmedical.co.zm",
    date: "15 Sep 2026",
    items: [
      {
        id: "sys_12kw_3p",
        name: "12kW 3-Phase Solar Backup Kit (Critical ICU & Lab Circuits)",
        quantity: 1,
        price: 185000,
      },
    ],
    total: 187500,
    subtotal: 185000,
    deliveryFee: 2500,
    status: "Dispatched",
    deliveryAddress: "Plot 812, Independence Avenue, Ndola",
    district: "Ndola",
    province: "Copperbelt Province",
    phone: "0966 401 228",
    paymentMethod: "Bank Transfer (EFT Confirmed)",
    trackingNumber: "EHP-EXP-9180",
    estimatedDelivery: "En Route on Lusaka-Ndola Transit Truck",
    assignedEngineer: "Eng. James Mwewa",
  },
];

const INITIAL_ALL_WARRANTIES: WarrantyRecord[] = [
  ...DEMO_RESIDENTIAL_USER.warranties,
  ...DEMO_COMMERCIAL_USER.warranties,
  {
    id: "war_c3",
    customerName: "Copperbelt Medical Clinic",
    customerEmail: "supplies@cbmedical.co.zm",
    productName: "Greenrich WM5000 4.96kWh High-Output Lithium Battery (x2 Units)",
    category: "Battery",
    serialNumber: "GR-WM50-2026-11048",
    installationDate: "15 Sep 2026",
    warrantyPeriodYears: 10,
    expiryDate: "15 Sep 2036",
    status: "Pending Inspection",
    systemCapacity: "9.92 kWh Lithium Bank",
    installerName: "Elleyhill Ndola Regional Field Team",
    certificateNumber: "EHP-WAR-2026-CB048",
  },
];

const STORAGE_KEY_CURRENT = "elleyhill_auth_user_v1";
const STORAGE_KEY_USERS_DB = "elleyhill_users_db_v1";
const STORAGE_KEY_ADMIN_ORDERS = "elleyhill_admin_orders_v1";
const STORAGE_KEY_ADMIN_WARRANTIES = "elleyhill_admin_warranties_v1";
const STORAGE_KEY_ADMIN_INVENTORY = "elleyhill_admin_inventory_v1";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Master Admin State
  const [allOrders, setAllOrders] = useState<UserOrder[]>(INITIAL_ALL_ORDERS);
  const [allWarranties, setAllWarranties] = useState<WarrantyRecord[]>(INITIAL_ALL_WARRANTIES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      const storedOrders = localStorage.getItem(STORAGE_KEY_ADMIN_ORDERS);
      if (storedOrders) {
        setAllOrders(JSON.parse(storedOrders));
      }

      const storedWarranties = localStorage.getItem(STORAGE_KEY_ADMIN_WARRANTIES);
      if (storedWarranties) {
        setAllWarranties(JSON.parse(storedWarranties));
      }

      const storedInventory = localStorage.getItem(STORAGE_KEY_ADMIN_INVENTORY);
      if (storedInventory) {
        setInventory(JSON.parse(storedInventory));
      }
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (userProfile: UserProfile | null) => {
    setUser(userProfile);
    if (userProfile) {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(userProfile));
      try {
        const rawDb = localStorage.getItem(STORAGE_KEY_USERS_DB);
        const usersDb: Record<string, UserProfile> = rawDb ? JSON.parse(rawDb) : {};
        usersDb[userProfile.email.toLowerCase()] = userProfile;
        localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(usersDb));
      } catch (e) {
        console.error("DB update error", e);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT);
    }
  };

  const login = async (email: string, _password?: string): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 400));

    const cleanEmail = email.trim().toLowerCase();

    // Check Admin account
    if (cleanEmail === DEMO_ADMIN_USER.email.toLowerCase() || cleanEmail === "admin@elleyhill.zm" || cleanEmail === "admin") {
      saveUserSession(DEMO_ADMIN_USER);
      setIsLoading(false);
      return { success: true, role: "admin" };
    }

    // Check pre-seeded / registered users in localStorage DB
    try {
      const rawDb = localStorage.getItem(STORAGE_KEY_USERS_DB);
      const usersDb: Record<string, UserProfile> = rawDb ? JSON.parse(rawDb) : {};

      if (usersDb[cleanEmail]) {
        saveUserSession(usersDb[cleanEmail]);
        setIsLoading(false);
        return { success: true, role: usersDb[cleanEmail].role || "customer" };
      }
    } catch (err) {
      console.error(err);
    }

    // Check demo customer accounts
    if (cleanEmail === DEMO_RESIDENTIAL_USER.email.toLowerCase() || cleanEmail === "mwape@elleyhill.co.zm") {
      saveUserSession(DEMO_RESIDENTIAL_USER);
      setIsLoading(false);
      return { success: true, role: "customer" };
    }

    if (cleanEmail === DEMO_COMMERCIAL_USER.email.toLowerCase() || cleanEmail === "agri@elleyhill.co.zm") {
      saveUserSession(DEMO_COMMERCIAL_USER);
      setIsLoading(false);
      return { success: true, role: "customer" };
    }

    // Fallback: create a clean new session for valid email
    if (cleanEmail.includes("@")) {
      const username = cleanEmail.split("@")[0].replace(".", " ");
      const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        fullName: formattedName,
        email: cleanEmail,
        phone: "+260 97 000 0000",
        role: "customer",
        accountType: "residential",
        primaryProvince: "Lusaka Province",
        primaryDistrict: "Lusaka",
        primaryAddress: "Lusaka, Zambia",
        joinedDate: "Today",
        savedAddresses: [],
        warranties: [],
        orders: [],
      };
      saveUserSession(newUser);
      setIsLoading(false);
      return { success: true, role: "customer" };
    }

    setIsLoading(false);
    return { success: false, error: "Please enter a valid email address." };
  };

  const signup = async (
    userData: Omit<UserProfile, "id" | "joinedDate" | "warranties" | "orders" | "savedAddresses">,
    _password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 500));

    const newUser: UserProfile = {
      ...userData,
      role: "customer",
      id: `usr_${Date.now()}`,
      joinedDate: new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date()),
      savedAddresses: [
        {
          id: `addr_${Date.now()}`,
          label: "Primary Site / Delivery Point",
          fullAddress: userData.primaryAddress,
          district: userData.primaryDistrict,
          province: userData.primaryProvince,
          contactPhone: userData.phone,
          isDefault: true,
        },
      ],
      warranties: [],
      orders: [],
    };

    saveUserSession(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    saveUserSession(null);
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    saveUserSession(updated);
  };

  const addSavedAddress = (address: Omit<SavedAddress, "id">) => {
    if (!user) return;
    const newAddr: SavedAddress = {
      ...address,
      id: `addr_${Date.now()}`,
    };
    const updatedAddresses = address.isDefault
      ? user.savedAddresses.map((a) => ({ ...a, isDefault: false })).concat(newAddr)
      : [...user.savedAddresses, newAddr];

    const updated = { ...user, savedAddresses: updatedAddresses };
    saveUserSession(updated);
  };

  const deleteSavedAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = user.savedAddresses.filter((a) => a.id !== id);
    if (updatedAddresses.length > 0 && !updatedAddresses.some((a) => a.isDefault)) {
      updatedAddresses[0].isDefault = true;
    }
    const updated = { ...user, savedAddresses: updatedAddresses };
    saveUserSession(updated);
  };

  const setDefaultAddress = (id: string) => {
    if (!user) return;
    const updatedAddresses = user.savedAddresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    const defaultAddr = updatedAddresses.find((a) => a.id === id);
    const updated = {
      ...user,
      savedAddresses: updatedAddresses,
      primaryAddress: defaultAddr ? defaultAddr.fullAddress : user.primaryAddress,
      primaryDistrict: defaultAddr ? defaultAddr.district : user.primaryDistrict,
      primaryProvince: defaultAddr ? defaultAddr.province : user.primaryProvince,
    };
    saveUserSession(updated);
  };

  const addOrder = (orderData: {
    id?: string;
    customerName?: string;
    customerEmail?: string;
    items: OrderItemSummary[];
    total: number;
    subtotal: number;
    deliveryFee: number;
    deliveryAddress: string;
    district: string;
    province: string;
    phone: string;
    paymentMethod: string;
    assignedEngineer?: string;
    trackingNumber?: string;
  }): UserOrder => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = orderData.id || `ORD-${new Date().getFullYear()}-${orderNumber}`;
    const custName = orderData.customerName || (user ? user.fullName : "Online Client");
    const custEmail = orderData.customerEmail || (user ? user.email : "procurement@enterprise.zm");

    const newOrder: UserOrder = {
      ...orderData,
      id: orderId,
      customerName: custName,
      customerEmail: custEmail,
      date: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date()),
      status: "Processing",
      trackingNumber: orderData.trackingNumber || `EHP-LUS-${orderNumber}`,
      estimatedDelivery: "Estimated Dispatch within 24-48 Hours",
      assignedEngineer: orderData.assignedEngineer || "Eng. Patrick Banda",
    };

    // Auto-generate warranty records for the purchased equipment
    const newWarranties: WarrantyRecord[] = [];
    orderData.items.forEach((item, idx) => {
      const isBattery = item.name.toLowerCase().includes("battery") || item.name.toLowerCase().includes("lithium");
      const isInverter = item.name.toLowerCase().includes("inverter") || item.name.toLowerCase().includes("deye") || item.name.toLowerCase().includes("growatt");
      const isPanel = item.name.toLowerCase().includes("panel") || item.name.toLowerCase().includes("solar");
      const isSystem = item.name.toLowerCase().includes("system") || item.name.toLowerCase().includes("kit");

      const category: WarrantyRecord["category"] = isSystem
        ? "Complete System"
        : isBattery
        ? "Battery"
        : isInverter
        ? "Inverter"
        : isPanel
        ? "Solar Panels"
        : "Complete System";

      const years = category === "Battery" ? 10 : category === "Inverter" ? 5 : category === "Solar Panels" ? 12 : 10;
      const expDate = new Date();
      expDate.setFullYear(expDate.getFullYear() + years);

      const warranty: WarrantyRecord = {
        id: `war_${Date.now()}_${idx}`,
        customerName: custName,
        customerEmail: custEmail,
        productName: item.name,
        category,
        serialNumber: `EHP-${category.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        installationDate: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date()),
        warrantyPeriodYears: years,
        expiryDate: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(expDate),
        status: "Active",
        systemCapacity: item.name,
        installerName: "Elleyhill Certified Tech Team (Eng. Banda)",
        certificateNumber: `EHP-WAR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      };
      newWarranties.push(warranty);
    });

    if (user) {
      const updatedOrders = [newOrder, ...user.orders];
      const updatedWarranties = [...newWarranties, ...(user.warranties || [])];
      const updatedUser = { ...user, orders: updatedOrders, warranties: updatedWarranties };
      saveUserSession(updatedUser);
    } else {
      // If guest user matches an existing user in DB by email, update their DB record too
      try {
        const rawDb = localStorage.getItem(STORAGE_KEY_USERS_DB);
        if (rawDb) {
          const usersDb: Record<string, UserProfile> = JSON.parse(rawDb);
          const cleanEmail = custEmail.toLowerCase();
          if (usersDb[cleanEmail]) {
            usersDb[cleanEmail].orders = [newOrder, ...(usersDb[cleanEmail].orders || [])];
            usersDb[cleanEmail].warranties = [...newWarranties, ...(usersDb[cleanEmail].warranties || [])];
            localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(usersDb));
          }
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Also update Admin Master list
    const updatedMasterOrders = [newOrder, ...allOrders];
    setAllOrders(updatedMasterOrders);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_ORDERS, JSON.stringify(updatedMasterOrders));
    } catch (e) {
      console.error(e);
    }

    if (newWarranties.length > 0) {
      const updatedMasterWarranties = [...newWarranties, ...allWarranties];
      setAllWarranties(updatedMasterWarranties);
      try {
        localStorage.setItem(STORAGE_KEY_ADMIN_WARRANTIES, JSON.stringify(updatedMasterWarranties));
      } catch (e) {
        console.error(e);
      }
    }

    return newOrder;
  };

  const loginWithDemo = (type: "residential" | "commercial" | "admin") => {
    if (type === "admin") {
      saveUserSession(DEMO_ADMIN_USER);
    } else if (type === "residential") {
      saveUserSession(DEMO_RESIDENTIAL_USER);
    } else {
      saveUserSession(DEMO_COMMERCIAL_USER);
    }
  };

  // ADMIN OPERATIONS METHODS
  const updateOrderStatus = (
    orderId: string,
    status: UserOrder["status"],
    trackingNumber?: string,
    engineer?: string
  ) => {
    const updatedMaster = allOrders.map((ord) => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status,
          trackingNumber: trackingNumber || ord.trackingNumber,
          assignedEngineer: engineer || ord.assignedEngineer,
        };
      }
      return ord;
    });

    setAllOrders(updatedMaster);
    localStorage.setItem(STORAGE_KEY_ADMIN_ORDERS, JSON.stringify(updatedMaster));

    // Also update if currently logged in user owns this order
    if (user && user.orders.some((o) => o.id === orderId)) {
      const updatedUserOrders = user.orders.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            trackingNumber: trackingNumber || ord.trackingNumber,
            assignedEngineer: engineer || ord.assignedEngineer,
          };
        }
        return ord;
      });
      const updatedUser = { ...user, orders: updatedUserOrders };
      saveUserSession(updatedUser);
    }
  };

  const createAdminOrder = (
    orderData: Omit<UserOrder, "id" | "date" | "trackingNumber">
  ): UserOrder => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const newOrder: UserOrder = {
      ...orderData,
      id: `ORD-${new Date().getFullYear()}-${orderNumber}`,
      date: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date()),
      trackingNumber: `EHP-LUS-${orderNumber}`,
    };

    const updated = [newOrder, ...allOrders];
    setAllOrders(updated);
    localStorage.setItem(STORAGE_KEY_ADMIN_ORDERS, JSON.stringify(updated));
    return newOrder;
  };

  const deleteOrder = (orderId: string) => {
    const updated = allOrders.filter((o) => o.id !== orderId);
    setAllOrders(updated);
    localStorage.setItem(STORAGE_KEY_ADMIN_ORDERS, JSON.stringify(updated));
  };

  const registerNewWarranty = (
    warrantyData: Omit<WarrantyRecord, "id" | "certificateNumber">
  ): WarrantyRecord => {
    const certNum = `EHP-WAR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newWarranty: WarrantyRecord = {
      ...warrantyData,
      id: `war_${Date.now()}`,
      certificateNumber: certNum,
    };

    const updatedWarranties = [newWarranty, ...allWarranties];
    setAllWarranties(updatedWarranties);
    localStorage.setItem(STORAGE_KEY_ADMIN_WARRANTIES, JSON.stringify(updatedWarranties));

    return newWarranty;
  };

  const deleteWarranty = (id: string) => {
    const updated = allWarranties.filter((w) => w.id !== id);
    setAllWarranties(updated);
    localStorage.setItem(STORAGE_KEY_ADMIN_WARRANTIES, JSON.stringify(updated));
  };

  const updateInventoryStock = (sku: string, newStock: number) => {
    const updatedInventory = inventory.map((item) => {
      if (item.sku === sku) {
        return {
          ...item,
          stockCount: Math.max(0, newStock),
          status: newStock <= 0 ? ("Low Stock" as const) : newStock <= item.minThreshold ? ("Low Stock" as const) : ("In Stock" as const),
        };
      }
      return item;
    });

    setInventory(updatedInventory);
    localStorage.setItem(STORAGE_KEY_ADMIN_INVENTORY, JSON.stringify(updatedInventory));
  };

  const addNewInventoryItem = (item: Omit<InventoryItem, "id">) => {
    const newItem: InventoryItem = {
      ...item,
      id: `inv_${Date.now()}`,
    };
    const updated = [newItem, ...inventory];
    setInventory(updated);
    localStorage.setItem(STORAGE_KEY_ADMIN_INVENTORY, JSON.stringify(updated));
  };

  const deleteInventoryItem = (sku: string) => {
    const updated = inventory.filter((i) => i.sku !== sku);
    setInventory(updated);
    localStorage.setItem(STORAGE_KEY_ADMIN_INVENTORY, JSON.stringify(updated));
  };

  const isAdmin = user?.role === "admin" || user?.email === DEMO_ADMIN_USER.email;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        addSavedAddress,
        deleteSavedAddress,
        setDefaultAddress,
        addOrder,
        loginWithDemo,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
