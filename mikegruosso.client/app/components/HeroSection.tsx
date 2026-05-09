"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

const tabs = ["Buy", "Sell", "Invest"] as const;
type Tab = (typeof tabs)[number];

const LISTINGS_ANCHOR_ID = "our-listings";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Buy");

  const scrollToOurListings = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const path = window.location.pathname || "/";
      window.history.replaceState(null, "", `${path}#${LISTINGS_ANCHOR_ID}`);

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const run = () => {
        const el = document.getElementById(LISTINGS_ANCHOR_ID);
        if (!el) return;
        const header = document.querySelector("header");
        const nav =
          header instanceof HTMLElement
            ? Math.ceil(header.getBoundingClientRect().height)
            : 96;
        const top = Math.max(
          0,
          el.getBoundingClientRect().top + window.scrollY - nav,
        );
        window.scrollTo({
          top,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(run);
      });
    },
    [],
  );

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-8 pt-28 pb-12 sm:pt-24 sm:pb-16">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="https://res.cloudinary.com/dd1e0iquz/video/upload/v1777809301/Untitled_design_yoll8l.mp4"
        poster="https://res.cloudinary.com/dd1e0iquz/video/upload/so_0,f_jpg/v1777809301/Untitled_design_yoll8l.jpg"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-3xl flex flex-col items-center text-center">

          {/* Tagline */}
          <h1 className="text-3xl sm:text-4xl font-normal text-white leading-tight tracking-wide mb-5 font-[family-name:var(--font-cormorant-garamond)] md:text-[57px]">
          Helping Homeowners<br />Investors & Businesses
          </h1>

          {/* Description */}
          {/* <p className="text-sm sm:text-base md:text-lg text-white font-bold max-w-2xl mb-10 leading-relaxed tracking-wide font-[family-name:var(--font-arapey)]">
          From Generation to Generation
          </p> */}

          {/* Tab Card — transparent style */}
          <div className="w-full max-w-2xl">

            {/* Tabs */}
            <div className="flex justify-center gap-10 sm:gap-14 mb-0 px-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2.5 text-sm font-semibold uppercase tracking-widest transition-all duration-200 touch-manipulation border-b-2 font-[family-name:var(--font-manrope)] ${
                    activeTab === tab
                      ? "text-white border-white"
                      : "text-white/60 border-transparent hover:text-white/90"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Buy · Sell · Invest */}
            {activeTab === "Sell" ? (
              <div className="mt-6 flex w-full flex-col items-center gap-5 text-center">
                <p className="max-w-xl text-xl font-normal leading-snug tracking-wide text-white sm:text-2xl md:text-[1.65rem] font-[family-name:var(--font-cormorant-garamond)]">
                  Ready to sell? We&apos;re ready to help
                </p>
                <Link
                  href="/sell"
                  className="inline-flex w-full max-w-sm shrink-0 items-center justify-center rounded-md bg-[#3aaacf] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-[#2f95b6] touch-manipulation sm:w-auto font-[family-name:var(--font-manrope)]"
                >
                  Request Home Value
                </Link>
              </div>
            ) : activeTab === "Invest" ? (
              <div className="mt-6 flex w-full flex-col items-center gap-5 text-center">
                <p className="max-w-xl text-xl font-normal leading-snug tracking-wide text-white sm:text-2xl md:text-[1.65rem] font-[family-name:var(--font-cormorant-garamond)]">
                  Ready to Invest?
                </p>
                <Link
                  href="/investment"
                  className="inline-flex w-full max-w-sm shrink-0 items-center justify-center rounded-md bg-[#3aaacf] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-[#2f95b6] touch-manipulation sm:w-auto font-[family-name:var(--font-manrope)]"
                >
                  Get Investment Opportunities
                </Link>
              </div>
            ) : (
              <div className="mt-6 flex w-full flex-col items-center gap-4 text-center">
                <p className="text-xl font-normal leading-snug tracking-wide text-white sm:text-2xl md:text-[1.65rem] font-[family-name:var(--font-cormorant-garamond)]">
                  Ready to Buy? Explore Our Listing
                </p>
                {/* <p className="max-w-xl text-sm leading-relaxed text-white/85 font-[family-name:var(--font-karla)] sm:text-base">
                  Explore our curated listings across the Shore and discover your next home.
                </p> */}
                <a
                  href={`#${LISTINGS_ANCHOR_ID}`}
                  onClick={scrollToOurListings}
                  className="inline-flex w-full max-w-sm items-center justify-center rounded-md bg-[#3aaacf] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-[#2f95b6] touch-manipulation sm:w-auto font-[family-name:var(--font-manrope)]"
                >
                  View Our Listings
                </a>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
