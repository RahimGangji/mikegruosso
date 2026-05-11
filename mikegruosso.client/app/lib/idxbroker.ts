export interface IDXListing {
  listingID: string;
  address: string;
  cityName: string;
  stateAbbr: string;
  zipcode: string;
  listPrice: string;
  bedrooms: string;
  totalBaths: string;
  sqFt: string;
  photos: string[];
  listingUrl: string;
  status?: string;
  propertyType?: string;
}

const WIDGET_URL =
  "https://mikegruosso.idxbroker.com/idx/customshowcasejs.php?widgetid=29619";
const SOLD_PENDING_URL = "https://mikegruosso.idxbroker.com/idx/soldpending";

function grab(block: string, pattern: RegExp): string {
  return block.match(pattern)?.[1]?.trim() ?? "";
}

function parseWidgetJs(js: string): IDXListing[] {
  // Each listing block starts at "aLink = idx('<a href=" and ends at "propr.append(propc)"
  const blocks = js.split(/(?=aLink\s*=\s*idx\s*\('<a\s+href=)/);

  return blocks
    .slice(1)
    .map((block): IDXListing => {
      const url = grab(block, /aLink\s*=\s*idx\s*\('<a\s+href="([^"]+)"/);

      // imgUrl = decodeURIComponent("URL_ENCODED")
      const encodedPhoto = grab(
        block,
        /imgUrl\s*=\s*decodeURIComponent\s*\(\s*"([^"]+)"\s*\)/
      );
      const photo = encodedPhoto ? decodeURIComponent(encodedPhoto) : "";

      const address = grab(
        block,
        /'IDX-showcaseAddress[^']*'\s*\)\.html\s*\(\s*'([^']+)'/
      );

      const listingID = grab(
        block,
        /'IDX-showcaseListingID'\s*\)\.html\s*\(\s*'([^']+)'/
      );
      const city = grab(
        block,
        /IDX-showcaseCity['"]\s*\)\s*\.\s*html\s*\(\s*'([^']+)'/
      );
      const stateAbbr = grab(
        block,
        /IDX-showcaseStateAbrv['"]\s*\)\s*\.\s*html\s*\(\s*'([^']+)'/
      );
      const zipcode = grab(
        block,
        /IDX-showcaseZipcode['"]\s*\)\s*\.\s*html\s*\(\s*'([^']+)'/
      );
      const price = grab(
        block,
        /'IDX-showcasePrice'\s*\)\.html\s*\(\s*'([^']+)'/
      );
      const bedsRaw = grab(
        block,
        /'IDX-showcaseBeds'\s*\)\.html\s*\(\s*'([^']+)'/
      );
      const bathsRaw = grab(
        block,
        /'IDX-showcaseBaths'\s*\)\.html\s*\(\s*'([^']+)'/
      );

      return {
        listingID,
        address,
        cityName: city,
        stateAbbr: stateAbbr.trim(),
        zipcode,
        listPrice: price.replace(/[$,]/g, ""),
        bedrooms: bedsRaw.replace(/\s*(Bedrooms?|Beds?)\s*/i, "").trim(),
        totalBaths: bathsRaw.replace(/\s*(Total\s+)?Baths?\s*/i, "").trim(),
        sqFt: "",
        photos: photo ? [photo] : [],
        listingUrl: url.startsWith("http") ? url : url ? `https:${url}` : "",
      };
    })
    .filter((l) => l.address && l.listPrice);
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(value: string): string {
  return decodeHtml(value.replace(/<[^>]*>/g, " "));
}

function absoluteIdxUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http://")) return url.replace("http://", "https://");
  if (url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  return new URL(url, SOLD_PENDING_URL).toString();
}

function grabCellField(block: string, field: string): string {
  const pattern = new RegExp(
    `<div class="IDX-field-${field}[^"]*[^>]*>[\\s\\S]*?<span class="IDX-(?:resultsText|text)">([\\s\\S]*?)<\\/span>`,
  );

  return stripTags(block.match(pattern)?.[1] ?? "");
}

function parseSoldPendingHtml(html: string): IDXListing[] {
  const cellMatches = html.matchAll(
    /<div class="IDX-resultsCell"([\s\S]*?)(?=<div class="IDX-resultsCell"|<div id="IDX-pageInfoGet"|<script)/g,
  );

  return Array.from(cellMatches)
    .map((match): IDXListing => {
      const block = match[0];
      const listingID =
        grab(block, /data-listingid="([^"]+)"/) || grabCellField(block, "listingID");
      const detailsUrl = absoluteIdxUrl(
        grab(block, /class="IDX-resultsAddressLink"[^>]*href="([^"]+)"/) ||
          grab(block, /class="IDX-resultsPhotoLink"[^>]*href="([^"]+)"/),
      );
      const image = decodeHtml(
        grab(block, /data-src="([^"]+)"/) || grab(block, /src="([^"]+)"\s+class="IDX-resultsPhotoImg"/),
      );
      const address = [
        stripTags(grab(block, /<span class="IDX-resultsAddressNumber">([\s\S]*?)<\/span>/)),
        stripTags(grab(block, /<span class="IDX-resultsAddressDirection">([\s\S]*?)<\/span>/)),
        stripTags(grab(block, /<span class="IDX-resultsAddressName">([\s\S]*?)<\/span>/)),
      ]
        .filter(Boolean)
        .join(" ");
      const cityName = stripTags(
        grab(block, /<span class="IDX-resultsAddressCity">([\s\S]*?)<\/span>/),
      );
      const stateAbbr = stripTags(
        grab(block, /<span class="IDX-resultsAddressStateAbrv">([\s\S]*?)<\/span>/),
      );
      const zipcode = stripTags(
        grab(block, /<span class="IDX-resultsAddressZip">([\s\S]*?)<\/span>/),
      );
      const price =
        grab(block, /data-price="([^"]+)"/) ||
        grabCellField(block, "soldPrice").replace(/[$,]/g, "");
      const idxStatus = grab(block, /data-idxStatus="([^"]+)"/);

      return {
        listingID,
        address,
        cityName,
        stateAbbr,
        zipcode,
        listPrice: price.replace(/[$,]/g, ""),
        bedrooms: grabCellField(block, "bedrooms"),
        totalBaths: grabCellField(block, "totalBaths"),
        sqFt: grabCellField(block, "sqFt").replace(/,/g, ""),
        photos: image ? [image.trim()] : [],
        listingUrl: detailsUrl,
        status: grabCellField(block, "propStatus") || idxStatus,
        propertyType: "Residential",
      };
    })
    .filter((listing) => listing.listingID && listing.address);
}

function getSoldPendingPageCount(html: string): number {
  const pageNumbers = Array.from(html.matchAll(/<option value="(\d+)"[^>]*>\d+\s*\/\s*(\d+)<\/option>/g));
  const maxFromLabel = pageNumbers.reduce((max, match) => {
    const page = Number(match[2]);
    return Number.isFinite(page) ? Math.max(max, page) : max;
  }, 1);

  return Math.max(1, maxFromLabel);
}

async function fetchSoldPendingPage(page: number): Promise<string> {
  const url = page === 1 ? SOLD_PENDING_URL : `${SOLD_PENDING_URL}?start=${page}`;
  const response = await fetch(url, {
    next: { revalidate: 300 },
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Next.js)" },
  });

  if (!response.ok) return "";
  return response.text();
}

export async function fetchFeaturedListings(): Promise<IDXListing[]> {
  try {
    const res = await fetch(WIDGET_URL, {
      // Cache for 5 minutes to avoid IDX Broker rate-limiting short responses
      next: { revalidate: 300 },
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Next.js)" },
    });

    if (!res.ok) return [];

    const js = await res.text();

    // IDX Broker returns a stripped ~9KB script when rate-limited — skip it
    if (js.length < 20000) return [];

    return parseWidgetJs(js);
  } catch {
    return [];
  }
}

export async function fetchSoldPendingListings(): Promise<IDXListing[]> {
  try {
    const firstPageHtml = await fetchSoldPendingPage(1);
    if (!firstPageHtml) return [];

    const pageCount = getSoldPendingPageCount(firstPageHtml);
    const remainingPages = await Promise.all(
      Array.from({ length: pageCount - 1 }, (_, index) => fetchSoldPendingPage(index + 2)),
    );
    const listings = [firstPageHtml, ...remainingPages].flatMap(parseSoldPendingHtml);
    const seen = new Set<string>();

    return listings.filter((listing) => {
      if (seen.has(listing.listingID)) return false;
      seen.add(listing.listingID);
      return true;
    });
  } catch {
    return [];
  }
}

export function formatListingPrice(rawPrice: string): string {
  const num = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return rawPrice;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
}
