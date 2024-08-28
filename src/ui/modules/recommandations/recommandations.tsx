"use client";

import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { ServiceButton } from "@/routes/auth-buttons";
import { useState } from "react";
import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import { staticData } from "@/utils/staticData";

interface Props {
  trainer?: string | null;
  branch?: string | null;
  current?: string | null;
}

export const Recommandations = () => {
  const [popularCourses, setPopularCourses] = useState<any[]>([]);

  if (popularCourses.length !== 0) {
    return;
  }

  return (
    <Container className=" bg-primary-600 px-4 py-10 md:px-10 md:py-16 flex flex-col gap-8 items-center">
      <Container className="flex justify-between flex-col gap-3 items-center">
        <Typography
          variant="title-base"
          component="h3"
          className="text-white text-2xl md:text-3xl font-bold"
        >
          Formations Populaire
        </Typography>
        <Typography className="text-center md:w-1/2 text-white">
          Découvrez les cours les plus demandés!
          <br />
          choisis avec soin pour répondre aux besoins des apprenants
          d'aujourd'hui. Profitez d'un contenu attrayant conçu pour vous
          accompagner vers la réussite à chaque étape de votre parcours.
        </Typography>
      </Container>
      <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
        <TrainingsView
          className="grid grid-cols-1 md:grid-cols-3 gap-4 "
          data={staticData}
          userId={"123"}
          // myLearnings={myLearnings!}
          sessionName={"jdoe"}
        />
      </Container>
      <Container>
        <ServiceButton className="px-4 py-2">Voir tous les cours</ServiceButton>
      </Container>
    </Container>
  );
};
