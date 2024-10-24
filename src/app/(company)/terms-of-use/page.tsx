"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/ui/components/container/container";
import { termOfUse } from "@/lib/terme-of-use-data/term-of-use";
import { Typography } from "@/ui/components/typography/typography";

export default function TermOfUse() {
  const [activeSection, setActiveSection] = useState<string>(termOfUse[0].id);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const offset = 150;

    termOfUse.forEach((article) => {
      const element = document.getElementById(article.id);
      if (element) {
        const elementPosition = element.offsetTop;
        const elementHeight = element.clientHeight;
        if (
          scrollPosition >= elementPosition - offset &&
          scrollPosition < elementPosition + elementHeight - offset
        ) {
          setActiveSection(article.id);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="flex justify-center max-w-full select-none w-full lg:px-[7vw] py-8 md:py-12 px-4">
      <Container className="flex flex-col md:w-2/3 lg:w-4/6">
        <div className="leading-relaxed mb-6 flex flex-col gap-4">
          <Typography
            className="leading-relaxed text-[#39ae44] text-2xl md:text-4xl font-bold"
            component="h1"
          >
            Termes et Conditions d&apos;Utilisation de Monyaya
          </Typography>
          <Typography
            component="p"
            className="flex flex-col leading-relaxed"
            variant="body-base"
          >
            Bienvenue sur Monyaya. En utilisant notre plateforme, vous acceptez
            les présentes conditions générales d&apos;utilisation. Veuillez les
            lire attentivement avant d&apos;utiliser nos services.
          </Typography>
        </div>
        {termOfUse.map((section, index) => (
          <div id={section.id} key={index} className="mb-10">
            <Typography className="mb-4 text-[#39ae44] text-xl font-semibold">
              {section.title}
            </Typography>
            <Typography className="leading-relaxed" variant="body-base">
              {section.content}
            </Typography>
          </div>
        ))}
        <Typography
          component="p"
          className="flex flex-col leading-relaxed"
          variant="body-base"
        >
          En utilisant la plateforme Monyaya, vous reconnaissez avoir lu et
          accepté les présentes conditions.
        </Typography>
      </Container>
    </main>
  );
}
