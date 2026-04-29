const sellingSteps = [
  {
    title: "Consultation & Goal Setting",
    description:
      "We begin by understanding your goals and needs to create a personalized selling plan. Your priorities drive the strategy.",
  },
  {
    title: "Pricing Strategy",
    description:
      "Using up-to-date market data, we price your home competitively to attract serious buyers while maximizing your profit potential.",
  },
  {
    title: "Prepare & Stage",
    description:
      "We help you get your home ready for sale with expert advice on staging and preparing it to shine for showings.",
  },
  {
    title: "List & Market",
    description:
      "Your home will be marketed through the most effective channels, MLS, social media, and more, to gain maximum visibility.",
  },
  {
    title: "Showings & Negotiation",
    description:
      "We manage showings, gather feedback, and skillfully negotiate offers to ensure you get the best deal possible.",
  },
  {
    title: "Contract to Closing Support",
    description:
      "From accepted offer to final paperwork, we guide you through the closing process, making sure everything goes smoothly.",
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
