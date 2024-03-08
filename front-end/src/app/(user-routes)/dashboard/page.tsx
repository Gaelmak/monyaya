import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { TrainingsView } from "@/ui/components/trainings-view/trainings-view"

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

  const myLearnings = await prisma!.learners.findMany({
    where: {
      userId: userId!.id
    },
    select: {
      trainingId: true,
      status: true,
      training: {
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
      }
    }
  })

  console.log(myLearnings)
  return (
    <main>
      {/* <TrainingsView
        className="grid grid-cols-3 gap-4 "
        data={myLearnings.training} 
        userId={userId!.id!} 
        myLearnings={myLearnings!} 
        sessionName={session!.user!.name!}
      /> */}
    </main>
  )
}