import { AppMobile } from '@/ui/modules/app-mobile/app-mobile'
import { BecomeATrainer } from '@/ui/modules/become-a-trainer/become-a-trainer'
import { BestTrainingCourses } from '@/ui/modules/best-training-courses/best-training-courses'
import { HowItWorks } from '@/ui/modules/how-it-works/how-it-works'
import { HeroBanner } from '@/ui/modules/hero-banner/hero-banner'
import { Profils } from '@/ui/modules/profils/profils'
import { Testimonials } from '@/ui/modules/testimonials/testimonials'
import { Container } from '@/ui/components/container/container'

export default function Home() {
  return (
    <main>
      <HeroBanner/>
      <BestTrainingCourses/>
      <BecomeATrainer/>
      <HowItWorks/>
      <Profils/>
      <AppMobile/>
      <Testimonials/>
      <Container className='p-32'>Footer</Container>
    </main>
  )
}
