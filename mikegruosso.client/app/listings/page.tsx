import AllListingsClient from "../components/listings/AllListingsClient";
import { fetchFeaturedListings } from "../lib/idxbroker";

export default async function ListingsPage() {
  const listings = await fetchFeaturedListings();

  return (
    <main>
      <AllListingsClient listings={listings} />
    </main>
  );
}
