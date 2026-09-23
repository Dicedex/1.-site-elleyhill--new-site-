/**
 * Elleyhill Power Zambia - Cloudflare D1 Client Service
 * 
 * Communicates with the Cloudflare D1 Edge Worker to persist and retrieve:
 * - Users & Profile Credentials
 * - Orders & Lusaka Dispatch Records
 * - Digital Warranty Vault Records
 * - Saved Installation Sites & Addresses
 * - 24-Hour Email OTP Verifications
 */

const WORKER_BASE_URL =
  process.env.NEXT_PUBLIC_CLOUDFLARE_GATEWAY_URL ||
  "https://elleyhill-pawapay-gateway.kakinda.workers.dev";

export interface D1UserPayload {
  id?: string;
  email: string;
  fullName?: string;
  full_name?: string;
  phone?: string;
  accountType?: string;
  account_type?: string;
  companyName?: string;
  company_name?: string;
  tpin?: string;
  emailVerified?: boolean;
  primaryDistrict?: string;
  primaryProvince?: string;
}

export interface D1OrderPayload {
  id: string;
  userId?: string;
  userEmail?: string;
  customerEmail?: string;
  customerName?: string;
  date?: string;
  total: number;
  subtotal?: number;
  deliveryFee?: number;
  status: string;
  paymentMethod?: string;
  payment_method?: string;
  depositId?: string;
  trackingNumber?: string;
  deliveryAddress?: string;
  district?: string;
  province?: string;
  phone?: string;
  contactPhone?: string;
  assignedEngineer?: string;
  estimatedDelivery?: string;
  items: Array<{
    id?: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
}

export interface D1WarrantyPayload {
  id: string;
  userId?: string;
  userEmail?: string;
  customerEmail?: string;
  customerName?: string;
  productName: string;
  serialNumber: string;
  category: string;
  installationDate: string;
  warrantyPeriodYears: number;
  expiryDate: string;
  certificateNumber?: string;
  status: string;
  systemCapacity?: string;
  installerName?: string;
}

export interface D1AddressPayload {
  id: string;
  userId?: string;
  userEmail?: string;
  label: string;
  fullAddress: string;
  district: string;
  province: string;
  contactPhone: string;
  isDefault?: boolean;
}

// 1. User Sync
export async function syncUserToD1(user: D1UserPayload) {
  try {
    const res = await fetch(`${WORKER_BASE_URL}/api/d1/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not sync user:", e.message);
    return { success: false, error: e.message };
  }
}

export async function getUserFromD1(email: string) {
  try {
    const res = await fetch(`${WORKER_BASE_URL}/api/d1/user?email=${encodeURIComponent(email)}`);
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not get user:", e.message);
    return { success: false, error: e.message };
  }
}

// 2. Orders Sync
export async function syncOrderToD1(order: D1OrderPayload) {
  try {
    const res = await fetch(`${WORKER_BASE_URL}/api/d1/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not sync order:", e.message);
    return { success: false, error: e.message };
  }
}

export async function getOrdersFromD1(email?: string) {
  try {
    const url = email
      ? `${WORKER_BASE_URL}/api/d1/orders?email=${encodeURIComponent(email)}`
      : `${WORKER_BASE_URL}/api/d1/orders`;
    const res = await fetch(url);
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not get orders:", e.message);
    return { success: false, orders: [] };
  }
}

// 3. Warranties Sync
export async function syncWarrantyToD1(warranty: D1WarrantyPayload) {
  try {
    const res = await fetch(`${WORKER_BASE_URL}/api/d1/warranties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(warranty),
    });
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not sync warranty:", e.message);
    return { success: false, error: e.message };
  }
}

export async function getWarrantiesFromD1(email?: string) {
  try {
    const url = email
      ? `${WORKER_BASE_URL}/api/d1/warranties?email=${encodeURIComponent(email)}`
      : `${WORKER_BASE_URL}/api/d1/warranties`;
    const res = await fetch(url);
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not get warranties:", e.message);
    return { success: false, warranties: [] };
  }
}

// 4. Saved Addresses Sync
export async function syncAddressToD1(address: D1AddressPayload) {
  try {
    const res = await fetch(`${WORKER_BASE_URL}/api/d1/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    });
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not sync address:", e.message);
    return { success: false, error: e.message };
  }
}

export async function getAddressesFromD1(email: string) {
  try {
    const res = await fetch(`${WORKER_BASE_URL}/api/d1/addresses?email=${encodeURIComponent(email)}`);
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not get addresses:", e.message);
    return { success: false, addresses: [] };
  }
}

export async function deleteAddressFromD1(id: string) {
  try {
    const res = await fetch(`${WORKER_BASE_URL}/api/d1/addresses?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not delete address:", e.message);
    return { success: false, error: e.message };
  }
}

// 5. Admin D1 Summary
export async function getD1AdminSummary() {
  try {
    const res = await fetch(`${WORKER_BASE_URL}/api/d1/admin/summary`);
    return await res.json();
  } catch (e: any) {
    console.warn("[Cloudflare D1] Could not get admin summary:", e.message);
    return { success: false, counts: { users: 0, orders: 0, warranties: 0, addresses: 0, payments: 0 } };
  }
}
