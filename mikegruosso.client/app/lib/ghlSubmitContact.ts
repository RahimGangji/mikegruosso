/** Shared GoHighLevel contact create + note (used by /api/leads/* route handlers). */

export const GHL_API_URL = "https://services.leadconnectorhq.com";

export function normalizeGhlToken(raw: string): string {
  let t = raw.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1).trim();
  }
  if (/^bearer\s+/i.test(t)) {
    t = t.replace(/^bearer\s+/i, "").trim();
  }
  const pit = t.match(/^pit-(.*)$/i);
  if (pit) {
    t = `pit-${pit[1]}`;
  }
  return t;
}

/** GHL expects E.164-style numbers for best results. */
export function normalizePhone(raw: string): string {
  const t = raw.trim();
  if (!t) return t;
  const digits = t.replace(/\D/g, "");
  if (t.startsWith("+")) {
    return `+${digits}`;
  }
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }
  return t;
}

export function splitFullName(fullName: string): {
  firstName: string;
  lastName: string;
} {
  const t = fullName.trim();
  if (!t) return { firstName: "Lead", lastName: "-" };
  const i = t.indexOf(" ");
  if (i === -1) return { firstName: t, lastName: "-" };
  return {
    firstName: t.slice(0, i).trim() || "Lead",
    lastName: t.slice(i + 1).trim() || "-",
  };
}

export function parseTags(
  raw: string | undefined,
  fallback: string[],
): string[] {
  const parsed =
    raw
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  return parsed.length > 0 ? parsed : fallback;
}

export type GhlContactFields = {
  locationId: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  /** Omit when troubleshooting tag-related CRM errors (`GHL_NO_TAGS=1`). */
  tags?: string[];
};

export type GhlSubmitResult =
  | { ok: true }
  | {
      ok: false;
      httpStatus: number;
      logSnippet: string;
      clientMessage: string;
      upstreamStatus: number;
    };

function parseGhlErrorMessage(text: string): string | null {
  try {
    const j = JSON.parse(text) as {
      message?: string;
      msg?: string;
      error?: string | string[];
      errors?: unknown;
    };
    const err = j.error;
    const fromError = Array.isArray(err) ? err.join("; ") : err;
    const m = j.message ?? j.msg ?? fromError;
    if (typeof m === "string" && m.trim().length > 0 && m.length < 400) {
      return m.trim();
    }
    return null;
  } catch {
    return null;
  }
}

function userFacingMessage(
  status: number,
  bodyText: string,
): string {
  const parsed = parseGhlErrorMessage(bodyText);
  if (status === 401 || status === 403) {
    return "CRM connection failed. Create the Private Integration inside the same sub-account (Location) as your Location ID, enable contacts.readonly + contacts.write, copy the pit-… token into GHL_API_TOKEN in your `.env` file (no word Bearer), and restart the server.";
  }
  if (status === 422) {
    return parsed
      ? `CRM could not process this lead: ${parsed}`
      : "CRM rejected the lead data (check location ID and required fields).";
  }
  if (status === 400) {
    return parsed
      ? `Please check your information and try again. (${parsed})`
      : "Please check your information and try again, or call us.";
  }
  if (parsed) {
    return `Could not save your request: ${parsed}`;
  }
  return "Could not save your request. Please try again or call us.";
}

/** POST contact; on 400/422 (duplicate / validation) retry upsert, then append note when contact id is returned. */
export async function submitContactToGhl(opts: {
  token: string;
  version: string;
  contact: GhlContactFields;
  note: string;
  logPrefix: string;
}): Promise<GhlSubmitResult> {
  const { token, version, contact, note, logPrefix } = opts;

  const ghlHeaders: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Version: version,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let contactRes = await fetch(`${GHL_API_URL}/contacts/`, {
    method: "POST",
    headers: ghlHeaders,
    body: JSON.stringify(contact),
  });

  let contactText = await contactRes.text();

  /** GHL often returns 400 or 422 for duplicates; upsert updates or merges. */
  if (contactRes.status === 422 || contactRes.status === 400) {
    const upsertRes = await fetch(`${GHL_API_URL}/contacts/upsert`, {
      method: "POST",
      headers: ghlHeaders,
      body: JSON.stringify(contact),
    });
    contactText = await upsertRes.text();
    contactRes = upsertRes;
  }

  if (!contactRes.ok) {
    console.error(
      `${logPrefix} GHL contact save failed:`,
      contactRes.status,
      contactText.slice(0, 2000),
    );
    const upstreamStatus = contactRes.status;
    const clientMessage = userFacingMessage(upstreamStatus, contactText);
    return {
      ok: false,
      httpStatus: 502,
      logSnippet: contactText.slice(0, 800),
      clientMessage,
      upstreamStatus,
    };
  }

  let contactId: string | undefined;
  try {
    const data = JSON.parse(contactText) as {
      contact?: { id?: string };
      id?: string;
    };
    contactId = data.contact?.id ?? data.id;
  } catch {
    /* ignore */
  }

  if (!contactId) {
    console.warn(
      `${logPrefix} GHL save OK but no contact id in response; skipping note.`,
      contactText.slice(0, 500),
    );
  }

  if (contactId && note.length > 0) {
    await fetch(`${GHL_API_URL}/contacts/${contactId}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: version,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: note }),
    });
  }

  return { ok: true };
}
