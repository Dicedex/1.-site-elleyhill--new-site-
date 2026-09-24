"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_PHONE_NUMBER } from "@/data/config";
import { Product, ProductVariant } from "@/data/products";

interface ProductPurchaseActionsProps {
  product: Product;
  initialVariantId?: string;
}

export default function ProductPurchaseActions({
  product,
  initialVariantId,
}: ProductPurchaseActionsProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Determine initial variant if product has variants
  const defaultVar =
    product.variants?.find((v) => v.id === initialVariantId) ||
    product.variants?.find((v) => v.id === product.defaultVariantId) ||
    product.variants?.[0] ||
    null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(defaultVar);

  const parsePrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9.]/g, "");
    return parseFloat(cleaned) || 0;
  };

  const currentPriceStr = selectedVariant?.price || product.price;
  const currentPriceNum = parsePrice(currentPriceStr);
  const currentItemName = selectedVariant?.name || (selectedVariant ? `${product.name} (${selectedVariant.label})` : product.name);
  const currentItemId = selectedVariant ? `${product.slug}-${selectedVariant.id}` : product.slug;
  const currentItemDescription = selectedVariant?.description || product.description;

  const handleAddToCart = () => {
    const isKit = product.category === "Complete Kits";
    addItem({
      id: currentItemId,
      name: currentItemName,
      price: currentPriceNum,
      image: selectedVariant?.image || product.image,
      tag: product.category.toUpperCase(),
      stockStatus: "In Stock (Lusaka Warehouse)",
      description: currentItemDescription,
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
      `• ${qty}x ${currentItemName} (${currentPriceStr} each)\n` +
      `Total: ZMW ${(currentPriceNum * qty).toLocaleString()}\n\n` +
      `Please confirm stock availability and arrange Lusaka / regional dispatch.`
  )}`;

  const whatsappFormalQuoteLink = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    `Hello Elleyhill Power Zambia,\n\nI am requesting a Formal Commercial Quotation for:\n` +
      `• Product: ${currentItemName}\n` +
      `• Quantity: ${qty} Unit(s)\n` +
      `• Unit Price: ${currentPriceStr}\n` +
      `• Estimated Total: ZMW ${(currentPriceNum * qty).toLocaleString()}\n\n` +
      `Please include official company VAT proforma and estimated delivery timeline.`
  )}`;

  return (
    <div className="space-y-5 pt-2">
      {/* Variant / Size Toggle Selector (for AC / DC Combiner Boxes and other configurable products) */}
      {product.variants && product.variants.length > 0 && (
        <div className="p-4 sm:p-5 bg-surface-container-low border border-border-light rounded-2xl space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-on-surface font-technical-data font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
              <span>Select System Size / Rating:</span>
            </span>
            {selectedVariant && (
              <span className="text-xs font-technical-data text-secondary font-bold bg-secondary-container/60 px-2.5 py-0.5 rounded-full">
                Selected: {selectedVariant.label}
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {product.variants.map((v) => {
              const isSelected = selectedVariant?.id === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`py-3 px-3 rounded-xl font-technical-data transition-all flex flex-col items-center justify-center gap-1 cursor-pointer border ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-sm scale-[1.02] ring-2 ring-primary/20 font-bold"
                      : "bg-surface-container-lowest text-on-surface border-border-light hover:border-neutral-300 hover:bg-surface-container font-medium"
                  }`}
                >
                  <span className="text-sm sm:text-base font-bold">{v.label}</span>
                  <span
                    className={`text-[11px] ${
                      isSelected ? "text-secondary font-bold" : "text-on-surface-variant font-semibold"
                    }`}
                  >
                    {v.price || product.price}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedVariant?.description && (
            <div className="pt-2 border-t border-border-light/60 flex items-center gap-2 text-xs text-on-surface-variant font-body-sm">
              <span className="material-symbols-outlined text-secondary text-[15px]">info</span>
              <span>{selectedVariant.description}</span>
            </div>
          )}
        </div>
      )}

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
