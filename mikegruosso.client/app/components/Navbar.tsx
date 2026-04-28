"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const leftLinks = [
  { label: "Buy Properties", href: "/buy" },
  { label: "Sell Properties", href: "/property-value" },
  { label: "Investment", href: "/investment" },
  { label: "Commercial", href: "/commercial" },
];

const rightLinks = [
  { label: "Properties Sold", href: "/portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Join Gruosso Group", href: "/join" },
  { label: "Contact Us", href: "/contact" },
];

const mobileLinks = [...leftLinks, ...rightLinks];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          scrolled || !isHome ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">

          {/* Mobile — logo left, hamburger right */}
          <div className="flex min-[940px]:hidden items-center justify-between h-20 gap-4">
            <Link
              href="/"
              className={`relative flex shrink-0 transition-opacity duration-300 ${
                menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              <div className="relative w-[120px] h-[80px]">
                <Image
                  src="/mike-icon.png"
                  alt="The Gruosso Group"
                  fill
                  sizes="120px"
                  className={`object-contain transition-opacity duration-300 ${scrolled || !isHome ? "opacity-0" : "opacity-100"}`}
                  priority
                />
                <Image
                  src="/mike-icon-black-removebg-preview.png"
                  alt="The Gruosso Group"
                  fill
                  sizes="120px"
                  className={`object-contain transition-opacity duration-300 ${scrolled || !isHome ? "opacity-100" : "opacity-0"}`}
                  priority
                />
              </div>
            </Link>
            {!menuOpen && (
              <button
                type="button"
                className="relative flex shrink-0 flex-col justify-center gap-1.5 p-2 z-[60] touch-manipulation ml-auto"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <span className={`pointer-events-none block h-0.5 w-6 transition-all duration-300 ${scrolled || !isHome ? "bg-gray-800" : "bg-white"}`} />
                <span className={`pointer-events-none block h-0.5 w-6 transition-all duration-300 ${scrolled || !isHome ? "bg-gray-800" : "bg-white"}`} />
                <span className={`pointer-events-none block h-0.5 w-6 transition-all duration-300 ${scrolled || !isHome ? "bg-gray-800" : "bg-white"}`} />
              </button>
            )}
          </div>

          {/* Desktop — left nav · centered logo · right nav */}
          <div className="hidden min-[940px]:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center h-20 gap-6">

          {/* Left — Primary nav */}
          <nav className="flex items-center gap-7 justify-start">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 font-[family-name:var(--font-karla)] ${
                  scrolled || !isHome
                    ? "text-gray-800 hover:text-[#3aaacf]"
                    : "text-white hover:text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center — Logo (desktop) */}
          <Link
            href="/"
            className={`hidden min-[940px]:flex items-center justify-self-center transition-opacity duration-300 ${
              menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="relative w-[120px] h-[80px]">
              <Image
                src="/mike-icon.png"
                alt="The Gruosso Group"
                fill
                sizes="120px"
                className={`object-contain transition-opacity duration-300 ${scrolled || !isHome ? "opacity-0" : "opacity-100"}`}
                priority
              />
              <Image
                src="/mike-icon-black-removebg-preview.png"
                alt="The Gruosso Group"
                fill
                sizes="120px"
                className={`object-contain transition-opacity duration-300 ${scrolled || !isHome ? "opacity-100" : "opacity-0"}`}
                priority
              />
            </div>
          </Link>

          {/* Right — Secondary nav (Contact Us is a plain link, not a button) */}
          <nav className="flex items-center gap-7 justify-end">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 font-[family-name:var(--font-karla)] ${
                  scrolled || !isHome
                    ? "text-gray-800 hover:text-[#3aaacf]"
                    : "text-white hover:text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          </div>
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
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-800 hover:text-[#3aaacf] hover:bg-gray-50 py-3.5 px-3 rounded-lg border-b border-gray-100 last:border-0 transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
    </>
  );
}
