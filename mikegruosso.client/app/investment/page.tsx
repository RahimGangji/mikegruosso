import HomeBuyingProcess from "../components/buy/HomeBuyingProcess";
import StartHomeSearch from "../components/buy/StartHomeSearch";
import InvestmentTypes from "../components/investment/InvestmentTypes";
import InvestmentStats from "../components/investment/InvestmentStats";
import ROICalculator from "../components/investment/ROICalculator";
import MakingOfferClosing from "../components/buy/MakingOfferClosing";

const heroData = {
  title: "Investment Opportunities",
  subtitle: "Build Your Real Estate Portfolio",
  titleClassName: "text-[30px] lg:text-[40px]",
  paragraphs: [
    "Looking to grow your wealth through real estate? The Gruosso Group offers a range of lucrative investment opportunities that can help you build a strong portfolio and achieve your financial goals. With over 1,000 closed transactions and 20 years of experience in Monmouth and Ocean County, we know exactly where the smart money moves along the Jersey Shore.",
    "Whether you are a first time investor or a seasoned professional looking to expand your holdings, our team provides in depth market analysis, access to off market properties, and hands-on guidance from acquisition through closing and well beyond.",
  ],
  images: {
    primary: {
      src: "/real-estate-property.avif",
      alt: "Investment property on the Jersey Shore",
    },
    secondary: {
      src: "/home-evaluation.avif",
      alt: "Property evaluation and analysis",
    },
  },
};

const searchData = {
  title: "Find Your Next Investment Property",
  subtitle: "Search the Jersey Shore Market",
  paragraphs: [
    "Our platform lets you filter listings by cashflow potential, neighbourhood growth rate, and proximity to the shore so you spend time evaluating the right properties, not wading through the wrong ones.",
    "Set alerts for new listings that match your criteria and our team will reach out the moment a strong investment opportunity hits the market. Speed matters in real estate, and we make sure you are always first in line.",
  ],
  backgroundImage: "/happy-familybg.avif",
  featureImage: {
    src: "/laptop-device.png",
    alt: "Search investment properties on a laptop",
  },
  cta: {
    label: "Browse Investment Listings",
    href: "/portfolio",
  },
};

export default function InvestmentPage() {
  return (
    <main>
      <HomeBuyingProcess {...heroData} />
      <InvestmentTypes />
      <StartHomeSearch {...searchData} />
      <ROICalculator />
      <InvestmentStats />
      <MakingOfferClosing />
    </main>
  );
}
