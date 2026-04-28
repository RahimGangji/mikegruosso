"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const areas = [
  {
    name: "Red Bank",
    county: "Monmouth County",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1600&q=85&auto=format&fit=crop",
  },
  {
    name: "Middletown",
    county: "Monmouth County",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=85&auto=format&fit=crop",
  },
  {
    name: "Shrewsbury",
    county: "Monmouth County",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=85&auto=format&fit=crop",
  },
  {
    name: "Freehold",
    county: "Monmouth County",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=85&auto=format&fit=crop",
  },
  {
    name: "Tinton Falls",
    county: "Monmouth County",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&auto=format&fit=crop",
  },
  {
    name: "Jackson",
    county: "Ocean County",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=85&auto=format&fit=crop",
  },
  {
    name: "Manalapan",
    county: "Monmouth County",
    image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=1600&q=85&auto=format&fit=crop",
  },
  {
    name: "Colts Neck",
    county: "Monmouth County",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=85&auto=format&fit=crop",
  },
];

export default function OurAreas() {
  return (
    <section className="w-full bg-white py-20">
      <style>{`
        .areas-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .areas-swiper .swiper-pagination-bullet-active {
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
            Where We Work
          </span>
        </div>

        {/* Heading + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] text-black">
            Our Areas
          </h2>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              className="areas-prev w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center transition-all duration-200 hover:bg-[#3aaacf] hover:text-white"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="areas-next w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center transition-all duration-200 hover:bg-[#3aaacf] hover:text-white"
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
          navigation={{ prevEl: ".areas-prev", nextEl: ".areas-next" }}
          pagination={{ clickable: true, dynamicBullets: false }}
          spaceBetween={4}
          breakpoints={{
            0:    { slidesPerView: 1.2 },
            500:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="areas-swiper !pb-12"
        >
          {areas.map((area) => (
            <SwiperSlide key={area.name}>
              <div className="group relative h-[360px] sm:h-[400px] overflow-hidden cursor-pointer">

                <Image
                  src={area.image}
                  alt={`${area.name}, ${area.county}`}
                  fill
                  quality={90}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 500px) 90vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Bottom gradient for text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-white text-2xl sm:text-3xl font-normal leading-tight font-[family-name:var(--font-cormorant-garamond)]">
                    {area.name}
                  </p>
                  <p className="text-white/80 text-xs sm:text-sm uppercase tracking-[0.18em] mt-1.5 font-[family-name:var(--font-manrope)]">
                    {area.county}
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
