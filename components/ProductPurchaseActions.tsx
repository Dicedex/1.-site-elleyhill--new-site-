"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_PHONE_NUMBER } from "@/data/config";
import { Product } from "@/data/products";

export default function ProductPurchaseActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const parsePrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  const handleAddToCart = () => {
    const isKit = product.category === "Complete Kits";
    addItem({
      id: product.slug,
      name: product.name,
      price: parsePrice(product.price),
      image: product.image,
      tag: product.category.toUpperCase(),
      stockStatus: "In Stock (Lusaka Warehouse)",
      description: product.description,
      slug: product.slug,
      installationPrice: isKit ? 4500 : undefined,
      installationIncluded: false,
      installationOption: "kit-only",
      qty: qty,
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const whatsappOrderLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello Elleyhill Power, I would like to place an order for:\n` +
      `• ${qty}x ${product.name} (${product.price} each)\n` +
      `Total: ZMW ${(parsePrice(product.price) * qty).toLocaleString()}\n\n` +
      `Please confirm stock availability and arrange Lusaka / regional dispatch.`
  )}`;

  const whatsappFormalQuoteLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello Elleyhill Power Zambia,\n\nI am requesting a Formal Commercial Quotation for:\n` +
      `• Product: ${product.name}\n` +
      `• Quantity: ${qty} Unit(s)\n` +
      `• Unit Price: ${product.price}\n` +
      `• Estimated Total: ZMW ${(parsePrice(product.price) * qty).toLocaleString()}\n\n` +
      `Please include official company VAT proforma and estimated delivery timeline.`
  )}`;

  return (
    <div className="space-y-4 pt-2">
      {/* Quantity Selector & Add to Cart */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Quantity Stepper */}
        <div className="inline-flex items-center justify-between sm:justify-start bg-surface-container-high rounded-full p-1 shadow-inner border border-border-light">
          <button
            onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
            aria-label="Decrease quantity"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">remove</span>
          </button>
          <span className="px-5 font-technical-data text-base text-primary font-bold">
            {qty}
          </span>
          <button
            onClick={() => setQty((prev) => prev + 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
            aria-label="Increase quantity"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>

        {/* Primary Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-4 px-8 rounded-full font-label-cta text-label-cta tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 font-bold cursor-pointer ${
            isAdded
              ? "bg-status-success text-white scale-[1.02]"
              : "bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-on-tertiary-fixed-variant hover:scale-[0.99]"
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-xl">
            {isAdded ? "check_circle" : "shopping_cart"}
          </span>
          <span>{isAdded ? "ADDED TO CART" : "ADD TO CART"}</span>
        </button>
      </div>

      {/* WhatsApp Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={whatsappOrderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent-yellow hover:bg-accent-yellow/90 text-primary font-label-cta text-xs py-3.5 px-5 rounded-full text-center hover:scale-[0.99] transition-transform shadow-sm flex items-center justify-center gap-2 font-bold"
        >
          <span className="material-symbols-outlined text-lg">shopping_bag</span>
          <span>ORDER ON WHATSAPP</span>
        </a>

        <a
          href={whatsappFormalQuoteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-primary hover:bg-primary hover:text-white text-primary font-label-cta text-xs py-3.5 px-5 rounded-full text-center transition-all flex items-center justify-center gap-2 font-bold"
        >
          <span className="material-symbols-outlined text-lg">request_quote</span>
          <span>REQUEST FORMAL QUOTE</span>
        </a>
      </div>
    </div>
  );
}
