import { Container } from '@/ui/components/container/container';
import { Typography } from '@/ui/components/typography/typography';
import { AddTraining } from '@/ui/modules/add-training/add-training';
import prisma from '@/lib/prisma';
import { userAuth } from '@/lib/helper';

export default async function Home() {
  const courses = await prisma.category.findMany({
    include: {
      courses: true,
    },
  });

  const user = await userAuth();
  const userData = await prisma?.user.findUnique({
    where: {
      name: user!.name!,
    },
    select: {
      id: true,
    },
  });

  return (
    <main className="w-full min-h-[100vh] pt-24 md:pt-4 pb-8 flex flex-col p-4 gap-4">
      <Container className="w-full h-full p-4 flex flex-col gap-4 bg-white rounded">
        <Typography variant="title-base" component="h3">
          {' '}
          Ajouter une formation
        </Typography>
        <AddTraining userId={userData!.id!} options={courses} />
      </Container>
    </main>
  );
}
