import prisma from "@/lib/prisma";
import { Container } from "@/ui/components/container/container";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { TrainingsView } from "@/ui/components/trainings-view/trainings-view";
import { pusherServer } from "@/lib/pusher";


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
    <Container className="my-[12vh]">
    {
      session || myLearnings ?
      <TrainingsView 
        className="grid grid-cols-4 gap-4"
        data={trainings} 
        userId={userId!.id!} 
        myLearnings={myLearnings!} 
        sessionName={session!.user!.name!}
      />
      :
      <TrainingsView 
        className="grid grid-cols-4 gap-4"
        data={trainings} 
      />
    }
    </Container>
    
  );
}