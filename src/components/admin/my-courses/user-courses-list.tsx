"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { UserTrainingsView } from "@/ui/components/trainings-view/userTrainingsView";
import { Typography } from "@/ui/components/typography/typography";
import { Courses, User as UserProps, Yaya } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Frown } from "lucide-react";
import Link from "next/link";

export type CoursesListProps = {
  user: {
    id: string;
  };
};

type coursesPropos = Courses & { yaya: Yaya & { user: UserProps } };

export default function UserCoursesList(props: CoursesListProps) {
  const { data: userCourses, isLoading } = useQuery({
    queryKey: ["userCourses"],
    queryFn: async () => {
      const response = await fetch(`/api/user-course/?userId=${props.user.id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="w-full h-20 md:h-40 rounded-sm bg-gray-100 shadow-sm" />
        <Skeleton className="w-full h-20 md:h-40 rounded-sm bg-gray-100 shadow-sm" />
        <Skeleton className="w-full h-20 md:h-40 rounded-sm bg-gray-100 shadow-sm" />
      </div>
    );
  }

  if (userCourses?.length > 0) {
    return (
      <UserTrainingsView
        className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 "
        data={userCourses}
        env="back"
      />
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full md:w-[300px] text-center p-4 flex flex-col items-center justify-center">
        <Frown
          size={80}
          strokeWidth={0.5}
          className="mb-2 opacity-60 text-primary-700"
        />
        <Typography className="text-sm">
          Il n&apos;y a pas de cours pour le moment. Découvrez nos formations
          disponibles et commencez à apprendre dès maintenant en cliquant{" "}
          <Link
            href="/courses"
            className="text-primary-600 hover:text-primary-700"
          >
            ici
          </Link>{" "}
          ou sur le menu Nouvele formation
        </Typography>
      </div>
    </div>
  );
}
