import { NextRequest, NextResponse } from "next/server";

function decodeEntities(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function parseDtDd(block: string): Record<string, string> {
  const result: Record<string, string> = {};
  const re = /<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/gi;
  let m;
  while ((m = re.exec(block)) !== null) {
    const key   = decodeEntities(m[1]);
    const value = decodeEntities(m[2]);
    if (key && value) result[key] = value;
  }
  return result;
}

function getPanel(html: string, suffix: number): string {
  const re = new RegExp(
    `id="IDX-panel-body-[\\w]+-+${suffix}"[^>]*>([\\s\\S]{0,8000}?)<\\/div>`,
    "i",
  );
  return html.match(re)?.[1] ?? "";
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith("idxbroker.com")) {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Force HTTPS
  const httpsUrl = url.replace(/^http:\/\//i, "https://");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(httpsUrl, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Referer: "https://mikegruosso.idxbroker.com/",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
      },
    });
    clearTimeout(timer);

    if (!res.ok)
      return NextResponse.json({ error: `Upstream ${res.status}` }, { status: 502 });

    const html = await res.text();
    console.log("[listing-detail] html length:", html.length);

    const all = parseDtDd(html);
    console.log("[listing-detail] dt/dd fields:", all);

    const status          = all["Status"]            ?? "";
    const fullBaths       = all["Full Baths"]        ?? all["Full Bath"]           ?? all["Bathrooms Total Decimal"] ?? "";
    const county          = all["County"]            ?? "";
    const subdivision     = all["Subdivision"]       ?? "";
    const propertyType    = all["Property Type"]     ?? "";
    const propertySubType = all["Property Sub Type"] ?? all["Sub Type"]            ?? "";
    const mlsNumber       = all["Listing ID"]        ?? all["MLS Number"]          ?? all["MLS #"] ?? "";

    const panel1          = getPanel(html, 1);
    const panel1Fields    = panel1 ? parseDtDd(panel1) : {};
    const primaryFeatures = Object.entries(panel1Fields)
      .filter(([, v]) => v && v.toLowerCase() !== "none" && v !== "0")
      .map(([k, v]) => `${k}: ${v}`);

    const panel6       = getPanel(html, 6);
    const panel6Fields = panel6 ? parseDtDd(panel6) : {};
    const neighborhood =
      panel6Fields["Neighborhood"] ??
      panel6Fields["Neighborhood Coname"] ??
      panel6Fields["Area"] ?? "";

    return NextResponse.json({
      status,
      fullBaths,
      county,
      subdivision,
      propertyType,
      propertySubType,
      mlsNumber,
      primaryFeatures,
      neighborhood,
    });
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err instanceof Error && err.name === "AbortError";
    console.error("[listing-detail] error:", err);
    return NextResponse.json(
      { error: isTimeout ? "Request timed out" : "Failed to fetch listing" },
      { status: isTimeout ? 504 : 500 },
    );
  }
}
