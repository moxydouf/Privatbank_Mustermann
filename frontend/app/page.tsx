import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { TransactionsSection } from "@/components/home/transactions-section";
import { SavingsSection } from "@/components/home/saving-section";
import NotificationSection from "@/components/home/notification-section";
import { TestimonialsSection } from "@/components/home/testimonial-section";
import { IntegrationsSection } from "@/components/home/integrations-section";

export default function Home() {
  return (
    <main>
      {/* <Navigation /> */}
      <HeroSection />
      <FeaturesSection />
      <TransactionsSection />
      <SavingsSection />
      <NotificationSection />
      <IntegrationsSection />
      <TestimonialsSection />
    </main>
  );
}
