"use server";

import { Container } from "@/ui/components/container/container";
import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/helper";
import { AddCours } from "@/ui/modules/add-cours/add-cours";

export default async function Home() {
  const courses = await prisma.category.findMany();

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
    <Container className="w-full h-full py-2 px-4 flex flex-col gap-4  rounded">
      <AddCours userId={userData?.id} categories={courses} />
    </Container>
  );
}
