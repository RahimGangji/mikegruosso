import HomeBuyingProcess from "../components/buy/HomeBuyingProcess";
import StartHomeSearch from "../components/buy/StartHomeSearch";
import MakingOfferClosing from "../components/buy/MakingOfferClosing";

const homeBuyingProcessData = {
  title: "Making an Offer & Closing",
  subtitle: "Gruosso Partner Till The End",
  titleClassName: "text-[30px] lg:text-[36px]",
  paragraphs: [
    "When you find a home you love, The Gruosso Group will help you craft and submit a strong, competitive offer. We are skilled negotiators who know the Monmouth and Ocean County markets intimately, and we will work tirelessly to secure the best price and terms possible for you.",
    "Once your offer is accepted, we will guide you through every step that follows from inspections and appraisals to mortgage milestones and the final walk through, ensuring a smooth, stress free closing. Best of all, our service comes at no cost to you as the buyer; we are compensated by the seller, so you get a full team of experts in your corner without adding to your bottom line.",
  ],
};

const homeSearchBulletPoints = [
  "Browse active listings across the Jersey Shore from any device.",
  "Compare neighborhoods, pricing, school ratings, and property details in one place.",
  "Save homes you love and share them with our team for quick, local guidance.",
  "Get expert support from search strategy through showings, offers, and closing.",
];

export default function BuyPage() {
  return (
    <main>
      <MakingOfferClosing
        leadFormVariant="purchase"
        sectionClassName="w-full bg-white pt-36 lg:pt-52 pb-10 sm:pb-14"
        stickyLeft={false}
        leftImage={{ src: "/buy-form-img.avif", alt: "Home buyer consultation" }}
      />
      
      <StartHomeSearch
        cta={{ label: "Start Searching", href: "/listings" }}
        bulletPoints={homeSearchBulletPoints}
      />
      <HomeBuyingProcess
        {...homeBuyingProcessData}
        sectionClassName="w-full bg-white pt-12 sm:pt-16 pb-14 sm:pb-20"
      />
    </main>
  );
}
