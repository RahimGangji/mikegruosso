import Link from "next/link";

type Service = {
  title: string;
  description: string;
  cta: { label: string; href: string };
  icon: React.ReactNode;
};

const ACCENT = "#3aaacf";

const iconClass = "w-7 h-7";

const services: Service[] = [
  {
    title: "Buy a Property",
    description:
      "Find the right home or property with expert guidance, local market insight, and support through every step of the buying process.",
    cta: { label: "Start Buying", href: "/buy" },
    icon: (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10.75 12 4l9 6.75V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.25Z"
        />
      </svg>
    ),
  },
  {
    title: "Sell Your Property",
    description:
      "Get a smart pricing strategy, professional marketing, and hands-on support designed to help you sell faster and for maximum value.",
    cta: { label: "Sell with Us", href: "/sell" },
    icon: (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6M9 16h5M11.75 14.75l2 2 3.75-3.75"
        />
      </svg>
    ),
  },
  {
    title: "Invest in Real Estate",
    description:
      "Discover residential, commercial, and off-market investment opportunities with clear guidance on risk, value, and long-term potential.",
    cta: { label: "Join Investor List", href: "/investment" },
    icon: (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 17 9 11l4 4 8-8M21 7v5m0-5h-5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21h18"
        />
      </svg>
    ),
  },
  {
    title: "Commercial Real Estate",
    description:
      "Explore retail, office, mixed-use, land, and development opportunities with a team that understands commercial property strategy.",
    cta: { label: "View Commercial Options", href: "/commercial" },
    icon: (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 21V11a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v10M3 21h18M8 8h2M8 12h2M8 16h2"
        />
      </svg>
    ),
  },
  {
    title: "Land & Developments",
    description:
      "Land parcels, infill lots, and development opportunities along the Shore with guidance on zoning, positioning, and bringing projects to market.",
    cta: { label: "View Portfolio", href: "/portfolio" },
    icon: (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3 3 8l9 5 9-5-9-5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13 12 18l9-5"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 17 12 22l9-5"
        />
      </svg>
    ),
  },
  {
    title: "Real Estate Consultation",
    description:
      "Not sure whether to buy, sell, or hold? Speak with our team and get guidance based on your goals, timeline, and local market conditions.",
    cta: { label: "Schedule a Call", href: "/contact" },
    icon: (
      <svg
        className={iconClass}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1 1 0 0 1 .97.76l1 3.6a1 1 0 0 1-.27.99l-1.7 1.7a14 14 0 0 0 6.25 6.25l1.7-1.7a1 1 0 0 1 .99-.27l3.6 1a1 1 0 0 1 .76.97v2.2A1.5 1.5 0 0 1 18.5 20H17C9.82 20 4 14.18 4 7V5.5Z"
        />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-[#3aaacf]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3aaacf] font-[family-name:var(--font-karla)]">
            Services
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[36px] font-normal leading-tight text-[#161f2d] tracking-wide font-[family-name:var(--font-cormorant-garamond)]">
          Our Real Estate Services
        </h2>

        {/* Description */}
        <p className="mt-5 max-w-3xl text-gray-600 text-sm sm:text-base leading-relaxed font-[family-name:var(--font-karla)]">
          Whether you&apos;re buying your first home, selling a property, or
          looking for your next investment, The Gruosso Group provides
          full-service support from strategy to closing.
        </p>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl service-card-animated-wrap overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <article className="flex h-full flex-col rounded-[14px] bg-white p-7 sm:p-8">
                {/* Icon */}
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: ACCENT }}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl sm:text-2xl font-semibold text-[#161f2d] leading-snug font-[family-name:var(--font-cormorant-garamond)]">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-gray-600 text-sm leading-relaxed font-[family-name:var(--font-karla)]">
                  {service.description}
                </p>

                {/* CTA */}
                <div className="mt-auto pt-7">
                  <Link
                    href={service.cta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-[#161f2d] px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#3aaacf] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3aaacf] focus-visible:ring-offset-2 font-[family-name:var(--font-karla)]"
                  >
                    {service.cta.label}
                    <svg
                      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
