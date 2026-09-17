"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  WHATSAPP_PHONE_NUMBER,
  WHATSAPP_PHONE_DISPLAY,
  SHOWROOM_LOCATION,
  OPERATING_HOURS,
} from "@/data/config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { openDrawer, totalItemsCount, grandTotal, isFreeDelivery, freeDeliveryProgress } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  // Click outside listener for user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle ESC key to close mobile menu & dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop Solar", href: "/shop" },
    { label: "Services", href: "/services" },
    { label: "Solar Calculator", href: "/calculator" },
    { label: "Contact & Support", href: "/contact" },
  ];

  const mobileNavItems = [
    {
      label: "Home",
      subtitle: "Official Zambian Portal & Overview",
      href: "/",
      icon: "home",
    },
    {
      label: "Solar Systems & Kits",
      subtitle: "Turnkey 3kW - 100kW+ Backup Packages",
      href: "/shop",
      icon: "solar_power",
      badge: "Popular",
    },
    {
      label: "Solar Load Calculator",
      subtitle: "Size Inverter & Battery for Your Home",
      href: "/calculator",
      icon: "calculate",
      badge: "Interactive",
    },
    {
      label: "Engineering & Services",
      subtitle: "Certified ERB/EIZ Turnkey Installation",
      href: "/services",
      icon: "engineering",
    },
    {
      label: "Flexible Energy Lay-By",
      subtitle: "0% Interest 3-Month Financing",
      href: "/financing",
      icon: "payments",
    },
    {
      label: "Company Profile & Accreditation",
      subtitle: "Zambian Clean Energy Authority",
      href: "/company-profile",
      icon: "apartment",
    },
    {
      label: "Showroom & Customer Support",
      subtitle: "East Park Mall & Great East Rd Depot",
      href: "/contact",
      icon: "support_agent",
    },
  ];

  const getWhatsAppDirectLink = () => {
    const text = "Hello Elleyhill Power, I would like to inquire about solar equipment and system installation.";
    return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-40 glass-header border-b border-border-light">
        <nav className="flex justify-between items-center px-4 md:px-margin-desktop h-header-height-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-3">
            {/* Animated Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden relative w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex flex-col items-center justify-center gap-1.5 focus:outline-none transition-colors cursor-pointer border border-border-light"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-0.5 bg-primary rounded-full transition-all duration-300 transform ${
                  mobileMenuOpen ? "rotate-45 translate-y-2 bg-secondary" : ""
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-primary rounded-full transition-all duration-200 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-primary rounded-full transition-all duration-300 transform ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2 bg-secondary" : ""
                }`}
              />
            </button>

            <Link
              className="flex items-center"
              href="/"
              aria-label="Elleyhill Power Zambia"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Elleyhill Power Zambia"
                className="h-10 md:h-11 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-gutter items-center">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href === "/about" && pathname === "/company-profile") ||
                (link.href === "/calculator" && pathname === "/solar-calculator") ||
                (link.href === "/contact" && pathname === "/contact-support");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link font-body-sm text-body-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary active font-semibold"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/shop"
              className="text-charcoal hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container"
              aria-label="Search Catalog"
            >
              <span className="material-symbols-outlined text-xl md:text-2xl">search</span>
            </Link>

            <button
              onClick={openDrawer}
              className="relative text-charcoal hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-container focus:outline-none cursor-pointer"
              aria-label="Open Shopping Cart Drawer"
              type="button"
            >
              <span className="material-symbols-outlined text-xl md:text-2xl">shopping_cart</span>
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm min-w-[18px] text-center">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Desktop User / Auth Button */}
            <div className="relative hidden md:block" ref={userDropdownRef}>
              {isAuthenticated && user ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high border border-border-light text-xs font-semibold text-charcoal transition-all cursor-pointer shadow-sm"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="text-charcoal font-bold max-w-[120px] truncate">{user.fullName.split(" ")[0]}</span>
                    <span className="material-symbols-outlined text-[16px] text-outline">
                      {userDropdownOpen ? "expand_less" : "expand_more"}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-border-medium shadow-2xl p-2 z-50 animate-fadeIn">
                      <div className="p-3 border-b border-border-light">
                        <div className="font-bold text-sm text-charcoal truncate">{user.fullName}</div>
                        <div className="text-[11px] text-on-surface-variant truncate">{user.email}</div>
                        <div className="mt-1.5">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-light text-primary border border-primary/20">
                            {user.role === "admin" ? "ADMINISTRATOR" : `${user.accountType} account`}
                          </span>
                        </div>
                      </div>

                      <div className="py-1 space-y-0.5 text-xs font-medium">
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-primary-light text-primary font-bold hover:bg-primary/20 transition-colors mb-1"
                          >
                            <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                            <span>Admin Operations</span>
                          </Link>
                        )}
                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-charcoal hover:bg-surface-container transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                          <span>Client Dashboard</span>
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-charcoal hover:bg-surface-container transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
                          <span>Warranty Vault ({user.warranties.length})</span>
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-charcoal hover:bg-surface-container transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px] text-secondary">local_shipping</span>
                          <span>Orders &amp; Dispatch</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-border-light">
                        <button
                          type="button"
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-error hover:bg-error-container/20 transition-colors text-xs font-semibold cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">logout</span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-surface-container hover:bg-surface-container-high border border-border-light text-charcoal hover:text-primary text-xs font-semibold transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  <span>Sign In</span>
                </Link>
              )}
            </div>

            <Link
              className="hidden md:flex bg-primary hover:bg-primary-hover text-white font-label-cta text-label-cta px-5 py-2.5 rounded-full hover:scale-95 duration-100 transition-all shadow-sm font-bold"
              href="/contact"
            >
              GET A QUOTE
            </Link>
          </div>
        </nav>
      </header>

      {/* Slide-Out Mobile Navigation Drawer (Rendered outside header to guarantee 100vh full-screen height) */}
      <div
        className={`md:hidden fixed inset-0 z-[100] h-screen h-[100dvh] w-screen transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        id="mobile-navigation-drawer"
        aria-hidden={!mobileMenuOpen}
      >
        {/* Heavily Blurred Backdrop Overlay OUTSIDE of the menu */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`fixed inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Solid Opaque Drawer Menu Panel */}
        <div
          className={`fixed left-0 top-0 bottom-0 h-screen h-[100dvh] w-[88%] max-w-[360px] bg-surface-container-lowest shadow-2xl flex flex-col transform transition-transform duration-300 ease-out border-r border-border-light z-10 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Drawer Header (Solid Opaque) */}
          <div className="p-4 md:p-5 bg-surface-container-lowest border-b border-border-light flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Elleyhill Power"
                className="h-8 w-auto object-contain"
              />
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-secondary font-technical-data text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                Lusaka Hub
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">
            {/* User Account Portal Card in Mobile Menu */}
            {isAuthenticated && user ? (
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-border-light">
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                      {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-charcoal truncate">{user.fullName}</div>
                      <div className="text-[10px] text-secondary font-medium truncate uppercase">
                        {user.role === "admin" ? "ADMINISTRATOR" : `${user.accountType} Account`}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="p-1.5 rounded-lg bg-surface-container hover:bg-error-container/20 text-on-surface-variant hover:text-error text-xs transition-colors"
                    title="Sign Out"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                  </button>
                </div>

                <div className={`grid ${user.role === "admin" ? "grid-cols-3" : "grid-cols-2"} gap-1.5 pt-2 border-t border-border-light`}>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1.5 px-2 rounded-lg bg-primary text-white text-[10px] font-bold text-center hover:bg-primary-hover flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[13px]">admin_panel_settings</span>
                      <span>Admin</span>
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-2 rounded-lg bg-white border border-border-light text-charcoal text-[10px] font-semibold text-center hover:bg-surface-container flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[13px] text-primary">person</span>
                    <span>Portal</span>
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-2 rounded-lg bg-white border border-border-light text-charcoal text-[10px] font-semibold text-center hover:bg-surface-container flex items-center justify-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[13px] text-secondary">verified_user</span>
                    <span>Vault</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-border-light flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-charcoal">Client Portal</div>
                    <div className="text-[10px] text-on-surface-variant truncate">Warranties &amp; Tracking</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-1.5 px-3 rounded-xl bg-primary text-white font-bold text-[11px] hover:bg-primary-hover shadow-sm"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            )}

            {/* Quick Cart Status Bar inside Menu */}
            {totalItemsCount > 0 ? (
              <div
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDrawer();
                }}
                className="p-3.5 rounded-2xl bg-secondary-container/20 border border-secondary/30 flex items-center justify-between cursor-pointer hover:bg-secondary-container/30 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  </div>
                  <div>
                    <div className="font-headline-md text-xs font-bold text-primary">
                      {totalItemsCount} {totalItemsCount === 1 ? "Item" : "Items"} in Cart
                    </div>
                    <div className="font-technical-data text-[11px] text-secondary font-semibold">
                      ZMW {grandTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
                <span className="font-technical-data text-[11px] uppercase font-bold text-secondary flex items-center gap-1">
                  <span>View Cart</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-surface-container-low border border-border-light flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-on-surface-variant font-technical-data">
                  <span className="material-symbols-outlined text-[16px] text-secondary">local_shipping</span>
                  <span>Free Lusaka Delivery &gt; K78,000</span>
                </div>
                <span className="font-technical-data text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container-high text-primary">
                  Active
                </span>
              </div>
            )}

            {/* Main Navigation Links */}
            <div className="space-y-1">
              <div className="px-2 py-1 font-technical-data text-[10px] uppercase tracking-wider text-outline font-bold">
                Navigation &amp; Solutions
              </div>
              {mobileNavItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/shop" && pathname.startsWith("/products")) ||
                  (item.href === "/calculator" && pathname === "/solar-calculator") ||
                  (item.href === "/company-profile" && pathname === "/about");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-on-surface hover:bg-surface-container-low"
                      }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive
                        ? "bg-white/20 text-white"
                        : "bg-surface-container text-primary"
                        }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {item.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-headline-md text-[13px] font-bold leading-tight truncate">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full font-technical-data text-[9px] font-bold uppercase tracking-wider ${isActive
                              ? "bg-accent-yellow text-primary"
                              : "bg-secondary-container text-secondary"
                              }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={`font-body-sm text-[11px] truncate leading-tight mt-0.5 ${isActive ? "text-white/80" : "text-on-surface-variant"
                          }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Action Contact Cards */}
            <div className="pt-2 space-y-2 border-t border-border-light">
              <div className="px-2 font-technical-data text-[10px] uppercase tracking-wider text-outline font-bold">
                Direct Engineering Desk
              </div>

              {/* WhatsApp CTA */}
              <a
                href={getWhatsAppDirectLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-status-success/10 hover:bg-status-success/20 text-status-success border border-status-success/20 transition-all font-bold text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-status-success text-white flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </div>
                  <div>
                    <div className="font-headline-md text-xs font-bold text-primary">
                      Chat on WhatsApp
                    </div>
                    <div className="font-technical-data text-[11px] text-status-success font-semibold">
                      {WHATSAPP_PHONE_DISPLAY}
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>

              {/* Direct Phone Call */}
              <a
                href={`tel:+${WHATSAPP_PHONE_NUMBER}`}
                className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container text-primary border border-border-light transition-all text-xs font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-surface-container-high text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[15px]">phone</span>
                  </div>
                  <span className="font-technical-data text-xs">Direct Call</span>
                </div>
                <span className="font-technical-data text-[11px] text-primary font-bold">{WHATSAPP_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Drawer Footer Info (Solid Opaque) */}
          <div className="p-4 bg-surface-container-low border-t border-border-light space-y-2.5 flex-shrink-0">
            <div className="flex items-start gap-2 text-[11px] text-on-surface-variant font-body-sm">
              <span className="material-symbols-outlined text-[14px] text-secondary mt-0.5">location_on</span>
              <div>
                <span className="font-bold text-primary block">{SHOWROOM_LOCATION}</span>
                <span className="text-[10px]">{OPERATING_HOURS}</span>
              </div>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs uppercase tracking-wide flex items-center justify-center gap-2 font-bold shadow-sm transition-transform active:scale-95"
            >
              <span>REQUEST FORMAL QUOTE</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

