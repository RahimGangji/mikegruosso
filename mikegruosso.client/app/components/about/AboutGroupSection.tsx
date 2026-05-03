import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";

export default function AboutGroupSection() {
  return (
    <section className="w-full bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <div className="relative w-full h-72 sm:h-96 lg:h-[380px] overflow-hidden order-2 lg:order-1">
            <Image
              src="/mike-about.jpeg"
              alt="About The Gruosso Group"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px w-8 bg-[#3aaacf]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] font-[family-name:var(--font-manrope)] text-[#3aaacf]">
                Who We Are
              </span>
            </div>

            <h2 className="text-[36px] font-normal leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] text-[#161f2d] mb-6">
              About The Gruosso Group
            </h2>

            <div className="w-12 h-px bg-[#3aaacf] mb-8" />

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-[family-name:var(--font-karla)]">
              The Gruosso Group is a trusted real estate team serving Monmouth County,
              Ocean County, and the Jersey Shore. With 1,000+ closed transactions and
              20+ years of experience, our team helps buyers, sellers, and investors
              make smart real estate decisions.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
