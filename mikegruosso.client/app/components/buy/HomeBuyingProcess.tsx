import Image from "next/image";

export default function HomeBuyingProcess() {
  return (
    <section className="w-full bg-white pt-36 sm:pt-40 pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-36 items-center">

          {/* Left — Text */}
          <div className="flex flex-col justify-center">

            {/* Heading */}
            <h1 className="text-[28px] sm:text-[36px] font-normal leading-tight tracking-wide text-gray-900 mb-6 font-[family-name:var(--font-cormorant-garamond)]">
              The Home Buying Process
            </h1>

            {/* Subheading */}
            <p className="text-[16px] font-semibold uppercase tracking-[0.2em] text-[#000000] mb-8 font-[family-name:var(--font-manrope)]" style={{
              fontWeight: 400,
            }}>
              We Can Make It Easy
            </p>

            {/* Paragraphs */}
            <div className="flex flex-col gap-5  text-[14px] leading-relaxed font-[family-name:var(--font-karla)]" style={{ color: "#000000" }}>
              <p>
                Buying a home is a big step! Whether you&apos;re buying your first home, your dream home, or your tenth investment property, yours will be a big investment. We know how important this is to you, and have an army of experts to make sure we find the perfect property for your unique circumstances. The Gruosso Group knows the market well and truly loves real estate, and we&apos;ll educate you throughout the entire buying experience.
              </p>
              <p>
                Finding the perfect property is just one way our team can help you with your real estate purchase. Our top real estate agents and brokers have ongoing access to experts in every related field from lending to relocation  so you&apos;re covered at every step of the journey.
              </p>
            </div>

          </div>

          {/* Right — Image Collage */}
          <div className="relative w-full min-w-0 max-lg:overflow-x-clip lg:w-[70%] h-[320px] sm:h-[380px] lg:h-[420px]">

            {/* Large image — top left */}
            <div className="absolute top-0 left-0 w-[88%] max-w-full h-[90%] overflow-hidden">
              <Image
                src="/happyfamily.avif"
                alt="Family touring a house"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 75vw, 40vw"
              />
            </div>

            {/* Small image — bottom right overlapping; keep inside bounds on small viewports (was -right-18) */}
            <div className="absolute bottom-0 right-0 w-[55%] sm:w-[58%] lg:-right-18 lg:w-[60%] h-[52%] overflow-hidden shadow-xl">
              <Image
                src="/happyfamily2.avif"
                alt="Couple on green couch"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 55vw, 30vw"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
