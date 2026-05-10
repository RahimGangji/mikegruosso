"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";
import { formatListingPrice, type IDXListing } from "@/app/lib/idxbroker";

interface NormalizedListing {
  id: string;
  image: string;
  address: string;
  city: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  listedWith: string;
  url: string;
}

const FALLBACK_LISTINGS: NormalizedListing[] = [
  { id: "2", image: "/list-img-2.jpg", address: "16 Robertsville Road", city: "Freehold, NJ 07728", price: "$2,200,000", beds: "5", baths: "3.5", sqft: "4920", listedWith: "Gruosso Realty Group, LLC", url: "" },
  { id: "3", image: "/list-img-3.jpg", address: "245-249 Verona Avenue", city: "Newark, NJ 07104", price: "$1,999,999", beds: "8", baths: "6", sqft: "6100", listedWith: "O'Brien Realty, LLC", url: "" },
  { id: "4", image: "/list-img-4.jpg", address: "210 Pine Brook Road", city: "Manalapan, NJ 07726", price: "$999,999", beds: "4", baths: "3", sqft: "3750", listedWith: "Gruosso Realty Group, LLC", url: "" },
  { id: "5", image: "/list-img-5.jpg", address: "261 State Route 34", city: "Colts Neck, NJ 07722", price: "$849,000", beds: "4", baths: "2.5", sqft: "3200", listedWith: "Shore Realty NJ, LLC", url: "" },
  { id: "6", image: "/list-img-6.jpg", address: "0 Adelphia-Farmingdale Rd", city: "Farmingdale, NJ 07727", price: "$799,900", beds: "3", baths: "2", sqft: "2640", listedWith: "Gruosso Realty Group, LLC", url: "" },
  { id: "7", image: "/list-img-7.jpg", address: "0 US Route 130", city: "Cranbury Twp, NJ 08512", price: "$499,900", beds: "3", baths: "1.5", sqft: "1980", listedWith: "Garden State Realty, LLC", url: "" },
  { id: "8", image: "/list-img-8.jpg", address: "7 Joyce Court", city: "Tinton Falls, NJ 07724", price: "$499,900", beds: "3", baths: "2", sqft: "2100", listedWith: "Shore Realty NJ, LLC", url: "" },
  { id: "9", image: "/list-img-9.jpg", address: "0 Route 9", city: "Howell, NJ 07731", price: "$350,000", beds: "2", baths: "1", sqft: "1340", listedWith: "Gruosso Realty Group, LLC", url: "" },
];

function normalize(listings: IDXListing[]): NormalizedListing[] {
  return listings.map((listing) => ({
    id: listing.listingID,
    image: listing.photos[0] ?? "/list-img-1.jpg",
    address: listing.address,
    city: `${listing.cityName}, ${listing.stateAbbr} ${listing.zipcode}`.trim(),
    price: formatListingPrice(listing.listPrice),
    beds: listing.bedrooms,
    baths: listing.totalBaths,
    sqft: listing.sqFt,
    listedWith: "Gruosso Realty Group, LLC",
    url: listing.listingUrl ?? "",
  }));
}

function ListingImage({ listing, sizes }: { listing: NormalizedListing; sizes: string }) {
  if (listing.image.startsWith("http")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={listing.image} alt={listing.address} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />;
  }

  return (
    <Image
      src={listing.image}
      alt={listing.address}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes={sizes}
      placeholder="blur"
      blurDataURL={BLUR_PLACEHOLDER}
    />
  );
}

function ListingModal({ listing, onClose }: { listing: NormalizedListing; onClose: () => void }) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const sqftNumber = Number(listing.sqft);
  const sqftFormatted = listing.sqft && sqftNumber > 0 ? sqftNumber.toLocaleString() : "-";
  const details = [
    { label: "Price", value: listing.price || "-" },
    { label: "Bedrooms", value: listing.beds || "-" },
    { label: "Total Baths", value: listing.baths || "-" },
    { label: "Sq Ft", value: sqftFormatted },
    { label: "Listed With", value: listing.listedWith },
  ];

  return (
    <div
      className="fixed inset-0 flex items-end justify-center p-0 sm:items-center sm:p-4"
      style={{ zIndex: 99999 }}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[93dvh] w-full overflow-y-auto bg-white shadow-2xl sm:max-h-[88vh] sm:max-w-lg sm:rounded-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow transition-colors hover:text-[#161f2d]"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
          <ListingImage listing={listing} sizes="(max-width: 640px) 100vw, 512px" />
          <div className="absolute bottom-3 left-3 rounded-lg bg-[#161f2d]/90 px-3 py-1.5 text-white backdrop-blur-sm">
            <span className="text-base font-semibold tracking-wide font-[family-name:var(--font-manrope)]">
              {listing.price}
            </span>
          </div>
        </div>

        <div className="px-5 pb-7 pt-5 sm:px-7">
          <h3 className="text-2xl font-normal leading-snug text-[#161f2d] font-[family-name:var(--font-cormorant-garamond)] sm:text-[1.65rem]">
            {listing.address}
          </h3>

          <div className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100">
            {details.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 bg-white px-4 py-2.5">
                <span className="text-xs text-gray-500 font-[family-name:var(--font-karla)]">{row.label}</span>
                <span className="text-right text-sm font-semibold text-[#161f2d] font-[family-name:var(--font-manrope)]">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5">
            <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3aaacf] font-[family-name:var(--font-manrope)]">
              Location
            </h4>
            <p className="text-sm text-gray-700 font-[family-name:var(--font-karla)]">{listing.address}</p>
            <p className="text-sm text-gray-500 font-[family-name:var(--font-karla)]">{listing.city}</p>
          </div>

          <div className="mt-6">
            {listing.url ? (
              <a
                href={listing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3aaacf] px-6 py-3.5 text-sm font-semibold text-white shadow transition-all duration-200 hover:bg-[#2f95b6] font-[family-name:var(--font-manrope)]"
              >
                View Listing
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3aaacf] px-6 py-3.5 text-sm font-semibold text-white shadow transition-all duration-200 hover:bg-[#2f95b6] font-[family-name:var(--font-manrope)]"
              >
                Contact Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllListingsClient({ listings }: { listings: IDXListing[] }) {
  const items = useMemo(
    () => (listings.length > 0 ? normalize(listings) : FALLBACK_LISTINGS),
    [listings],
  );
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<NormalizedListing | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const filteredListings = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return items;

    return items.filter((listing) =>
      [
        listing.address,
        listing.city,
        listing.price,
        listing.beds,
        listing.baths,
        listing.sqft,
        listing.listedWith,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [items, query]);

  return (
    <>
      <section className="w-full bg-white pt-36 lg:pt-52 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="block h-px w-8 bg-[#3aaacf]" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3aaacf] font-[family-name:var(--font-manrope)]">
                  Our Listings
                </span>
              </div>
              <h1 className="text-[34px] font-normal leading-tight tracking-wide text-black font-[family-name:var(--font-cormorant-garamond)] sm:text-5xl">
                Explore Available Listings
              </h1>
            </div>

            <label className="w-full max-w-md">
              <span className="sr-only">Search listings</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by address, city, price..."
                className="w-full rounded border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#3aaacf] font-[family-name:var(--font-karla)]"
              />
            </label>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredListings.map((listing) => (
                <div
                  key={listing.id}
                  className="group cursor-pointer overflow-hidden bg-white"
                  onClick={() => setSelected(listing)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelected(listing);
                    }
                  }}
                  aria-label={`View details for ${listing.address}`}
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <ListingImage listing={listing} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  </div>

                  <div className="flex flex-col gap-1 py-5 pl-0">
                    <p className="text-xl font-bold tracking-tight text-black font-[family-name:var(--font-manrope)] sm:text-[15px] sm:font-normal sm:uppercase sm:tracking-[3.5px]">
                      {listing.price}
                    </p>
                    <p className="text-base font-normal leading-snug text-gray-900 font-[family-name:var(--font-arapey)] sm:pt-2 sm:text-[19px] sm:tracking-[1.4px]">
                      {listing.address}, {listing.city}
                    </p>
                    <p className="mt-0.5 text-[15px] font-light tracking-[0.3px] text-black font-[family-name:var(--font-karla)] sm:mt-0 sm:pt-2">
                      {listing.beds} BD&nbsp;|&nbsp;{listing.baths} BA&nbsp;|&nbsp;{Number(listing.sqft) > 0 ? `${Number(listing.sqft).toLocaleString()} ` : ""}SQFT
                    </p>
                    <p className="mt-1 text-[15px] font-light tracking-[0.28px] text-black font-[family-name:var(--font-karla)] sm:mt-0 sm:pt-2">
                      Listed With {listing.listedWith}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-y border-gray-200 py-14 text-center">
              <p className="text-base text-gray-700 font-[family-name:var(--font-karla)]">
                No listings matched your search.
              </p>
            </div>
          )}
        </div>
      </section>

      {selected ? <ListingModal listing={selected} onClose={closeModal} /> : null}
    </>
  );
}
