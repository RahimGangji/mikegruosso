import type { Metadata } from "next";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio | The Gruosso Group",
  description:
    "Browse properties sold and listed by The Gruosso Group across Monmouth & Ocean County, NJ — residential, commercial, land, and investment.",
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioGrid />
    </main>
  );
}
