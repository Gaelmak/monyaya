import { BecomeATrainer } from '@/ui/modules/become-a-trainer/become-a-trainer'
import { Recommandations } from '@/ui/modules/recommandations/recommandations'
import { HowItWorks } from '@/ui/modules/how-it-works/how-it-works'
import { HeroBanner } from '@/ui/modules/hero-banner/hero-banner'
import { Benefits } from '@/ui/modules/benefits/benefits'
import { Newsletter } from '@/ui/modules/newsletter/newsletter'
import { Container } from '@/ui/components/container/container'

export default function Home() {
  return (
    <main>
      <Container>
        <HeroBanner/>
        <Benefits/>
        <Recommandations/>
        <BecomeATrainer/>
        <HowItWorks/>
        <Newsletter/>
      </Container>
      
    </main>
  )
}