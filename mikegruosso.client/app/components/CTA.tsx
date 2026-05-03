import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full bg-[#f0f2f5] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 shadow-xl shadow-[#153a52]/20">
          {/* Gradient base + soft light orbs */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#4cb8dd] via-[#3aaacf] to-[#153a52]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-[#161f2d]/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]"
            aria-hidden
          />

          <div className="relative px-6 py-12 text-center sm:px-12 sm:py-14 md:py-16">
            <div className="mx-auto mb-5 flex flex-col items-center gap-3">
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-8 bg-white/70" aria-hidden />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 font-[family-name:var(--font-manrope)]">
                  Valuation
                </span>
                <span className="h-px w-8 bg-white/70" aria-hidden />
              </span>
              <h2 className="max-w-2xl text-2xl font-normal leading-tight tracking-wide text-white sm:text-3xl md:text-[1.85rem] font-[family-name:var(--font-cormorant-garamond)] drop-shadow-sm">
                How Much Is Your Home Really Worth?
              </h2>
            </div>

            <p className="mx-auto mb-9 max-w-lg text-sm leading-relaxed text-white/85 font-[family-name:var(--font-karla)]">
              Get a clearer picture of your property in today&apos;s market with a
              no-obligation conversation with The Gruosso Group.
            </p>

            <div className="flex justify-center">
              <Link
                href="/property-value"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#161f2d] px-9 py-3.5 text-sm font-semibold text-[#3aaacf] shadow-lg shadow-black/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0f1622] hover:shadow-xl font-[family-name:var(--font-manrope)] sm:px-11"
              >
                Find Out
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
