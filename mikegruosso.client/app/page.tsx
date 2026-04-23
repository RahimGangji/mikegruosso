import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import ListingsSection from "./components/ListingsSection";
import OurTeam from "./components/OurTeam";
import FAQs from "./components/FAQs";
import CTA from "./components/CTA";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyChooseUs />
      <ListingsSection />
      <OurTeam />
      <FAQs />
      <CTA />
      <Testimonials />
    </main>
  );
}
