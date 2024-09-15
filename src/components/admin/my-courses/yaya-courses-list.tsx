"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import { Typography } from "@/ui/components/typography/typography";
import { Courses, User as UserProps, Yaya } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Frown } from "lucide-react";
import { useEffect, useState } from "react";
export type CoursesListProps = {
  yayaId?: string;
};

type coursesPropos = Courses & { yaya: Yaya & { user: UserProps } };

export default function YayaCoursesList(props: CoursesListProps) {
  const [approvedCourses, setApprovedCourses] = useState<coursesPropos[]>([]);
  const [pendingCourses, setPendingCourses] = useState<coursesPropos[]>([]);
  const [rejectedCourses, setRejectedCourses] = useState<coursesPropos[]>([]);

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch(`/api/courses?yayaId=${props.yayaId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  useEffect(() => {
    setApprovedCourses(
      courses?.filter(
        (course: coursesPropos) => course.status === "APPROVED"
      ) ?? []
    );
    setPendingCourses(
      courses?.filter((course: coursesPropos) => course.status === "PENDING")
    );
    setRejectedCourses(
      courses?.filter((course: coursesPropos) => course.status === "REJECTED")
    );
  }, [courses]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="w-full h-20 md:h-40 rounded-sm bg-gray-100 shadow-sm" />
        <Skeleton className="w-full h-20 md:h-40 rounded-sm bg-gray-100 shadow-sm" />
        <Skeleton className="w-full h-20 md:h-40 rounded-sm bg-gray-100 shadow-sm" />
      </div>
    );
  }

  if (courses?.length > 0) {
    return (
      <>
        <TrainingsView
          className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 "
          data={approvedCourses}
          env="back"
        />

        {pendingCourses?.length > 0 && (
          <div className="mt-8 flex flex-col gap-4 bg-orange-50 border border-orange-100 p-4 rounded-lg">
            <Typography component="h4" className="text-lg md:text-xl font-bold">
              En attente de validation
            </Typography>
            <TrainingsView
              className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 opacity-80"
              data={pendingCourses}
              env="back"
            />
          </div>
        )}

        {rejectedCourses?.length > 0 && (
          <div className="mt-8 flex flex-col gap-4 bg-red-50 border border-red-100 p-4 rounded-lg">
            <Typography component="h4" className="text-lg md:text-xl font-bold">
              Invalider
            </Typography>
            <TrainingsView
              className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 opacity-80"
              data={rejectedCourses}
              env="back"
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div>
      <div className="text-center p-4 w-full flex flex-col items-center justify-center">
        <Frown size={80} strokeWidth={0.8} className="mb-2 opacity-60" />
        <Typography>Il n&apos;y a pas de cours pour le moment.</Typography>
      </div>
    </div>
  );
}
