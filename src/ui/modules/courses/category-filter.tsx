"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useFilterTypeStore from "@/store/filter-type-store";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/ui/loader";

export const CategoryFilter = () => {
  // const categories = [
  //   { id: "all", name: "Tous" },
  //   { id: "wrw08204", name: "Anglais" },
  //   { id: "297wr294", name: "Français" },
  //   { id: "2992we04", name: "Guitare" },
  //   { id: "20024hdd", name: "Piano" },
  //   { id: "20828hsd", name: "Coach sportif" },
  // ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("Tous");

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
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
    } else {
      setFilter("Tous");
    }
  }, [searchParams, setFilter]);

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
          "inline-block cursor-pointer text-xs px-4 py-2 rounded animate hover:bg-primary-700 hover:text-white border border-primary-900/50 hover:border-primary-700",
          filter === "all" ? "bg-primary-600 border-primary-600 text-white" : ""
        )}
      >
        <Typography>Tous</Typography>
      </div>
      {categories?.map((item, index) => {
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
