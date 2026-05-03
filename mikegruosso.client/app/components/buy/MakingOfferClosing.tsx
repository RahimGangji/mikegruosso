"use client";

import { useMemo, useState, type FormEvent } from "react";

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

type BuyerPurchaseFields = {
  fullName: string;
  email: string;
  phone: string;
  preferredArea: string;
  budgetRange: string;
  propertyType: string;
  timeline: string;
};

function emptyBuyerPurchaseFields(): BuyerPurchaseFields {
  return {
    fullName: "",
    email: "",
    phone: "",
    preferredArea: "",
    budgetRange: "",
    propertyType: "",
    timeline: "",
  };
}

type SellerListingFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  propertyType: string;
  expectedTimeline: string;
};

function emptySellerListingFields(): SellerListingFields {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "",
    expectedTimeline: "",
  };
}

type InvestmentListingFields = {
  fullName: string;
  email: string;
  phone: string;
  investmentType: string;
  budget: string;
  preferredArea: string;
  timeline: string;
};

function emptyInvestmentListingFields(): InvestmentListingFields {
  return {
    fullName: "",
    email: "",
    phone: "",
    investmentType: "",
    budget: "",
    preferredArea: "",
    timeline: "",
  };
}

type CommercialListingFields = {
  fullName: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  preferredLocation: string;
};

function emptyCommercialListingFields(): CommercialListingFields {
  return {
    fullName: "",
    email: "",
    phone: "",
    propertyType: "",
    budget: "",
    preferredLocation: "",
  };
}

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

  const [purchaseFields, setPurchaseFields] = useState<BuyerPurchaseFields>(
    emptyBuyerPurchaseFields,
  );

  const purchaseFormReady = useMemo(() => {
    const fullName = purchaseFields.fullName.trim();
    const email = purchaseFields.email.trim();
    const phone = purchaseFields.phone.trim();
    const preferredArea = purchaseFields.preferredArea.trim();
    const { budgetRange, propertyType, timeline } = purchaseFields;
    return (
      Boolean(fullName) &&
      Boolean(email) &&
      Boolean(phone) &&
      Boolean(preferredArea) &&
      Boolean(budgetRange) &&
      Boolean(propertyType) &&
      Boolean(timeline)
    );
  }, [purchaseFields]);

  const [sellerFormKey, setSellerFormKey] = useState(0);
  const [sellerStatus, setSellerStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [sellerError, setSellerError] = useState<string | null>(null);

  const [sellerFields, setSellerFields] = useState<SellerListingFields>(
    emptySellerListingFields,
  );

  const sellerFormReady = useMemo(() => {
    const firstName = sellerFields.firstName.trim();
    const lastName = sellerFields.lastName.trim();
    const email = sellerFields.email.trim();
    const phone = sellerFields.phone.trim();
    const propertyAddress = sellerFields.propertyAddress.trim();
    const { propertyType, expectedTimeline } = sellerFields;
    return (
      Boolean(firstName) &&
      Boolean(lastName) &&
      Boolean(email) &&
      Boolean(phone) &&
      Boolean(propertyAddress) &&
      Boolean(propertyType) &&
      Boolean(expectedTimeline)
    );
  }, [sellerFields]);

  const [investmentFormKey, setInvestmentFormKey] = useState(0);
  const [investmentStatus, setInvestmentStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [investmentError, setInvestmentError] = useState<string | null>(null);

  const [investmentFields, setInvestmentFields] =
    useState<InvestmentListingFields>(emptyInvestmentListingFields);

  const investmentFormReady = useMemo(() => {
    const fullName = investmentFields.fullName.trim();
    const email = investmentFields.email.trim();
    const phone = investmentFields.phone.trim();
    const preferredArea = investmentFields.preferredArea.trim();
    const { investmentType, budget, timeline } = investmentFields;
    return (
      Boolean(fullName) &&
      Boolean(email) &&
      Boolean(phone) &&
      Boolean(preferredArea) &&
      Boolean(investmentType) &&
      Boolean(budget) &&
      Boolean(timeline)
    );
  }, [investmentFields]);

  const [commercialFormKey, setCommercialFormKey] = useState(0);
  const [commercialStatus, setCommercialStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [commercialError, setCommercialError] = useState<string | null>(null);

  const [commercialFields, setCommercialFields] =
    useState<CommercialListingFields>(emptyCommercialListingFields);

  const commercialFormReady = useMemo(() => {
    const fullName = commercialFields.fullName.trim();
    const email = commercialFields.email.trim();
    const phone = commercialFields.phone.trim();
    const preferredLocation = commercialFields.preferredLocation.trim();
    const { propertyType, budget } = commercialFields;
    return (
      Boolean(fullName) &&
      Boolean(email) &&
      Boolean(phone) &&
      Boolean(preferredLocation) &&
      Boolean(propertyType) &&
      Boolean(budget)
    );
  }, [commercialFields]);

  async function submitBuyerToGhl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!purchaseFormReady) {
      setBuyerError("Please complete all required fields.");
      return;
    }

    setBuyerError(null);

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setBuyerStatus("sending");
    const fd = new FormData(form);
    const payload = {
      fullName: purchaseFields.fullName.trim(),
      email: purchaseFields.email.trim(),
      phone: purchaseFields.phone.trim(),
      preferredArea: purchaseFields.preferredArea.trim(),
      budgetRange: purchaseFields.budgetRange.trim(),
      propertyType: purchaseFields.propertyType.trim(),
      timeline: purchaseFields.timeline.trim(),
      message: String(fd.get("message") ?? ""),
    };
    if (
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.preferredArea ||
      !payload.budgetRange ||
      !payload.propertyType ||
      !payload.timeline
    ) {
      setBuyerStatus("idle");
      setBuyerError("Please complete all required fields.");
      return;
    }
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
      setPurchaseFields(emptyBuyerPurchaseFields());
      setBuyerStatus("success");
    } catch {
      setBuyerStatus("error");
      setBuyerError(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  async function submitSellerToGhl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!sellerFormReady) {
      setSellerError("Please complete all required fields.");
      return;
    }
    setSellerError(null);
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSellerStatus("sending");
    const fd = new FormData(form);
    const payload = {
      firstName: sellerFields.firstName.trim(),
      lastName: sellerFields.lastName.trim(),
      email: sellerFields.email.trim(),
      phone: sellerFields.phone.trim(),
      propertyAddress: sellerFields.propertyAddress.trim(),
      propertyType: sellerFields.propertyType.trim(),
      expectedTimeline: sellerFields.expectedTimeline.trim(),
      message: String(fd.get("message") ?? ""),
    };
    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.phone ||
      !payload.propertyAddress ||
      !payload.propertyType ||
      !payload.expectedTimeline
    ) {
      setSellerStatus("idle");
      setSellerError("Please complete all required fields.");
      return;
    }
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
      setSellerFields(emptySellerListingFields());
      setSellerStatus("success");
    } catch {
      setSellerStatus("error");
      setSellerError(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  async function submitInvestmentToGhl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!investmentFormReady) {
      setInvestmentError("Please complete all required fields.");
      return;
    }
    setInvestmentError(null);
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setInvestmentStatus("sending");
    const fd = new FormData(form);
    const payload = {
      fullName: investmentFields.fullName.trim(),
      email: investmentFields.email.trim(),
      phone: investmentFields.phone.trim(),
      investmentType: investmentFields.investmentType.trim(),
      budget: investmentFields.budget.trim(),
      preferredArea: investmentFields.preferredArea.trim(),
      timeline: investmentFields.timeline.trim(),
      message: String(fd.get("message") ?? ""),
    };
    if (
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.investmentType ||
      !payload.budget ||
      !payload.preferredArea ||
      !payload.timeline
    ) {
      setInvestmentStatus("idle");
      setInvestmentError("Please complete all required fields.");
      return;
    }
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
      setInvestmentFields(emptyInvestmentListingFields());
      setInvestmentStatus("success");
    } catch {
      setInvestmentStatus("error");
      setInvestmentError(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  async function submitCommercialToGhl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!commercialFormReady) {
      setCommercialError("Please complete all required fields.");
      return;
    }
    setCommercialError(null);
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setCommercialStatus("sending");
    const fd = new FormData(form);
    const payload = {
      fullName: commercialFields.fullName.trim(),
      email: commercialFields.email.trim(),
      phone: commercialFields.phone.trim(),
      propertyType: commercialFields.propertyType.trim(),
      budget: commercialFields.budget.trim(),
      preferredLocation: commercialFields.preferredLocation.trim(),
      message: String(fd.get("message") ?? ""),
    };
    if (
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.propertyType ||
      !payload.budget ||
      !payload.preferredLocation
    ) {
      setCommercialStatus("idle");
      setCommercialError("Please complete all required fields.");
      return;
    }
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
      setCommercialFields(emptyCommercialListingFields());
      setCommercialStatus("success");
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
              className="text-[16px] font-semibold uppercase tracking-[0.2em] text-[#3aaacf] mb-8 font-[family-name:var(--font-manrope)]"
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
                      Full Name{" "}
                      <span className="text-red-600" aria-hidden>
                        *
                      </span>
                    </label>
                    <input
                      id="moc-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Full Name"
                      required
                      value={purchaseFields.fullName}
                      onChange={(e) =>
                        setPurchaseFields((p) => ({
                          ...p,
                          fullName: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="moc-email" className={labelClass}>
                        Email{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="moc-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        required
                        value={purchaseFields.email}
                        onChange={(e) =>
                          setPurchaseFields((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="moc-phone" className={labelClass}>
                        Phone{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="moc-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone"
                        required
                        value={purchaseFields.phone}
                        onChange={(e) =>
                          setPurchaseFields((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="moc-preferred-area" className={labelClass}>
                      Preferred Area{" "}
                      <span className="text-red-600" aria-hidden>
                        *
                      </span>
                    </label>
                    <input
                      id="moc-preferred-area"
                      name="preferredArea"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Preferred Area"
                      required
                      value={purchaseFields.preferredArea}
                      onChange={(e) =>
                        setPurchaseFields((p) => ({
                          ...p,
                          preferredArea: e.target.value,
                        }))
                      }
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
                      required
                      value={purchaseFields.budgetRange}
                      onValueChange={(v) =>
                        setPurchaseFields((p) => ({ ...p, budgetRange: v }))
                      }
                    />
                    <LeadFormSelect
                      name="propertyType"
                      label="Property Type"
                      placeholder="Select property type"
                      options={purchasePropertyTypeOptions}
                      labelClassName={labelClass}
                      required
                      value={purchaseFields.propertyType}
                      onValueChange={(v) =>
                        setPurchaseFields((p) => ({ ...p, propertyType: v }))
                      }
                    />
                  </div>

                  <LeadFormSelect
                    name="timeline"
                    label="Timeline"
                    placeholder="Select timeline"
                    options={purchaseTimelineOptions}
                    labelClassName={labelClass}
                    required
                    value={purchaseFields.timeline}
                    onValueChange={(v) =>
                      setPurchaseFields((p) => ({ ...p, timeline: v }))
                    }
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
                      disabled={
                        buyerStatus === "sending" || !purchaseFormReady
                      }
                      aria-disabled={
                        buyerStatus === "sending" || !purchaseFormReady
                      }
                      title={
                        !purchaseFormReady
                          ? "Complete all required fields to submit"
                          : undefined
                      }
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
                        First Name{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="sell-first-name"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        placeholder="First Name"
                        required
                        value={sellerFields.firstName}
                        onChange={(e) =>
                          setSellerFields((p) => ({
                            ...p,
                            firstName: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="sell-last-name" className={labelClass}>
                        Last Name{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="sell-last-name"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Last Name"
                        required
                        value={sellerFields.lastName}
                        onChange={(e) =>
                          setSellerFields((p) => ({
                            ...p,
                            lastName: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="sell-email" className={labelClass}>
                        Email Address{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="sell-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email Address"
                        required
                        value={sellerFields.email}
                        onChange={(e) =>
                          setSellerFields((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="sell-phone" className={labelClass}>
                        Phone Number{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="sell-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone Number"
                        required
                        value={sellerFields.phone}
                        onChange={(e) =>
                          setSellerFields((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="sell-property-address" className={labelClass}>
                      Property Address{" "}
                      <span className="text-red-600" aria-hidden>
                        *
                      </span>
                    </label>
                    <input
                      id="sell-property-address"
                      name="propertyAddress"
                      type="text"
                      autoComplete="street-address"
                      placeholder="Property Address"
                      required
                      value={sellerFields.propertyAddress}
                      onChange={(e) =>
                        setSellerFields((p) => ({
                          ...p,
                          propertyAddress: e.target.value,
                        }))
                      }
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
                      required
                      value={sellerFields.propertyType}
                      onValueChange={(v) =>
                        setSellerFields((p) => ({ ...p, propertyType: v }))
                      }
                    />
                    <LeadFormSelect
                      name="expectedTimeline"
                      label="Expected Timeline"
                      placeholder="Select expected timeline"
                      options={sellerExpectedTimelineOptions}
                      labelClassName={labelClass}
                      required
                      value={sellerFields.expectedTimeline}
                      onValueChange={(v) =>
                        setSellerFields((p) => ({
                          ...p,
                          expectedTimeline: v,
                        }))
                      }
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
                      disabled={
                        sellerStatus === "sending" || !sellerFormReady
                      }
                      aria-disabled={
                        sellerStatus === "sending" || !sellerFormReady
                      }
                      title={
                        !sellerFormReady
                          ? "Complete all required fields to submit"
                          : undefined
                      }
                      className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide disabled:cursor-not-allowed disabled:opacity-60"
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
                      Full Name{" "}
                      <span className="text-red-600" aria-hidden>
                        *
                      </span>
                    </label>
                    <input
                      id="com-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Full Name"
                      required
                      value={commercialFields.fullName}
                      onChange={(e) =>
                        setCommercialFields((p) => ({
                          ...p,
                          fullName: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="com-email" className={labelClass}>
                        Email{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="com-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        required
                        value={commercialFields.email}
                        onChange={(e) =>
                          setCommercialFields((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="com-phone" className={labelClass}>
                        Phone{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="com-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone"
                        required
                        value={commercialFields.phone}
                        onChange={(e) =>
                          setCommercialFields((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
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
                      required
                      value={commercialFields.propertyType}
                      onValueChange={(v) =>
                        setCommercialFields((p) => ({
                          ...p,
                          propertyType: v,
                        }))
                      }
                    />
                    <LeadFormSelect
                      name="budget"
                      label="Budget"
                      placeholder="Select budget range"
                      options={commercialBudgetOptions}
                      labelClassName={labelClass}
                      required
                      value={commercialFields.budget}
                      onValueChange={(v) =>
                        setCommercialFields((p) => ({ ...p, budget: v }))
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="com-preferred-location" className={labelClass}>
                      Preferred Location{" "}
                      <span className="text-red-600" aria-hidden>
                        *
                      </span>
                    </label>
                    <input
                      id="com-preferred-location"
                      name="preferredLocation"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Preferred Location"
                      required
                      value={commercialFields.preferredLocation}
                      onChange={(e) =>
                        setCommercialFields((p) => ({
                          ...p,
                          preferredLocation: e.target.value,
                        }))
                      }
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
                      disabled={
                        commercialStatus === "sending" || !commercialFormReady
                      }
                      aria-disabled={
                        commercialStatus === "sending" || !commercialFormReady
                      }
                      title={
                        !commercialFormReady
                          ? "Complete all required fields to submit"
                          : undefined
                      }
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
                      Name{" "}
                      <span className="text-red-600" aria-hidden>
                        *
                      </span>
                    </label>
                    <input
                      id="inv-full-name"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Name"
                      required
                      value={investmentFields.fullName}
                      onChange={(e) =>
                        setInvestmentFields((p) => ({
                          ...p,
                          fullName: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                      <label htmlFor="inv-email" className={labelClass}>
                        Email{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="inv-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        required
                        value={investmentFields.email}
                        onChange={(e) =>
                          setInvestmentFields((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="inv-phone" className={labelClass}>
                        Phone{" "}
                        <span className="text-red-600" aria-hidden>
                          *
                        </span>
                      </label>
                      <input
                        id="inv-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone"
                        required
                        value={investmentFields.phone}
                        onChange={(e) =>
                          setInvestmentFields((p) => ({
                            ...p,
                            phone: e.target.value,
                          }))
                        }
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
                      required
                      value={investmentFields.investmentType}
                      onValueChange={(v) =>
                        setInvestmentFields((p) => ({
                          ...p,
                          investmentType: v,
                        }))
                      }
                    />
                    <LeadFormSelect
                      name="budget"
                      label="Budget"
                      placeholder="Select budget range"
                      options={investmentBudgetOptions}
                      labelClassName={labelClass}
                      required
                      value={investmentFields.budget}
                      onValueChange={(v) =>
                        setInvestmentFields((p) => ({ ...p, budget: v }))
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="inv-preferred-area" className={labelClass}>
                      Preferred Area{" "}
                      <span className="text-red-600" aria-hidden>
                        *
                      </span>
                    </label>
                    <input
                      id="inv-preferred-area"
                      name="preferredArea"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Preferred Area"
                      required
                      value={investmentFields.preferredArea}
                      onChange={(e) =>
                        setInvestmentFields((p) => ({
                          ...p,
                          preferredArea: e.target.value,
                        }))
                      }
                      className={inputClass}
                    />
                  </div>

                  <LeadFormSelect
                    name="timeline"
                    label="Timeline"
                    placeholder="Select timeline"
                    options={investmentTimelineOptions}
                    labelClassName={labelClass}
                    required
                    value={investmentFields.timeline}
                    onValueChange={(v) =>
                      setInvestmentFields((p) => ({ ...p, timeline: v }))
                    }
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
                      disabled={
                        investmentStatus === "sending" || !investmentFormReady
                      }
                      aria-disabled={
                        investmentStatus === "sending" || !investmentFormReady
                      }
                      title={
                        !investmentFormReady
                          ? "Complete all required fields to submit"
                          : undefined
                      }
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
