"use client";

import { Container } from "@/ui/components/container/container";
import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import { Typography } from "@/ui/components/typography/typography";
import { CategoryFilter } from "./category-filter";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/ui/loader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { OrderFilter } from "./order-filter";
import { SearchCourses } from "../search/search-courses";
import { TypeFilter } from "./type-filter";
import { Suspense } from "react";

export const FrontCoursesList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const search = searchParams.get("s");
  const type = searchParams.get("type");
  const order = searchParams.get("order");

  const params = new URLSearchParams();
  params.set("status", "APPROVED");
  if (categoryId) {
    params.set("categoryId", categoryId);
  }
  if (search) {
    params.set("s", search);
  }
  if (type) {
    params.set("type", type);
  }
  if (order) {
    params.set("order", order);
  }

  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses", categoryId, search, type, order],
    queryFn: async () => {
      const response = await fetch(`/api/courses?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const resetFilter = () => {
    router.push("/courses");
  };

  return (
    <div className="flex flex-row gap-4 ">
      <Container className="w-full flex flex-col md:flex-row gap-8 md:gap-4">
        <div className="basis-1/5 relative">
          <div className="flex flex-col gap-4 sticky top-[10vh]">
            <SearchCourses
              className="w-full"
              placeholder="Taper la recherche..."
            />
            <div className="bg-green-100 p-4 rounded-lg shadow-sm space-y-2">
              <Typography className="text-lg font-bold">Catégories</Typography>
              <hr className="border-primary-900/50 border-1" />
              <Suspense fallback={<Loader />}>
                <CategoryFilter />
              </Suspense>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow-sm space-y-2">
              <Typography className="text-lg font-bold">Type</Typography>
              <hr className="border-primary-900/50 border-1" />
              <TypeFilter />
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow-sm space-y-2">
              <Typography className="text-lg font-bold">Ordre</Typography>
              <hr className="border-blue-900/50 border-1" />
              <OrderFilter />
            </div>
            <div className="text-xs w-full text-center">
              <em
                className="cursor-pointer hover:text-primary-Default"
                onClick={resetFilter}
              >
                Réinitialiser
              </em>
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
