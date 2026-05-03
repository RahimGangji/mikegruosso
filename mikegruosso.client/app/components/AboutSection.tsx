import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";

/** Matches Navbar: max-w-7xl mx-auto px-4 sm:px-8 */
const pageContainer = "max-w-7xl mx-auto px-4 sm:px-8 w-full";

export default function AboutSection() {
  return (
    <section className="w-full bg-white">
      {/* Navy top — text + bottom padding that equals half the image height */}
      <div className="bg-[#161f2d] pb-36 sm:pb-48 md:pb-60">
        <div className={`${pageContainer} pt-20 pb-14 text-center`}>
          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl font-normal tracking-wide mb-5 font-[family-name:var(--font-cormorant-garamond)]"
            style={{ color: "#3aaaa8" }}
          >
            About Us
          </h2>

          {/* Divider */}
          <div className="mx-auto w-px h-10 bg-white/40 mb-10" />

          {/* Paragraphs — aligned to same width as navbar content */}
          <div className="flex flex-col gap-7 text-white/80 text-sm sm:text-base leading-relaxed font-[family-name:var(--font-karla)]">
            <p>
              The Gruosso Group is your real estate team in Monmouth and Ocean
              County, New Jersey. Along the Jersey Shore we focus on residential,
              commercial, and investment properties, with more than 1,000
              successful transactions and 20 years of experience guiding buyers,
              sellers, and investors.
            </p>
            <p>
              We help clients reach strong outcomes through expert pricing,
              technology-driven marketing, and support built for smooth, efficient
              closings. Our work spans luxury homes, waterfront properties, and
              suburban sales in communities such as Red Bank, Middletown,
              Shrewsbury, Jackson, and throughout the region.
            </p>
            <p>
              Shore and inland markets move quickly. We stay current with local
              data, neighborhood insight, and what buyers and sellers respond to in
              each community, which supports smarter list prices, stronger offers,
              and fewer surprises at inspection and closing. Whether you are
              upsizing, downsizing, relocating, or growing an investment portfolio,
              we align strategy with your goals.
            </p>
            <p>
              Our team puts you first with responsive communication, honest
              guidance, and coordination with lenders, attorneys, and vendors when
              you need them. First-time buyer, empty nester, or seasoned investor,
              we tailor the plan to your timeline and priorities.
            </p>
            <p>
              Visit us at 236 Norwood Ave, Oakhurst, NJ 07755, or call{" "}
              <a
                href="tel:+17327044033"
                className="text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
              >
                (732) 704-4033 ext. 126
              </a>
              . Curious about your home&apos;s value? Ask The Gruosso Group for a
              free, no-obligation home evaluation. We are here to help you move
              forward with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Image — same horizontal rhythm as navbar */}
      <div className={`${pageContainer} -mt-36 sm:-mt-48 md:-mt-60 pb-16 relative z-10`}>
        <div className="relative w-full h-72 sm:h-96 md:h-[520px] lg:h-[620px] xl:h-[700px] overflow-hidden">
          <Image
            src="/mike-about.jpeg"
            alt="About The Gruosso Group"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1280px) 100vw, 1280px"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
