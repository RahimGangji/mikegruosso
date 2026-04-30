import LeadFormSelect, {
  type LeadFormOption,
} from "../buy/LeadFormSelect";

const roleOptions: LeadFormOption[] = [
  { value: "buyer", label: "Buyer" },
  { value: "seller", label: "Seller" },
  { value: "investor", label: "Investor" },
  { value: "agent", label: "Agent" },
  { value: "developer", label: "Developer" },
];

const inputClass =
  "border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3aaacf] focus:outline-none focus:ring-0";

const labelClass = "text-[13px] font-semibold text-gray-900 mb-2";

const benefits = [
  {
    title: "On-Market & Off-Market Access",
    description:
      "Be the first to hear about new listings, pocket deals, and pre-market opportunities along the Jersey Shore before they go public.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75 12 3l9 6.75V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.25Z" />
      </svg>
    ),
  },
  {
    title: "Market Updates That Matter",
    description:
      "Receive concise neighborhood briefings on price trends, inventory, and buyer demand so you can act on real signals, not noise.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17 9 11l4 4 8-8M21 7v5m0-5h-5M3 21h18" />
      </svg>
    ),
  },
];

export default function JoinSection() {
  return (
    <section className="w-full bg-white pt-36 sm:pt-40 pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — heading, intro, benefits */}
          <div className="flex flex-col">

            <h1 className="text-[28px] lg:text-[36px] font-normal leading-tight tracking-wide text-gray-900 mb-6 font-[family-name:var(--font-cormorant-garamond)]">
              Join The Gruosso Group Network
            </h1>

            <p
              className="text-[16px] font-semibold uppercase tracking-[0.2em] text-[#000000] mb-8 font-[family-name:var(--font-manrope)]"
              style={{ fontWeight: 400 }}
            >
              Be First To Know, First To Move
            </p>

            <div className="flex flex-col gap-5 text-[14px] leading-relaxed text-[#000000] font-[family-name:var(--font-karla)] mb-10">
              <p>
                Get access to real estate opportunities, market updates, and
                exclusive property alerts.
              </p>
              <p>
                Whether you&rsquo;re actively shopping, planning to list, or
                building a long term portfolio along the Jersey Shore, our
                network keeps you in front of the right inventory and the
                right people.
              </p>
              <p>
                Members hear about new listings, off market opportunities, and
                shifts in local demand from the team that has guided more than
                1,000 transactions across Monmouth and Ocean County.
              </p>
            </div>

            {/* Benefits */}
            <ul className="flex flex-col">
              {benefits.map((benefit, i) => (
                <li
                  key={benefit.title}
                  className={`flex items-start gap-4 py-4 border-t border-[#161f2d]/10 ${
                    i === benefits.length - 1 ? "border-b" : ""
                  }`}
                >
                  <span className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-[#3aaacf]/35 text-[#3aaacf]">
                    {benefit.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-gray-900 font-[family-name:var(--font-karla)]">
                      {benefit.title}
                    </span>
                    <span className="text-[13px] leading-relaxed text-gray-500 font-[family-name:var(--font-karla)]">
                      {benefit.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

          </div>

          {/* Right — join form */}
          <div className="w-full">
            <h2 className="text-[30px] lg:text-[36px] font-normal leading-tight tracking-wide text-gray-900 mb-8 font-[family-name:var(--font-cormorant-garamond)]">
              Join The Network
            </h2>

            <style>{`
              .join-form input:-webkit-autofill,
              .join-form input:-webkit-autofill:hover,
              .join-form input:-webkit-autofill:focus,
              .join-form input:-webkit-autofill:active,
              .join-form textarea:-webkit-autofill {
                -webkit-text-fill-color: #111827;
                -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
                box-shadow: 0 0 0px 1000px #ffffff inset;
                caret-color: #111827;
                transition: background-color 5000s ease-in-out 0s;
              }
            `}</style>

            <form
              action="/contact"
              method="post"
              className="join-form flex flex-col gap-6 font-[family-name:var(--font-manrope)]"
            >
              <div className="flex flex-col">
                <label htmlFor="join-full-name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="join-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="join-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="join-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="join-phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="join-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone"
                    className={inputClass}
                  />
                </div>
              </div>

              <LeadFormSelect
                name="role"
                label="I am a"
                placeholder="Select an option"
                options={roleOptions}
                labelClassName={labelClass}
              />

              <div className="flex flex-col">
                <label htmlFor="join-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="join-message"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  className={`resize-none ${inputClass}`}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide"
                >
                  Join Now
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
