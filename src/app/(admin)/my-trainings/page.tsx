import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Training, columns } from './columns';
import { DataTable } from './data-table';
import { Container } from '@/ui/components/container/container';
import { Typography } from '@/ui/components/typography/typography';
import { userAuth } from '@/lib/helper';

async function getData(): Promise<Training[]> {
  const user = await userAuth();
  const userData = await prisma?.user.findUnique({
    where: {
      name: user!.name!,
    },
    select: {
      id: true,
    },
  });

  const trainings = await prisma?.trainings.findMany({
    where: {
      userId: userData!.id!,
    },
    select: {
      id: true,
      name: true,
      price: true,
      createdAt: true,
      _count: {
        select: {
          modules: true,
          learners: true,
        },
      },
      courses: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return trainings;
}

export default async function Home() {
  const data = await getData();
  const user = await userAuth();
  const userRole = await prisma?.user.findUnique({
    where: {
      name: user!.name!,
    },
    select: {
      role: true,
    },
  });

  if (userRole!.role === 'USER') {
    redirect('/become-a-trainer');
  }

  return (
    <main className="w-full bg-white min-h-[100vh] pt-24 md:pt-0 pb-8 flex flex-col p-4">
      <Container className="w-full h-full p-4 flex flex-col gap-4 rounded">
        <Typography variant="title-base" component="h3">
          Mes formations
        </Typography>
        <DataTable columns={columns} data={data} />
      </Container>
    </main>
  );
}
