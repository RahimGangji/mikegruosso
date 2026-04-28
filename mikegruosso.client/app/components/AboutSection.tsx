import Image from "next/image";

/** Matches Navbar: max-w-7xl mx-auto px-4 sm:px-8 */
const pageContainer = "max-w-7xl mx-auto px-4 sm:px-8 w-full";

export default function AboutSection() {
  return (
    <section className="w-full bg-white">
      {/* Blue top — text + bottom padding that equals half the image height */}
      <div className="bg-[#3aaacf] pb-36 sm:pb-48 md:pb-60">
        <div className={`${pageContainer} pt-20 pb-14 text-center`}>
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-normal text-white tracking-wide mb-5 font-[family-name:var(--font-cormorant-garamond)]">
            About Us
          </h2>

          {/* Divider */}
          <div className="mx-auto w-px h-10 bg-white/40 mb-10" />

          {/* Paragraphs — aligned to same width as navbar content */}
          <div className="flex flex-col gap-7 text-white/80 text-sm sm:text-base leading-relaxed font-[family-name:var(--font-karla)]">
            <p>
              The Gruosso Group is your go to real estate team in Monmouth and
              Ocean County, New Jersey. Along the Jersey Shore we focus on
              residential, commercial, and investment properties with more than
              1,000 successful transactions and 20 years of experience guiding
              buyers, sellers, and investors.
            </p>
            <p>
              We help clients achieve strong results through expert pricing,
              technology-driven marketing, and promotion built for fast,
              seamless closings. Our specialties include luxury homes, waterfront
              properties, and suburban sales in communities such as Red Bank,
              Middletown, Shrewsbury, Jackson, and throughout the region.
            </p>
            <p>
              Shore and inland markets move quickly, and we stay ahead with
              current data, neighborhood level insight, and a practical read on
              what buyers and sellers respond to in each community. That means
              smarter list prices, stronger offers, and fewer surprises at the
              inspection and closing table whether you are upsizing, downsizing,
              relocating, or adding to an investment portfolio.
            </p>
            <p>
              What sets us apart is a team of professionals who put you and your
              needs first: responsive updates, honest guidance, and coordination
              with trusted lenders, attorneys, and vendors when you need them.
              First-time buyer, empty nester, or experienced investor we tailor
              the plan to your timeline and priorities.
            </p>
            <p>
              Visit us at 830 Broad Street, Shrewsbury, NJ 07702, or call{" "}
              <a
                href="tel:+17327044033"
                className="text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
              >
                (732) 704-4033 ext. 126
              </a>
              . Curious about your home&apos;s value? Ask The Gruosso Group for a
              free, no-obligation home evaluation we are here to help you decide
              your next move with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Image — same horizontal rhythm as navbar */}
      <div className={`${pageContainer} -mt-36 sm:-mt-48 md:-mt-60 pb-16 relative z-10`}>
        <div className="relative w-full h-72 sm:h-96 md:h-[480px]">
          <Image
            src="/mike-about.jpeg"
            alt="About The Gruosso Group"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>
    </section>
  );
}
