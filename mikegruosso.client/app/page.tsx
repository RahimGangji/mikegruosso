import HeroSection from "./components/HeroSection";
import ElevatingSection from "./components/ElevatingSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ListingsSection from "./components/ListingsSection";
import AboutSection from "./components/AboutSection";
import OurTeam from "./components/OurTeam";
import OurAreas from "./components/OurAreas";
import SoldPropertiesSection from "./components/SoldPropertiesSection";
// import FAQs from "./components/FAQs";
import TestimonialBannerSection from "./components/TestimonialBannerSection";
import CTA from "./components/CTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ElevatingSection />
      {/* <WhyChooseUs /> */}
      <ListingsSection />
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
