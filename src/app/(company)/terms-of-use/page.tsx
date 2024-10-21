"use client";

import { Container } from "@/ui/components/container/container";
import { termOfUse } from "@/lib/terme-of-use-data/term-of-use";
import { Typography } from "@/ui/components/typography/typography";

export default function TermOfUse() {
  return (
    <main className="flex max-w-full select-none w-full px-4 md:px-8 lg:px-[7vw]">
      <Container className="flex justify-between items-start relative">
        <Container className="flex flex-col md:w-2/3 lg:w-3/4 md:mr-4">
          <Container className="leading-relaxed mb-6 flex flex-col gap-4">
            <Typography
              className="leading-relaxed text-[#39ae44] text-5xl font-semibold"
              component="h3"
            >
              Contrats
            </Typography>
            <Typography
              className="text-[#424242] text-xl"
              component="h5"
              variant="title-sm"
            >
              Pour Clients,
            </Typography>
            <Typography
              component="p"
              className="flex flex-col leading-relaxed"
              variant="body-base"
            >
              Contrat de service d&apos;apprentissage à domicile Entre
              <br />
              <Typography component="span" variant="body-lg">
                MonYaya
              </Typography>
              <br />
              société par actions simplifiée dont le siège social est situé a
              [adresse],représentée par [nom du représentant légal],en qualité
              de [fonction],
              <span className="font-semibold">{"D'une part,"}</span>
              <br />
              Et [Nom du client], [qualité du client], demeurant [adresse],
              <br />
              <span className="font-semibold">{"D'autre part,"}</span>
              <br />
              il a été conclu le présent contrat de service d&apos;apprentissage
              à domicile, ci- après dénommé{" "}
              <span className="font-semibold">{`"Contrat"`}</span>
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
