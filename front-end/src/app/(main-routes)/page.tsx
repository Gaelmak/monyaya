import { AppMobile } from '@/ui/modules/app-mobile/app-mobile'
import { BecomeATrainer } from '@/ui/modules/become-a-trainer/become-a-trainer'
import { Recommandations } from '@/ui/modules/recommandations/recommandations'
import { HowItWorks } from '@/ui/modules/how-it-works/how-it-works'
import { HeroBanner } from '@/ui/modules/hero-banner/hero-banner'
import { Profils } from '@/ui/modules/profils/profils'
import { Testimonials } from '@/ui/modules/testimonials/testimonials'
import { Benefits } from '@/ui/modules/benefits/benefits'

export default function Home() {
  return (
    <main>
      <HeroBanner/>
      <Benefits/>
      <Recommandations/>
      <BecomeATrainer/>
      <HowItWorks/>
      <Profils/>
      <AppMobile/>
      <Testimonials/>
    </main>
  )
}