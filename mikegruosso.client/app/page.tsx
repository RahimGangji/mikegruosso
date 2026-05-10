export const dynamic = "force-dynamic";

import HeroSection from "./components/HeroSection";
import HomeLeadPopup from "./components/HomeLeadPopup";
import ElevatingSection from "./components/ElevatingSection";
import ListingsSection from "./components/ListingsSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import OurTeam from "./components/OurTeam";
import OurAreas from "./components/OurAreas";
import SoldPropertiesSection from "./components/SoldPropertiesSection";
// import FAQs from "./components/FAQs";
import TestimonialBannerSection from "./components/TestimonialBannerSection";
import CTA from "./components/CTA";
import { fetchFeaturedListings } from "./lib/idxbroker";

export default async function Home() {
  const listings = await fetchFeaturedListings();

  return (
    <main>
      <HomeLeadPopup />
      <HeroSection />
      <ElevatingSection />
      {/* <WhyChooseUs /> */}
      <ListingsSection listings={listings} />
      <ServicesSection />
      <AboutSection />
      <OurTeam />
      <OurAreas />
      <SoldPropertiesSection />
      {/* <FAQs /> */}
      <TestimonialBannerSection />
      <CTA />
    </main>
  );
}
