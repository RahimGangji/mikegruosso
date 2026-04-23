"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What areas do you serve?",
    a: "The Gruosso Group specializes in Monmouth and Ocean County, NJ — including Red Bank, Middletown, Shrewsbury, Jackson, Rumson, Asbury Park, Point Pleasant, and surrounding Jersey Shore communities.",
  },
  {
    q: "How do I know what my home is worth?",
    a: "We offer a free, no-obligation home evaluation. Our team analyzes recent comparable sales, current market conditions, and your property's unique features to give you an accurate market value.",
  },
  {
    q: "How long does it take to sell a home?",
    a: "With our strategic pricing and marketing approach, most of our listings sell faster than the local market average. Timelines vary by property type and market conditions, but we keep you informed every step of the way.",
  },
  {
    q: "Do you work with first-time home buyers?",
    a: "Absolutely. We guide first-time buyers through every stage of the process — from mortgage pre-approval to closing day — making sure you feel confident and informed at every decision point.",
  },
  {
    q: "What types of properties do you specialize in?",
    a: "We handle residential, commercial, and investment properties. Our specialties include luxury homes, waterfront properties, multi-family units, and commercial real estate throughout the Jersey Shore region.",
  },
  {
    q: "How does your marketing strategy work?",
    a: "We use technology-driven marketing that includes professional photography, 3D virtual tours, targeted social media campaigns, MLS exposure, and our established buyer network to maximize your property's visibility.",
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="w-full bg-[#f7f8fb] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left — sticky label */}
          <div className="lg:w-2/5 flex-shrink-0 lg:self-start lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-4">
              <span className="block h-px w-8 bg-[#15234b]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "#15234b" }}>
                FAQs
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4" style={{ color: "#15234b" }}>
              Got Questions? We Have Answers.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Everything you need to know about buying, selling, or investing with The Gruosso Group along the Jersey Shore.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="lg:w-3/5 flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-[#15234b]/30 shadow-sm" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`text-sm font-semibold leading-snug ${isOpen ? "" : "text-gray-800"}`}
                      style={isOpen ? { color: "#15234b" } : {}}>
                      {faq.q}
                    </span>
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isOpen ? "#15234b" : "#f1f5f9",
                        color: isOpen ? "#fff" : "#64748b",
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
