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

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  "single-family": "Single family",
  "condo-townhome": "Condo / townhome",
  "multi-family": "Multi-family",
  land: "Land",
  commercial: "Commercial",
  other: "Other",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "As soon as possible",
  "1-3-months": "1 to 3 months",
  "3-6-months": "3 to 6 months",
  "6-12-months": "6 to 12 months",
  exploring: "Just exploring",
};

type BuyerPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredArea?: string;
  budgetRange?: string;
  propertyType?: string;
  timeline?: string;
  message?: string;
};

function buildNote(p: BuyerPayload): string {
  const lines = [
    "Website buyer form",
    p.preferredArea?.trim() && `Preferred area: ${p.preferredArea.trim()}`,
    p.budgetRange &&
      `Budget: ${BUDGET_LABELS[p.budgetRange] ?? p.budgetRange}`,
    p.propertyType &&
      `Property type: ${PROPERTY_TYPE_LABELS[p.propertyType] ?? p.propertyType}`,
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

  const body = json as BuyerPayload;
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = normalizePhone(String(body.phone ?? ""));

  if (
    !fullName ||
    !email ||
    !phone ||
    !String(body.preferredArea ?? "").trim() ||
    !String(body.budgetRange ?? "").trim() ||
    !String(body.propertyType ?? "").trim() ||
    !String(body.timeline ?? "").trim()
  ) {
    return NextResponse.json(
      {
        error:
          "Full name, email, phone, preferred area, budget range, property type, and timeline are required.",
      },
      { status: 400 },
    );
  }

  const { firstName, lastName } = splitFullName(fullName);
  const version =
    process.env.GHL_API_VERSION?.trim() || "2023-02-21";
  const tags = parseTags(process.env.GHL_BUYER_TAGS, ["Website", "Buyer Form"]);
  const source =
    process.env.GHL_BUYER_SOURCE?.trim() ||
    "Website — Buyer Form";

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
    logPrefix: "[api/leads/buyer]",
    contact,
    note,
  });

  if (!result.ok) {
    const body: Record<string, string | number> = {
      error: result.clientMessage,
    };
    if (process.env.NODE_ENV === "development") {
      body.ghlStatus = result.upstreamStatus;
      body.ghlDetail = result.logSnippet;
    }
    return NextResponse.json(body, { status: result.httpStatus });
  }

  return NextResponse.json({ ok: true });
}
