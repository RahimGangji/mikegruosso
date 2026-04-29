"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const soldProperties = [
  {
    id: 1,
    image: "/sold-list1.jpg",
    address: "24 Cedar Knoll Road",
    city: "Jackson, New Jersey 08527",
    price: "$1,575,000",
    beds: 5,
    baths: 4.5,
    sqft: 4200,
    listedWith: "The Gruosso Group",
  },
  {
    id: 2,
    image: "/sold-list2.jpg",
    address: "5 Kensington Court",
    city: "Jackson, New Jersey 08527",
    price: "$1,461,000",
    beds: 4,
    baths: 3,
    sqft: 2700,
    listedWith: "The Gruosso Group",
  },
  {    id: 3,
    image: "/sold-list3.jpg",
    address: "366-368 Beecroft Place",
    city: "Oakhurst, New Jersey 07755",
    price: "$1,350,500",
    beds: 4,
    baths: 3,
    sqft: 2920,
    listedWith: "The Gruosso Group",
  },
  {
    id: 4,
    image: "/sold-list4.jpg",
    address: "24 Oxford Drive",
    city: "Ocean Twp, New Jersey 07712",
    price: "$1,300,000",
    beds: 3,
    baths: 2.5,
    sqft: 2480,
    listedWith: "The Gruosso Group",
  },
  {
    id: 5,
    image: "/sold-list5.jpg",
    address: "5 Kaiser Court",
    city: "Morganville, New Jersey 07751",
    price: "$1,250,000",
    beds: 3,
    baths: 2,
    sqft: 2140,
    listedWith: "The Gruosso Group",
  },
  {
    id: 6,
    image: "/sold-list6.jpg",
    address: "33 Willow Drive",
    city: "Little Silver, New Jersey 07739",
    price: "$1,250,000",
    beds: 3,
    baths: 3,
    sqft: 2280,
    listedWith: "The Gruosso Group",
  },
  {
    id: 7,
    image: "/sold-list7.jpg",
    address: "269 Teakwood Drive",
    city: "Bayville, New Jersey 08721",
    price: "$1,225,000",
    beds: 4,
    baths: 2.5,
    sqft: 2650,
    listedWith: "The Gruosso Group",
  },
  {
    id: 8,
    image: "/sold-list8.jpg",
    address: "17 Woods End Road ",
    city: "Colts Neck, New Jersey 07722",
    price: "$1,225,000",
    beds: 5,
    baths: 4,
    sqft: 3950,
    listedWith: "The Gruosso Group",
  },
];

export default function SoldPropertiesSection() {
  return (
    <section className="w-full bg-white py-20">
      <style>{`
        .sold-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .sold-swiper .swiper-pagination-bullet-active {
          background: #3aaacf;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-black" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] font-[family-name:var(--font-manrope)] text-black">
            Success Stories
          </span>
        </div>

        {/* Heading + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] text-black">
            Our Properties Sold
          </h2>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="sold-prev w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="sold-next w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, A11y]}
          navigation={{ prevEl: ".sold-prev", nextEl: ".sold-next" }}
          pagination={{ clickable: true, dynamicBullets: false }}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="sold-swiper !pb-12"
        >
          {soldProperties.map((listing) => (
            <SwiperSlide key={listing.id}>
              <div className="overflow-hidden bg-white">
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={`Sold: ${listing.address}, ${listing.city}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white bg-[#3aaacf]/90 font-[family-name:var(--font-manrope)]">
                    Sold
                  </span>
                </div>

                <div className="p-5 pl-0 flex flex-col gap-1">
                  <p
                    className="text-xl sm:text-[15px] font-bold sm:font-normal sm:tracking-[3.5px] sm:uppercase tracking-tight font-[family-name:var(--font-manrope)]"
                    style={{ color: "#000000" }}
                  >
                    {listing.price}
                  </p>

                  <p className="text-base sm:text-[19px] font-normal leading-snug text-gray-900 font-[family-name:var(--font-arapey)] sm:tracking-[1.4px] sm:pt-2">
                    {listing.address}, {listing.city}
                  </p>

                  <p
                    className="text-[15px] font-light tracking-[0.3px] text-gray-500 font-[family-name:var(--font-karla)] mt-0.5 sm:mt-0 sm:pt-2"
                    style={{ color: "#000000" }}
                  >
                    {listing.beds} BD&nbsp;|&nbsp;{listing.baths} BA&nbsp;|&nbsp;{listing.sqft.toLocaleString()} SQFT
                  </p>

                  <p
                    className="text-[15px] font-light tracking-[0.28px] text-[#000000] font-[family-name:var(--font-karla)] mt-1 sm:mt-0 sm:pt-2"
                    style={{ color: "#000000" }}
                  >
                    Sold With {listing.listedWith}
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
