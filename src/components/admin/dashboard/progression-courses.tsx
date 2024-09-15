"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookCopyIcon, FileSpreadsheetIcon, User, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Courses, UserCourse, Yaya } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CourseCompletionBar from "../my-courses/course-completion-bar";

export type ProgressionCoursesProps = {
  userId: string | undefined;
};

type CourseCustom = UserCourse & {
  course: Courses & {
    yaya: Yaya & {
      user: {
        id: string;
        name: string;
        image: string;
        firstName: string;
        lastName: string;
      };
    };
  };
};

export default function ProgressionCourses(props: ProgressionCoursesProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["dashcourses"],
    queryFn: async () => {
      return await fetch(
        `/api/user-course?userId=${props.userId}&completed=0`
      ).then((res) => res.json());
    },
  });

  if (isLoading) {
    return <div className="w-full p-4 text-center text-xs">Chargement...</div>;
  }

  return (
    <Table>
      <TableBody>
        {data?.map((userCourse: CourseCustom, index: string) => (
          <TableRow>
            <TableCell className="font-medium w-6/12 md:w-3/12">
              {userCourse.course.title}
            </TableCell>
            <TableCell className="font-medium w-3/12 md:w-5/12">
              <CourseCompletionBar
                userId={props.userId}
                courseId={userCourse.course.id}
                className="h-2 w-full"
              />
            </TableCell>
            <TableCell className="font-medium w-2/12 max-md:hidden">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 rounded-full border border-muted">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs">
                    <User size={12} />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  {userCourse.course.yaya.user.firstName}{" "}
                  {userCourse.course.yaya.user.lastName}
                </p>
              </div>
            </TableCell>
            <TableCell className="text-right font-medium w-3/12 md:w-2/12">
              <Button asChild>
                <Link href={`/my-courses/${userCourse.course.id}`}>
                  Continuer
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
