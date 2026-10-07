import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/elleyhillpowerzambia",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/elleyhillpowerzambia",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/elleyhill-power-zambia",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@elleyhillpowerzambia",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.38a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.45v-6.9a8.16 8.16 0 0 0 5.63 2.25v-3.47a4.85 4.85 0 0 1-2.92-1.34 4.87 4.87 0 0 1-1.08-4z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full pt-12 pb-8 px-4 md:px-margin-desktop bg-surface-container-high text-on-surface font-body-sm text-body-sm mt-auto border-t border-border-light">
      <div className="max-w-container-max mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center" aria-label="Elleyhill Power Zambia">
              <Image
                src="/images/logo.png"
                alt="Elleyhill Power Zambia"
                width={160}
                height={40}
                className="h-9 md:h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-on-surface-variant text-xs leading-relaxed">
              Engineering sustainable, Tier-1 solar and industrial energy infrastructure across Zambia.
            </p>
            <p className="text-on-surface-variant text-xs">
              &copy; 2024 Elleyhill Power Zambia. All rights reserved.
            </p>
            <p className="text-on-surface-variant text-xs">
              Developed by{" "}
              <a
                href="https://webco-2003.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-secondary underline decoration-secondary transition-colors"
              >
                KAKINDA
              </a>
            </p>
          </div>

          {/* Explore Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-technical-data font-semibold text-primary uppercase text-xs tracking-wider">
              Explore
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/shop"
              >
                Shop Solar
              </Link>
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/calculator"
              >
                Solar Calculator
              </Link>
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/services"
              >
                EPC &amp; Services
              </Link>
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/financing"
              >
                Financing Models
              </Link>
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/company-profile"
              >
                Company Profile
              </Link>
            </div>
          </div>

          {/* Legal & Support Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-technical-data font-semibold text-primary uppercase text-xs tracking-wider">
              Legal &amp; Support
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/terms"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/privacy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/return-policy"
              >
                Return Policy
              </Link>
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/warranty"
              >
                Warranty &amp; Swap Terms
              </Link>
              <Link
                className="text-on-surface-variant hover:text-primary hover:underline decoration-secondary transition-colors"
                href="/contact"
              >
                Contact &amp; Support
              </Link>
            </div>
          </div>

          {/* Showroom Location Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-technical-data font-semibold text-primary uppercase text-xs tracking-wider">
              Showroom Location
            </h4>
            <div className="flex flex-col gap-2 text-on-surface-variant text-xs">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 mt-0.5">
                  storefront
                </span>
                <div>
                  <p className="font-medium text-primary">Lusaka Showroom (HQ)</p>
                  <p>Unit 4A block A East Park Mall, Lusaka</p>
                </div>
              </div>
              <div className="flex items-start gap-2 mt-1">
                <i
                  className="fa-brands fa-whatsapp text-base shrink-0 mt-0.5"
                  style={{ color: "rgb(37, 211, 102)" }}
                />
                <div>
                  <p className="font-medium text-primary">Direct WhatsApp &amp; Calls</p>
                  <a
                    href="https://wa.me/260971838038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-secondary transition-colors"
                  >
                    +260 97 183 8038
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2 mt-1">
                <span className="material-symbols-outlined text-secondary text-base shrink-0 mt-0.5">
                  schedule
                </span>
                <div>
                  <p className="font-medium text-primary">Operating Hours</p>
                  <p>Mon - Fri: 08:00 - 17:00</p>
                  <p>Sat: 09:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Follow Us / Social Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-technical-data font-semibold text-primary uppercase text-xs tracking-wider">
              Follow Us
            </h4>
            <p className="text-on-surface-variant text-xs">
              Follow Elleyhill Power Zambia on our official social networks:
            </p>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-lowest border border-border-light text-primary hover:border-secondary hover:text-secondary hover:-translate-y-0.5 transition-all text-xs font-medium"
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Security & Gateways Strip */}
        <div className="pt-6 pb-4 border-t border-border-light/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            <span>Secured Multi-Carrier Payment Switch</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-technical-data font-semibold">
            <span className="px-2.5 py-1 rounded-md bg-surface-container-lowest border border-border-light text-[#FFCC00] bg-black/5 font-bold">
              MTN MoMo
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface-container-lowest border border-border-light text-[#E60000] font-bold">
              Airtel Money
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface-container-lowest border border-border-light text-[#006633] font-bold">
              Zamtel Kwacha
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface-container-lowest border border-border-light text-primary">
              Visa / Mastercard
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface-container-lowest border border-border-light text-on-surface-variant">
              EFT Wire
            </span>
          </div>
        </div>

        {/* Sub-footer Legal Bar */}
        <div className="pt-4 border-t border-border-light/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/terms" className="hover:text-primary hover:underline transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-primary hover:underline transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/return-policy" className="hover:text-primary hover:underline transition-colors">
              Return Policy
            </Link>
          </div>
          <div>
            Official Energy Partner &bull; Republic of Zambia
          </div>
        </div>
      </div>
    </footer>
  );
}
