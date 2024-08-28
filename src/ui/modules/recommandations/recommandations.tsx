import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import { ServiceButton } from "@/routes/auth-buttons";
import { staticData } from "@/utils/staticData";


interface Props {
  trainer?: string | null;
  branch?: string | null;
  current?: string | null;
}

export const Recommandations = async ({ trainer, branch, current }: Props) => {
  
  return (

        <Container className="flex  px-4 md:px-8 md:py-10 flex-col gap-8 text-primary-50 bg-primary-400 w-full lg:px-[7vw]">
          <Container className="flex justify-between flex-col gap-3 items-center">
            <Typography  component="h3" className="text-2xl font-bold">
              Formations Populaire
            </Typography>
            <Typography className="text-center md:w-1/2 text-sm"> 
            Découvrez les cours les plus demandés !
            choisis avec soin pour répondre aux besoins 
            des apprenants d'aujourd'hui. Profitez d'un 
            contenu attrayant conçu pour vous accompagner 
            vers la réussite à chaque étape de votre parcours.
            </Typography>
          </Container>
          <br />
          <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
            <TrainingsView
                className="grid grid-cols-1 md:grid-cols-3 gap-4 "
                data={staticData}
                userId={"123"}
                // myLearnings={myLearnings!}
                sessionName={'jdoe'}
              />

          </Container>
          <br />
        <Container className="hidden md:flex lg:w-[14vw] md:w-[20vh] m-auto">
            <ServiceButton className="px-4 py-2">Voir tous les cours</ServiceButton>
        </Container>
        </Container>
      )}