import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import prisma from "@/lib/prisma";
import { TrainingsView } from "@/ui/components/trainings-view/trainings-view";
import { selectRandomObjects } from "@/lib/select-random-objects/select-random-objects";
import { ServiceButton } from "@/routes/auth-buttons";
import { FilterData } from "@/lib/filter-data/filter-data";
import { userAuth } from "@/lib/helper";

interface Props {
  trainer?: string | null;
  branch?: string | null;
  current?: string | null;
}

export const Recommandations = async ({ trainer, branch, current }: Props) => {
  const user = await userAuth();
  const userId = user
    ? await prisma?.user.findUnique({
        where: {
          name: user!.name!,
        },
        select: {
          id: true,
        },
      })
    : null;
  const myLearnings = userId
    ? await prisma?.learners.findMany({
        where: {
          userId: userId!.id,
        },
        select: {
          id: true,
          trainingId: true,
          status: true,
        },
      })
    : null;
  const trainings = await prisma?.trainings.findMany({
    include: {
      _count: {
        select: {
          modules: true,
        },
      },
      modules: {
        select: {
          title: true,
          description: true,
        },
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
          name: true,
          email: true,
          municipality: true,
          createdAt: true,
          district: true,
          avenue: true,
          number: true,
          image: true,
        },
      },
      courses: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      learners: {
        select: {
          userId: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const trainerAllCours = trainer
    ? await prisma?.trainings.findMany({
        where: {
          userId: trainer,
        },
        include: {
          _count: {
            select: {
              modules: true,
            },
          },
          modules: {
            select: {
              title: true,
              description: true,
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
              name: true,
              email: true,
              municipality: true,
              createdAt: true,
              district: true,
              avenue: true,
              number: true,
              image: true,
            },
          },
          courses: {
            select: {
              name: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          learners: {
            select: {
              userId: true,
              status: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : null;

  const trainerRecommandationsTransit = trainerAllCours
    ? trainerAllCours.filter((item) => item.id !== current)
    : null;
  const trainerRecommandations = trainerRecommandationsTransit
    ? selectRandomObjects(trainerRecommandationsTransit, 4)
    : null;

  const branchRecommandationsTransit = branch
    ? FilterData(
        trainings.filter((item) => item.id !== current),
        branch
      )
    : null;
  const branchRecommandations = branchRecommandationsTransit
    ? selectRandomObjects(branchRecommandationsTransit, 8)
    : null;

  const recommandations = selectRandomObjects(trainings, 8);

  return (
    <Container className=" bg-primary-400 md:pb-5">
      {trainerRecommandations && branchRecommandations ? (
        <Container>
          <Container className="flex py-8 px-4 md:px-8 md:py-8 bg-[#fafafa] flex-col gap-4">
            <Container className="flex justify-between">
              <Typography variant="title-base" component="h3">
                Formations de la même catégorie :
              </Typography>
            </Container>
            <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
              {user || myLearnings ? (
                <TrainingsView
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  data={branchRecommandations}
                  userId={userId!.id!}
                  myLearnings={myLearnings!}
                  sessionName={user!.name!}
                />
              ) : (
                <TrainingsView
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  data={branchRecommandations}
                />
              )}
            </Container>
          </Container>
          <Container className="flex py-8 px-4 md:px-8 md:py-8 bg-[#fafafa] flex-col gap-4">
            <Container className="flex justify-between">
              <Typography variant="title-base" component="h3">
                Formations du même formateur :
              </Typography>
            </Container>
            <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
              {user || myLearnings ? (
                <TrainingsView
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  data={trainerRecommandations}
                  userId={userId!.id!}
                  myLearnings={myLearnings!}
                  sessionName={user!.name!}
                />
              ) : (
                <TrainingsView
                  className="grid grid-cols-1 md:grid-cols-4 gap-4"
                  data={trainerRecommandations}
                />
              )}
            </Container>
          </Container>
        </Container>
      ) : (
        <Container className="flex py-8 px-4 md:px-8 md:py-32 flex-col gap-8 text-primary-50">
          <Container className="flex justify-between flex-col gap-3 items-center">
            <Typography variant="title-base" component="h3">
              Formations Populaire
            </Typography>
            <Typography className="text-center md:w-1/2"> 
            Découvrez les cours les plus demandés!<br/>
            choisis avec soin pour répondre aux besoins 
            des apprenants d'aujourd'hui. Profitez d'un 
            contenu attrayant conçu pour vous accompagner 
            vers la réussite à chaque étape de votre parcours.
            </Typography>
          </Container>
          <br />
          <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
            {user || myLearnings ? (
              <TrainingsView
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
                data={recommandations}
                userId={userId!.id!}
                myLearnings={myLearnings!}
                sessionName={user!.name!}
              />
            ) : (
              <TrainingsView
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
                data={recommandations}
              />
            )}
          </Container>
          <br />
        </Container>
        
      )}
      <Container className="hidden md:flex w-[14vw] container">
          <ServiceButton>Voir tous les cours</ServiceButton>
      </Container>
    </Container>
  );
};
