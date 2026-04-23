"use client";

import { useState } from "react";

const tabs = ["Buy", "Sell", "Invest"] as const;
type Tab = (typeof tabs)[number];

const placeholders: Record<Tab, string> = {
  Buy: "Search by city, neighborhood, or ZIP code...",
  Sell: "Enter your property address...",
  Invest: "Enter market or property type...",
};

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
        src="/herosection-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Content — normal flow so all controls stay inside the viewport on mobile */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full max-w-3xl flex flex-col items-center text-center">

          {/* Tagline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
            Unlocking the Best of Monmouth &amp; Ocean County.
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
            Whether it&apos;s a luxury waterfront home or a strategic commercial
            investment, The Gruosso Group delivers expert pricing, strategic
            marketing, and fast closings.
          </p>

          {/* Tab Card */}
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleTabChange(tab)}
                  className={`flex-1 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 touch-manipulation ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  style={
                    activeTab === tab
                      ? { backgroundColor: "#15234b", color: "#fff" }
                      : {}
                  }
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholders[activeTab]}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#15234b] transition"
                />
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 whitespace-nowrap touch-manipulation"
                  style={{ backgroundColor: "#15234b" }}
                >
                  {activeTab === "Buy"
                    ? "Search Homes"
                    : activeTab === "Sell"
                    ? "Get My Value"
                    : "Explore Deals"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
