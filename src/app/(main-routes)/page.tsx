import { BecomeATrainer } from "@/ui/modules/become-a-trainer/become-a-trainer";
import { HeroBanner } from "@/ui/modules/hero-banner/hero-banner";
import { Newsletter } from "@/ui/modules/newsletter/newsletter";
import { Container } from "@/ui/components/container/container";
import { BenefitSearch } from "@/components/benefitSeach";
import { Recommandations } from "@/ui/modules/recommandations/recommandations";
import { HowItWork } from "@/ui/modules/how-it-works/HowItWork";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <BenefitSearch />
      <Recommandations />
      <BecomeATrainer />
      <HowItWork />
      <Newsletter />
    </main>
  );
}
