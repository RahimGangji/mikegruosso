"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";
import { IDXListing, formatListingPrice } from "@/app/lib/idxbroker";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ─── Types ─────────────────────────────────────────────── */
interface NormalizedListing {
  id: string;
  image: string;
  address: string;
  city: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  listedWith: string;
  url: string;
}

/* ─── Fallback listings ──────────────────────────────────── */
const FALLBACK_LISTINGS: NormalizedListing[] = [
  { id: "2", image: "/list-img-2.jpg", address: "16 Robertsville Road",      city: "Freehold, NJ 07728",    price: "$2,200,000", beds: "5", baths: "3.5", sqft: "4920", listedWith: "Gruosso Realty Group, LLC", url: "" },
  { id: "3", image: "/list-img-3.jpg", address: "245-249 Verona Avenue",     city: "Newark, NJ 07104",       price: "$1,999,999", beds: "8", baths: "6",   sqft: "6100", listedWith: "O'Brien Realty, LLC",        url: "" },
  { id: "4", image: "/list-img-4.jpg", address: "210 Pine Brook Road",       city: "Manalapan, NJ 07726",    price: "$999,999",   beds: "4", baths: "3",   sqft: "3750", listedWith: "Gruosso Realty Group, LLC", url: "" },
  { id: "5", image: "/list-img-5.jpg", address: "261 State Route 34",        city: "Colts Neck, NJ 07722",   price: "$849,000",   beds: "4", baths: "2.5", sqft: "3200", listedWith: "Shore Realty NJ, LLC",       url: "" },
  { id: "6", image: "/list-img-6.jpg", address: "0 Adelphia-Farmingdale Rd", city: "Farmingdale, NJ 07727",  price: "$799,900",   beds: "3", baths: "2",   sqft: "2640", listedWith: "Gruosso Realty Group, LLC", url: "" },
  { id: "7", image: "/list-img-7.jpg", address: "0 US Route 130",            city: "Cranbury Twp, NJ 08512", price: "$499,900",   beds: "3", baths: "1.5", sqft: "1980", listedWith: "Garden State Realty, LLC",  url: "" },
  { id: "8", image: "/list-img-8.jpg", address: "7 Joyce Court",             city: "Tinton Falls, NJ 07724", price: "$499,900",   beds: "3", baths: "2",   sqft: "2100", listedWith: "Shore Realty NJ, LLC",       url: "" },
  { id: "9", image: "/list-img-9.jpg", address: "0 Route 9",                 city: "Howell, NJ 07731",       price: "$350,000",   beds: "2", baths: "1",   sqft: "1340", listedWith: "Gruosso Realty Group, LLC", url: "" },
];

function normalize(listings: IDXListing[]): NormalizedListing[] {
  return listings.map((l) => ({
    id: l.listingID,
    image: l.photos[0] ?? "/list-img-1.jpg",
    address: l.address,
    city: `${l.cityName}, ${l.stateAbbr} ${l.zipcode}`.trim(),
    price: formatListingPrice(l.listPrice),
    beds: l.bedrooms,
    baths: l.totalBaths,
    sqft: l.sqFt,
    listedWith: "Gruosso Realty Group, LLC",
    url: l.listingUrl ?? "",
  }));
}

/* ─── Modal ─────────────────────────────────────────────── */
function ListingModal({ listing, onClose }: { listing: NormalizedListing; onClose: () => void }) {

  /* lock scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ESC to close */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const sqftNum       = Number(listing.sqft);
  const sqftFormatted = listing.sqft && sqftNum > 0 ? sqftNum.toLocaleString() : "—";

  const details = [
    { label: "Price",       value: listing.price  || "—" },
    { label: "Bedrooms",    value: listing.beds   || "—" },
    { label: "Total Baths", value: listing.baths  || "—" },
    { label: "Sq Ft",       value: sqftFormatted       },
    { label: "Listed With", value: listing.listedWith  },
  ];

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ zIndex: 99999 }}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl shadow-2xl overflow-y-auto max-h-[93dvh] sm:max-h-[88vh]">

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-500 hover:text-[#161f2d] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[16/9] bg-gray-100 overflow-hidden">
          {listing.image.startsWith("http") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={listing.image} alt={listing.address} className="w-full h-full object-cover" />
          ) : (
            <Image
              src={listing.image}
              alt={listing.address}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 512px"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
            />
          )}
          {/* Price badge */}
          <div className="absolute bottom-3 left-3 bg-[#161f2d]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg">
            <span className="text-base font-semibold tracking-wide font-[family-name:var(--font-manrope)]">
              {listing.price}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-7 pt-5 pb-7">

          {/* Address */}
          <h3 className="text-2xl sm:text-[1.65rem] font-normal leading-snug text-[#161f2d] font-[family-name:var(--font-cormorant-garamond)]">
            {listing.address}
          </h3>

          {/* Details rows */}
          <div className="mt-4 divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
            {details.map((r) => (
              <div key={r.label} className="flex items-center justify-between px-4 py-2.5 bg-white">
                <span className="text-xs text-gray-500 font-[family-name:var(--font-karla)]">{r.label}</span>
                <span className="text-sm font-semibold text-[#161f2d] font-[family-name:var(--font-manrope)]">{r.value}</span>
              </div>
            ))}
          </div>

          {/* Location */}
          <div className="mt-5">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3aaacf] mb-2 font-[family-name:var(--font-manrope)]">
              Location
            </h4>
            <p className="text-sm text-gray-700 font-[family-name:var(--font-karla)]">{listing.address}</p>
            <p className="text-sm text-gray-500 font-[family-name:var(--font-karla)]">{listing.city}</p>
          </div>

          {/* CTA */}
          <div className="mt-6">
            {listing.url ? (
              <a
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#3aaacf] px-6 py-3.5 text-sm font-semibold text-white shadow transition-all duration-200 hover:bg-[#2f95b6] font-[family-name:var(--font-manrope)]"
              >
                View Listing
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#3aaacf] px-6 py-3.5 text-sm font-semibold text-white shadow transition-all duration-200 hover:bg-[#2f95b6] font-[family-name:var(--font-manrope)]"
              >
                Contact Us
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
interface Props {
  listings?: IDXListing[];
}

export default function ListingsSection({ listings }: Props) {
  const items: NormalizedListing[] = (
    listings && listings.length > 0 ? normalize(listings) : FALLBACK_LISTINGS
  ).slice(0, 8);

  const [selected, setSelected] = useState<NormalizedListing | null>(null);
  const closeModal              = useCallback(() => setSelected(null), []);

  return (
    <section id="our-listings" className="w-full bg-white py-20 relative z-0 scroll-mt-32 md:scroll-mt-36">
      <style>{`
        .listings-swiper .swiper-pagination-bullet {
          background: #cbd5e1; opacity: 1; width: 8px; height: 8px;
        }
        .listings-swiper .swiper-pagination-bullet-active {
          background: #3aaacf; width: 24px; border-radius: 4px;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 640px) {
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(16px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        }
        [role="dialog"] > div:last-child { animation: modalIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-[#3aaacf]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] font-[family-name:var(--font-manrope)] text-[#3aaacf]">
            Our Listings
          </span>
        </div>

        {/* Heading + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] text-black">
            Check out our Newest Listings!
          </h2>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="listings-prev w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center transition-all duration-200 hover:bg-[#3aaacf] hover:text-white" aria-label="Previous">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="listings-next w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center transition-all duration-200 hover:bg-[#3aaacf] hover:text-white" aria-label="Next">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          navigation={{ prevEl: ".listings-prev", nextEl: ".listings-next" }}
          pagination={{ clickable: true, dynamicBullets: false }}
          spaceBetween={24}
          breakpoints={{
            0:    { slidesPerView: 1 },
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="listings-swiper !pb-12"
        >
          {items.map((listing) => (
            <SwiperSlide key={listing.id}>
              <div
                className="overflow-hidden bg-white cursor-pointer group"
                onClick={() => setSelected(listing)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelected(listing)}
                aria-label={`View details for ${listing.address}`}
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  {listing.image.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={listing.image} alt={listing.address} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <Image
                      src={listing.image}
                      alt={listing.address}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                  )}
                </div>
                <div className="p-5 pl-0 flex flex-col gap-1">
                  <p className="text-xl sm:text-[15px] font-bold sm:font-normal sm:tracking-[3.5px] sm:uppercase tracking-tight font-[family-name:var(--font-manrope)] text-black">
                    {listing.price}
                  </p>
                  <p className="text-base sm:text-[19px] font-normal leading-snug text-gray-900 font-[family-name:var(--font-arapey)] sm:tracking-[1.4px] sm:pt-2">
                    {listing.address}, {listing.city}
                  </p>
                  <p className="text-[15px] font-light tracking-[0.3px] text-black font-[family-name:var(--font-karla)] mt-0.5 sm:mt-0 sm:pt-2">
                    {listing.beds} BD&nbsp;|&nbsp;{listing.baths} BA&nbsp;|&nbsp;{Number(listing.sqft) > 0 ? `${Number(listing.sqft).toLocaleString()} ` : ""}SQFT
                  </p>
                  <p className="text-[15px] font-light tracking-[0.28px] text-black font-[family-name:var(--font-karla)] mt-1 sm:mt-0 sm:pt-2">
                    Listed With {listing.listedWith}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View All */}
        <div className="flex justify-center mt-4">
          <Link
            href="/listings"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3aaacf] px-10 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#2f95b6] hover:-translate-y-0.5 hover:shadow-lg font-[family-name:var(--font-manrope)]"
          >
            View All Listings
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>

      {/* Portal — outside all stacking contexts */}
      {selected && createPortal(
        <ListingModal listing={selected} onClose={closeModal} />,
        document.body,
      )}
    </section>
  );
}
