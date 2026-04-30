import LeadFormSelect, {
  type LeadFormOption,
} from "./LeadFormSelect";

type MakingOfferClosingProps = {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  formTitle?: string;
  /** Buyer (`purchase`), seller (`sell`), investor (`investment`), or default contact (`contact`). */
  leadFormVariant?: "contact" | "purchase" | "sell" | "investment";
  sectionClassName?: string;
  headingClassName?: string;
  formHeadingClassName?: string;
};

const purchaseBudgetOptions: LeadFormOption[] = [
  { value: "under-400k", label: "Under $400,000" },
  { value: "400k-600k", label: "$400,000 – $600,000" },
  { value: "600k-800k", label: "$600,000 – $800,000" },
  { value: "800k-1m", label: "$800,000 – $1,000,000" },
  { value: "1m-1.5m", label: "$1,000,000 – $1,500,000" },
  { value: "1.5m-plus", label: "$1,500,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

const purchasePropertyTypeOptions: LeadFormOption[] = [
  { value: "single-family", label: "Single family" },
  { value: "condo-townhome", label: "Condo / townhome" },
  { value: "multi-family", label: "Multi-family" },
  { value: "land", label: "Land" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Other" },
];

const purchaseTimelineOptions: LeadFormOption[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "6-12-months", label: "6–12 months" },
  { value: "exploring", label: "Just exploring" },
];

const investmentTypeOptions: LeadFormOption[] = [
  { value: "residential-rental", label: "Residential rental / buy & hold" },
  { value: "fix-flip", label: "Fix & flip" },
  { value: "multi-family", label: "Multi-family" },
  { value: "commercial", label: "Commercial" },
  { value: "short-term-rental", label: "Short-term rental" },
  { value: "land-development", label: "Land / development" },
  { value: "off-market", label: "Off-market / pocket deals" },
  { value: "other", label: "Other / not sure" },
];

const investmentBudgetOptions = purchaseBudgetOptions;
const investmentTimelineOptions = purchaseTimelineOptions;

const sellerExpectedTimelineOptions = purchaseTimelineOptions;

const defaultParagraphs = [
  "When you find a home you love, The Gruosso Group will help you craft and submit a strong, competitive offer. We are skilled negotiators who know the Monmouth and Ocean County markets intimately, and we will work tirelessly to secure the best price and terms possible for you.",
  "Once your offer is accepted, we will guide you through every step that follows from inspections and appraisals to mortgage milestones and the final walk through, ensuring a smooth, stress free closing. Best of all, our service comes at no cost to you as the buyer; we are compensated by the seller, so you get a full team of experts in your corner without adding to your bottom line.",
];

const inputClass =
  "border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3aaacf] focus:outline-none focus:ring-0";

const labelClass = "text-[13px] font-semibold text-gray-900 mb-2";

export default function MakingOfferClosing({
  title = "Making an Offer and Closing",
  subtitle = "Gruosso Partner Till The End",
  paragraphs = defaultParagraphs,
  formTitle,
  leadFormVariant = "contact",
  sectionClassName = "w-full bg-white pt-10 sm:pt-12 pb-24 sm:pb-32",
  headingClassName = "text-[30px] lg:text-[36px]",
  formHeadingClassName = "text-[30px] lg:text-[36px]",
}: MakingOfferClosingProps) {
  const resolvedFormTitle =
    formTitle ??
    (leadFormVariant === "purchase"
      ? "Start Your Home Search"
      : leadFormVariant === "sell"
        ? "My Home Value"
        : leadFormVariant === "investment"
          ? "Get Investment Deals"
          : "Request A Call");

  return (
    <section className={sectionClassName}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — sticky while long form scrolls (matches FAQ layout) */}
          <div className="flex flex-col lg:sticky lg:top-24 lg:self-start">

            {/* Heading */}
            <h2 className={`${headingClassName} font-normal leading-tight tracking-wide text-gray-900 mb-6 font-[family-name:var(--font-cormorant-garamond)]`}>
              {title}
            </h2>

            {/* Subheading */}
            <p
              className="text-[16px] font-semibold uppercase tracking-[0.2em] text-[#000000] mb-8 font-[family-name:var(--font-manrope)]"
              style={{ fontWeight: 400 }}
            >
              {subtitle}
            </p>

            {/* Paragraphs */}
            <div
              className="flex flex-col gap-5 text-[14px] leading-relaxed font-[family-name:var(--font-karla)]"
              style={{ color: "#000000" }}
            >
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

          </div>

          {/* Right — lead form */}
          <div className="w-full">
            <h3 className={`${formHeadingClassName} font-normal leading-tight tracking-wide text-gray-900 mb-8 font-[family-name:var(--font-cormorant-garamond)]`}>
              {resolvedFormTitle}
            </h3>

            <style>{`
              .moc-form input:-webkit-autofill,
              .moc-form input:-webkit-autofill:hover,
              .moc-form input:-webkit-autofill:focus,
              .moc-form input:-webkit-autofill:active,
              .moc-form textarea:-webkit-autofill {
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
              className="moc-form flex flex-col gap-6 font-[family-name:var(--font-manrope)]"
            >
              {leadFormVariant === "purchase" ? (
                <>
                  <div className="flex flex-col">
                    <label htmlFor="moc-full-name" className={labelClass}>
                      Full Name
                    </label>
                    <input
                      id="moc-full-name"
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
                      <label htmlFor="moc-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="moc-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="moc-phone" className={labelClass}>
                        Phone
                      </label>
                      <input
                        id="moc-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="moc-preferred-area" className={labelClass}>
                      Preferred Area
                    </label>
                    <input
                      id="moc-preferred-area"
                      name="preferredArea"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Preferred Area"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <LeadFormSelect
                      name="budgetRange"
                      label="Budget Range"
                      placeholder="Select budget range"
                      options={purchaseBudgetOptions}
                      labelClassName={labelClass}
                    />
                    <LeadFormSelect
                      name="propertyType"
                      label="Property Type"
                      placeholder="Select property type"
                      options={purchasePropertyTypeOptions}
                      labelClassName={labelClass}
                    />
                  </div>

                  <LeadFormSelect
                    name="timeline"
                    label="Timeline"
                    placeholder="Select timeline"
                    options={purchaseTimelineOptions}
                    labelClassName={labelClass}
                  />

                  <div className="flex flex-col">
                    <label htmlFor="moc-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="moc-message"
                      name="message"
                      rows={4}
                      placeholder="Message"
                      className={`resize-none ${inputClass}`}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide"
                    >
                      Start Your Home Search
                    </button>
                  </div>
                </>
              ) : leadFormVariant === "sell" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="sell-first-name" className={labelClass}>
                        First Name
                      </label>
                      <input
                        id="sell-first-name"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="First Name"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="sell-last-name" className={labelClass}>
                        Last Name
                      </label>
                      <input
                        id="sell-last-name"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Last Name"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="sell-email" className={labelClass}>
                        Email Address
                      </label>
                      <input
                        id="sell-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email Address"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="sell-phone" className={labelClass}>
                        Phone Number
                      </label>
                      <input
                        id="sell-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone Number"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="sell-property-address" className={labelClass}>
                      Property Address
                    </label>
                    <input
                      id="sell-property-address"
                      name="propertyAddress"
                      type="text"
                      autoComplete="street-address"
                      placeholder="Property Address"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <LeadFormSelect
                      name="propertyType"
                      label="Property Type"
                      placeholder="Select property type"
                      options={purchasePropertyTypeOptions}
                      labelClassName={labelClass}
                    />
                    <LeadFormSelect
                      name="expectedTimeline"
                      label="Expected Timeline"
                      placeholder="Select expected timeline"
                      options={sellerExpectedTimelineOptions}
                      labelClassName={labelClass}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="sell-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="sell-message"
                      name="message"
                      rows={4}
                      placeholder="Message"
                      className={`resize-none ${inputClass}`}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide"
                    >
                      Request Home Value
                    </button>
                  </div>
                </>
              ) : leadFormVariant === "investment" ? (
                <>
                  <div className="flex flex-col">
                    <label htmlFor="inv-full-name" className={labelClass}>
                      Name
                    </label>
                    <input
                      id="inv-full-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Name"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="inv-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="inv-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="inv-phone" className={labelClass}>
                        Phone
                      </label>
                      <input
                        id="inv-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <LeadFormSelect
                      name="investmentType"
                      label="Investment Type"
                      placeholder="Select investment type"
                      options={investmentTypeOptions}
                      labelClassName={labelClass}
                    />
                    <LeadFormSelect
                      name="budget"
                      label="Budget"
                      placeholder="Select budget range"
                      options={investmentBudgetOptions}
                      labelClassName={labelClass}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="inv-preferred-area" className={labelClass}>
                      Preferred Area
                    </label>
                    <input
                      id="inv-preferred-area"
                      name="preferredArea"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Preferred Area"
                      className={inputClass}
                    />
                  </div>

                  <LeadFormSelect
                    name="timeline"
                    label="Timeline"
                    placeholder="Select timeline"
                    options={investmentTimelineOptions}
                    labelClassName={labelClass}
                  />

                  <div className="flex flex-col">
                    <label htmlFor="inv-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="inv-message"
                      name="message"
                      rows={4}
                      placeholder="Message"
                      className={`resize-none ${inputClass}`}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide"
                    >
                      Get Investment Opportunities
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label
                        htmlFor="moc-first-name"
                        className={labelClass}
                      >
                        First Name
                      </label>
                      <input
                        id="moc-first-name"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="First Name"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="moc-last-name"
                        className={labelClass}
                      >
                        Last Name
                      </label>
                      <input
                        id="moc-last-name"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Last Name"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label
                        htmlFor="moc-email-contact"
                        className={labelClass}
                      >
                        Email Address
                      </label>
                      <input
                        id="moc-email-contact"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email Address"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="moc-phone-contact"
                        className={labelClass}
                      >
                        Phone Number
                      </label>
                      <input
                        id="moc-phone-contact"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone Number"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="moc-message-contact"
                      className={labelClass}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="moc-message-contact"
                      name="message"
                      rows={3}
                      placeholder="Your Message"
                      className={`resize-none ${inputClass}`}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide"
                    >
                      Send Message
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
