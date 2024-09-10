"use server";

import { Container } from "@/ui/components/container/container";
import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/helper";
import { AddCours } from "@/ui/modules/add-cours/add-cours";
import { redirect } from "next/navigation";

export type PageProps = {
  params: any;
};

export default async function CourseEditPage({ params }: PageProps) {
  const user = await userAuth();
  const userData = await prisma?.user.findUnique({
    where: {
      name: user!.name!,
    },
    select: {
      id: true,
      role: true,
      yaya: true,
    },
  });

  if (userData?.role != "TRAINER") {
    redirect("/dashboard");
  }

  const categories = await prisma.category.findMany();
  const course = await prisma.courses.findUnique({
    where: {
      id: params.id,
    },
    include: {
      category: true,
    },
  });

  return (
    <main className="w-full min-h-[100vh] pt-24 md:pt-2 pb-8 flex flex-col p-4 gap-4">
      <Container className="w-full h-full py-2 px-4 flex flex-col gap-4  rounded">
        <AddCours
          userId={userData?.id}
          categories={categories}
          course={course}
        />
      </Container>
    </main>
  );
}
