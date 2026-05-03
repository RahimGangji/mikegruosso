"use client";

import Link from "next/link";
import { useState } from "react";

const tabs = ["Buy", "Sell", "Invest"] as const;
type Tab = (typeof tabs)[number];

const searchPlaceholder = "Search by city, county, or zip";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Buy");
  const [inputValue, setInputValue] = useState("");

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setInputValue("");
  };

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
          Helping Homeowners, Investors & Businesses
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-white font-bold max-w-2xl mb-10 leading-relaxed tracking-wide font-[family-name:var(--font-arapey)]">
          From Generation to Generation
          </p>

          {/* Tab Card — transparent style */}
          <div className="w-full max-w-2xl">

            {/* Tabs */}
            <div className="flex gap-10 mb-0 px-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
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

            {/* Buy: search · Sell / Invest: message + CTA */}
            {activeTab === "Sell" ? (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-8 w-full text-left">
                <p className="text-white text-xl sm:text-2xl md:text-[1.65rem] leading-snug font-normal tracking-wide font-[family-name:var(--font-cormorant-garamond)]">
                  Ready to sell? We&apos;re ready to help
                </p>
                <Link
                  href="/sell"
                  className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center rounded-md bg-[#3aaacf] hover:bg-[#2f95b6] px-8 py-3.5 text-sm font-semibold text-white shadow-lg tracking-wide font-[family-name:var(--font-manrope)] transition-colors duration-200 touch-manipulation text-center"
                >
                  Request Home Value
                </Link>
              </div>
            ) : activeTab === "Invest" ? (
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 sm:gap-8 w-full text-left">
                <p className="text-white text-xl sm:text-2xl md:text-[1.65rem] leading-snug font-normal tracking-wide font-[family-name:var(--font-cormorant-garamond)]">
                  Ready to Invest?
                </p>
                <Link
                  href="/investment"
                  className="inline-flex w-full sm:w-auto shrink-0 items-center justify-center rounded-md bg-[#3aaacf] hover:bg-[#2f95b6] px-8 py-3.5 text-sm font-semibold text-white shadow-lg tracking-wide font-[family-name:var(--font-manrope)] transition-colors duration-200 touch-manipulation text-center"
                >
                  Get Investment Opportunities
                </Link>
              </div>
            ) : (
              <div className="flex items-center bg-white/95 overflow-hidden shadow-2xl mt-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="flex-1 px-5 py-4 text-sm text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none font-[family-name:var(--font-manrope)]"
                />
                <button
                  type="button"
                  className="flex-shrink-0 px-5 py-4 flex items-center justify-center touch-manipulation"
                  style={{ color: "#3aaacf" }}
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
