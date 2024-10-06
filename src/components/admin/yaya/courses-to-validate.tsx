"use client";

import { Container } from "@/ui/components/container/container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import { Typography } from "@/ui/components/typography/typography";
import { Category, Courses, User as UserProps, Yaya } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Frown } from "lucide-react";
import { useEffect, useState } from "react";

export type CoursesToProps = {};

export default function CoursesToValidate(props: CoursesToProps) {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch(`/api/courses?status=pending`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        <Skeleton className="w-full h-20 md:h-40 rounded-sm bg-gray-100 shadow-sm" />
        <Skeleton className="w-full h-20 md:h-40 rounded-sm bg-gray-100 shadow-sm" />
        <Skeleton className="w-full h-20 md:h-40 rounded-sm bg-gray-100 shadow-sm" />
      </div>
    );
  }

  return (
    <Container className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl md:text-3xl font-bold">Cours à valider</h2>
      {courses?.length > 0 ? (
        <TrainingsView
          className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 opacity-80"
          data={courses}
          env="back"
        />
      ) : (
        <div className="w-full flex flex-col items-center justify-center overflow-hidden">
          <Frown size={80} strokeWidth={0.8} className="mb-2 opacity-60" />
          <Typography>Il n&apos;y a pas de cours à valider.</Typography>
        </div>
      )}
    </Container>
  );
}
