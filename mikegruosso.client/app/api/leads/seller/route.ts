import { NextResponse } from "next/server";

import {
  normalizeGhlToken,
  normalizePhone,
  parseTags,
  submitContactToGhl,
  type GhlContactFields,
} from "@/app/lib/ghlSubmitContact";

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

type SellerPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  propertyAddress?: string;
  propertyType?: string;
  expectedTimeline?: string;
  message?: string;
};

function buildSellerNote(p: SellerPayload): string {
  const lines = [
    "Website seller / home value form",
    p.propertyAddress?.trim() &&
      `Property address: ${p.propertyAddress.trim()}`,
    p.propertyType &&
      `Property type: ${PROPERTY_TYPE_LABELS[p.propertyType] ?? p.propertyType}`,
    p.expectedTimeline &&
      `Expected timeline: ${TIMELINE_LABELS[p.expectedTimeline] ?? p.expectedTimeline}`,
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

  const body = json as SellerPayload;
  const firstName = String(body.firstName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = normalizePhone(String(body.phone ?? ""));
  const propertyAddress = String(body.propertyAddress ?? "").trim();

  if (!firstName || !lastName || !email || !phone || !propertyAddress) {
    return NextResponse.json(
      {
        error:
          "First name, last name, email, phone, and property address are required.",
      },
      { status: 400 },
    );
  }

  const version =
    process.env.GHL_API_VERSION?.trim() || "2023-02-21";
  const tags = parseTags(process.env.GHL_SELLER_TAGS, [
    "Website",
    "Seller Form",
  ]);
  const source =
    process.env.GHL_SELLER_SOURCE?.trim() ||
    "Website — Home Value / Sell";

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const note = buildSellerNote(body);

  const contact: GhlContactFields = {
    locationId,
    firstName,
    lastName,
    name: fullName || `${firstName} ${lastName}`,
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
    logPrefix: "[api/leads/seller]",
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
