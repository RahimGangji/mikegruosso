"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const types = [
  {
    title: "Retail",
    description:
      "Storefronts, anchored centers, and street level retail in walkable downtowns and shore town corridors with steady foot traffic and visibility.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9.75 4.5 4.5h15L21 9.75M3 9.75A2.25 2.25 0 0 0 5.25 12a2.25 2.25 0 0 0 2.25-2.25M3 9.75v9.75A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5V9.75m0 0A2.25 2.25 0 0 1 18.75 12 2.25 2.25 0 0 1 16.5 9.75m0 0A2.25 2.25 0 0 1 14.25 12 2.25 2.25 0 0 1 12 9.75m0 0A2.25 2.25 0 0 1 9.75 12 2.25 2.25 0 0 1 7.5 9.75M9 21v-6h6v6"
        />
      </svg>
    ),
  },
  {
    title: "Office",
    description:
      "Single tenant suites, multi tenant buildings, and executive workspaces sized for growing teams, professional services, and medical groups.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 21V5.25A1.5 1.5 0 0 1 5.25 3.75h13.5a1.5 1.5 0 0 1 1.5 1.5V21M3 21h18M8.25 7.5h1.5m-1.5 3h1.5m-1.5 3h1.5m4.5-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9.75 21v-3.75h4.5V21"
        />
      </svg>
    ),
  },
  {
    title: "Industrial",
    description:
      "Warehouses, flex space, and last mile logistics close to highways, ports, and population centers across Monmouth, Ocean, and beyond.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21V11l5-3v3l5-3v3l5-3v13H3Zm3-3h3m-3-3h3m6 3h3m-3-3h3m-3-3h3"
        />
      </svg>
    ),
  },
  {
    title: "Mixed-Use",
    description:
      "Combine retail or office on the ground floor with residential or hospitality above to diversify income and capture downtown demand.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21V8l9-5 9 5v13H3Zm5-7h2.5m3 0H16m-8 4h2.5m3 0H16M8 10h8M3 21h18"
        />
      </svg>
    ),
  },
  {
    title: "Land",
    description:
      "Raw and improved parcels suited for end users, holders, and 1031 exchanges, evaluated for zoning, access, utilities, and upside.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 18 9 12l4 4 8-8M3 21h18M14 8h7v7"
        />
      </svg>
    ),
  },
  {
    title: "Development Sites",
    description:
      "Infill lots, redevelopment opportunities, and entitled projects, paired with a network of architects, engineers, and capital partners to move fast.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21h18M5 21V8l4-2 4 2v13M13 21v-7l4-2 4 2v7M9 12h.01M9 16h.01M17 16h.01"
        />
      </svg>
    ),
  },
  {
    title: "Hospitality",
    description:
      "Boutique hotels, motels, inns, and event venues across the Jersey Shore, with seasonality models and operating data factored into pricing.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3H3v-3Zm0 3v4m18-4v4m0-4H3m18 0V8a4 4 0 0 0-4-4H8M6 10V8a3 3 0 0 1 3-3"
        />
      </svg>
    ),
  },
  {
    title: "Investment Properties",
    description:
      "Stabilized assets, value add plays, and net lease opportunities, underwritten with NOI, cap rates, and tenant strength front and center.",
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 17 9 11l4 4 8-8M21 7v5m0-5h-5M3 21h18"
        />
      </svg>
    ),
  },
];

export default function CommercialPropertyTypes() {
  return (
    <section className="w-full bg-white pt-8 sm:pt-10 pb-10 sm:pb-12">
      <style>{`
        .commercial-types-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .commercial-types-swiper .swiper-pagination-bullet-active {
          background: #3aaacf;
          width: 24px;
          border-radius: 4px;
        }
        /* Vertical separator that lives in the gutter between slides.
           Equal top/bottom so it's symmetric (vertically centered) regardless of slide height. */
        .commercial-types-swiper .commercial-type-slide::after {
          content: "";
          position: absolute;
          top: 24px;
          bottom: 24px;
          right: -24px;
          width: 1px;
          background-color: #3aaacf;
        }
        .commercial-types-swiper .swiper-wrapper {
          align-items: stretch;
        }
        .commercial-types-swiper .swiper-slide {
          height: auto;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-[#3aaacf]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3aaacf] font-[family-name:var(--font-manrope)]">
            Property Types
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-gray-900 mb-4 font-[family-name:var(--font-cormorant-garamond)]">
              Commercial Property Types We Cover
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-[family-name:var(--font-karla)]">
              Whether you&apos;re an owner user, investor, or developer, The
              Gruosso Group sources, evaluates, and negotiates across every
              major commercial asset class throughout New Jersey.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              className="commercial-types-prev w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center transition-all duration-200 hover:bg-[#3aaacf] hover:text-white"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="commercial-types-next w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center transition-all duration-200 hover:bg-[#3aaacf] hover:text-white"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          navigation={{
            prevEl: ".commercial-types-prev",
            nextEl: ".commercial-types-next",
          }}
          pagination={{ clickable: true }}
          spaceBetween={48}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="commercial-types-swiper !pb-12"
        >
          {types.map((type, i) => (
            <SwiperSlide
              key={type.title}
              className="commercial-type-slide relative"
            >
              <article className="group flex h-full flex-col pl-1 pr-1 sm:pr-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3aaacf] font-[family-name:var(--font-manrope)]">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="mt-5 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ring-[#3aaacf]/35 text-[#3aaacf] transition-colors duration-300 group-hover:bg-[#3aaacf] group-hover:text-white group-hover:ring-[#3aaacf]">
                  {type.icon}
                </span>

                <h3 className="mt-6 text-2xl sm:text-[26px] font-normal leading-snug text-gray-900 font-[family-name:var(--font-cormorant-garamond)]">
                  {type.title}
                </h3>

                <span className="mt-3 block h-px w-12 bg-[#3aaacf]/70 transition-all duration-300 group-hover:w-20" />

                <p className="mt-5 text-[14px] leading-relaxed text-gray-600 font-[family-name:var(--font-karla)]">
                  {type.description}
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
