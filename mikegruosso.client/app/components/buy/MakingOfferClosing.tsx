"use client";

import { useState, type FormEvent } from "react";

import LeadFormSelect, {
  type LeadFormOption,
} from "./LeadFormSelect";

type MakingOfferClosingProps = {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  formTitle?: string;
  /** Buyer (`purchase`), seller (`sell`), investor (`investment`), commercial inquiry (`commercial`), or default contact (`contact`). */
  leadFormVariant?:
    | "contact"
    | "purchase"
    | "sell"
    | "investment"
    | "commercial";
  /** Optional anchor id (used by hero CTAs that scroll to the form). */
  formAnchorId?: string;
  sectionClassName?: string;
  headingClassName?: string;
  formHeadingClassName?: string;
};

const purchaseBudgetOptions: LeadFormOption[] = [
  { value: "under-400k", label: "Under $400,000" },
  { value: "400k-600k", label: "$400,000 to $600,000" },
  { value: "600k-800k", label: "$600,000 to $800,000" },
  { value: "800k-1m", label: "$800,000 to $1,000,000" },
  { value: "1m-1.5m", label: "$1,000,000 to $1,500,000" },
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
  { value: "1-3-months", label: "1 to 3 months" },
  { value: "3-6-months", label: "3 to 6 months" },
  { value: "6-12-months", label: "6 to 12 months" },
  { value: "exploring", label: "Just exploring" },
];

const investmentTypeOptions: LeadFormOption[] = [
  { value: "residential-rental", label: "Residential rental / buy and hold" },
  { value: "fix-flip", label: "Fix and flip" },
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

const commercialPropertyTypeOptions: LeadFormOption[] = [
  { value: "retail", label: "Retail" },
  { value: "office", label: "Office" },
  { value: "industrial", label: "Industrial" },
  { value: "mixed-use", label: "Mixed-use" },
  { value: "land", label: "Land" },
  { value: "development", label: "Development site" },
  { value: "hospitality", label: "Hospitality" },
  { value: "investment", label: "Investment property" },
  { value: "other", label: "Other / not sure" },
];

const commercialBudgetOptions: LeadFormOption[] = [
  { value: "under-500k", label: "Under $500,000" },
  { value: "500k-1m", label: "$500,000 to $1,000,000" },
  { value: "1m-2.5m", label: "$1,000,000 to $2,500,000" },
  { value: "2.5m-5m", label: "$2,500,000 to $5,000,000" },
  { value: "5m-10m", label: "$5,000,000 to $10,000,000" },
  { value: "10m-plus", label: "$10,000,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

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
  formAnchorId,
  sectionClassName = "w-full bg-white pt-10 sm:pt-12 pb-24 sm:pb-32",
  headingClassName = "text-[30px] lg:text-[36px]",
  formHeadingClassName = "text-[30px] lg:text-[36px]",
}: MakingOfferClosingProps) {
  const [buyerFormKey, setBuyerFormKey] = useState(0);
  const [buyerStatus, setBuyerStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [buyerError, setBuyerError] = useState<string | null>(null);

  const [sellerFormKey, setSellerFormKey] = useState(0);
  const [sellerStatus, setSellerStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [sellerError, setSellerError] = useState<string | null>(null);

  const [investmentFormKey, setInvestmentFormKey] = useState(0);
  const [investmentStatus, setInvestmentStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [investmentError, setInvestmentError] = useState<string | null>(null);

  const [commercialFormKey, setCommercialFormKey] = useState(0);
  const [commercialStatus, setCommercialStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [commercialError, setCommercialError] = useState<string | null>(null);

  async function submitBuyerToGhl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBuyerStatus("sending");
    setBuyerError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      preferredArea: String(fd.get("preferredArea") ?? ""),
      budgetRange: String(fd.get("budgetRange") ?? ""),
      propertyType: String(fd.get("propertyType") ?? ""),
      timeline: String(fd.get("timeline") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/leads/buyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setBuyerStatus("error");
        setBuyerError(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }
      setBuyerFormKey((k) => k + 1);
      setBuyerStatus("success");
      form.reset();
    } catch {
      setBuyerStatus("error");
      setBuyerError(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  async function submitSellerToGhl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSellerStatus("sending");
    setSellerError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      propertyAddress: String(fd.get("propertyAddress") ?? ""),
      propertyType: String(fd.get("propertyType") ?? ""),
      expectedTimeline: String(fd.get("expectedTimeline") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/leads/seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSellerStatus("error");
        setSellerError(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }
      setSellerFormKey((k) => k + 1);
      setSellerStatus("success");
      form.reset();
    } catch {
      setSellerStatus("error");
      setSellerError(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  async function submitInvestmentToGhl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setInvestmentStatus("sending");
    setInvestmentError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      investmentType: String(fd.get("investmentType") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      preferredArea: String(fd.get("preferredArea") ?? ""),
      timeline: String(fd.get("timeline") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/leads/investment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setInvestmentStatus("error");
        setInvestmentError(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }
      setInvestmentFormKey((k) => k + 1);
      setInvestmentStatus("success");
      form.reset();
    } catch {
      setInvestmentStatus("error");
      setInvestmentError(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  async function submitCommercialToGhl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCommercialStatus("sending");
    setCommercialError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      propertyType: String(fd.get("propertyType") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      preferredLocation: String(fd.get("preferredLocation") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    try {
      const res = await fetch("/api/leads/commercial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setCommercialStatus("error");
        setCommercialError(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }
      setCommercialFormKey((k) => k + 1);
      setCommercialStatus("success");
      form.reset();
    } catch {
      setCommercialStatus("error");
      setCommercialError(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  const resolvedFormTitle =
    formTitle ??
    (leadFormVariant === "purchase"
      ? "Start Your Home Search"
      : leadFormVariant === "sell"
        ? "My Home Value"
        : leadFormVariant === "investment"
          ? "Get Investment Deals"
          : leadFormVariant === "commercial"
            ? "Request Commercial Info"
            : "Request A Call");

  return (
    <section id={formAnchorId} className={sectionClassName}>
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
              key={
                leadFormVariant === "purchase"
                  ? `purchase-${buyerFormKey}`
                  : leadFormVariant === "sell"
                    ? `sell-${sellerFormKey}`
                    : leadFormVariant === "investment"
                      ? `investment-${investmentFormKey}`
                      : leadFormVariant === "commercial"
                        ? `commercial-${commercialFormKey}`
                        : leadFormVariant
              }
              action={
                leadFormVariant === "purchase" ||
                leadFormVariant === "sell" ||
                leadFormVariant === "investment" ||
                leadFormVariant === "commercial"
                  ? undefined
                  : "/contact"
              }
              method="post"
              onSubmit={
                leadFormVariant === "purchase"
                  ? (ev) => {
                      void submitBuyerToGhl(ev);
                    }
                  : leadFormVariant === "sell"
                    ? (ev) => {
                        void submitSellerToGhl(ev);
                      }
                    : leadFormVariant === "investment"
                      ? (ev) => {
                          void submitInvestmentToGhl(ev);
                        }
                      : leadFormVariant === "commercial"
                        ? (ev) => {
                            void submitCommercialToGhl(ev);
                          }
                        : undefined
              }
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
                      disabled={buyerStatus === "sending"}
                      className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {buyerStatus === "sending"
                        ? "Sending…"
                        : "Start Your Home Search"}
                    </button>
                  </div>
                  {buyerStatus === "success" ? (
                    <p
                      className="text-sm font-medium text-green-700"
                      role="status"
                    >
                      Thank you — we received your request and will be in touch
                      soon.
                    </p>
                  ) : null}
                  {buyerStatus === "error" && buyerError ? (
                    <p
                      className="text-sm font-medium text-red-600"
                      role="alert"
                    >
                      {buyerError}
                    </p>
                  ) : null}
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
                      disabled={sellerStatus === "sending"}
                      className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {sellerStatus === "sending"
                        ? "Sending…"
                        : "Request Home Value"}
                    </button>
                  </div>
                  {sellerStatus === "success" ? (
                    <p
                      className="text-sm font-medium text-green-700"
                      role="status"
                    >
                      Thank you — we received your request and will be in touch
                      soon.
                    </p>
                  ) : null}
                  {sellerStatus === "error" && sellerError ? (
                    <p
                      className="text-sm font-medium text-red-600"
                      role="alert"
                    >
                      {sellerError}
                    </p>
                  ) : null}
                </>
              ) : leadFormVariant === "commercial" ? (
                <>
                  <div className="flex flex-col">
                    <label htmlFor="com-full-name" className={labelClass}>
                      Full Name
                    </label>
                    <input
                      id="com-full-name"
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
                      <label htmlFor="com-email" className={labelClass}>
                        Email
                      </label>
                      <input
                        id="com-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="com-phone" className={labelClass}>
                        Phone
                      </label>
                      <input
                        id="com-phone"
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
                      name="propertyType"
                      label="Property Type"
                      placeholder="Select property type"
                      options={commercialPropertyTypeOptions}
                      labelClassName={labelClass}
                    />
                    <LeadFormSelect
                      name="budget"
                      label="Budget"
                      placeholder="Select budget range"
                      options={commercialBudgetOptions}
                      labelClassName={labelClass}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="com-preferred-location" className={labelClass}>
                      Preferred Location
                    </label>
                    <input
                      id="com-preferred-location"
                      name="preferredLocation"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Preferred Location"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="com-message" className={labelClass}>
                      Message
                    </label>
                    <textarea
                      id="com-message"
                      name="message"
                      rows={4}
                      placeholder="Message"
                      className={`resize-none ${inputClass}`}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={commercialStatus === "sending"}
                      className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {commercialStatus === "sending"
                        ? "Sending…"
                        : "Submit Inquiry"}
                    </button>
                  </div>
                  {commercialStatus === "success" ? (
                    <p
                      className="text-sm font-medium text-green-700"
                      role="status"
                    >
                      Thank you — we received your request and will be in touch
                      soon.
                    </p>
                  ) : null}
                  {commercialStatus === "error" && commercialError ? (
                    <p
                      className="text-sm font-medium text-red-600"
                      role="alert"
                    >
                      {commercialError}
                    </p>
                  ) : null}
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
                      disabled={investmentStatus === "sending"}
                      className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {investmentStatus === "sending"
                        ? "Sending…"
                        : "Get Investment Opportunities"}
                    </button>
                  </div>
                  {investmentStatus === "success" ? (
                    <p
                      className="text-sm font-medium text-green-700"
                      role="status"
                    >
                      Thank you — we received your request and will be in touch
                      soon.
                    </p>
                  ) : null}
                  {investmentStatus === "error" && investmentError ? (
                    <p
                      className="text-sm font-medium text-red-600"
                      role="alert"
                    >
                      {investmentError}
                    </p>
                  ) : null}
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
