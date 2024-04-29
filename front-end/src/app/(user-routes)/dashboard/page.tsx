import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { TrainingsView } from "@/ui/components/trainings-view/trainings-view"
import { Container } from "@/ui/components/container/container"
import prisma from "@/lib/prisma"
import { Typography } from "@/ui/components/typography/typography"
import Link from "next/link"
import clsx from "clsx"

export default async function Home()  {
  const session = await getServerSession(authOptions)
  const userId = await prisma!.user.findUnique({
    where: {
      name: session!.user!.name!
    },
    select: {
      id: true
    }
  }) 

  const myLearnings = await prisma?.learners.findMany({
    where: {
      userId: userId!.id
    },
    select: {
      trainingId: true,
      status: true,
    }
  })

  const trainings = await prisma!.trainings.findMany({
    where: {
      learners: {
        some: {
          userId: userId!.id
        }
      }
    },
    include: {
      learners: true,
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
          createdAt: true,
          municipality: true,
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
      }
    }

  })

  return (
    <Container className={clsx("p-4", trainings.length > 1 ? "pt-24 md:pt-4": "")}>
      {
        trainings.length > 0 ?
        <TrainingsView 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          data={trainings} 
          userId={userId!.id!} 
          myLearnings={myLearnings!} 
          sessionName={session!.user!.name!}
        />
        :
        <Container className="h-[100vh] flex flex-col justify-center items-center">
          <Typography variant="title-lg" className="w-full text-center">Aucune formation trouvée</Typography>
          <Typography className="w-full md:w-[50%] text-center">Vous pouvez découvrir la formation qui vous convient et commencer votre apprentissage en consultant notre page "<Link href={"/trainings"} className="text-primary-Default underline">Formations</Link>".</Typography>
        </Container>
      }
    </Container>
  )
}