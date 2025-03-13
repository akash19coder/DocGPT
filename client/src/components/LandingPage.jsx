import { NavbarComponent } from "./NavbarComponent";
import { HeroSection } from "./HeroSection";
import { SubscriptionPlansBw } from "./SubscriptionPlansBw";
import { FaqSection } from "./FAQSection";
import { FooterBw } from "./FooterBw";
import { FlashyIntegrationsSectionComponent } from "./FlashyIntegrationsSectionComponent";
import { TwitterTestimonials } from "./TwitterTestimonials";
export default function LandingPage() {
  return (
    <div>
      <NavbarComponent />
      <HeroSection />
      <SubscriptionPlansBw />
      <FlashyIntegrationsSectionComponent />
      <TwitterTestimonials />
      <FaqSection />
      <FooterBw />
    </div>
  );
}
