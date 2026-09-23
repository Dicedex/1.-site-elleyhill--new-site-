"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQty,
    toggleInstallation,
    hardwareSubtotal,
    installationSubtotal,
    deliveryCost,
    deliveryZone,
    isFreeDelivery,
    freeDeliveryProgress,
    amountForFreeDelivery,
    grandTotal,
    totalItemsCount,
    getWhatsAppQuoteUrl,
  } = useCart();
  const { user, isAuthenticated } = useAuth();

  const defaultAddress =
    user?.savedAddresses?.find((a) => a.isDefault) || user?.savedAddresses?.[0];
  const hasSavedAddress = Boolean(
    defaultAddress?.fullAddress ||
      user?.primaryAddress ||
      user?.primaryDistrict ||
      user?.primaryProvince
  );

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      id="global-cart-drawer"
      aria-hidden={!isDrawerOpen}
    >
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`absolute right-0 top-0 bottom-0 h-[100dvh] max-h-[100dvh] w-full max-w-md bg-surface-container-lowest shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 md:p-6 bg-surface-container-lowest flex items-center justify-between border-b border-border-light">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-primary font-bold">
                Quick Cart
              </h3>
              <span className="font-technical-data text-xs text-on-surface-variant">
                {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} selected
              </span>
            </div>
          </div>
          <button
            onClick={closeDrawer}
            className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors focus:outline-none cursor-pointer"
            aria-label="Close cart drawer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 md:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/60">
                remove_shopping_cart
              </span>
              <div className="space-y-1">
                <p className="font-headline-md text-base text-primary font-semibold">
                  Your cart is currently empty
                </p>
                <p className="text-body-sm text-xs text-on-surface-variant max-w-xs mx-auto">
                  Explore certified Tier-1 panels, Greenrich inverters, and high-cycle storage kits.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent-yellow text-primary font-label-cta text-xs font-bold shadow-sm hover:scale-95 transition-transform"
              >
                Browse Solar Catalog
              </Link>
            </div>
          ) : (
            <>
              {/* Lusaka Free Delivery Threshold Progress Bar */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-border-light space-y-2">
                <div className="flex items-center justify-between text-xs font-technical-data font-bold">
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      local_shipping
                    </span>
                    {isFreeDelivery ? (
                      <span className="text-status-success font-bold">
                        🎉 Free Lusaka Delivery Unlocked!
                      </span>
                    ) : (
                      <span>Lusaka Free Delivery Threshold</span>
                    )}
                  </span>
                  <span className="text-secondary font-bold">
                    {freeDeliveryProgress}%
                  </span>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeDelivery ? "bg-status-success" : "bg-accent-yellow"
                    }`}
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>

                <p className="font-body-sm text-[11px] text-on-surface-variant leading-relaxed">
                  {isFreeDelivery ? (
                    <span className="text-status-success font-medium">
                      Your order qualifies for <strong>100% Free Express Dispatch</strong> within Lusaka (&gt; K78,000).
                    </span>
                  ) : (
                    <span>
                      Add <strong>ZMW {amountForFreeDelivery.toLocaleString()}</strong> more to get <strong>FREE delivery</strong> in Lusaka (threshold: K78,000).
                    </span>
                  )}
                </p>
              </div>

              {items.map((item) => {
                const itemTotal =
                  item.price * item.qty +
                  (item.installationIncluded && item.installationPrice
                    ? item.installationPrice * item.qty
                    : 0);

                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3.5 rounded-2xl bg-surface-container-low border border-border-light relative group"
                  >
                    <div className="w-16 h-16 rounded-xl bg-surface-container-lowest border border-border-light flex items-center justify-center flex-shrink-0 p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-headline-md text-xs leading-snug text-primary font-bold line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-on-surface-variant hover:text-error transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>

                      <div className="font-technical-data text-xs text-secondary font-bold">
                        ZMW {item.price.toLocaleString()} each
                      </div>

                      {item.installationPrice !== undefined && item.installationPrice > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleInstallation(item.id)}
                          className={`font-technical-data text-[11px] flex items-center gap-1.5 mt-1.5 text-left p-1.5 rounded-lg border transition-all cursor-pointer ${
                            item.installationIncluded
                              ? "bg-secondary-container/30 text-secondary border-secondary/40 font-semibold"
                              : "bg-surface-container text-on-surface-variant border-border-light hover:text-primary"
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                              item.installationIncluded
                                ? "bg-primary border-primary text-white"
                                : "border-outline bg-white text-transparent"
                            }`}
                          >
                            <span className="material-symbols-outlined text-[10px] font-bold">
                              {item.installationIncluded ? "check" : ""}
                            </span>
                          </span>
                          <span className="material-symbols-outlined text-secondary text-[14px]">
                            verified_user
                          </span>
                          <span className="truncate">
                            {item.installationIncluded
                              ? `Installation Selected (+ZMW ${(item.installationPrice * item.qty).toLocaleString()})`
                              : `Add Installation (+ZMW ${(item.installationPrice * item.qty).toLocaleString()})`}
                          </span>
                        </button>
                      )}

                      <div className="flex items-center justify-between pt-1">
                        {/* Quantity Stepper */}
                        <div className="inline-flex items-center rounded-full bg-surface-container-lowest border border-border-light p-0.5">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-6 h-6 rounded-full hover:bg-surface-container flex items-center justify-center text-primary text-xs cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="font-technical-data text-xs font-semibold px-2">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-6 h-6 rounded-full hover:bg-surface-container flex items-center justify-center text-primary text-xs cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-technical-data text-xs text-primary font-bold">
                          ZMW {itemTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 md:p-6 bg-surface-container-low border-t border-border-light space-y-4 flex-shrink-0 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
            <div className="space-y-1.5 font-technical-data text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Hardware Subtotal</span>
                <span className="font-bold text-primary">
                  ZMW {hardwareSubtotal.toLocaleString()}
                </span>
              </div>
              {installationSubtotal > 0 && (
                <div className="flex justify-between text-on-surface-variant">
                  <span>Professional Installation</span>
                  <span className="font-bold text-secondary">
                    + ZMW {installationSubtotal.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <span>Lusaka Regional Logistics</span>
                <span className={`font-bold ${deliveryCost === 0 ? "text-status-success uppercase" : "text-primary"}`}>
                  {deliveryCost === 0 ? "FREE (> K78,000)" : `ZMW ${deliveryCost.toLocaleString()} (Lusaka Hub)`}
                </span>
              </div>
              <div className="flex justify-between text-headline-md text-base text-charcoal pt-2 border-t border-border-light font-bold">
                <span>Estimated Total</span>
                <span className="text-primary">ZMW {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* Primary: Checkout */}
              {!isAuthenticated ? (
                <Link
                  href="/login?redirect=/checkout"
                  onClick={closeDrawer}
                  className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 font-bold"
                >
                  <span>SIGN IN TO CHECKOUT</span>
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </Link>
              ) : !hasSavedAddress ? (
                <Link
                  href="/profile"
                  onClick={closeDrawer}
                  className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 font-bold"
                >
                  <span>ADD ADDRESS IN PROFILE TO PROCEED</span>
                  <span className="material-symbols-outlined text-[18px]">add_location</span>
                </Link>
              ) : (
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 font-bold"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </Link>
              )}

              {/* Secondary: WhatsApp Quote */}
              <a
                href={getWhatsAppQuoteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-6 rounded-full bg-status-success/10 hover:bg-status-success/20 text-status-success font-technical-data text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2 font-bold text-center"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Order / Quote via WhatsApp</span>
              </a>

              {/* Tertiary: Full Cart */}
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="w-full py-2.5 px-6 rounded-full bg-surface-container hover:bg-surface-container-high text-charcoal hover:text-primary font-technical-data text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                <span>View Full Cart Details</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
