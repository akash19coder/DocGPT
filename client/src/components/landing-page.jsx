import { NavbarComponent } from "./navbar";
import { HeroSection } from "./hero-section";
import { SubscriptionPlansBw } from "./subscription-plans-bw";
import { FaqSection } from "./faq-section";
import { FooterBw } from "./footer-bw";
import { FlashyIntegrationsSectionComponent } from "./flashy-integrations-section";
import { TwitterTestimonials } from "./twitter-testimonials";
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
