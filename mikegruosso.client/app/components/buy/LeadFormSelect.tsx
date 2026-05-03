"use client";

import { useEffect, useId, useRef, useState } from "react";

export type LeadFormOption = { value: string; label: string };

const triggerBase =
  "flex w-full min-h-[38px] items-center justify-between gap-3 border-0 border-b border-gray-300 bg-transparent px-0 py-2 text-left text-sm text-gray-900 transition-colors focus-visible:border-[#3aaacf] focus-visible:outline-none focus-visible:ring-0";

/** Outside-click check: scrollbar / overlay quirks can yield e.target outside the DOM subtree. */
function pointerEventIsInside(wrapper: HTMLElement | null, e: MouseEvent | TouchEvent) {
  if (!wrapper) return false;
  if (wrapper.contains(e.target as Node)) return true;
  for (const node of e.composedPath()) {
    if (!(node instanceof Node)) continue;
    if (wrapper.contains(node)) return true;
  }
  return false;
}

export default function LeadFormSelect({
  name,
  label,
  placeholder,
  options,
  required = false,
  /** Selected option value (`""` = none). Controlled when `value` and/or `onValueChange` is provided. */
  value: controlledValue,
  onValueChange,
  labelClassName,
}: {
  name: string;
  label: string;
  placeholder: string;
  options: LeadFormOption[];
  required?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  labelClassName: string;
}) {
  const idBase = useId();
  const listId = `${idBase}-list`;
  const [open, setOpen] = useState(false);
  const [internalPicked, setInternalPicked] = useState<LeadFormOption | null>(
    null,
  );
  const controlled =
    controlledValue !== undefined || onValueChange != null;
  const picked = controlled
    ? (options.find((o) => o.value === String(controlledValue ?? "")) ??
        null)
    : internalPicked;

  function selectOption(opt: LeadFormOption | null) {
    if (controlled) {
      onValueChange?.(opt?.value ?? "");
    } else {
      setInternalPicked(opt);
    }
  }

  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!pointerEventIsInside(wrapRef.current, e)) {
        setOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const empty = picked === null;

  return (
    <div ref={wrapRef} className="relative flex flex-col" data-lead-form-select={name}>
      <label htmlFor={idBase} className={labelClassName}>
        {label}
        {required ? (
          <span className="text-red-600" aria-hidden>
            {" "}
            *
          </span>
        ) : null}
      </label>
      <input
        type="hidden"
        name={name}
        value={picked?.value ?? ""}
        required={required && !controlled}
        onInvalid={() => {
          requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: false }));
        }}
      />
      <button
        ref={triggerRef}
        type="button"
        id={idBase}
        className={`${triggerBase} ${empty ? "text-gray-400" : ""} ${open ? "border-[#3aaacf]" : ""}`}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="min-w-0 truncate">
          {empty ? placeholder : picked.label}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-900/10 ring-1 ring-black/[0.04]"
          style={{ animation: "lead-form-dropdown-in 0.15s ease-out" }}
          onWheel={(e) => e.stopPropagation()}
        >
          <ul className="max-h-52 overflow-y-auto overscroll-contain py-1.5">
            {options.map((opt, i) => {
              const sel = picked?.value === opt.value;
              return (
                <li key={`${opt.value}-${i}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={sel}
                    tabIndex={-1}
                    className={`flex w-full items-center px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-[#3aaacf]/12 focus-visible:bg-[#3aaacf]/12 focus-visible:outline-none ${
                      sel
                        ? "bg-[#3aaacf]/10 font-semibold text-[#2a92b3]"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      selectOption(opt);
                      setOpen(false);
                      triggerRef.current?.focus({ preventScroll: true });
                    }}
                  >
                    {opt.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

    </div>
  );
}
