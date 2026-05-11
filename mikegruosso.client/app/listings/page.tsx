import AllListingsClient from "../components/listings/AllListingsClient";
import { fetchFeaturedListings } from "../lib/idxbroker";

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string | string[] }>;
}) {
  const params = await searchParams;
  const search =
    typeof params.search === "string"
      ? params.search
      : Array.isArray(params.search)
        ? params.search[0] ?? ""
        : "";
  const listings = await fetchFeaturedListings();

  return (
    <main>
      <AllListingsClient listings={listings} initialSearch={search} />
    </main>
  );
}
