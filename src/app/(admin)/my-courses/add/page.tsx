import { Container } from "@/ui/components/container/container";
import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/helper";
import { AddCours } from "@/ui/modules/add-cours/add-cours";

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
    <main className="w-full min-h-[100vh] pt-24 md:pt-2 pb-8 flex flex-col p-4 gap-4">
      <Container className="w-full h-full py-2 px-4 flex flex-col gap-4  rounded">
        <AddCours userId={userData!.id!} options={courses} />
      </Container>
    </main>
  );
}
