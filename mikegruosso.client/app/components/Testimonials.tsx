"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Albert",
    quote:
      "Michael did an excellent job finding the particular house we was looking for, not to mention in a particular neighborhood. He was very patient with us and very knowledgeable in his field. We will be working with him and his team in the future. I would strongly recommend him to my family & friends.",
  },
  {
    name: "David",
    quote:
      "Where do I start - I called Mike because he had sold a home just down the street from our home. From our first conversation, he was GREAT! Always responsive and communicative he had a vast amount of knowledge of the RE market and my area in general. His team of Jayden and Luca are following in his footsteps and were great to work with as well! I would highly recommend Mike if you want personalized service from a professional who knows and understands the real estate market and more importantly, will put YOU and your needs first!",
  },
  {
    name: "Jennifer",
    quote:
      "Selling a home that has been in our family for over a 1/2 century was difficult. Thankfully, we partnered with Michael! We did this whole process from out of state and Michael was there to assist us with countless questions, facilitating inspections and services, sharing his amazing vetted contacts to help get us fully ready for market. He was compassionate, professional, and we cannot thank him and his team enough. THEY ARE TOP NOTCH - we HIGHLY recommend.",
  },
];

function StarRow() {
  return (
    <div className="flex gap-1 mb-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <svg
        className="w-8 h-8 mb-4 flex-shrink-0"
        style={{ color: "#15234b", opacity: 0.15 }}
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
      </svg>
      <StarRow />
      <p className="text-gray-600 text-sm leading-relaxed flex-1 line-clamp-5">{t.quote}</p>
      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: "#15234b" }}
        >
          {t.name[0]}
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: "#15234b" }}>{t.name}</p>
          <p className="text-xs text-gray-400">Verified Client</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="w-full bg-[#f7f8fb] py-20">
      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .testimonials-swiper .swiper-pagination-bullet-active {
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
            Client Testimonials
          </span>
        </div>

        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight" style={{ color: "#15234b" }}>
            What Our Clients Are Saying.
          </h2>
          <p className="text-gray-500 text-base mt-3 max-w-xl leading-relaxed">
            Real stories from real people our reputation is built one satisfied client at a time.
          </p>
        </div>

        {/* Mobile — Swiper carousel */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, A11y]}
            pagination={{ clickable: true, dynamicBullets: false }}
            spaceBetween={16}
            slidesPerView={1}
            className="testimonials-swiper !pb-10"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
                <TestimonialCard t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop — grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}
