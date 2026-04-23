"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Buy Properties", href: "/buy" },
  { label: "Property Value", href: "/property-value" },
  { label: "Investment", href: "/investment" },
  { label: "Our Portfolio", href: "/portfolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className={`flex items-center gap-3 flex-shrink-0 transition-opacity duration-300 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <div className="relative w-[120px] h-[80px]">
              <Image
                src="/mike-icon.png"
                alt="The Gruosso Group"
                fill
                sizes="120px"
                className={`object-contain transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
                priority
              />
              <Image
                src="/mike-icon-black-removebg-preview.png"
                alt="The Gruosso Group"
                fill
                sizes="120px"
                className={`object-contain transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden min-[940px]:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  scrolled
                    ? "text-gray-800 hover:text-[#15234b]"
                    : "text-white hover:text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#15234b" }}
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Hamburger — hidden when drawer is open */}
          {!menuOpen && (
            <button
              type="button"
              className="relative min-[940px]:hidden flex flex-col justify-center gap-1.5 p-2 z-[60] touch-manipulation"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className={`pointer-events-none block h-0.5 w-6 transition-all duration-300 ${scrolled ? "bg-gray-800" : "bg-white"}`} />
              <span className={`pointer-events-none block h-0.5 w-6 transition-all duration-300 ${scrolled ? "bg-gray-800" : "bg-white"}`} />
              <span className={`pointer-events-none block h-0.5 w-6 transition-all duration-300 ${scrolled ? "bg-gray-800" : "bg-white"}`} />
            </button>
          )}
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 min-[940px]:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Drawer — always in DOM, slides via transform */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col min-[940px]:hidden transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
              <div className="relative w-[100px] h-[60px]">
                <Image
                  src="/mike-icon-black.png"
                  alt="The Gruosso Group"
                  fill
                  sizes="100px"
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
              >
                <svg className="w-5 h-5 text-gray-700 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Drawer Links */}
            <nav className="flex flex-col flex-1 px-5 py-6 gap-1 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-800 hover:text-[#15234b] hover:bg-gray-50 py-3.5 px-3 rounded-lg border-b border-gray-100 last:border-0 transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Drawer CTA */}
            <div className="px-5 py-6 border-t border-gray-100">
              <Link
                href="/contact"
                className="block w-full px-5 py-3 rounded-lg text-sm font-semibold text-white text-center transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#15234b" }}
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
    </>
  );
}
