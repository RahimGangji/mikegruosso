import Image from "next/image";
import Link from "next/link";

export default function SaveAndSeeListings() {
  return (
    <section className="w-full bg-white pt-16 sm:pt-20 pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text */}
          <div className="flex flex-col justify-center">

            {/* Heading */}
            <h2 className="text-[28px] sm:text-[36px] font-normal leading-tight tracking-wide text-gray-900 mb-6 font-[family-name:var(--font-cormorant-garamond)]">
              Save and See Listings
            </h2>

            {/* Subheading */}
            <p
              className="text-[16px] font-semibold uppercase tracking-[0.2em] text-[#000000] mb-8 font-[family-name:var(--font-manrope)]"
              style={{ fontWeight: 400 }}
            >
              Favorite Properties and Tour Homes
            </p>

            {/* Paragraphs */}
            <div
              className="flex flex-col gap-5 text-[14px] leading-relaxed font-[family-name:var(--font-karla)] mb-8"
              style={{ color: "#000000" }}
            >
              <p>
                When a property catches your eye, save it to your favorites with a single click and The Gruosso Group will be notified you&apos;re interested. Tap &ldquo;See This Listing&rdquo; or reach out directly and we will coordinate a private showing on your schedule, walk you through the home in person, and answer every question so you can make a confident, informed decision.
              </p>
              <p>
                Prefer to plan ahead? Use the &ldquo;In Person Tour&rdquo; option to request a showing online or call us to set an appointment. From the first visit through closing, our team is by your side to compare neighborhoods, weigh trade offs, and help you find the right home along the Jersey Shore.
              </p>
            </div>

            {/* CTA */}
            <div>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide font-[family-name:var(--font-manrope)]"
              >
                Search Listings
              </Link>
            </div>

          </div>

          {/* Right — Image */}
          <div className="w-full min-w-0 order-first lg:order-last">
            <Image
              src="/see-properties.avif"
              alt="Save and tour Gruosso Group property listings"
              width={1200}
              height={800}
              className="block w-full h-auto rounded-sm"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
