import Link from "next/link";
import Image from "next/image";

export default function CTA() {
  return (
    <section className="relative w-full py-16 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/cta-section-bg.avif"
        alt="CTA background"
        fill
        className="object-cover"
        priority
      />

      {/* Fog / dark overlay */}
      <div className="absolute inset-0 bg-[#15234b]/80 backdrop-blur-[2px]" />

      {/* Radial soft glow for fog effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, rgba(255,255,255,0.04) 0%, rgba(21,35,75,0.6) 70%)"
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="block h-px w-8 bg-white/50" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Get Started Today
          </span>
          {/* <span className="block h-px w-8 bg-white/50" /> */}
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
          Looking to Buy or Sell in Monmouth or Ocean County?
        </h2>

        {/* Concise description */}
        <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          The Gruosso Group specializes in residential, commercial, and investment properties along the Jersey Shore from luxury waterfront estates to suburban family homes. Let us help you make your next move with confidence.
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="inline-block px-8 py-4 rounded-xl text-sm font-bold tracking-wide bg-white transition-all duration-200 hover:bg-opacity-90 hover:shadow-2xl"
          style={{ color: "#15234b" }}
        >
          Contact Us Today
        </Link>

      </div>
    </section>
  );
}
