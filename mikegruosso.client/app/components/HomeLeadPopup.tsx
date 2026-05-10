"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type LeadFields = {
  fullName: string;
  email: string;
  phone: string;
};

const STORAGE_KEY = "gruosso-home-lead-popup-seen";

const inputClass =
  "w-full rounded-none border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3aaacf] focus:outline-none focus:ring-0";

function emptyLeadFields(): LeadFields {
  return {
    fullName: "",
    email: "",
    phone: "",
  };
}

export default function HomeLeadPopup() {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [fields, setFields] = useState<LeadFields>(() => emptyLeadFields());
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formReady = useMemo(() => {
    return Boolean(
      fields.fullName.trim() && fields.email.trim() && fields.phone.trim(),
    );
  }, [fields]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") return;

    const timer = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function submitLead(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formReady) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("sending");
    setErrorMessage(null);

    const payload = {
      fullName: fields.fullName.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
      interest: "",
      message: "",
    };

    try {
      const res = await fetch("/api/leads/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setFormKey((key) => key + 1);
      setFields(emptyLeadFields());
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/65 px-4 py-5 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="home-lead-popup-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        onClick={() => setOpen(false)}
        aria-label="Close popup"
      />

      <div className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-lg bg-white shadow-2xl">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close popup"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="max-h-[calc(100vh-40px)] overflow-y-auto px-5 pb-6 pt-9 sm:px-8 sm:pb-8 sm:pt-10">
          <style>{`
            .home-lead-popup-form input:-webkit-autofill,
            .home-lead-popup-form input:-webkit-autofill:hover,
            .home-lead-popup-form input:-webkit-autofill:focus,
            .home-lead-popup-form input:-webkit-autofill:active {
              -webkit-text-fill-color: #111827;
              -webkit-box-shadow: 0 0 0px 1000px #ffffff inset;
              box-shadow: 0 0 0px 1000px #ffffff inset;
              caret-color: #111827;
              transition: background-color 5000s ease-in-out 0s;
            }
          `}</style>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#3aaacf] font-[family-name:var(--font-manrope)]">
            The Gruosso Group
          </p>
          <h2
            id="home-lead-popup-title"
            className="mb-4 pr-10 text-[30px] font-normal leading-tight tracking-wide text-gray-900 sm:text-[38px] font-[family-name:var(--font-cormorant-garamond)]"
          >
            Let&apos;s Talk About Your Real Estate Goals
          </h2>
          <p className="mb-7 text-sm leading-relaxed text-gray-600 font-[family-name:var(--font-karla)]">
            Share your contact details and our team will reach out with helpful
            next steps.
          </p>

          {status === "success" ? (
            <div className="rounded-md border border-green-200 bg-green-50 px-4 py-4">
              <p className="text-sm font-medium text-green-800" role="status">
                Thank you. We received your details and will be in touch soon.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded bg-[#3aaacf] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#2f95b6] font-[family-name:var(--font-manrope)]"
              >
                Close
              </button>
            </div>
          ) : (
            <form
              key={formKey}
              onSubmit={(event) => {
                void submitLead(event);
              }}
              className="home-lead-popup-form flex flex-col gap-5 font-[family-name:var(--font-manrope)]"
            >
              <div>
                <label htmlFor="popup-full-name" className="sr-only">
                  Full name
                </label>
                <input
                  id="popup-full-name"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  required
                  value={fields.fullName}
                  onChange={(event) =>
                    setFields((previous) => ({
                      ...previous,
                      fullName: event.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="popup-email" className="sr-only">
                  Email
                </label>
                <input
                  id="popup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  value={fields.email}
                  onChange={(event) =>
                    setFields((previous) => ({
                      ...previous,
                      email: event.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="popup-phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="popup-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone Number"
                  required
                  value={fields.phone}
                  onChange={(event) =>
                    setFields((previous) => ({
                      ...previous,
                      phone: event.target.value,
                    }))
                  }
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || !formReady}
                aria-disabled={status === "sending" || !formReady}
                className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded bg-[#3aaacf] px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#2f95b6] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Submit"}
              </button>

              {status === "error" && errorMessage ? (
                <p className="text-sm font-medium text-red-600" role="alert">
                  {errorMessage}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
