import { BecomeATrainer } from '@/ui/modules/become-a-trainer/become-a-trainer'
import { BestProfil } from '@/ui/modules/best-profil/best-profil'
import { HeroBanner } from '@/ui/modules/hero-banner/hero-banner'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <HeroBanner/>
      <BestProfil/>
      <BecomeATrainer/>
    </main>
  )
}
