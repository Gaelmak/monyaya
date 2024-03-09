import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { TrainingsView } from "@/ui/components/trainings-view/trainings-view"
import { Container } from "@/ui/components/container/container"

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
    <Container className="p-4">
      <TrainingsView 
        className="grid grid-cols-3 gap-4"
        data={trainings} 
        userId={userId!.id!} 
        myLearnings={myLearnings!} 
        sessionName={session!.user!.name!}
      />
    </Container>
  )
}