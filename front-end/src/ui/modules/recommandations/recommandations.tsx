import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { TrainingsView } from "@/ui/components/trainings-view/trainings-view"
import { selectRandomObjects } from "@/lib/select-random-objects/select-random-objects"
import { ServiceButton } from "@/routes/auth-buttons"

export const Recommandations = async () => {
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

  const recommandations = selectRandomObjects(trainings, 8)

  return (
    <Container className="flex py-8 px-4 md:px-8 md:py-32  flex-col gap-8">
      <Container className="flex justify-between">
        <Typography variant="title-lg" component="h2">Récommandations</Typography>
        <Container className="hidden md:flex">
          <ServiceButton>Voir tous les cours</ServiceButton>
        </Container>
      </Container>
      <br/>
      <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
      {
        session || myLearnings ?
        <TrainingsView 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8"
          data={recommandations} 
          userId={userId!.id!} 
          myLearnings={myLearnings!} 
          sessionName={session!.user!.name!}
        />
        :
        <TrainingsView 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8"
          data={recommandations} 
        />
      }
      </Container>
      <br/>
    </Container>
    
  )
}