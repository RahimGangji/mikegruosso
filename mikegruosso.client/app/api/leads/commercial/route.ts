import { NextResponse } from "next/server";

import {
  normalizeGhlToken,
  normalizePhone,
  parseTags,
  splitFullName,
  submitContactToGhl,
  type GhlContactFields,
} from "@/app/lib/ghlSubmitContact";

const COMMERCIAL_PROPERTY_TYPE_LABELS: Record<string, string> = {
  retail: "Retail",
  office: "Office",
  industrial: "Industrial",
  "mixed-use": "Mixed-use",
  land: "Land",
  development: "Development site",
  hospitality: "Hospitality",
  investment: "Investment property",
  other: "Other / not sure",
};

const COMMERCIAL_BUDGET_LABELS: Record<string, string> = {
  "under-500k": "Under $500,000",
  "500k-1m": "$500,000 to $1,000,000",
  "1m-2.5m": "$1,000,000 to $2,500,000",
  "2.5m-5m": "$2,500,000 to $5,000,000",
  "5m-10m": "$5,000,000 to $10,000,000",
  "10m-plus": "$10,000,000+",
  "not-sure": "Not sure yet",
};

type CommercialPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  propertyType?: string;
  budget?: string;
  preferredLocation?: string;
  message?: string;
};

function buildNote(p: CommercialPayload): string {
  const lines = [
    "Website commercial inquiry form",
    p.propertyType &&
      `Property type: ${COMMERCIAL_PROPERTY_TYPE_LABELS[p.propertyType] ?? p.propertyType}`,
    p.budget && `Budget: ${COMMERCIAL_BUDGET_LABELS[p.budget] ?? p.budget}`,
    p.preferredLocation?.trim() &&
      `Preferred location: ${p.preferredLocation.trim()}`,
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

  const body = json as CommercialPayload;
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = normalizePhone(String(body.phone ?? ""));

  if (!fullName || !email || !phone) {
    return NextResponse.json(
      { error: "Full name, email, and phone are required." },
      { status: 400 },
    );
  }

  const { firstName, lastName } = splitFullName(fullName);
  const version =
    process.env.GHL_API_VERSION?.trim() || "2023-02-21";
  const tags = parseTags(process.env.GHL_COMMERCIAL_TAGS, [
    "Website",
    "Commercial Form",
  ]);
  const source =
    process.env.GHL_COMMERCIAL_SOURCE?.trim() ||
    "Website — Commercial";

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
    logPrefix: "[api/leads/commercial]",
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
