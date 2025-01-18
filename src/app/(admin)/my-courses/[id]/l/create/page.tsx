import { AddCourLesson } from "@/components/admin/my-courses/create-lesson";
import { Container } from "@/ui/components/container/container";
import prisma from "@/lib/prisma";
import { userAuth, userAuthYaya } from "@/lib/helper";
import { redirect } from "next/navigation";

export type CreateLessonPageProps = {
  params: {
    id: string;
  };
};

export default async function CreateLessonPage({
  params,
}: CreateLessonPageProps) {
  const course = await prisma.courses.findUnique({
    where: {
      id: params.id,
    },
  });
  const yaya = await userAuthYaya();

  if (!course || !yaya) {
    redirect("/my-courses");
  }

  return (
    <Container className="w-full h-full py-2 px-4 flex flex-col gap-4 rounded">
      <AddCourLesson yaya={yaya} course={course} />
    </Container>
  );
}
