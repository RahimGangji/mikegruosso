import Image from "next/image";
import Link from "next/link";

export default function StartHomeSearch() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage:
          "url('/happy-familybg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/65" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* Left — Laptop device */}
          <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[420px] order-2 lg:order-1 lg:-ml-12 xl:-ml-20">
            <Image
              src="/laptop-device.png"
              alt="Property search on a laptop"
              fill
              className="object-contain object-center lg:object-left"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>

          {/* Right — Copy */}
          <div className="flex flex-col order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] mb-5">
              Start Your Home Search
            </h2>

            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white mb-7 font-[family-name:var(--font-manrope)]">
              Search for Homes Whereever Your Are
            </p>

            <div className="flex flex-col gap-5 text-white/85 text-sm sm:text-[15px] leading-relaxed font-[family-name:var(--font-karla)] mb-8">
              <p>
                When buying a home, start by making a wish list and setting a budget.
                Our team can help you choose a lender to get you pre-approved for a
                loan, and then you&apos;re ready to start house hunting. Search for your
                dream home from any device on our website. You can even compare walk
                scores, school ratings, and neighborhood demographics for different
                listings.
              </p>
              <p>
                You can search for the perfect property using this website on any device,
                including your desktop, laptop, tablet, or smartphone.
              </p>
            </div>

            <div>
              <Link
                href="/buy"
                className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide font-[family-name:var(--font-manrope)]"
              >
                Start Searching
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
