"use client";

import React from "react";
import Link from "next/link";
import { useCart, WHATSAPP_PHONE_DISPLAY } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
  const {
    items,
    openDrawer,
    removeItem,
    updateQty,
    toggleInstallation,
    clearCart,
    deliveryZone,
    setDeliveryZone,
    hardwareSubtotal,
    installationSubtotal,
    deliveryCost,
    isFreeDelivery,
    freeDeliveryProgress,
    amountForFreeDelivery,
    grandTotal,
    totalItemsCount,
    getWhatsAppQuoteUrl,
  } = useCart();
  const { user, isAuthenticated } = useAuth();

  const defaultAddress =
    user?.savedAddresses?.find((a) => a.isDefault) ||
    (user?.savedAddresses && user.savedAddresses.length > 0
      ? user.savedAddresses[0]
      : null);
  const primaryAddressText = defaultAddress?.fullAddress || user?.primaryAddress || "";
  const districtText = defaultAddress?.district || user?.primaryDistrict || "";
  const provinceText = defaultAddress?.province || user?.primaryProvince || "";
  const hasSavedAddress = Boolean(
    primaryAddressText.trim() || districtText.trim() || provinceText.trim()
  );

  // Sync delivery zone based on user's saved location
  React.useEffect(() => {
    if (isAuthenticated && hasSavedAddress) {
      const fullLoc = `${provinceText} ${districtText} ${primaryAddressText}`.toLowerCase();
      if (
        fullLoc.includes("copperbelt") ||
        fullLoc.includes("ndola") ||
        fullLoc.includes("kitwe") ||
        fullLoc.includes("livingstone") ||
        fullLoc.includes("solwezi") ||
        fullLoc.includes("central") ||
        fullLoc.includes("southern") ||
        fullLoc.includes("eastern") ||
        fullLoc.includes("northern") ||
        fullLoc.includes("muchinga") ||
        fullLoc.includes("luapula") ||
        fullLoc.includes("north-western") ||
        fullLoc.includes("western")
      ) {
        if (!fullLoc.includes("lusaka")) {
          setDeliveryZone("copperbelt");
        } else {
          setDeliveryZone("lusaka");
        }
      } else {
        setDeliveryZone("lusaka");
      }
    }
  }, [isAuthenticated, hasSavedAddress, provinceText, districtText, primaryAddressText, setDeliveryZone]);

  return (
    <div className="bg-surface font-body-lg text-body-lg text-on-surface antialiased min-h-screen pt-[72px]">
      <main className="w-full bg-surface min-h-[calc(100vh-72px)] py-8 md:py-12">
        <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-technical-data text-technical-data uppercase tracking-widest text-secondary font-bold">
                  Secure Hardware Logistics
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg uppercase tracking-tight text-primary">
                Your Shopping Cart{" "}
                <span className="text-on-surface-variant font-normal">
                  ({totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"})
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-error/10 text-on-surface-variant hover:text-error font-technical-data text-xs transition-all border border-border-light cursor-pointer"
                  title="Clear all cart items"
                >
                  <span className="material-symbols-outlined text-[16px]">remove_shopping_cart</span>
                  <span>Clear Cart</span>
                </button>
              )}
              <button
                onClick={openDrawer}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-technical-data text-xs uppercase tracking-wider transition-all cursor-pointer"
                id="toggle-drawer-btn"
              >
                <span className="material-symbols-outlined text-[18px]">vertical_split</span>
                <span>Slide-Out View</span>
              </button>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container text-primary font-technical-data text-xs transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                <span>Continue Procuring</span>
              </Link>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-border-light shadow-sm max-w-2xl mx-auto my-12">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">
                remove_shopping_cart
              </span>
              <h2 className="font-headline-md text-2xl text-primary font-bold mb-2">
                Your cart is currently empty
              </h2>
              <p className="text-text-secondary mb-6 text-sm">
                Explore our certified hybrid inverters, Tier-1 lithium batteries, and complete solar packages.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-accent-yellow text-primary font-label-cta text-sm px-8 py-4 rounded-full hover:scale-95 transition-transform font-bold"
              >
                Browse Solar Catalog &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
              {/* Left Column: Items & Options */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {items.map((item) => {
                  const itemInstallCost =
                    item.installationIncluded && item.installationPrice
                      ? item.installationPrice * item.qty
                      : 0;
                  const itemTotal = item.price * item.qty + itemInstallCost;

                  return (
                    <div
                      key={item.id}
                      className="bg-surface-container-lowest rounded-xl shadow-sm p-6 relative overflow-hidden group border border-border-light"
                    >
                      <div className="flex flex-col md:flex-row items-start gap-6">
                        <div className="w-full md:w-44 h-44 rounded-lg bg-surface-container-low flex-shrink-0 overflow-hidden relative flex items-center justify-center p-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          {item.tag && (
                            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-primary text-tertiary-fixed font-technical-data text-[10px] font-semibold tracking-wider uppercase">
                              {item.tag}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col justify-between h-full w-full">
                          <div>
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/60 text-secondary font-technical-data text-xs font-semibold mb-2">
                                  <span className="material-symbols-outlined text-[14px]">
                                    warehouse
                                  </span>
                                  {item.stockStatus || "In Stock (Lusaka Warehouse)"}
                                </span>
                                <h2 className="font-headline-md text-headline-md text-primary leading-snug">
                                  {item.name}
                                </h2>
                              </div>
                              <div className="text-right">
                                {item.originalPrice && (
                                  <div className="font-technical-data text-xs text-on-surface-variant line-through">
                                    ZMW {item.originalPrice.toLocaleString()}
                                  </div>
                                )}
                                <div className="font-headline-md text-headline-md text-primary font-bold">
                                  ZMW {item.price.toLocaleString()}
                                </div>
                              </div>
                            </div>

                            {item.description && (
                              <p className="font-body-sm text-sm text-on-surface-variant mb-4">
                                {item.description}
                              </p>
                            )}

                            {/* Installation Addon Option with Circular Toggle */}
                            {item.installationPrice !== undefined && item.installationPrice > 0 && (
                              <div
                                onClick={() => toggleInstallation(item.id)}
                                className={`p-4 rounded-xl mb-5 flex items-center justify-between gap-3 cursor-pointer border transition-all ${
                                  item.installationIncluded
                                    ? "bg-secondary-container/20 border-secondary shadow-xs ring-1 ring-secondary/30"
                                    : "bg-surface-container-low border-border-light hover:bg-surface-container hover:border-border-medium"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {/* Circular Toggle Button */}
                                  <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                                      item.installationIncluded
                                        ? "bg-primary border-primary text-white shadow-xs"
                                        : "border-outline bg-surface-container-lowest text-transparent hover:border-primary"
                                    }`}
                                  >
                                    <span className="material-symbols-outlined text-[15px] font-bold">
                                      {item.installationIncluded ? "check" : ""}
                                    </span>
                                  </div>

                                  <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                      item.installationIncluded
                                        ? "bg-secondary text-white"
                                        : "bg-secondary-container text-secondary"
                                    }`}
                                  >
                                    <span className="material-symbols-outlined text-[18px]">
                                      verified_user
                                    </span>
                                  </div>

                                  <div>
                                    <div className="font-technical-data text-sm text-primary font-bold flex flex-wrap items-center gap-2">
                                      <span>Full Professional Installation &amp; Certified Energy Audit</span>
                                      {item.installationIncluded ? (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-container text-secondary font-bold">
                                          (Selected)
                                        </span>
                                      ) : (
                                        <span className="text-xs text-on-surface-variant font-normal">
                                          (Optional Add-on)
                                        </span>
                                      )}
                                    </div>
                                    <div className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                                      Includes structural aluminum mounting, DC surge protection &amp; COC certificate.
                                    </div>
                                  </div>
                                </div>
                                <div className="font-technical-data text-sm text-secondary font-bold whitespace-nowrap">
                                  + ZMW {(item.installationPrice * item.qty).toLocaleString()}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border-light">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center bg-surface-container-high rounded-full p-1 shadow-inner">
                                <button
                                  onClick={() => updateQty(item.id, -1)}
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <span className="material-symbols-outlined text-[16px]">remove</span>
                                </button>
                                <span className="px-4 font-technical-data text-sm text-primary font-bold">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => updateQty(item.id, 1)}
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <span className="material-symbols-outlined text-[16px]">add</span>
                                </button>
                              </div>
                              <div className="text-on-surface-variant font-technical-data text-sm">
                                Item Subtotal:{" "}
                                <span className="font-bold text-primary">
                                  ZMW {itemTotal.toLocaleString()}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="flex items-center gap-1 font-technical-data text-xs text-error hover:text-red-700 transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">delete</span>
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Logistics Estimator */}
                <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-4 border border-border-light">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-tertiary-fixed">
                        <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                      </div>
                      <h3 className="font-headline-md text-lg text-primary font-bold">
                        Delivery &amp; Installation Logistics Estimator
                      </h3>
                    </div>
                    <span className="font-technical-data text-xs text-secondary uppercase font-semibold">
                      Step 1 of 2
                    </span>
                  </div>

                  {/* Free Delivery Threshold Alert Box */}
                  <div className="p-4 rounded-xl bg-surface-container-low border border-border-light space-y-2">
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
                          <span>Lusaka Free Delivery Threshold (Orders &gt; K78,000)</span>
                        )}
                      </span>
                      <span className="text-secondary font-bold">
                        {freeDeliveryProgress}%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isFreeDelivery ? "bg-status-success" : "bg-accent-yellow"
                        }`}
                        style={{ width: `${freeDeliveryProgress}%` }}
                      />
                    </div>

                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                      {isFreeDelivery ? (
                        <span className="text-status-success font-medium">
                          Your order hardware subtotal (<strong>ZMW {hardwareSubtotal.toLocaleString()}</strong>) exceeds K78,000. <strong>100% Free Lusaka Urban Dispatch</strong> applies.
                        </span>
                      ) : (
                        <span>
                          Current hardware total: <strong>ZMW {hardwareSubtotal.toLocaleString()}</strong>. Add <strong>ZMW {amountForFreeDelivery.toLocaleString()}</strong> more to get <strong>FREE delivery</strong> in Lusaka. Standard dispatch fee is ZMW 750.
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Conditional Authentication & Logistics Address Logic */}
                  {!isAuthenticated ? (
                    <div className="p-5 rounded-2xl bg-surface-container-low border border-border-light space-y-4">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-secondary-container/80 flex items-center justify-center flex-shrink-0 text-secondary">
                          <span className="material-symbols-outlined text-[20px]">person_pin_circle</span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-technical-data text-sm font-bold text-primary">
                            Sign in to Calculate Exact Dispatch Logistics
                          </h4>
                          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                            Logistics rates and engineering staging are calculated directly against your verified site location in Zambia. Sign in or create an account to link your delivery address.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <Link
                          href="/login?redirect=/cart"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs font-bold tracking-wide uppercase transition-all shadow-sm cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">login</span>
                          <span>Log In to Account</span>
                        </Link>
                        <Link
                          href="/signup?redirect=/cart"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest hover:bg-surface-container border border-border-light text-primary font-label-cta text-xs font-bold tracking-wide uppercase transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">person_add</span>
                          <span>Create Free Account</span>
                        </Link>
                      </div>
                    </div>
                  ) : !hasSavedAddress ? (
                    <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-4">
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 text-amber-800 dark:text-amber-400">
                          <span className="material-symbols-outlined text-[20px]">add_location_alt</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-technical-data text-sm font-bold text-amber-900 dark:text-amber-200">
                              No Delivery Address on File
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                              Action Required
                            </span>
                          </div>
                          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                            You are signed in as <strong className="text-primary">{user?.fullName || user?.email}</strong>, but haven&apos;t added an installation or delivery address to your profile.
                          </p>
                        </div>
                      </div>

                      <div className="pt-1">
                        <Link
                          href="/profile"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs font-bold tracking-wide uppercase transition-all shadow-sm cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">add_location</span>
                          <span>Add Address to Proceed</span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-surface-container-low border border-border-light space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-full bg-secondary-container/80 flex items-center justify-center flex-shrink-0 text-secondary">
                            <span className="material-symbols-outlined text-[20px]">verified_user</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary-container text-secondary border border-secondary/20">
                                {defaultAddress?.label || "Primary Installation Site"}
                              </span>
                              <span className="text-xs font-bold text-status-success flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                Verified Address
                              </span>
                            </div>
                            <p className="font-technical-data text-sm font-bold text-primary pt-0.5">
                              {primaryAddressText}
                            </p>
                            <p className="font-body-sm text-xs text-on-surface-variant">
                              {[districtText, provinceText].filter(Boolean).join(", ")}
                              {defaultAddress?.contactPhone && ` • Contact: ${defaultAddress.contactPhone}`}
                            </p>
                          </div>
                        </div>

                        <Link
                          href="/profile"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest hover:bg-surface-container border border-border-light text-primary font-technical-data text-xs font-bold transition-colors self-start sm:self-auto cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[14px]">edit_location_alt</span>
                          <span>Change Address</span>
                        </Link>
                      </div>

                      {/* Logistics Routing Summary */}
                      <div className="pt-3 border-t border-border-light flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-[18px]">local_shipping</span>
                          <span className="font-technical-data text-xs font-bold text-primary">
                            {deliveryZone === "lusaka" ? "Lusaka Central Hub Staging" : "Regional Convoy Logistics"}
                          </span>
                        </div>
                        <div className="font-technical-data text-xs font-bold">
                          {deliveryZone === "lusaka" ? (
                            <span className={isFreeDelivery ? "text-status-success font-bold" : "text-primary font-bold"}>
                              {isFreeDelivery ? "FREE Dispatch (> K78,000)" : "ZMW 750 Dispatch Fee"}
                            </span>
                          ) : (
                            <span className="text-primary font-bold">ZMW 2,500 Regional Dispatch Fee</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assurance Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-surface-container-lowest rounded-xl shadow-sm p-6 border border-border-light">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/80 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        shield_with_heart
                      </span>
                    </div>
                    <div>
                      <div className="font-technical-data text-xs text-primary font-bold">
                        10-Year Local Warranty
                      </div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">
                        Zambian backed replacement guarantee
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/80 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        engineering
                      </span>
                    </div>
                    <div>
                      <div className="font-technical-data text-xs text-primary font-bold">
                        ERB &amp; EIZ Certified
                      </div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">
                        Regulated high-voltage compliance
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/80 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        replay_circle_filled
                      </span>
                    </div>
                    <div>
                      <div className="font-technical-data text-xs text-primary font-bold">
                        14-Day Money Back
                      </div>
                      <div className="font-body-sm text-[11px] text-on-surface-variant">
                        Satisfaction guaranteed or refund
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="lg:col-span-4 sticky top-24 space-y-4">
                <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 space-y-6 border border-border-light">
                  <div className="flex items-center justify-between pb-2 border-b border-border-light">
                    <h3 className="font-headline-md text-lg text-primary font-bold">Order Summary</h3>
                    <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                      receipt_long
                    </span>
                  </div>

                  <div className="space-y-3 font-technical-data text-xs">
                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>Hardware Subtotal</span>
                      <span className="font-bold text-primary">
                        ZMW {hardwareSubtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>Installation &amp; Commissioning</span>
                      <span className="font-bold text-secondary">
                        {installationSubtotal > 0
                          ? `+ ZMW ${installationSubtotal.toLocaleString()}`
                          : "Not Selected"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-on-surface-variant">
                      <span>Estimated Freight &amp; Delivery</span>
                      <span
                        className={`font-bold ${
                          deliveryZone === "lusaka" && deliveryCost === 0
                            ? "text-status-success uppercase"
                            : "text-primary"
                        }`}
                      >
                        {deliveryZone === "lusaka"
                          ? deliveryCost === 0
                            ? "FREE (> K78k)"
                            : "ZMW 750 (Lusaka Hub)"
                          : "ZMW 2,500"}
                      </span>
                    </div>

                    <div className="pt-4 mt-2 border-t border-border-light">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="font-headline-md text-base text-primary font-bold">Total</span>
                          <div className="font-body-sm text-[10px] text-on-surface-variant uppercase tracking-wider">
                            Tax &amp; Logistics Inclusive
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-headline-lg text-2xl font-bold text-primary">
                            ZMW {grandTotal.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-2">
                    {!isAuthenticated ? (
                      <Link
                        href="/login?redirect=/checkout"
                        className="w-full py-4 px-6 rounded-full bg-accent-yellow text-primary font-label-cta text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 font-bold hover:scale-[1.01]"
                      >
                        <span>SIGN IN TO PROCEED TO CHECKOUT</span>
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                      </Link>
                    ) : !hasSavedAddress ? (
                      <Link
                        href="/profile"
                        className="w-full py-4 px-6 rounded-full bg-accent-yellow text-primary font-label-cta text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 font-bold hover:scale-[1.01]"
                      >
                        <span>ADD ADDRESS IN PROFILE TO PROCEED</span>
                        <span className="material-symbols-outlined text-[18px]">add_location</span>
                      </Link>
                    ) : (
                      <Link
                        href="/checkout"
                        className="w-full py-4 px-6 rounded-full bg-accent-yellow text-primary font-label-cta text-xs tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 font-bold hover:scale-[1.01]"
                      >
                        <span>PROCEED TO SECURE CHECKOUT</span>
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                      </Link>
                    )}
                    <a
                      className="w-full py-3.5 px-6 rounded-full bg-secondary-container/40 hover:bg-secondary-container text-on-secondary-container font-label-cta text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-2 font-bold text-center"
                      href={getWhatsAppQuoteUrl()}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-secondary text-[18px]">chat</span>
                      <span>Chat on WhatsApp to Finalize Quote</span>
                    </a>
                  </div>

                  {/* Payment Channels */}
                  <div className="space-y-3 pt-2 border-t border-border-light">
                    <div className="text-center font-technical-data text-[11px] uppercase tracking-wider text-on-surface-variant font-medium">
                      Instant Payment Channels Accepted
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-surface-container font-technical-data text-[10px] font-bold text-primary">
                        MTN MoMo
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-technical-data text-[10px] font-bold text-primary">
                        Airtel Money
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-technical-data text-[10px] font-bold text-primary">
                        VISA
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-technical-data text-[10px] font-bold text-primary">
                        Mastercard
                      </span>
                      <span className="px-2.5 py-1 rounded bg-surface-container font-technical-data text-[10px] font-bold text-primary">
                        EFT Bank Transfer
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 font-body-sm text-[11px] text-on-surface-variant text-center">
                      <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                      <span>Bank-grade 256-bit encrypted checkout</span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-4 flex items-center gap-3 border border-border-light">
                  <span className="material-symbols-outlined text-primary text-[22px]">support_agent</span>
                  <div>
                    <div className="font-technical-data text-xs text-primary font-bold">
                      Lusaka Dispatch Direct Support
                    </div>
                    <div className="font-body-sm text-xs text-on-surface-variant">
                      {WHATSAPP_PHONE_DISPLAY} • Mon - Fri: 08:00 - 17:00, Sat: 09:00 - 14:00 CAT
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
