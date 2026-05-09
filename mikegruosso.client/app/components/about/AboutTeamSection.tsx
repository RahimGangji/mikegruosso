"use client";

import { useState } from "react";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";

const team = [
  {
    name: "Michael Gruosso",
    role: "Founder & Broker",
    image: "/mike-founder.jpeg",
    points: [
      "Top 1% Realtor in New Jersey",
      "NJAR Circle of Excellence Award Winner (Platinum Level) '08–'23",
      "Over $27M in sales last year & hundreds of homes sold",
      "Renovation & construction expert",
      "Finance degree from DePaul University in Chicago",
      "Fluent in Italian & some Spanish",
    ],
  },{
    name: "GianLuca Gruosso",
    role: "Lead Sales Agent",
    image: "/luca-headshot.png",
    points: [
      "Real estate runs in the family",
      "Started in real estate marketing at 16",
      "Founded his own real estate marketing company",
      "Real Estate Pro, helping sellers get the highest and best price",
      "Excited to train the new realtors of the Gruosso Group",
    ],
  },
  {
    name: "Jaden Hudson",
    role: "Marketing Specialist",
    image: "/jaden-marketing.jpeg",
    points: [
      "Entered the industry in 2021 & found his passion in marketing",
      "Expert in filming commercials, building websites, and running ads",
      "Social media guru, helping listings stand out online",
      "Expert at finding buyers for sellers in Monmouth/Ocean County",
      "Dedicated to clients, always going the extra mile",
    ],
  },
  
  {
    name: "Julianna Gruosso",
    role: "Lead Sales Agent",
    image: "/julian-sale-associate.jpeg",
    points: [
      "Graduate of The College of New Jersey with a degree in Psychology & Italian",
      "Grew up in a family of realtors, immersed in real estate from the start",
      "Committed to serving clients with integrity & enthusiasm",
      "Combines market expertise with a personal touch to make dreams a reality",
      "Driven to create a positive impact in the lives of her clients",
    ],
  }, {
    name: "Erika Gaetano",
    role: "Sales Associate",
    image: "/erika-sales.jpeg",
    points: [
      "Lifelong Monmouth County resident with deep local knowledge",
      "11 years of customer service experience, prioritizing trust & communication",
      "Background in Finance & Business — from loan assistance to running a family shop",
      "Passionate about helping clients navigate the home buying & selling journey",
      "Committed to finding not just a house, but a place to call home",
    ],
  },
  {
    name: "Daniel Mullen",
    role: "Sales Associate",
    image: "/daniel-sales.jpeg",
    points: [
      "Grew up in Brooklyn — brings a unique urban & suburban market perspective",
      "A Monmouth & Middlesex County specialist with deep local knowledge",
      "Ambitious approach guarantees a tailored and successful experience",
      "Keen eye for opportunity with a commitment to seamless transactions",
      "Dedicated to helping you find your dream home",
    ],
  },
 
];

export default function AboutTeamSection() {
  const [tappedCard, setTappedCard] = useState<string | null>(null);

  const handleTap = (name: string) => {
    setTappedCard((prev) => (prev === name ? null : name));
  };

  return (
    <section className="w-full bg-[#f0f2f5] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">

        {/* Header — left aligned, eyebrow matches site pattern */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-8 bg-[#3aaacf]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] font-[family-name:var(--font-manrope)] text-[#3aaacf]">
              Meet the Team
            </span>
          </div>
          <h2 className="text-[36px] font-normal leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] text-[#161f2d] mb-4">
            The Gruosso Group Team
          </h2>
          <p className="text-gray-500 text-base max-w-2xl leading-relaxed font-[family-name:var(--font-karla)]">
            The powerhouse behind one of the most successful real estate teams in the market!
          </p>
        </div>

        {/* Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {team.map((member) => {
            const isTapped = tappedCard === member.name;
            return (
              <div
                key={member.name}
                className="group relative h-[500px] [perspective:1000px] cursor-pointer"
                onClick={() => handleTap(member.name)}
              >
                {/* Inner — flips on desktop hover OR mobile tap */}
                <div
                  className={`
                    relative w-full h-full [transform-style:preserve-3d]
                    transition-transform duration-700 [transition-timing-function:cubic-bezier(0.645,0.045,0.355,1.000)]
                    group-hover:[transform:rotateY(180deg)]
                    ${isTapped ? "[transform:rotateY(180deg)]" : ""}
                  `}
                >

                  {/* FRONT — photo */}
                  <div className="absolute inset-0 [backface-visibility:hidden] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      loading="lazy"
                    />
                    {/* Bottom gradient for name legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161f2d]/85 via-[#161f2d]/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white text-xl font-normal leading-tight font-[family-name:var(--font-arapey)]">
                        {member.name}
                      </p>
                      <p className="text-[#3aaacf] text-[11px] uppercase tracking-[0.16em] mt-1.5 font-[family-name:var(--font-manrope)]">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* BACK — light blue with bullet points */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#3aaacf] flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                      {/* Name & role */}
                      <p className="text-white text-2xl font-normal leading-tight font-[family-name:var(--font-cormorant-garamond)]">
                        {member.name}
                      </p>
                      <p className="text-white/75 text-[11px] uppercase tracking-[0.16em] mt-1.5 font-[family-name:var(--font-manrope)]">
                        {member.role}
                      </p>

                      {/* Divider */}
                      <div className="w-8 h-px bg-white/35 mt-4 mb-5" />

                      {/* Bullets */}
                      <ul className="space-y-3">
                        {member.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-white/90 font-[family-name:var(--font-karla)] leading-relaxed"
                          >
                            <span className="mt-[7px] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
