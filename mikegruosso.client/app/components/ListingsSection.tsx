"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const listings = [
  { id: 1, image: "/list-img-1.jpg", address: "2068 Route 130 Florence",        city: "New Jersey 08518", price: "$2,750,000" },
  { id: 2, image: "/list-img-2.jpg", address: "16 Robertsville Road",      city: "Freehold New Jersey 07728", price: "$2,200,000" },
  { id: 3, image: "/list-img-3.jpg", address: "245-249 Verona Avenue Newark",        city: "New Jersey 07104", price: "$1,999,999" },
  { id: 4, image: "/list-img-4.jpg", address: "210 Pine Brook Road",           city: "Manalapan, New Jersey 07726", price: "$999,999" },
  { id: 5, image: "/list-img-5.jpg", address: "261 State Route 34 ",    city: "Colts Neck, New Jersey 07722", price: "$849,000"   },
  { id: 6, image: "/list-img-6.jpg", address: "0 Adelphia-Farmingdale Road",    city: "Farmingdale, New Jersey 07727", price: "$799,900" },
  { id: 7, image: "/list-img-7.jpg", address: "0 Us 130",   city: "Cranbury Twp, New Jersey", price: "$499,900" },
  { id: 8, image: "/list-img-8.jpg", address: "7 Joyce Court", city: "Tinton Falls, New Jersey 07724", price: "$499,900" },
  { id: 9, image: "/list-img-9.jpg", address: "0 Route 9",     city: "Howell, New Jersey 07731", price: "$350,000" },
];

export default function ListingsSection() {
  return (
    <section className="w-full bg-[#f7f8fb] py-20">
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
          <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "#15234b" }}>
            Our Listings
          </span>
        </div>

        {/* Heading + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight" style={{ color: "#15234b" }}>
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
          }}
          className="listings-swiper !pb-12"
        >
          {listings.map((listing) => (
            <SwiperSlide key={listing.id}>
              <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">

                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={listing.address}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Price */}
                  <p className="text-xl font-extrabold mb-2" style={{ color: "#15234b" }}>
                    {listing.price}
                  </p>

                  {/* Address */}
                  <p className="text-sm font-semibold text-gray-800 leading-snug">
                    {listing.address}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 mb-4">{listing.city}</p>

                  {/* Divider */}
                  <div className="border-t border-gray-100 pt-4">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 group-hover:underline"
                      style={{ color: "#15234b" }}
                    >
                      View Details
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
