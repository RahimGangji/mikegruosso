type MakingOfferClosingProps = {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  formTitle?: string;
  sectionClassName?: string;
  headingClassName?: string;
  formHeadingClassName?: string;
};

const defaultParagraphs = [
  "When you find a home you love, The Gruosso Group will help you craft and submit a strong, competitive offer. We are skilled negotiators who know the Monmouth and Ocean County markets intimately, and we will work tirelessly to secure the best price and terms possible for you.",
  "Once your offer is accepted, we will guide you through every step that follows from inspections and appraisals to mortgage milestones and the final walk through, ensuring a smooth, stress free closing. Best of all, our service comes at no cost to you as the buyer; we are compensated by the seller, so you get a full team of experts in your corner without adding to your bottom line.",
];

export default function MakingOfferClosing({
  title = "Making an Offer and Closing",
  subtitle = "Gruosso Partner Till The End",
  paragraphs = defaultParagraphs,
  formTitle = "Request A Call",
  sectionClassName = "w-full bg-white pt-10 sm:pt-12 pb-24 sm:pb-32",
  headingClassName = "text-[30px] lg:text-[36px]",
  formHeadingClassName = "text-[30px] lg:text-[36px]",
}: MakingOfferClosingProps) {
  return (
    <section className={sectionClassName}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Copy */}
          <div className="flex flex-col">

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

          {/* Right — Request A Call form */}
          <div className="w-full">
            <h3 className={`${formHeadingClassName} font-normal leading-tight tracking-wide text-gray-900 mb-8 font-[family-name:var(--font-cormorant-garamond)]`}>
              {formTitle}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="moc-first-name"
                    className="text-[13px] font-semibold text-gray-900 mb-2"
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
                    className="border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3aaacf] focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="moc-last-name"
                    className="text-[13px] font-semibold text-gray-900 mb-2"
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
                    className="border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3aaacf] focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label
                    htmlFor="moc-email"
                    className="text-[13px] font-semibold text-gray-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="moc-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email Address"
                    required
                    className="border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3aaacf] focus:outline-none focus:ring-0"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="moc-phone"
                    className="text-[13px] font-semibold text-gray-900 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="moc-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone Number"
                    className="border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3aaacf] focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="moc-message"
                  className="text-[13px] font-semibold text-gray-900 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="moc-message"
                  name="message"
                  rows={3}
                  placeholder="Your Message"
                  className="resize-none border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3aaacf] focus:outline-none focus:ring-0"
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
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
