
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions";
import { Container } from "@/ui/components/container/container";
import { SearchResults } from "@/ui/modules/search-result/search-result";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export default async function Home() {
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
          firstName: true,
          lastName: true,
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
  return (
    <main>
      <Container className="px-4 md:px-8 my-[12vh]">
        <SearchResults
          session={session}
          myLearnings={myLearnings}
          userId={userId}
          trainings={trainings}
        />
      </Container>
    </main>
  )
}
