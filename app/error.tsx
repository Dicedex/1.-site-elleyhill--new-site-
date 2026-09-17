"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { WHATSAPP_PHONE_NUMBER } from "@/data/config";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="bg-surface font-body-lg text-body-lg text-on-surface antialiased min-h-screen pt-[72px] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container-lowest border border-border-light rounded-3xl p-8 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-error-container text-error mx-auto flex items-center justify-center shadow-inner">
          <span className="material-symbols-outlined text-3xl">error_outline</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-headline-md text-2xl text-primary font-bold">
            Unexpected System Interrupt
          </h2>
          <p className="font-body-sm text-text-secondary text-xs">
            We encountered a temporary interface loading issue. You can try refreshing or contact our technical dispatch desk.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-hover text-white font-label-cta text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            Try Again
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hi%20Elleyhill%20Power,%20I%20noticed%20an%20issue%20on%20the%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-6 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-technical-data text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            <span>Contact Support Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
