export default function ElevatingSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Navy card — sits flush against the hero (no top gap) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-8 sm:p-10"
          style={{ backgroundColor: "#161f2d" }}
        >
          {/* Left — Heading */}
          <div className="flex items-start">
            <h2
              className="text-2xl sm:text-3xl font-normal leading-snug font-[family-name:var(--font-cormorant-garamond)] tracking-wide"
              style={{ color: "#3aaac5" }}
            >
              Make your next move with clarity.
            </h2>
          </div>

          {/* Right — Description */}
          <div className="flex flex-col justify-center gap-4">
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-[family-name:var(--font-karla)]">
              The Gruosso Group is a boutique, family focused team guiding you across New Jersey with a white glove approach, full transparency, and strategy built for today&apos;s market. Whether you&apos;re buying your first home, selling a long-held property, or growing an investment portfolio, we bring 20+ years of local expertise and a dedicated, hands-on process to every transaction from first conversation to keys at closing. We stay ahead of neighborhood trends, buyer demand, and market shifts so your strategy is always grounded in real data not last season&apos;s numbers. With over 1,000 closed transactions behind us, you can expect clear communication, diligent follow through, and a full-service experience tailored to your goals at every step.
            </p>
            {/* <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-[family-name:var(--font-karla)]">
             
            </p> */}
          </div>
        </div>
      </div>

      {/* Beach image — pulled up so the card's lower half overlaps it.
          Uses fixed attachment so the image creates a parallax effect
          while the page scrolls over it. */}
      <div
        className="relative z-0 w-full h-56 sm:h-72 md:h-96 -mt-24 sm:-mt-32 md:-mt-44"
        style={{
          backgroundImage:
            "url('/sell-opportunity2.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
    </section>
  );
}
