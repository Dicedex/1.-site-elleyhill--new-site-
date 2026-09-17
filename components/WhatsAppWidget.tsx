"use client";

import React from "react";
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_PHONE_DISPLAY } from "@/data/config";

export default function WhatsAppWidget() {
  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-50">
      <a
        href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-[#25D366] shadow-[0_8px_24px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Subtle Pulse Animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-35 pointer-events-none" />

        {/* Official WhatsApp Brand Icon */}
        <i
          className="fa-brands fa-whatsapp text-3xl transition-transform duration-200 group-hover:scale-110 relative z-10"
          style={{ color: "rgb(37, 211, 102)" }}
        />

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
          Chat on WhatsApp &bull; {WHATSAPP_PHONE_DISPLAY}
        </span>
      </a>
    </aside>
  );
}
