"use client";

import { Container } from "@/ui/components/container/container";
import { termOfUse } from "@/lib/terme-of-use-data/term-of-use";
import { Typography } from "@/ui/components/typography/typography";

export default function TermOfUse() {
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
            <div className="mb-4 text-[#39ae44] text-xl font-semibold">
              {section.title}
            </div>
            <div className="leading-relaxed">{section.content}</div>
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
