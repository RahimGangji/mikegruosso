import type { Metadata } from "next";
import MissionSection from "../components/about/MissionSection";
import AboutGroupSection from "../components/about/AboutGroupSection";
import AboutTeamSection from "../components/about/AboutTeamSection";
import OurAreas from "../components/OurAreas";
import AboutCTA from "../components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | The Gruosso Group",
  description:
    "Learn about The Gruosso Group — New Jersey's premier real estate team serving Monmouth & Ocean County with 20+ years of experience and 1,000+ transactions.",
};

export default function AboutPage() {
  return (
    <main>
      <MissionSection />
      <AboutGroupSection />
      <AboutTeamSection />
      <OurAreas />
      <AboutCTA />
    </main>
  );
}
