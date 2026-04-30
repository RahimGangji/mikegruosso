import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="w-full bg-[#f0f2f5] px-4 sm:px-8 pt-0 pb-16 sm:pb-20">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-lg px-8 sm:px-16 py-16 sm:py-20 text-center shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #3aaacf 0%, #1a3a52 55%, #161f2d 100%)",
          }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="block h-px w-8 bg-white/35" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] font-[family-name:var(--font-manrope)] text-white/55">
              Let&apos;s Work Together
            </span>
            <span className="block h-px w-8 bg-white/35" />
          </div>

          <h2 className="text-[36px] sm:text-5xl font-normal leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] text-white mb-5">
            Ready to Make Your Move?
          </h2>

          <p className="text-white/65 text-base sm:text-lg leading-relaxed font-[family-name:var(--font-karla)] max-w-xl mx-auto mb-10">
            Whether you&apos;re buying, selling, or investing our team is ready to
            guide you every step of the way across Monmouth &amp; Ocean County.
          </p>

          <Link
            href="/contact"
            className="inline-block border-2 border-white text-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.15em] font-[family-name:var(--font-manrope)] transition-all duration-200 hover:bg-white hover:text-[#161f2d]"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
