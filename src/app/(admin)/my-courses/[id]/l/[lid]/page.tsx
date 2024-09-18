import LessonContent from "@/components/admin/my-courses/lesson";
import { Container } from "@/ui/components/container/container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { BookAIcon } from "lucide-react";
import Link from "next/link";
import { apiUrl } from "@/lib/api-url";
import CourseCompletionBar from "@/components/admin/my-courses/course-completion-bar";
import { userAuth } from "@/lib/helper";
import prisma from "@/lib/prisma";

export type LessonPageProps = {
  params: { id: string; lid: string };
};

export default async function LessonPage({ params }: LessonPageProps) {
  const courseId = params.id;
  const lessonId = params.lid;
  const authUser = await userAuth();
  const user = await prisma.user.findUnique({
    where: {
      name: authUser!.name!,
    },
    select: {
      id: true,
      yaya: {
        select: {
          id: true,
        },
      },
    },
  });

  try {
    const lesson = await fetch(`${apiUrl()}/api/lessons/${lessonId}`).then(
      (res) => res.json()
    );

    return (
      <Container>
        <div className="border-b mt-16 md:mt-0">
          <Table>
            <TableBody>
              <TableRow className="*:w-full">
                <TableCell className="font-bold w-7/12 md:w-5/12">
                  <Link href={`/my-courses/${courseId}/`}>
                    <div className="flex gap-2 hover:text-primary-700">
                      <BookAIcon
                        size={20}
                        className="text-primary-600 hover:text-primary-700"
                      />{" "}
                      {lesson.course.title}
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="font-medium w-5/12 md:w-7/12">
                  <CourseCompletionBar
                    userId={user?.id}
                    courseId={courseId}
                    className="h-2 w-full"
                  />
                </TableCell>
                {/* <TableCell className="text-right font-medium w-1/12 md:w-2/12">
                  10/18
                </TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <LessonContent
          user={user}
          courseId={courseId}
          lessonId={lessonId}
          lesson={lesson}
        />
      </Container>
    );
  } catch (error) {
    return (
      <div className="mt-16 md:mt-0 p-4">
        <div className="p-4 bg-red-200 border border-red-300 rounded-lg">
          Erreur lors de la récupération de la leçon
        </div>
      </div>
    );
  }
}
