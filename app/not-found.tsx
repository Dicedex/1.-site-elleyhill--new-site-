import React from "react";
import Link from "next/link";
import { WHATSAPP_PHONE_NUMBER } from "@/data/config";

export default function NotFound() {
  return (
    <div className="bg-surface font-body-lg text-body-lg text-on-surface antialiased min-h-screen pt-[72px] flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-surface-container-lowest border border-border-light rounded-3xl p-8 md:p-12 shadow-sm text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-secondary-container text-secondary mx-auto flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-4xl">solar_power</span>
        </div>

        <div className="space-y-2">
          <span className="font-technical-data text-xs text-secondary uppercase font-bold tracking-widest">
            Error 404 • Page Not Found
          </span>
          <h1 className="font-headline-lg text-3xl md:text-4xl text-primary font-bold">
            Solar Route Disconnected
          </h1>
          <p className="font-body-sm text-text-secondary text-sm max-w-md mx-auto">
            The page or equipment you are looking for may have been moved, updated, or does not exist.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/shop"
            className="w-full py-3.5 px-6 rounded-full bg-accent-yellow text-primary font-label-cta text-xs font-bold uppercase tracking-wider hover:scale-95 transition-transform flex items-center justify-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Browse Solar Shop</span>
          </Link>
          <Link
            href="/calculator"
            className="w-full py-3.5 px-6 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-primary font-label-cta text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-border-light"
          >
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            <span>Solar Calculator</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-border-light flex flex-col sm:flex-row items-center justify-between text-xs text-text-secondary gap-3">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Return to Homepage</span>
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hi%20Elleyhill%20Power,%20I%20need%20help%20finding%20equipment%20on%20your%20website`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary font-bold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            <span>WhatsApp Support</span>
          </a>
        </div>
      </div>
    </div>
  );
}
