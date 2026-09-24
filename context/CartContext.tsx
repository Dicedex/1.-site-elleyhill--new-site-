"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { WHATSAPP_PHONE_DISPLAY, WHATSAPP_PHONE_NUMBER } from "@/data/config";

export { WHATSAPP_PHONE_DISPLAY, WHATSAPP_PHONE_NUMBER };

export const FREE_DELIVERY_THRESHOLD = 78000;
export const LUSAKA_STANDARD_DELIVERY_FEE = 750;
export const REGIONAL_DELIVERY_FEE = 2500;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  qty: number;
  image: string;
  tag?: string;
  stockStatus?: string;
  description?: string;
  installationIncluded?: boolean;
  installationPrice?: number;
  installationOption?: "kit-only" | "professional";
  slug?: string;
}

export interface PlacedOrder {
  orderRef: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    province: string;
    roofType: string;
    accessNotes?: string;
    scheduleOption: "fastest" | "scheduled" | "staged";
  };
  payment: {
    method: "momo" | "card" | "staged" | "layby" | "wire";
    momoProvider?: "mtn" | "airtel" | "zamtel";
    momoPhone?: string;
    gateway?: string;
    status: string;
  };
  items: CartItem[];
  deliveryZone: "lusaka" | "copperbelt" | "other";
  deliveryCost: number;
  hardwareSubtotal: number;
  installationSubtotal: number;
  grandTotal: number;
}

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  deliveryZone: "lusaka" | "copperbelt" | "other";
  setDeliveryZone: (zone: "lusaka" | "copperbelt" | "other") => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  setQty: (id: string, qty: number) => void;
  toggleInstallation: (id: string) => void;
  clearCart: () => void;
  hardwareSubtotal: number;
  installationSubtotal: number;
  deliveryCost: number;
  grandTotal: number;
  totalItemsCount: number;
  freeDeliveryThreshold: number;
  isFreeDelivery: boolean;
  freeDeliveryProgress: number;
  amountForFreeDelivery: number;
  lastOrder: PlacedOrder | null;
  saveOrder: (order: PlacedOrder) => void;
  getWhatsAppQuoteUrl: (customNotes?: string) => string;
}

const CART_STORAGE_KEY = "elleyhill_cart_items_v2";
const ORDER_STORAGE_KEY = "elleyhill_last_order_v2";

const defaultInitialItems: CartItem[] = [];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(defaultInitialItems);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deliveryZone, setDeliveryZone] = useState<"lusaka" | "copperbelt" | "other">("lusaka");
  const [lastOrder, setLastOrder] = useState<PlacedOrder | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
      const storedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
      if (storedOrder) {
        setLastOrder(JSON.parse(storedOrder));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error("Failed to save cart to localStorage", e);
      }
    }
  }, [items, isHydrated]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const addItem = (item: Omit<CartItem, "qty"> & { qty?: number }) => {
    const addQty = item.qty && item.qty > 0 ? item.qty : 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                qty: i.qty + addQty,
                installationIncluded:
                  item.installationIncluded !== undefined
                    ? item.installationIncluded
                    : i.installationIncluded,
                installationOption: item.installationOption || i.installationOption,
                installationPrice:
                  item.installationPrice !== undefined
                    ? item.installationPrice
                    : i.installationPrice,
              }
            : i
        );
      }
      return [...prev, { ...item, qty: addQty }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.qty + delta;
            return nextQty > 0 ? { ...i, qty: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const setQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  const toggleInstallation = (id: string) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const nextState = !i.installationIncluded;
          return {
            ...i,
            installationIncluded: nextState,
            installationOption: nextState ? "professional" : "kit-only",
            installationPrice: i.installationPrice || 4500,
          };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const saveOrder = (order: PlacedOrder) => {
    setLastOrder(order);
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
    } catch (e) {
      console.error("Failed to save order to localStorage", e);
    }
  };

  // Pricing calculations
  const hardwareSubtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.qty, 0),
    [items]
  );

  const installationSubtotal = useMemo(
    () =>
      items.reduce((acc, item) => {
        if (item.installationIncluded && item.installationPrice) {
          return acc + item.installationPrice * item.qty;
        }
        return acc;
      }, 0),
    [items]
  );

  // Free delivery threshold check
  const isFreeDelivery = useMemo(
    () => deliveryZone === "lusaka" && hardwareSubtotal >= FREE_DELIVERY_THRESHOLD,
    [deliveryZone, hardwareSubtotal]
  );

  const amountForFreeDelivery = useMemo(
    () => Math.max(0, FREE_DELIVERY_THRESHOLD - hardwareSubtotal),
    [hardwareSubtotal]
  );

  const freeDeliveryProgress = useMemo(
    () => Math.min(100, Math.round((hardwareSubtotal / FREE_DELIVERY_THRESHOLD) * 100)),
    [hardwareSubtotal]
  );

  const deliveryCost = useMemo(() => {
    if (items.length === 0) return 0;
    if (deliveryZone === "lusaka") {
      return hardwareSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : LUSAKA_STANDARD_DELIVERY_FEE;
    }
    return REGIONAL_DELIVERY_FEE;
  }, [items, deliveryZone, hardwareSubtotal]);

  const grandTotal = useMemo(
    () => hardwareSubtotal + installationSubtotal + deliveryCost,
    [hardwareSubtotal, installationSubtotal, deliveryCost]
  );

  const totalItemsCount = useMemo(
    () => items.reduce((acc, item) => acc + item.qty, 0),
    [items]
  );

  const getWhatsAppQuoteUrl = (customNotes?: string) => {
    if (items.length === 0) {
      const defaultText = `Hello Elleyhill Power, I would like to request a formal quotation for solar equipment.${
        customNotes ? `\n\nNotes: ${customNotes}` : ""
      }`;
      return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(defaultText)}`;
    }

    const itemsSummary = items
      .map(
        (i) =>
          `• ${i.qty}x ${i.name} (ZMW ${(
            i.price * i.qty +
            (i.installationIncluded && i.installationPrice
              ? i.installationPrice * i.qty
              : 0)
          ).toLocaleString()}${
            i.installationIncluded ? " - Pro Install Included" : ""
          })`
      )
      .join("\n");

    const deliveryNote =
      deliveryZone === "lusaka"
        ? hardwareSubtotal >= FREE_DELIVERY_THRESHOLD
          ? "Lusaka Hub (FREE - Qualified > K78,000)"
          : `Lusaka Hub (+ZMW ${LUSAKA_STANDARD_DELIVERY_FEE})`
        : `Copperbelt / Regional Dispatch (+ZMW ${REGIONAL_DELIVERY_FEE.toLocaleString()})`;

    const text = `Hello Elleyhill Power, I would like to request a formal quotation / order for:\n\n${itemsSummary}\n\nDelivery Zone: ${deliveryNote}\nEstimated Total: ZMW ${grandTotal.toLocaleString()}${
      customNotes ? `\n\nNotes: ${customNotes}` : ""
    }\n\nPlease provide formal quotation and stock availability.`;

    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isDrawerOpen,
        deliveryZone,
        setDeliveryZone,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        addItem,
        removeItem,
        updateQty,
        setQty,
        toggleInstallation,
        clearCart,
        hardwareSubtotal,
        installationSubtotal,
        deliveryCost,
        grandTotal,
        totalItemsCount,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        isFreeDelivery,
        freeDeliveryProgress,
        amountForFreeDelivery,
        lastOrder,
        saveOrder,
        getWhatsAppQuoteUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
