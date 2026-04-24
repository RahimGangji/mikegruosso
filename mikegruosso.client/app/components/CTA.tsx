import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full bg-[#f0f2f5] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div
          className="rounded-lg shadow-lg border border-white/10 px-6 sm:px-10 py-10 sm:py-12"
          style={{ backgroundColor: "#15234b" }}
        >
          <h2 className="text-center text-2xl sm:text-3xl md:text-[1.75rem] font-normal text-white leading-tight font-[family-name:var(--font-arapey)] tracking-wide">
            How Much Is Your Home Really Worth?
          </h2>

          <form
            action="/property-value"
            method="get"
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-3 sm:items-stretch"
          >
            <label htmlFor="cta-home-address" className="sr-only">
              Home address
            </label>
            <input
              id="cta-home-address"
              name="address"
              type="text"
              autoComplete="street-address"
              placeholder="Enter Home Address"
              className="min-w-0 flex-1 rounded border-2 border-green-600 bg-transparent px-4 py-3 text-sm text-green-500 placeholder:text-green-500 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 font-[family-name:var(--font-karla)]"
            />
            <label htmlFor="cta-unit" className="sr-only">
              Unit number (optional)
            </label>
            <input
              id="cta-unit"
              name="unit"
              type="text"
              placeholder="Unit # (optional)"
              className="sm:w-44 shrink-0 rounded border-2 border-green-600 bg-transparent px-4 py-3 text-sm text-green-500 placeholder:text-green-500 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 font-[family-name:var(--font-karla)]"
            />
            <button
              type="submit"
              className="shrink-0 rounded bg-green-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 font-[family-name:var(--font-manrope)] sm:px-10"
            >
              Find Out
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-white/75 font-[family-name:var(--font-karla)]">
            This site is protected by reCAPTCHA and the Google{" "}
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:text-white/90"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:text-white/90"
            >
              Terms of Service
            </Link>{" "}
            apply.
          </p>
        </div>
      </div>
    </section>
  );
}
