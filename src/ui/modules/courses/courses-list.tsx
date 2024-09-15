"use client";

import { Container } from "@/ui/components/container/container";
import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import { Typography } from "@/ui/components/typography/typography";
import { CategoryFilter } from "./category-filter";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/ui/loader";
import { useSearchParams } from "next/navigation";
import { OrderFilter } from "./order-filter";

export const FrontCoursesList = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const params = new URLSearchParams();
  if (categoryId) {
    params.set("categoryId", categoryId);
  }

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses", categoryId],
    queryFn: async () => {
      const response = await fetch(`/api/courses?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <div className="flex flex-row gap-4 ">
      <Container className="w-full flex flex-col md:flex-row gap-8 md:gap-4">
        <div className="basis-1/5 relative">
          <div className="flex flex-col gap-4 sticky top-[10vh]">
            <div className="bg-green-100 p-4 rounded-lg shadow-sm space-y-2">
              <Typography className="text-lg font-bold">Catégorie</Typography>
              <hr className="border-primary-900/50 border-1" />
              <CategoryFilter />
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm space-y-2">
              <Typography className="text-lg font-bold">Ordre</Typography>
              <hr className="border-blue-900/50 border-1" />
              <OrderFilter />
            </div>
          </div>
        </div>
        <div className="basis-4/5">
          <div className="w-full">
            {isLoading ? (
              <div className="w-full h-80 flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              <TrainingsView
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                data={courses}
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
