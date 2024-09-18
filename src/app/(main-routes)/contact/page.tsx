"use client";
import ContactForm from "@/ui/components/contact-form/contactForm";
import Cover_v from "public/cover.jpg";
import { BgImg } from "@/ui/components/bg-img/bg-img";
import ContactSection from "@/ui/modules/contact-component/contact-section";
import { HowItWork } from "@/ui/modules/how-it-works/HowItWork";
import { Newsletter } from "@/ui/modules/newsletter/newsletter";

const BackgroundImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BgImg className="h-[70vh] md:flex" src={Cover_v} alt="cover">
        {children}
      </BgImg>
    </>
  );
};
export default function ContactPage() {
  return (
    <main>
      <BackgroundImage>
        <div className="flex flex-col justify-center h-full items-center gap-6 ">
          <h1 className="text-6xl font-bold text-white ">Nous Contactez</h1>
          <p className="font-bold text-white">
            Nous repondons dans moins de 24h
          </p>
          <p></p>{" "}
        </div>
      </BackgroundImage>
      <ContactSection />
      <HowItWork />
      <Newsletter />
    </main>
  );
}
