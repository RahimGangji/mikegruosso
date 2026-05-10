import HomeBuyingProcess from "../components/buy/HomeBuyingProcess";
import StartHomeSearch from "../components/buy/StartHomeSearch";
import SaveAndSeeListings from "../components/buy/SaveAndSeeListings";
import MakingOfferClosing from "../components/buy/MakingOfferClosing";

const homeBuyingProcessData = {
  title: "The Home Buying Process",
  subtitle: "We Can Make It Easy",
  titleClassName: "text-[30px] lg:text-[36px]",
  paragraphs: [
    "Buying a home is a big step! Whether you're buying your first home, your dream home, or your tenth investment property, your purchase will be a big investment. We know how important this is to you, and have an army of experts to make sure we find the perfect property for your unique circumstances. The Gruosso Group knows the market well and truly loves real estate, and we'll educate you throughout the entire buying experience.",
    "Finding the perfect property is just one way our team can help you with your real estate purchase. Our top real estate agents and brokers have ongoing access to experts in every related field from lending to relocation so you're covered at every step of the journey.",
  ],
};

export default function BuyPage() {
  return (
    <main>
      <MakingOfferClosing
        leadFormVariant="purchase"
        sectionClassName="w-full bg-white pt-36 lg:pt-52 pb-10 sm:pb-14"
        stickyLeft={false}
        leftImage={{ src: "/buy-form-img.avif", alt: "Home buyer consultation" }}
      />
      <HomeBuyingProcess
        {...homeBuyingProcessData}
        sectionClassName="w-full bg-white pt-12 sm:pt-16 pb-14 sm:pb-20"
      />
      {/* <StartHomeSearch /> */}
      <SaveAndSeeListings />
    </main>
  );
}
