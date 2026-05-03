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
}

const WIDGET_URL =
  "https://mikegruosso.idxbroker.com/idx/customshowcasejs.php?widgetid=29619";

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

export function formatListingPrice(rawPrice: string): string {
  const num = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return rawPrice;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
}
