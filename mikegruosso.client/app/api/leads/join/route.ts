import { NextResponse } from "next/server";

import {
  normalizeGhlToken,
  normalizePhone,
  parseTags,
  splitFullName,
  submitContactToGhl,
  type GhlContactFields,
} from "@/app/lib/ghlSubmitContact";

const ROLE_LABELS: Record<string, string> = {
  buyer: "Buyer",
  seller: "Seller",
  investor: "Investor",
  agent: "Agent",
  developer: "Developer",
};

type JoinPayload = {
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  message?: string;
};

function buildNote(p: JoinPayload): string {
  const lines = [
    "Website join network form",
    p.role && `I am a: ${ROLE_LABELS[p.role] ?? p.role}`,
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

  const body = json as JoinPayload;
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = normalizePhone(String(body.phone ?? ""));

  if (
    !fullName ||
    !email ||
    !phone ||
    !String(body.role ?? "").trim()
  ) {
    return NextResponse.json(
      {
        error:
          "Full name, email, phone, and I am a selection are required.",
      },
      { status: 400 },
    );
  }

  const { firstName, lastName } = splitFullName(fullName);
  const version =
    process.env.GHL_API_VERSION?.trim() || "2023-02-21";
  const tags = parseTags(process.env.GHL_JOIN_TAGS, [
    "Website",
    "Join Network",
  ]);
  const source =
    process.env.GHL_JOIN_SOURCE?.trim() ||
    "Website — Join Network";

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
    logPrefix: "[api/leads/join]",
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
