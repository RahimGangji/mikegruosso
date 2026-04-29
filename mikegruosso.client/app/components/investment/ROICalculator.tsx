"use client";

import { useState, useMemo } from "react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function calcMonthlyMortgage(principal: number, annualRatePct: number, years: number) {
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

type SliderProps = {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
};

function Slider({ label, hint, value, min, max, step, format, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800 font-[family-name:var(--font-manrope)]">
            {label}
          </span>
          {hint && (
            <span className="text-[11px] text-gray-400 font-[family-name:var(--font-karla)]">{hint}</span>
          )}
        </div>
        <span className="flex-shrink-0 text-sm font-bold text-[#3aaacf] font-[family-name:var(--font-manrope)]">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#3aaacf] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#3aaacf] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
        style={{
          background: `linear-gradient(to right, #3aaacf ${pct}%, #e5e7eb ${pct}%)`,
        }}
      />
      <div className="flex justify-between text-[11px] text-gray-400 font-[family-name:var(--font-karla)]">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const [propertyValue, setPropertyValue] = useState(400000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [monthlyRent, setMonthlyRent] = useState(2800);
  const [expensePct, setExpensePct] = useState(35);

  const calc = useMemo(() => {
    const downPayment = (propertyValue * downPaymentPct) / 100;
    const loanAmount = propertyValue - downPayment;
    const monthlyMortgage = calcMonthlyMortgage(loanAmount, 7, 30);
    const annualRent = monthlyRent * 12;
    const annualExpenses = annualRent * (expensePct / 100);
    const noi = annualRent - annualExpenses;
    const annualCashFlow = noi - monthlyMortgage * 12;
    const monthlyCashFlow = annualCashFlow / 12;
    const cashOnCash = downPayment > 0 ? (annualCashFlow / downPayment) * 100 : 0;
    const capRate = propertyValue > 0 ? (noi / propertyValue) * 100 : 0;
    return { downPayment, monthlyMortgage, monthlyCashFlow, annualCashFlow, cashOnCash, capRate };
  }, [propertyValue, downPaymentPct, monthlyRent, expensePct]);

  const positive = calc.monthlyCashFlow >= 0;

  return (
    <section className="w-full bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <div className="flex items-center gap-3 mb-4">
          <span className="block h-px w-8 bg-black" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black font-[family-name:var(--font-manrope)]">
            ROI Calculator
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-normal leading-tight tracking-wide text-gray-900 mb-4 font-[family-name:var(--font-cormorant-garamond)]">
          Estimate Your Investment Returns
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mb-12 font-[family-name:var(--font-karla)]">
          Adjust the sliders to model your potential return on any property. Figures assume a 30-year fixed mortgage at 7% and are for planning purposes only.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Sliders */}
          <div className="flex flex-col gap-8 bg-[#f8f9fa] p-8">
            <Slider
              label="Property Value"
              value={propertyValue}
              min={100000}
              max={2000000}
              step={10000}
              format={formatCurrency}
              onChange={setPropertyValue}
            />
            <Slider
              label="Down Payment"
              value={downPaymentPct}
              min={5}
              max={40}
              step={1}
              format={(v) => `${v}%`}
              onChange={setDownPaymentPct}
            />
            <Slider
              label="Monthly Rent"
              value={monthlyRent}
              min={500}
              max={10000}
              step={100}
              format={formatCurrency}
              onChange={setMonthlyRent}
            />
            <Slider
              label="Annual Expenses"
              hint="vacancy, taxes, insurance, maintenance"
              value={expensePct}
              min={10}
              max={60}
              step={1}
              format={(v) => `${v}%`}
              onChange={setExpensePct}
            />
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4">

            {/* Primary metric */}
            <div className={`p-8 flex flex-col gap-1 ${positive ? "bg-[#3aaacf]" : "bg-gray-700"}`}>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 font-[family-name:var(--font-manrope)]">
                Monthly Cash Flow
              </span>
              <span className="text-[56px] leading-none font-normal text-white font-[family-name:var(--font-cormorant-garamond)]">
                {formatCurrency(calc.monthlyCashFlow)}
              </span>
              <span className="text-white/70 text-sm mt-1 font-[family-name:var(--font-karla)]">
                {formatCurrency(calc.annualCashFlow)} annually after mortgage and expenses
              </span>
            </div>

            {/* Secondary metrics */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Cap Rate",       value: `${calc.capRate.toFixed(2)}%`             },
                { label: "Cash on Cash",   value: `${calc.cashOnCash.toFixed(2)}%`           },
                { label: "Down Payment",   value: formatCurrency(calc.downPayment)            },
                { label: "Est. Mortgage",  value: `${formatCurrency(calc.monthlyMortgage)}/mo` },
              ].map((m) => (
                <div key={m.label} className="bg-[#f8f9fa] p-5 flex flex-col gap-1">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400 font-[family-name:var(--font-manrope)]">
                    {m.label}
                  </span>
                  <span className="text-2xl font-normal text-gray-900 font-[family-name:var(--font-cormorant-garamond)]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed font-[family-name:var(--font-karla)]">
              Results are estimates for illustrative purposes only and do not constitute financial advice. Consult a licensed professional before making any investment decision.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
