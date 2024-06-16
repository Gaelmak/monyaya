import { Container } from '@/ui/components/container/container';
import { Newsletter } from '@/ui/modules/newsletter/newsletter'
import ValueSection from '@/ui/modules/about-components/valueSection';
import CompanyOverview from '@/ui/modules/about-components/companyOverview';
import MissionSection from '@/ui/modules/about-components/mission';
import VisionSection from '@/ui/modules/about-components/visionSection';
import { HowItWorks } from '@/ui/modules/how-it-works/how-it-works'


export default function Home() {
  return (
    <main>
      <Container className=''>
      <CompanyOverview/>
        <MissionSection />
        <VisionSection />
        <ValueSection />
        <HowItWorks/>
        {/* <HowItWorks /> */}
        <Newsletter/>
      </Container>
    </main>
  )
}
