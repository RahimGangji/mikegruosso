import type { Metadata } from "next";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import { fetchSoldPendingListings } from "../lib/idxbroker";

export const metadata: Metadata = {
  title: "Portfolio | The Gruosso Group",
  description:
    "Browse properties sold and listed by The Gruosso Group across Monmouth & Ocean County, NJ — residential, commercial, land, and investment.",
};

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const listings = await fetchSoldPendingListings();

  return (
    <main>
      <PortfolioGrid listings={listings} />
    </main>
  );
}
