import { BecomeATrainer } from "@/ui/modules/become-a-trainer/become-a-trainer";
// import { Recommandations } from '@/ui/modules/recommandations/recommandations'
import { HowItWorks } from "@/ui/modules/how-it-works/how-it-works";
import { HeroBanner } from "@/ui/modules/hero-banner/hero-banner";
// import { Benefits } from '@/ui/modules/benefits/benefits'
import { Newsletter } from "@/ui/modules/newsletter/newsletter";
import { Container } from "@/ui/components/container/container";
import { BenefitSearch } from "@/components/benefitSeach";
import { Recommandations } from "@/ui/modules/recommandations/recommandations";
import { HowItWork } from "@/ui/modules/HowItWork";

export default function Home() {
  return (
    <main>
      <Container>
        <HeroBanner />
        <BenefitSearch />
        <Recommandations />
        <BecomeATrainer />
        <HowItWork />
        {/* <HowItWorks /> */}
        <Newsletter />
      </Container>
    </main>
  );
}
