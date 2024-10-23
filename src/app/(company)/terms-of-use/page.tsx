"use client";

import { Container } from "@/ui/components/container/container";
import { termOfUse } from "@/lib/terme-of-use-data/term-of-use";
import { Typography } from "@/ui/components/typography/typography";

export default function TermOfUse() {
  return (
    <main className="flex max-w-full select-none w-full px-4 md:px-8 lg:px-[7vw]">
      <Container className="flex justify-between items-start relative">
        <Container className="flex flex-col md:w-2/3 lg:w-3/4 md:mr-4">
          <Container className="leading-relaxed mb-6 flex flex-col gap-4 md:pt-5">
            <Typography
              className="leading-relaxed text-[#39ae44] text-3xl lg:text-5xl font-semibold "
              component="h3"
            >
              {"Conditions d'utilisation"}
            </Typography>
            <Typography
              className="text-[#424242] text-xl"
              component="h5"
              variant="title-sm"
            >
              {
                "Bienvenue sur Monyaya. En utilisant notre plateforme, vous acceptez les présentes conditions générales d'utilisation. Veuillez les lire attentivement avant d'utiliser nos services."
              }
            </Typography>
          </Container>
          {termOfUse.map((section, index) => (
            <div id={section.id} key={index} className="mb-10">
              <Typography className="mb-4 text-[#39ae44] text-2xl font-semibold">
                {section.title}
              </Typography>
              <Typography className="leading-relaxed" variant="body-base">
                {section.content}
              </Typography>
            </div>
          ))}
        </Container>
      </Container>
    </main>
  );
}
