import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { TrainingsView } from "@/ui/components/trainings-view/trainings-view"
import { selectRandomObjects } from "@/lib/select-random-objects/select-random-objects"
import { ServiceButton } from "@/routes/auth-buttons"
import { FilterData } from "@/lib/filter-data/filter-data"

interface Props {
  trainer?: string | null
  branch?: string | null
  current?: string | null
}

export const Recommandations = async ({trainer, branch, current}: Props) => {
  const session = await getServerSession(authOptions)
  const userId = 
    session ? await prisma?.user.findUnique({
      where: {
        name: session!.user!.name!
      },
      select: {
        id: true
      }
    }) : null
  const myLearnings = 
    userId ? await prisma?.learners.findMany({
      where: {
        userId: userId!.id
      },
      select: {
        trainingId: true,
        status: true,
      }
    }) : null
  const trainings = await prisma?.trainings.findMany({
    include: {
      _count: {
        select: {
          modules: true,
        }
      },
      modules: {
        select: {
          title: true,
          description: true,
        }
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
              name: true
            }
          }
        }
      },
      learners: {
        select: {
          userId: true,
          status: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const trainerAllCours = trainer ? await prisma?.trainings.findMany({
    where: {
      userId: trainer
    },
    include: {
      _count: {
        select: {
          modules: true,
        }
      },
      modules: {
        select: {
          title: true,
          description: true,
        }
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
              name: true
            }
          }
        }
      },
      learners: {
        select: {
          userId: true,
          status: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  }) : null

  const trainerRecommandationsTransit = trainerAllCours ? trainerAllCours.filter(item => item.id !== current) : null
  const trainerRecommandations = trainerRecommandationsTransit ? selectRandomObjects(trainerRecommandationsTransit, 4) : null
  
  const branchRecommandationsTransit = branch ? FilterData(trainings.filter(item => item.id !== current), branch) : null
  const branchRecommandations = branchRecommandationsTransit ? selectRandomObjects(branchRecommandationsTransit, 8) : null

  const recommandations = selectRandomObjects(trainings, 8)

  return (
    <Container>
    {
      trainerRecommandations && branchRecommandations ?
      <Container>
        <Container className="flex py-8 px-4 md:px-8 md:py-8 bg-[#fafafa] flex-col gap-4">
          <Container className="flex justify-between">
            <Typography variant="title-base" component="h3">Formations de la même catégorie :</Typography>
          </Container>
          <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
          {
            session || myLearnings ?
            <TrainingsView 
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
              data={branchRecommandations} 
              userId={userId!.id!} 
              myLearnings={myLearnings!} 
              sessionName={session!.user!.name!}
            />
            :
            <TrainingsView 
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
              data={branchRecommandations} 
            />
          }
          </Container>
        </Container>
        <Container className="flex py-8 px-4 md:px-8 md:py-8 bg-[#fafafa] flex-col gap-4">
          <Container className="flex justify-between">
            <Typography variant="title-base" component="h3">Formations du même formateur :</Typography>
          </Container>
          <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
          {
            session || myLearnings ?
            <TrainingsView 
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
              data={trainerRecommandations} 
              userId={userId!.id!} 
              myLearnings={myLearnings!} 
              sessionName={session!.user!.name!}
            />
            :
            <TrainingsView 
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
              data={trainerRecommandations} 
            />
          }
          </Container>
        </Container>
      </Container>
      :
      <Container className="flex py-8 px-4 md:px-8 md:py-32 bg-[#fafafa] flex-col gap-8">
        <Container className="flex justify-between">
          <Typography variant="title-base" component="h3">Récommandations</Typography>
          <Container className="hidden md:flex">
            <ServiceButton>Voir tous les cours</ServiceButton>
          </Container>
        </Container>
        <br/>
        <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
        {
          session || myLearnings ?
          <TrainingsView 
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            data={recommandations} 
            userId={userId!.id!} 
            myLearnings={myLearnings!} 
            sessionName={session!.user!.name!}
          />
          :
          <TrainingsView 
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            data={recommandations} 
          />
        }
        </Container>
        <br/>
      </Container>
    }
    </Container>
  )
}