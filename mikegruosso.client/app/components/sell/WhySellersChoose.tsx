import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";

const sellerBenefits = [
  "Professional photography & cinematic video tours",
  "Targeted social media advertising campaigns",
  "Full MLS exposure via IDX Broker",
  "Expert staging & renovation advice",
  "Proven negotiation - we get the highest price",
  "Bilingual service: English, Italian & Spanish",
  "16+ years of NJ market expertise",
  "NJAR Platinum Circle of Excellence '08-'23",
];

export default function WhySellersChoose() {
  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-24">
      <Image
        src="/real-estate-property.avif"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={BLUR_PLACEHOLDER}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="text-[30px] lg:text-[36px] font-normal leading-tight tracking-wide text-white mb-8 font-[family-name:var(--font-cormorant-garamond)]">
              Why Sellers Choose The Gruosso Group
            </h2>

            <div className="flex flex-col gap-6 text-[15px] leading-relaxed text-white/85 font-[family-name:var(--font-karla)]">
              <p>
                When you list with The Gruosso Group, you&apos;re not just
                getting an agent - you&apos;re getting the full power of a
                marketing machine. From professional photography and cinematic
                video tours to targeted social media campaigns and MLS exposure,
                we ensure every listing receives maximum attention from
                qualified buyers.
              </p>

              <p>
                Michael Gruosso&apos;s deep renovation expertise means he can
                advise on cost-effective improvements that dramatically increase
                your sale price. Combined with sharp negotiation skills refined
                over 16+ years, we don&apos;t just list your home - we fight for
                every dollar.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <ul className="flex flex-col">
              {sellerBenefits.map((benefit, index) => (
                <li
                  key={benefit}
                  className="flex gap-4 border-b border-white/15 py-4 text-[15px] leading-relaxed text-white font-[family-name:var(--font-karla)]"
                >
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#3aaacf] text-xs font-semibold leading-none text-[#3aaacf] font-[family-name:var(--font-manrope)]"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
