import Image from "next/image";

const points = [
  {
    value: "1,000+ Transactions",
    label: "",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    value: "20 Years of Experience",
    label: "",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "Tech Driven Marketing",
    label: "",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    value: "Expert Team of Professionals",
    label: "",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left — Image (below text on mobile, left on desktop) */}
        <div className="w-full lg:w-1/2 flex-shrink-0 order-2 lg:order-1">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/why-choose-us.jpeg"
              alt="Why Choose The Gruosso Group"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        {/* Right — Content (first on mobile) */}
        <div className="w-full lg:w-1/2 flex flex-col order-1 lg:order-2">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-8 bg-black" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black">
              Why Partner with Us
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-5 text-black">
            Expect More From Your Real Estate Experience.
          </h2>

          {/* Description */}
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            Backed by decades of success along the Jersey Shore, we provide the
            insights, tools, and dedicated support you need to make your next
            move with absolute confidence.
          </p>

          {/* Points — bullet list */}
          <ul className="flex flex-col gap-4">
            {points.map((point) => (
              <li key={point.label} className="flex items-center gap-3">
                <span
                  className="flex-shrink-0 w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#3aaacf" }}
                />
                <span className="text-base font-semibold" style={{ color: "#3aaacf" }}>
                  {point.value}
                </span>
                {/* <span className="text-gray-400 text-sm">— {point.label}</span> */}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}
