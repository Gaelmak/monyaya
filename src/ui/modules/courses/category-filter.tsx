"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Typography } from "@/ui/components/typography/typography";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/ui/loader";
import { Category } from "@prisma/client";

export const CategoryFilter = ({
  setCatDesc,
}: {
  setCatDesc: (value: ReactNode | null) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("Tous");

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categoriesList"],
    queryFn: async () => {
      const response = await fetch(`/api/courses/categories`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setFilter(categoryParam);
      const cat = categories?.find(
        (item: Category) => item.id === categoryParam
      );
      const catDesc = (
        <p>
          <span className="font-semibold">{cat?.name}:</span> {cat?.description}
        </p>
      );
      setCatDesc(catDesc);
    } else {
      setFilter("Tous");
      setCatDesc(null);
    }
  }, [searchParams, setFilter]); // eslint-disable-line

  const handleClick = (categoryId: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (categoryId === "all") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", categoryId);
    }
    router.push(`/courses?${newSearchParams.toString()}`);
    setFilter(categoryId);
  };

  if (isLoading) {
    return <Loader />;
  }

  // if (categories.length === 0) {
  //   return <Loader />;
  // }

  return (
    <div className="flex flex-wrap gap-2">
      <div
        onClick={() => handleClick("all")}
        id="all"
        className={cn(
          "inline-block cursor-pointer text-xs px-4 py-2 rounded animate hover:bg-primary-600 hover:text-white border border-primary-900/50 hover:border-primary-600",
          filter === "all" ? "bg-primary-600 border-primary-600 text-white" : ""
        )}
      >
        <Typography>Tous</Typography>
      </div>
      {categories?.map((item: Category, index: string) => {
        if (!item || !item.name) return null;
        return (
          <div
            onClick={() => handleClick(item.id)}
            key={index}
            id={item.id}
            className={cn(
              "inline-block cursor-pointer text-xs px-4 py-2 rounded animate hover:bg-primary-700 hover:text-white border border-primary-900/50 hover:border-primary-700",
              filter === item.id
                ? "bg-primary-600 border-primary-600 text-white"
                : ""
            )}
          >
            <Typography>{item.name}</Typography>
          </div>
        );
      })}
    </div>
  );
};
