import { HeroSection } from "@/components/home/HeroSection";
import { IntroSection } from "@/components/home/IntroSection";
import { CompanyLogoJourney } from "@/components/home/CompanyLogoJourney";

export default function Home() {
  return (
    <>
      <CompanyLogoJourney />
      <HeroSection />
      <IntroSection />
    </>
  );
}
