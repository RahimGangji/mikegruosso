import { NextResponse } from "next/server";

import {
  normalizeGhlToken,
  normalizePhone,
  parseTags,
  splitFullName,
  submitContactToGhl,
  type GhlContactFields,
} from "@/app/lib/ghlSubmitContact";

const BUDGET_LABELS: Record<string, string> = {
  "under-400k": "Under $400,000",
  "400k-600k": "$400,000 to $600,000",
  "600k-800k": "$600,000 to $800,000",
  "800k-1m": "$800,000 to $1,000,000",
  "1m-1.5m": "$1,000,000 to $1,500,000",
  "1.5m-plus": "$1,500,000+",
  "not-sure": "Not sure yet",
};

const INVESTMENT_TYPE_LABELS: Record<string, string> = {
  "residential-rental": "Residential rental / buy and hold",
  "fix-flip": "Fix and flip",
  "multi-family": "Multi-family",
  commercial: "Commercial",
  "short-term-rental": "Short-term rental",
  "land-development": "Land / development",
  "off-market": "Off-market / pocket deals",
  other: "Other / not sure",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "As soon as possible",
  "1-3-months": "1 to 3 months",
  "3-6-months": "3 to 6 months",
  "6-12-months": "6 to 12 months",
  exploring: "Just exploring",
};

type InvestmentPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  investmentType?: string;
  budget?: string;
  preferredArea?: string;
  timeline?: string;
  message?: string;
};

function buildNote(p: InvestmentPayload): string {
  const lines = [
    "Website investment form",
    p.investmentType &&
      `Investment type: ${INVESTMENT_TYPE_LABELS[p.investmentType] ?? p.investmentType}`,
    p.budget && `Budget: ${BUDGET_LABELS[p.budget] ?? p.budget}`,
    p.preferredArea?.trim() && `Preferred area: ${p.preferredArea.trim()}`,
    p.timeline && `Timeline: ${TIMELINE_LABELS[p.timeline] ?? p.timeline}`,
    p.message?.trim() && `Message:\n${p.message.trim()}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export async function POST(req: Request) {
  const rawToken = process.env.GHL_API_TOKEN;
  const token = rawToken ? normalizeGhlToken(rawToken) : "";
  const locationId = process.env.GHL_LOCATION_ID?.trim();

  if (!token || !locationId) {
    return NextResponse.json(
      { error: "Lead capture is not configured on the server." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const body = json as InvestmentPayload;
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = normalizePhone(String(body.phone ?? ""));

  if (
    !fullName ||
    !email ||
    !phone ||
    !String(body.investmentType ?? "").trim() ||
    !String(body.budget ?? "").trim() ||
    !String(body.preferredArea ?? "").trim() ||
    !String(body.timeline ?? "").trim()
  ) {
    return NextResponse.json(
      {
        error:
          "Name, email, phone, investment type, budget, preferred area, and timeline are required.",
      },
      { status: 400 },
    );
  }

  const { firstName, lastName } = splitFullName(fullName);
  const version =
    process.env.GHL_API_VERSION?.trim() || "2023-02-21";
  const tags = parseTags(process.env.GHL_INVESTMENT_TAGS, [
    "Website",
    "Investment Form",
  ]);
  const source =
    process.env.GHL_INVESTMENT_SOURCE?.trim() ||
    "Website — Investment";

  const note = buildNote(body);

  const contact: GhlContactFields = {
    locationId,
    firstName,
    lastName,
    name: fullName,
    email,
    phone,
    source,
  };
  if (process.env.GHL_NO_TAGS !== "1") {
    contact.tags = tags;
  }

  const result = await submitContactToGhl({
    token,
    version,
    logPrefix: "[api/leads/investment]",
    contact,
    note,
  });

  if (!result.ok) {
    const resBody: Record<string, string | number> = {
      error: result.clientMessage,
    };
    if (process.env.NODE_ENV === "development") {
      resBody.ghlStatus = result.upstreamStatus;
      resBody.ghlDetail = result.logSnippet;
    }
    return NextResponse.json(resBody, { status: result.httpStatus });
  }

  return NextResponse.json({ ok: true });
}
