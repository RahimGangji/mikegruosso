import HomeBuyingProcess from "../components/buy/HomeBuyingProcess";
import MakingOfferClosing from "../components/buy/MakingOfferClosing";
import CommercialPropertyTypes from "../components/commercial/CommercialPropertyTypes";

const COMMERCIAL_FORM_ID = "commercial-inquiry";

const heroData = {
  title: "Commercial Real Estate Opportunities",
  subtitle: "Properties across New Jersey.",
  titleClassName: "text-[28px] lg:text-[36px]",
  paragraphs: [
    "From storefronts in walkable shore towns to industrial space along major corridors, The Gruosso Group connects owner users, investors, and developers with the right commercial properties across New Jersey. We pair on the ground market knowledge with strategic underwriting so every opportunity is evaluated on its real economics, not its glossy listing photos.",
    "Whether you're acquiring your first commercial asset, repositioning a portfolio, or planning a ground up project, our team handles sourcing, due diligence, negotiation, and closing coordination end to end, including referrals to attorneys, lenders, and engineers when you need them.",
  ],
  images: {
    primary: {
      src: "/commerical-img1.avif",
      alt: "Commercial property along the Jersey Shore",
    },
    secondary: {
      src: "/commerical-img2.avif",
      alt: "Commercial property analysis and evaluation",
    },
  },
  cta: {
    label: "Contact us",
    href: "/contact",
  },
};

const commercialFormData = {
  title: "Talk to a Commercial Specialist",
  subtitle: "Sourcing, Underwriting, and Negotiation",
  sectionClassName: "w-full bg-white py-20 sm:py-24",
  headingClassName: "text-[30px] lg:text-[36px]",
  formHeadingClassName: "text-[36px]",
  leadFormVariant: "commercial" as const,
  formAnchorId: COMMERCIAL_FORM_ID,
  paragraphs: [
    "Tell us about the type of commercial property you're targeting and the budget you're working with. We'll review fit, surface relevant on market and off market options, and follow up with a clear next step, no boilerplate and no pressure.",
    "Our commercial team handles assignments across retail, office, industrial, mixed-use, land, hospitality, and stabilized investment assets, and routinely coordinates with attorneys, lenders, and inspection partners so you can move on the right deal quickly.",
  ],
};

export default function CommercialPage() {
  return (
    <main>
      <HomeBuyingProcess {...heroData} />
      <CommercialPropertyTypes />
      <MakingOfferClosing {...commercialFormData} />
    </main>
  );
}
