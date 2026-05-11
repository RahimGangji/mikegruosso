"use client";

import { useState } from "react";
import Image from "next/image";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";
import { formatListingPrice, type IDXListing } from "@/app/lib/idxbroker";

type FilterKey = "All" | "Residential" | "Commercial" | "Land" | "Investment" | "Sold" | "Available";

interface Property {
  id: number | string;
  image: string;
  address: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  type: "Residential" | "Commercial" | "Land" | "Investment";
  status: "Sold" | "Available";
  listedWith: string;
}

const properties: Property[] = [
  /* ── Available listings ── */
  {
    id: 1,
    image: "/list-img-1.jpg",
    address: "2068 Route 130",
    city: "Florence, NJ 08518",
    price: "$2,750,000",
    beds: 6, baths: 4, sqft: 5800,
    type: "Commercial",
    status: "Available",
    listedWith: "Gruosso Realty Group, LLC",
  },
  {
    id: 2,
    image: "/list-img-2.jpg",
    address: "16 Robertsville Road",
    city: "Freehold, NJ 07728",
    price: "$2,200,000",
    beds: 5, baths: 3.5, sqft: 4920,
    type: "Residential",
    status: "Available",
    listedWith: "Gruosso Realty Group, LLC",
  },
  {
    id: 3,
    image: "/list-img-3.jpg",
    address: "245-249 Verona Avenue",
    city: "Newark, NJ 07104",
    price: "$1,999,999",
    beds: 8, baths: 6, sqft: 6100,
    type: "Commercial",
    status: "Available",
    listedWith: "O'Brien Realty, LLC",
  },
  {
    id: 4,
    image: "/list-img-4.jpg",
    address: "210 Pine Brook Road",
    city: "Manalapan, NJ 07726",
    price: "$999,999",
    beds: 4, baths: 3, sqft: 3750,
    type: "Residential",
    status: "Available",
    listedWith: "Gruosso Realty Group, LLC",
  },
  {
    id: 5,
    image: "/list-img-5.jpg",
    address: "261 State Route 34",
    city: "Colts Neck, NJ 07722",
    price: "$849,000",
    beds: 4, baths: 2.5, sqft: 3200,
    type: "Investment",
    status: "Available",
    listedWith: "Shore Realty NJ, LLC",
  },
  {
    id: 6,
    image: "/list-img-6.jpg",
    address: "0 Adelphia-Farmingdale Rd",
    city: "Farmingdale, NJ 07727",
    price: "$799,900",
    beds: 3, baths: 2, sqft: 2640,
    type: "Land",
    status: "Available",
    listedWith: "Gruosso Realty Group, LLC",
  },
  {
    id: 7,
    image: "/list-img-7.jpg",
    address: "0 US Route 130",
    city: "Cranbury Twp, NJ 08512",
    price: "$499,900",
    beds: 3, baths: 1.5, sqft: 1980,
    type: "Land",
    status: "Available",
    listedWith: "Garden State Realty, LLC",
  },
  {
    id: 8,
    image: "/list-img-8.jpg",
    address: "7 Joyce Court",
    city: "Tinton Falls, NJ 07724",
    price: "$499,900",
    beds: 3, baths: 2, sqft: 2100,
    type: "Residential",
    status: "Available",
    listedWith: "Shore Realty NJ, LLC",
  },
  {
    id: 9,
    image: "/list-img-9.jpg",
    address: "0 Route 9",
    city: "Howell, NJ 07731",
    price: "$350,000",
    beds: 2, baths: 1, sqft: 1340,
    type: "Land",
    status: "Available",
    listedWith: "Gruosso Realty Group, LLC",
  },
  /* ── Sold properties ── */
  {
    id: 10,
    image: "/sold-list1.jpg",
    address: "24 Cedar Knoll Road",
    city: "Jackson, NJ 08527",
    price: "$1,575,000",
    beds: 5, baths: 4.5, sqft: 4200,
    type: "Residential",
    status: "Sold",
    listedWith: "The Gruosso Group",
  },
  {
    id: 11,
    image: "/sold-list2.jpg",
    address: "5 Kensington Court",
    city: "Jackson, NJ 08527",
    price: "$1,461,000",
    beds: 4, baths: 3, sqft: 2700,
    type: "Residential",
    status: "Sold",
    listedWith: "The Gruosso Group",
  },
  {
    id: 12,
    image: "/sold-list3.jpg",
    address: "366-368 Beecroft Place",
    city: "Oakhurst, NJ 07755",
    price: "$1,350,500",
    beds: 4, baths: 3, sqft: 2920,
    type: "Investment",
    status: "Sold",
    listedWith: "The Gruosso Group",
  },
  {
    id: 13,
    image: "/sold-list4.jpg",
    address: "24 Oxford Drive",
    city: "Ocean Twp, NJ 07712",
    price: "$1,300,000",
    beds: 3, baths: 2.5, sqft: 2480,
    type: "Residential",
    status: "Sold",
    listedWith: "The Gruosso Group",
  },
  {
    id: 14,
    image: "/sold-list5.jpg",
    address: "5 Kaiser Court",
    city: "Morganville, NJ 07751",
    price: "$1,250,000",
    beds: 3, baths: 2, sqft: 2140,
    type: "Residential",
    status: "Sold",
    listedWith: "The Gruosso Group",
  },
  {
    id: 15,
    image: "/sold-list6.jpg",
    address: "33 Willow Drive",
    city: "Little Silver, NJ 07739",
    price: "$1,250,000",
    beds: 3, baths: 3, sqft: 2280,
    type: "Residential",
    status: "Sold",
    listedWith: "The Gruosso Group",
  },
  {
    id: 16,
    image: "/sold-list7.jpg",
    address: "269 Teakwood Drive",
    city: "Bayville, NJ 08721",
    price: "$1,225,000",
    beds: 4, baths: 2.5, sqft: 2650,
    type: "Residential",
    status: "Sold",
    listedWith: "The Gruosso Group",
  },
  {
    id: 17,
    image: "/sold-list8.jpg",
    address: "17 Woods End Road",
    city: "Colts Neck, NJ 07722",
    price: "$1,225,000",
    beds: 5, baths: 4, sqft: 3950,
    type: "Residential",
    status: "Sold",
    listedWith: "The Gruosso Group",
  },
];

const filters: FilterKey[] = [
  "All",
  "Residential",
  "Commercial",
  "Land",
  "Investment",
  "Sold",
  "Available",
];

const statusColors: Record<Property["status"], string> = {
  Sold: "bg-[#3aaacf]",
  Available: "bg-[#161f2d]",
};

function toNumber(value: string): number {
  const number = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(number) ? number : 0;
}

function normalizeListings(listings: IDXListing[]): Property[] {
  return listings.map((listing) => {
    const rawStatus = listing.status?.toLowerCase() ?? "";

    return {
      id: listing.listingID,
      image: listing.photos[0] ?? "/sold-list1.jpg",
      address: listing.address,
      city: `${listing.cityName}, ${listing.stateAbbr} ${listing.zipcode}`.trim(),
      price: formatListingPrice(listing.listPrice),
      beds: toNumber(listing.bedrooms),
      baths: toNumber(listing.totalBaths),
      sqft: toNumber(listing.sqFt),
      type: "Residential",
      status: rawStatus.includes("active") || rawStatus.includes("pending") ? "Available" : "Sold",
      listedWith: "The Gruosso Group",
    } satisfies Property;
  });
}

export default function PortfolioGrid({ listings = [] }: { listings?: IDXListing[] }) {
  const [active, setActive] = useState<FilterKey>("All");
  const displayProperties = listings.length > 0 ? normalizeListings(listings) : properties;

  const shown =
    active === "All"
      ? displayProperties
      : displayProperties.filter(
          (p) => p.type === active || p.status === active
        );

  return (
    <>
      {/* ── Hero ── */}
      <section className="w-full bg-[#161f2d] pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
          <div className="flex items-center gap-3 mb-5">
            <span className="block h-px w-8 bg-[#3aaacf]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] font-[family-name:var(--font-manrope)] text-[#3aaacf]">
              Our Portfolio
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-normal leading-tight tracking-wide font-[family-name:var(--font-cormorant-garamond)] text-white mb-5 max-w-3xl">
            Properties We Have Worked On
          </h1>

          <p className="text-white/60 text-base sm:text-lg leading-relaxed font-[family-name:var(--font-karla)] max-w-2xl">
            Explore past sales and successful transactions handled by The
            Gruosso Group. From waterfront estates to investment opportunities
            and land across Monmouth &amp; Ocean County browse our complete
            portfolio of residential, commercial, and investment properties.
          </p>

          {/* Summary stats */}
          <div className="flex flex-wrap gap-8 mt-10 pt-10 border-t border-white/10">
            <div>
              <p className="text-3xl font-normal text-[#3aaac5] font-[family-name:var(--font-cormorant-garamond)]">
                {displayProperties.length || "50+"}
              </p>
              <p className="text-white/50 text-[11px] uppercase tracking-[0.15em] mt-1 font-[family-name:var(--font-manrope)]">
                Properties Listed
              </p>
            </div>
            <div>
              <p className="text-3xl font-normal text-[#3aaac5] font-[family-name:var(--font-cormorant-garamond)]">
                1,000+
              </p>
              <p className="text-white/50 text-[11px] uppercase tracking-[0.15em] mt-1 font-[family-name:var(--font-manrope)]">
                Total Transactions
              </p>
            </div>
            <div>
              <p className="text-3xl font-normal text-[#3aaac5] font-[family-name:var(--font-cormorant-garamond)]">
                $31M+
              </p>
              <p className="text-white/50 text-[11px] uppercase tracking-[0.15em] mt-1 font-[family-name:var(--font-manrope)]">
                Sales Last Year
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="w-full bg-[#f0f2f5] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">

          {/* Filter bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`
                  flex-shrink-0 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em]
                  border transition-all duration-200 font-[family-name:var(--font-manrope)]
                  ${
                    active === f
                      ? "bg-[#161f2d] text-white border-[#161f2d]"
                      : "bg-white text-[#161f2d] border-gray-200 hover:border-[#3aaacf] hover:text-[#3aaacf]"
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-sm text-gray-400 font-[family-name:var(--font-karla)] mb-6">
            Showing{" "}
            <span className="text-[#161f2d] font-semibold">{shown.length}</span>{" "}
            {shown.length === 1 ? "property" : "properties"}
            {active !== "All" && (
              <> &mdash; <span className="text-[#3aaacf]">{active}</span></>
            )}
          </p>

          {/* Grid */}
          {shown.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-gray-400 text-lg font-[family-name:var(--font-karla)]">
                No properties found for this filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shown.map((p) => (
                <div
                  key={p.id}
                  className="bg-white overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={`${p.address}, ${p.city}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                      loading="lazy"
                    />

                    {/* Status badge */}
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white font-[family-name:var(--font-manrope)] ${statusColors[p.status]}`}
                    >
                      {p.status}
                    </span>

                    {/* Type badge */}
                    <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm font-[family-name:var(--font-manrope)]">
                      {p.type}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col gap-1.5">
                    <p className="text-[13px] font-semibold uppercase tracking-[3px] text-[#161f2d] font-[family-name:var(--font-manrope)]">
                      {p.price}
                    </p>

                    <p className="text-[18px] font-normal leading-snug text-gray-900 font-[family-name:var(--font-arapey)] tracking-[0.5px]">
                      {p.address}, {p.city}
                    </p>

                    <p className="text-[13px] text-gray-500 font-[family-name:var(--font-karla)] tracking-[0.3px]">
                      {p.beds} BD&nbsp;|&nbsp;{p.baths} BA&nbsp;|&nbsp;
                      {p.sqft > 0 ? p.sqft.toLocaleString() : "-"} SQFT
                    </p>

                    <p className="text-[13px] text-gray-400 font-[family-name:var(--font-karla)]">
                      {p.status === "Sold" ? "Sold With" : "Listed With"}{" "}
                      {p.listedWith}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
