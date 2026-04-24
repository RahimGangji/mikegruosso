export default function ElevatingSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Navy card — sits flush against the hero (no top gap) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-8 sm:p-10"
          style={{ backgroundColor: "#15234b" }}
        >
          {/* Left — Heading */}
          <div className="flex items-start">
            <h2 className="text-2xl sm:text-3xl font-normal leading-snug text-white font-[family-name:var(--font-arapey)] tracking-wide">
              Elevating Real Estate on the Jersey Shore
            </h2>
          </div>

          {/* Right — Description */}
          <div className="flex flex-col justify-center gap-4">
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-[family-name:var(--font-karla)]">
              The Gruosso Group is your go-to team in Monmouth and Ocean County
              for buying, selling, and investing along the Jersey Shore. With
              1,000+ closed transactions and 20 years of experience, we pair
              expert pricing with technology driven marketing and a focus on
              smooth, efficient closings. From luxury waterfront homes to
              suburban neighborhoods and commercial opportunities, we put your
              goals first so you can move forward with confidence. We track neighborhood trends, buyer demand, and listing activity
              across the Shore so your strategy fits today's market not last
              season&apos;s. Expect clear communication, diligent follow through, and
              a full-service approach from first conversation to keys at closing.
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
            "url('https://images.brivityidx.com/assets/images/uploads/2751/beachhouses.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />
    </section>
  );
}
