"use client";

import { useMemo, useState, type FormEvent } from "react";

import LeadFormSelect, {
  type LeadFormOption,
} from "../buy/LeadFormSelect";

const interestOptions: LeadFormOption[] = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "invest", label: "Invest" },
  { value: "commercial", label: "Commercial" },
  { value: "general", label: "General" },
];

const inputClass =
  "border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3aaacf] focus:outline-none focus:ring-0";

const labelClass = "text-[13px] font-semibold text-gray-900 mb-2";

type ContactFields = {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
};

function emptyContactFields(): ContactFields {
  return {
    fullName: "",
    email: "",
    phone: "",
    interest: "",
  };
}

export default function ContactSection() {
  const [formKey, setFormKey] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [contactFields, setContactFields] = useState<ContactFields>(() =>
    emptyContactFields(),
  );

  const contactFormReady = useMemo(() => {
    const fullName = contactFields.fullName.trim();
    const email = contactFields.email.trim();
    const phone = contactFields.phone.trim();
    return Boolean(fullName && email && phone && contactFields.interest);
  }, [contactFields]);

  async function submitContactToGhl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!contactFormReady) {
      setErrorMessage("Please complete all required fields.");
      return;
    }
    setErrorMessage(null);
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");
    const fd = new FormData(form);
    const payload = {
      fullName: contactFields.fullName.trim(),
      email: contactFields.email.trim(),
      phone: contactFields.phone.trim(),
      interest: contactFields.interest.trim(),
      message: String(fd.get("message") ?? ""),
    };
    if (
      !payload.fullName ||
      !payload.email ||
      !payload.phone ||
      !payload.interest
    ) {
      setStatus("idle");
      setErrorMessage("Please complete all required fields.");
      return;
    }
    try {
      const res = await fetch("/api/leads/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again.",
        );
        return;
      }
      setFormKey((k) => k + 1);
      setContactFields(emptyContactFields());
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  return (
    <section className="w-full bg-white pt-36 sm:pt-40 pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — heading, copy, address, phone */}
          <div className="flex flex-col">

            <h1 className="text-[28px] lg:text-[36px] font-normal leading-tight tracking-wide text-gray-900 mb-6 font-[family-name:var(--font-cormorant-garamond)]">
              Let&rsquo;s Talk About Your Real Estate Goals
            </h1>

            <p
              className="text-[16px] font-semibold uppercase tracking-[0.2em] text-[#3aaacf] mb-8 font-[family-name:var(--font-manrope)]"
              style={{ fontWeight: 400 }}
            >
              We&rsquo;re Ready When You Are
            </p>

            <p className="text-[14px] leading-relaxed text-[#000000] font-[family-name:var(--font-karla)] mb-10">
              Whether you&rsquo;re buying, selling, investing, or exploring
              commercial opportunities, our team is ready to help.
            </p>

            {/* Address */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=236+Norwood+Ave+Oakhurst+NJ+07755"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 py-4 border-t border-[#161f2d]/10 hover:border-[#3aaacf]/40 transition-colors"
            >
              <span className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-[#3aaacf]/35 text-[#3aaacf] transition-colors duration-300 group-hover:bg-[#3aaacf] group-hover:text-white group-hover:ring-[#3aaacf]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z"
                  />
                  <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 font-[family-name:var(--font-manrope)] mb-1">
                  Office
                </span>
                <span className="text-[15px] text-gray-900 font-[family-name:var(--font-karla)]">
                  236 Norwood Ave, Oakhurst, NJ 07755
                </span>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+17327044033,126"
              className="group flex items-start gap-4 py-4 border-t border-b border-[#161f2d]/10 hover:border-[#3aaacf]/40 transition-colors"
            >
              <span className="flex-shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-[#3aaacf]/35 text-[#3aaacf] transition-colors duration-300 group-hover:bg-[#3aaacf] group-hover:text-white group-hover:ring-[#3aaacf]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1 1 0 0 1 .97.76l1 3.6a1 1 0 0 1-.27.99l-1.7 1.7a14 14 0 0 0 6.25 6.25l1.7-1.7a1 1 0 0 1 .99-.27l3.6 1a1 1 0 0 1 .76.97v2.2A1.5 1.5 0 0 1 18.5 20H17C9.82 20 4 14.18 4 7V5.5Z"
                  />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 font-[family-name:var(--font-manrope)] mb-1">
                  Phone
                </span>
                <span className="text-[15px] text-gray-900 font-[family-name:var(--font-karla)]">
                  (732) 704-4033 ext. 126
                </span>
              </div>
            </a>

          </div>

          {/* Right — contact form */}
          <div className="w-full">
            <h2 className="text-[30px] lg:text-[36px] font-normal leading-tight tracking-wide text-gray-900 mb-8 font-[family-name:var(--font-cormorant-garamond)]">
              Send Us A Message
            </h2>

            <style>{`
              .contact-form input:-webkit-autofill,
              .contact-form input:-webkit-autofill:hover,
              .contact-form input:-webkit-autofill:focus,
              .contact-form input:-webkit-autofill:active,
              .contact-form textarea:-webkit-autofill {
                -webkit-text-fill-color: #111827;
                -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
                box-shadow: 0 0 0px 1000px #ffffff inset;
                caret-color: #111827;
                transition: background-color 5000s ease-in-out 0s;
              }
            `}</style>

            <form
              key={formKey}
              onSubmit={(ev) => {
                void submitContactToGhl(ev);
              }}
              className="contact-form flex flex-col gap-6 font-[family-name:var(--font-manrope)]"
            >
              <div className="flex flex-col">
                <label htmlFor="contact-name" className={labelClass}>
                  Name{" "}
                  <span className="text-red-600" aria-hidden>
                    *
                  </span>
                </label>
                <input
                  id="contact-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  required
                  value={contactFields.fullName}
                  onChange={(e) =>
                    setContactFields((p) => ({
                      ...p,
                      fullName: e.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="contact-email" className={labelClass}>
                    Email{" "}
                    <span className="text-red-600" aria-hidden>
                      *
                    </span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    value={contactFields.email}
                    onChange={(e) =>
                      setContactFields((p) => ({
                        ...p,
                        email: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone{" "}
                    <span className="text-red-600" aria-hidden>
                      *
                    </span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone"
                    required
                    value={contactFields.phone}
                    onChange={(e) =>
                      setContactFields((p) => ({
                        ...p,
                        phone: e.target.value,
                      }))
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <LeadFormSelect
                name="interest"
                label="Interest"
                placeholder="Select an interest"
                options={interestOptions}
                labelClassName={labelClass}
                required
                value={contactFields.interest}
                onValueChange={(v) =>
                  setContactFields((p) => ({ ...p, interest: v }))
                }
              />

              <div className="flex flex-col">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  className={`resize-none ${inputClass}`}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === "sending" || !contactFormReady}
                  aria-disabled={
                    status === "sending" || !contactFormReady
                  }
                  title={
                    !contactFormReady
                      ? "Complete all required fields to submit"
                      : undefined
                  }
                  className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </div>
              {status === "success" ? (
                <p
                  className="text-sm font-medium text-green-700"
                  role="status"
                >
                  Thank you — we received your message and will be in touch
                  soon.
                </p>
              ) : null}
              {status === "error" && errorMessage ? (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
