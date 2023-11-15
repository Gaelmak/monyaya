import { BecomeATrainer } from '@/ui/modules/become-a-trainer/become-a-trainer'
import { BestProfil } from '@/ui/modules/best-profil/best-profil'
import { CourseSearchForm } from '@/ui/modules/course-search-form/course-search-form'
import { HeroBanner } from '@/ui/modules/hero-banner/hero-banner'
import { Profils } from '@/ui/modules/profils/profils'
import { Testimonials } from '@/ui/modules/testimonials/testimonials'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <HeroBanner/>
      <BestProfil/>
      <BecomeATrainer/>
      <CourseSearchForm/>
      <Profils/>
      <Testimonials/>
    </main>
  )
}
