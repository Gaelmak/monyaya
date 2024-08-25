import { Container } from "@/ui/components/container/container";
import prisma from "@/lib/prisma";
import { TrainingView } from "@/ui/components/training-view/training-view";
import { Recommandations } from "@/ui/modules/recommandations/recommandations";
import { userAuth } from "@/lib/helper";

export default async function Home({ params }: { params: { id: string } }) {
  const idTraining = decodeURIComponent(params.id);
  const session = await userAuth();
  const userId = session
    ? await prisma?.user.findUnique({
        where: {
          name: session!.name!,
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
  const training = await prisma?.trainings.findMany({
    where: {
      id: idTraining,
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
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          bio: true,
          email: true,
          municipality: true,
          createdAt: true,
          district: true,
          avenue: true,
          number: true,
          image: true,
          _count: {
            select: {
              trainings: true,
            },
          },
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
  });

  return (
    <Container>
      <Container className="flex py-8 px-4 md:px-8 bg-[#eee] md:py-8 flex-col gap-8">
        {session || myLearnings ? (
          <TrainingView
            className="grid grid-cols-1"
            data={training}
            userId={userId!.id!}
            myLearnings={myLearnings!}
            sessionName={session!.name!}
          />
        ) : (
          <TrainingView className="grid grid-cols-1" data={training} />
        )}
      </Container>
      <Container>
        {training.map(({ id, courses, user }) => (
          <Recommandations
            trainer={user.id}
            branch={courses.name}
            current={id}
          />
        ))}
      </Container>
    </Container>
  );
}
