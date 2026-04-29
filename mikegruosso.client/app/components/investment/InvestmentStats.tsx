import Link from "next/link";

const stats = [
  { value: "1,000+", label: "Transactions Closed" },
  { value: "20+",    label: "Years of Experience" },
  { value: "$500M+", label: "in Sales Volume" },
  { value: "100+",   label: "Active Investor Clients" },
];

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "We learn your goals, budget, and risk tolerance to define the right investment strategy for you.",
  },
  {
    number: "02",
    title: "Market Analysis",
    description: "Our team delivers neighbourhood level data on rental yields, appreciation trends, and comparable sales.",
  },
  {
    number: "03",
    title: "Acquisition",
    description: "We source on market and off market properties, negotiate aggressively, and manage due diligence from start to finish.",
  },
  {
    number: "04",
    title: "Close & Beyond",
    description: "We connect you with trusted property managers, contractors, and lenders so your investment performs from day one.",
  },
];

export default function InvestmentStats() {
  return (
    <>
      {/* Stats bar */}
      <section className="w-full bg-[#3aaacf] py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-4xl sm:text-5xl font-normal text-white font-[family-name:var(--font-cormorant-garamond)]">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80 font-[family-name:var(--font-manrope)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment process */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">

          <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-8 bg-black" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black font-[family-name:var(--font-manrope)]">
              How It Works
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-gray-900 font-[family-name:var(--font-cormorant-garamond)]">
              Our Investment Process
            </h2>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide font-[family-name:var(--font-manrope)]"
            >
              Book a Free Consultation
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-4">
                <span className="text-5xl font-normal text-[#3aaacf]/20 font-[family-name:var(--font-cormorant-garamond)] leading-none">
                  {step.number}
                </span>
                <h3 className="text-lg font-normal tracking-wide text-gray-900 font-[family-name:var(--font-cormorant-garamond)]">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-[family-name:var(--font-karla)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
