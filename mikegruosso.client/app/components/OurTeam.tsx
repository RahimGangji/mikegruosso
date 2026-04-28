"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const team = [
  { name: "Michael Gruosso", role: "Founder &  Broker", image: "/mike-founder.jpeg"          },
  { name: "Jaden Hudson",   role: "Marketing Specialist",       image: "/jaden-marketing.jpeg"       },
  { name: "GianLuca Gruosso",   role: "Lead Sales Agent",            image: "/gian-sales.jpeg"            },
  { name: "Julianna Gruosso",         role: "Sales Associate",            image: "/julian-sale-associate.jpeg" },
  { name: " Daniel Mullen",         role: "Sales Associate",            image: "/daniel-sales.jpeg"          },
  { name: "Erika Gaetano",          role: "Sales Associate",            image: "/erika-sales.jpeg"           },

 
];

export default function OurTeam() {
  return (
    <section className="w-full bg-white py-20">
      <style>{`
        .team-swiper .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .team-swiper .swiper-pagination-bullet-active {
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
            Our Team
          </span>
        </div>

        {/* Heading + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] text-black">
              The People Behind Every Deal.
            </h2>
            <p className="text-gray-500 text-base mt-3 max-w-xl leading-relaxed font-[family-name:var(--font-karla)]">
              Our team of dedicated professionals brings local expertise, market insight, and a passion for results so every client feels like the only client.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              className="team-prev w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center transition-all duration-200 hover:bg-[#3aaacf] hover:text-white"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="team-next w-11 h-11 rounded-full border-2 border-[#3aaacf] text-[#3aaacf] flex items-center justify-center transition-all duration-200 hover:bg-[#3aaacf] hover:text-white"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Swiper */}
        <div className="mt-10">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation={{ prevEl: ".team-prev", nextEl: ".team-next" }}
            pagination={{ clickable: true, dynamicBullets: false }}
            spaceBetween={24}
            breakpoints={{
              0:    { slidesPerView: 1 },
              540:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="team-swiper !pb-12"
          >
            {team.map((member) => (
              <SwiperSlide key={member.name}>
                <div className="group cursor-pointer">

                  {/* Photo */}
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 540px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3aaacf]/70 via-transparent to-transparent" />

                    {/* Name overlay on image bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white font-normal text-lg leading-tight font-[family-name:var(--font-arapey)]">
                        {member.name}
                      </p>
                      <p className="text-white/75 text-xs mt-0.5 tracking-wide font-[family-name:var(--font-karla)]">
                        {member.role}
                      </p>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
