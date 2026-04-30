import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";

export default function MissionSection() {
  return (
    <section className="w-full bg-[#161f2d] pt-32 pb-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px w-8 bg-[#3aaacf]" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] font-[family-name:var(--font-manrope)] text-[#3aaacf]">
                Our Mission
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-normal leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] text-white mb-6">
              New Jersey&apos;s Premier<br className="hidden sm:block" /> Real Estate Team
            </h1>

            <p className="text-white/65 text-base sm:text-lg leading-relaxed font-[family-name:var(--font-karla)] mb-12">
              The Gruosso Group at Keller Williams East Monmouth specializes in
              residential, commercial, and investment properties across Monmouth &amp;
              Ocean County, NJ. With over 20 years of experience, 1,000+
              transactions, and technology-driven marketing, we help you buy, sell,
              and invest with confidence.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-10">
              <div>
                <p className="text-3xl sm:text-4xl font-normal text-[#3aaacf] font-[family-name:var(--font-cormorant-garamond)]">
                  20+
                </p>
                <p className="text-white/50 text-[11px] uppercase tracking-[0.15em] mt-1.5 font-[family-name:var(--font-manrope)]">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-normal text-[#3aaacf] font-[family-name:var(--font-cormorant-garamond)]">
                  1,000+
                </p>
                <p className="text-white/50 text-[11px] uppercase tracking-[0.15em] mt-1.5 font-[family-name:var(--font-manrope)]">
                  Transactions
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-normal text-[#3aaacf] font-[family-name:var(--font-cormorant-garamond)]">
                  $27M+
                </p>
                <p className="text-white/50 text-[11px] uppercase tracking-[0.15em] mt-1.5 font-[family-name:var(--font-manrope)]">
                  Sales Last Year
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative w-full aspect-[4/5] overflow-hidden">
            <Image
              src="/mike-founder.jpeg"
              alt="Michael Gruosso — Founder &amp; Broker"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_PLACEHOLDER}
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#161f2d]/70 to-transparent pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
