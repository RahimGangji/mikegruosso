"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const listings = [
  { id: 1, image: "/list-img-1.jpg", address: "2068 Route 130", city: "Florence, NJ 08518",             price: "$2,750,000", beds: 6,  baths: 4,   sqft: 5800, listedWith: "Gruosso Realty Group, LLC" },
  { id: 2, image: "/list-img-2.jpg", address: "16 Robertsville Road", city: "Freehold, NJ 07728",       price: "$2,200,000", beds: 5,  baths: 3.5, sqft: 4920, listedWith: "Gruosso Realty Group, LLC" },
  { id: 3, image: "/list-img-3.jpg", address: "245-249 Verona Avenue", city: "Newark, NJ 07104",        price: "$1,999,999", beds: 8,  baths: 6,   sqft: 6100, listedWith: "O'Brien Realty, LLC"        },
  { id: 4, image: "/list-img-4.jpg", address: "210 Pine Brook Road", city: "Manalapan, NJ 07726",       price: "$999,999",   beds: 4,  baths: 3,   sqft: 3750, listedWith: "Gruosso Realty Group, LLC" },
  { id: 5, image: "/list-img-5.jpg", address: "261 State Route 34", city: "Colts Neck, NJ 07722",       price: "$849,000",   beds: 4,  baths: 2.5, sqft: 3200, listedWith: "Shore Realty NJ, LLC"       },
  { id: 6, image: "/list-img-6.jpg", address: "0 Adelphia-Farmingdale Rd", city: "Farmingdale, NJ 07727", price: "$799,900", beds: 3,  baths: 2,   sqft: 2640, listedWith: "Gruosso Realty Group, LLC" },
  { id: 7, image: "/list-img-7.jpg", address: "0 US Route 130", city: "Cranbury Twp, NJ 08512",         price: "$499,900",   beds: 3,  baths: 1.5, sqft: 1980, listedWith: "Garden State Realty, LLC"  },
  { id: 8, image: "/list-img-8.jpg", address: "7 Joyce Court", city: "Tinton Falls, NJ 07724",          price: "$499,900",   beds: 3,  baths: 2,   sqft: 2100, listedWith: "Shore Realty NJ, LLC"       },
  { id: 9, image: "/list-img-9.jpg", address: "0 Route 9", city: "Howell, NJ 07731",                    price: "$350,000",   beds: 2,  baths: 1,   sqft: 1340, listedWith: "Gruosso Realty Group, LLC" },
];

export default function ListingsSection() {
  return (
    <section className="w-full bg-white py-20">
      <style>{`
        .listings-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .listings-swiper .swiper-pagination-bullet-active {
          background: #15234b;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-[#15234b]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] font-[family-name:var(--font-manrope)]" style={{ color: "#15234b" }}>
            Our Listings
          </span>
        </div>

        {/* Heading + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide font-[family-name:var(--font-arapey)]" style={{ color: "#15234b" }}>
            Check out our Newest Listings!
          </h2>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="listings-prev w-11 h-11 rounded-full border-2 border-[#15234b] text-[#15234b] flex items-center justify-center transition-all duration-200 hover:bg-[#15234b] hover:text-white"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="listings-next w-11 h-11 rounded-full border-2 border-[#15234b] text-[#15234b] flex items-center justify-center transition-all duration-200 hover:bg-[#15234b] hover:text-white"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
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
          {listings.map((listing) => (
            <SwiperSlide key={listing.id}>
              <div className="overflow-hidden bg-white cursor-pointer">

                {/* Image */}
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={listing.address}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col gap-1">

                  {/* Price */}
                  <p
                    className="text-xl font-bold tracking-tight font-[family-name:var(--font-manrope)]"
                    style={{ color: "#15234b" }}
                  >
                    {listing.price}
                  </p>

                  {/* Address */}
                  <p className="text-base font-normal leading-snug text-gray-900 font-[family-name:var(--font-arapey)]">
                    {listing.address}, {listing.city}
                  </p>

                  {/* Stats */}
                  <p className="text-xs text-gray-500 font-[family-name:var(--font-manrope)] mt-0.5">
                    {listing.beds} BD&nbsp;|&nbsp;{listing.baths} BA&nbsp;|&nbsp;{listing.sqft.toLocaleString()} SQFT
                  </p>

                  {/* Listed with */}
                  <p className="text-xs text-gray-400 font-[family-name:var(--font-manrope)] mt-1">
                    Listed With {listing.listedWith}
                  </p>

                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
