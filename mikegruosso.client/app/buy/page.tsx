import HomeBuyingProcess from "../components/buy/HomeBuyingProcess";
import StartHomeSearch from "../components/buy/StartHomeSearch";
import SaveAndSeeListings from "../components/buy/SaveAndSeeListings";
import MakingOfferClosing from "../components/buy/MakingOfferClosing";

export default function BuyPage() {
  return (
    <main>
      <HomeBuyingProcess />
      <StartHomeSearch />
      <SaveAndSeeListings />
      <MakingOfferClosing />
    </main>
  );
}
