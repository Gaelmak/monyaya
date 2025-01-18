import { Container } from "@/ui/components/container/container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Newsletter } from "@/ui/modules/newsletter/newsletter";
import ValueSection from "@/ui/modules/about-components/valueSection";
import CompanyOverview from "@/ui/modules/about-components/companyOverview";
import MissionSection from "@/ui/modules/about-components/mission";
import VisionSection from "@/ui/modules/about-components/visionSection";
import TestimonialCarousel from "@/ui/modules/about-components/TestimonialCarousel";

export default function About() {
  return (
    <main className="w-full">
      <CompanyOverview />
      <MissionSection />
      <VisionSection />
      <ValueSection />
      {/* <TestimonialCarousel /> */}
      <Newsletter />
    </main>
  );
}
