import prisma from "@/lib/prisma";
import { Container } from "@/ui/components/container/container";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { TrainingsView } from "@/ui/components/trainings-view/trainings-view";
import { Typography } from "@/ui/components/typography/typography";
import { Filter } from "./filter";

interface Props {
  results?: any;
  loading?: boolean;
  error?: any;
}

export const SearchResults = async ({ results, loading, error }: Props) => {
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
  
  return (
    <Container className="flex flex-row gap-4">
      <Container className="w-full flex flex-col md:flex-row gap-8 md:gap-4">
          <Container className="basis-1/4 relative">
            <Container className="flex flex-col gap-4 sticky top-[14vh]">
              <Typography variant="title-base">Filtre</Typography>
              <Filter/>
            </Container>
          </Container>
          <Container className="basis-3/4">
            <Container className="w-full">
              {
                session || myLearnings ?
                <TrainingsView 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  data={trainings} 
                  userId={userId!.id!} 
                  myLearnings={myLearnings!} 
                  sessionName={session!.user!.name!}
                />
                :
                <TrainingsView 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  data={trainings} 
                />
              }
            </Container>
          </Container>
        </Container>
    </Container>
  );
}