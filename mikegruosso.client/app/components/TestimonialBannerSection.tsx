"use client";

import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { testimonials } from "./Testimonials";

export default function TestimonialBannerSection() {
  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center overflow-hidden py-16 sm:py-20 md:py-24">
      <Image
        src="/cta-section-bg.avif"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/72" aria-hidden />

      <style>{`
        .testimonial-banner-swiper {
          width: 100%;
        }
        .testimonial-banner-swiper .swiper-pagination {
          position: relative;
          margin-top: 2.5rem;
        }
        .testimonial-banner-swiper .swiper-pagination-bullet {
          width: 2rem;
          height: 2px;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.45);
          opacity: 1;
          margin: 0 5px !important;
          transition: background 0.2s ease, height 0.2s ease, width 0.2s ease;
        }
        .testimonial-banner-swiper .swiper-pagination-bullet-active {
          background: #ffffff;
          height: 3px;
          width: 2.5rem;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8">
        <Swiper
          modules={[Pagination, A11y]}
          pagination={{ clickable: true, dynamicBullets: false }}
          slidesPerView={1}
          spaceBetween={0}
          className="testimonial-banner-swiper !pb-2"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <div className="text-center">
                <blockquote className="text-white text-xl sm:text-2xl md:text-[1.65rem] leading-normal font-normal font-[family-name:var(--font-arapey)] tracking-wide">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p className="mt-8 text-white/75 text-sm font-[family-name:var(--font-karla)]">
                  — {t.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
