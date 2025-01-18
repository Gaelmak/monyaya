"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Typography } from "@/ui/components/typography/typography";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const OrderFilter = () => {
  const orders = [
    { id: "desc", name: "Du plus récent au plus ancien" },
    { id: "asc", name: "Du plus ancien au plus récent" },
    // { id: "popular", name: "Populaire" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    const categoryParam = searchParams.get("order");
    if (categoryParam) {
      setFilter(categoryParam);
    } else {
      setFilter("Tous");
    }
  }, [searchParams, setFilter]);

  const handleClick = (order: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("order", order);
    router.push(`/courses?${newSearchParams.toString()}`);
    setFilter(order);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {orders.map((item, index) => {
        if (!item || !item.name) return null;
        return (
          <div
            onClick={() => handleClick(item.id)}
            key={index}
            id={item.id}
            className={cn(
              "inline-block cursor-pointer text-xs px-4 py-2 rounded animate hover:bg-blue-600 hover:text-white border border-blue-900/50 hover:border-blue-600",
              filter === item.id ? "bg-blue-600 border-blue-600 text-white" : ""
            )}
          >
            <Typography>{item.name}</Typography>
          </div>
        );
      })}
    </div>
  );
};
