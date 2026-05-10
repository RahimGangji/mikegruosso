"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { testimonials } from "./Testimonials";

/** `f_mp4,q_auto` improves browser compatibility; omit poster so Safari does not stay on a static JPG if play is delayed. */
const BANNER_BG_VIDEO =
  "https://res.cloudinary.com/dd1e0iquz/video/upload/v1778435135/download_cqtv1l.mp4";

export default function TestimonialBannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const el = videoRef.current;
    if (!section || !el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "true");

    const tryPlay = () => {
      void el.play().catch(() => {});
    };

    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) tryPlay();
        }
      },
      { threshold: 0.05, rootMargin: "64px" },
    );
    io.observe(section);

    return () => {
      io.disconnect();
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-0 w-full min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-center overflow-hidden py-16 sm:py-20 md:py-24"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full min-h-full w-full object-cover pointer-events-none [&::-webkit-media-controls]:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden
      >
        <source src={BANNER_BG_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-[1] bg-black/72" aria-hidden />

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
