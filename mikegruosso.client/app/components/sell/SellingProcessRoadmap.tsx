const sellingSteps = [
  {
    title: "Property Consultation",
    description:
      "We start with a clear conversation about your goals, timeline, and property so we understand what success looks like for you. You get honest feedback on condition, curb appeal, and how your home compares in today’s Shore market.",
  },
  {
    title: "Pricing Strategy",
    description:
      "Your list price is built on fresh comps, buyer demand in your neighborhood, and your positioning goals not a rushed number from an algorithm. We explain the rationale so you can list with confidence and attract serious buyers.",
  },
  {
    title: "Marketing Launch",
    description:
      "We roll out MLS exposure, polished photography and presentation, and targeted digital outreach so your listing launches strong. Every channel works together so the right audience sees your property from day one.",
  },
  {
    title: "Showings & Buyer Follow-Up",
    description:
      "We coordinate visits, communicate feedback, and help you tune the plan if buyer response suggests a change in strategy. You stay informed while we keep momentum with qualified prospects.",
  },
  {
    title: "Offers & Negotiation",
    description:
      "When offers arrive, we break down price, contingencies, and timelines in plain language and negotiate strategically on your behalf. Our focus is securing terms that align with your bottom line not just accepting the first number on paper.",
  },
  {
    title: "Closing Coordination",
    description:
      "From contract signatures through inspections, appraisal, lender milestones, and the final walkthrough, we coordinate deadlines and paperwork with your attorney and other professionals. Our job is to keep the path to closing organized and predictable.",
  },
];

export default function SellingProcessRoadmap() {
  return (
    <section className="w-full bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14 sm:mb-16">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#3aaacf] mb-5 font-[family-name:var(--font-manrope)]">
            The Selling Process
          </p>
          <h2 className="text-[30px] lg:text-[36px] font-normal leading-tight tracking-wide text-[#161f2d] mb-6 font-[family-name:var(--font-cormorant-garamond)]">
            Selling Your Home Is Easier Than You Think.
          </h2>
          <p className="text-[15px] sm:text-base leading-relaxed text-[#161f2d]/75 font-[family-name:var(--font-karla)]">
            We guide you through a streamlined process to ensure a smooth and
            successful sale.
          </p>
        </div>

        <div className="relative">
          <div
            className="absolute left-[22px] top-0 hidden h-full w-px bg-[#161f2d]/15 sm:block lg:left-1/2"
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-8 sm:gap-10">
            {sellingSteps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <li
                  key={step.title}
                  className={`relative grid grid-cols-[44px_minmax(0,1fr)] gap-5 sm:grid-cols-[64px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] lg:gap-8 ${
                    isEven ? "" : "lg:[&>div:last-child]:col-start-1 lg:[&>div:last-child]:row-start-1"
                  }`}
                >
                  <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#3aaacf] bg-white text-sm font-semibold text-[#3aaacf] font-[family-name:var(--font-manrope)] sm:h-12 sm:w-12 lg:col-start-2 lg:mx-auto">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div
                    className={`border-b border-[#161f2d]/10 pb-8 lg:max-w-[500px] ${
                      isEven
                        ? "lg:col-start-3 lg:text-left"
                        : "lg:justify-self-end lg:text-right"
                    }`}
                  >
                    <h3 className="text-xl sm:text-2xl font-normal leading-snug text-[#161f2d] mb-3 font-[family-name:var(--font-cormorant-garamond)]">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#161f2d]/70 font-[family-name:var(--font-karla)]">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
