const types = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H15v-6h-6v6H3.75A.75.75 0 013 21V9.75z" />
      </svg>
    ),
    title: "Buy & Hold Rentals",
    description:
      "Acquire long-term rental properties along the Jersey Shore and generate consistent monthly cash flow. We identify high-demand neighbourhoods with strong rent to price ratios.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17L4.655 7.773a2.624 2.624 0 01-.421-3.028l.157-.31a2.625 2.625 0 013.519-.938l.396.209c.47.247.83.638 1.03 1.11l.271.65c.14.337.355.64.633.874M4.655 7.773L3 9.5" />
      </svg>
    ),
    title: "Fix & Flip",
    description:
      "Buy undervalued properties, renovate strategically, and sell at a profit. Our team connects you with trusted contractors, financing options, and a deep bench of off-market leads.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Multi-Family",
    description:
      "Two-to-four-unit properties deliver multiple income streams under one roof. We source duplexes, triplexes, and quads throughout Monmouth and Ocean County, with many priced below market.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "Vacation Rentals",
    description:
      "The Jersey Shore's thriving short-term rental market offers premium seasonal yields. We pinpoint beachside communities where occupancy rates and nightly rates outperform the national average.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: "Commercial",
    description:
      "Office, retail, and industrial assets across the Shore provide long leases and predictable income. Our commercial specialists negotiate favourable terms and guide you through due diligence.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "1031 Exchange",
    description:
      "Defer capital-gains taxes by rolling proceeds from a sold property into a new one. We work alongside your tax advisor to identify qualifying replacement properties quickly and close on time.",
  },
];

export default function InvestmentTypes() {
  return (
    <section className="w-full bg-[#f8f9fa] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-black" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black font-[family-name:var(--font-manrope)]">
            Investment Strategies
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-gray-900 mb-4 font-[family-name:var(--font-cormorant-garamond)]">
          Choose the Strategy That Fits Your Goals
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mb-14 font-[family-name:var(--font-karla)]">
          From hands-off rentals to active flips, The Gruosso Group structures every engagement around your timeline, risk tolerance, and return targets.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {types.map((type) => (
            <div
              key={type.title}
              className="inv-card bg-white p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              <span className="text-[#3aaacf]">{type.icon}</span>
              <h3 className="text-lg font-normal tracking-wide text-gray-900 font-[family-name:var(--font-cormorant-garamond)]">
                {type.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-[family-name:var(--font-karla)]">
                {type.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
