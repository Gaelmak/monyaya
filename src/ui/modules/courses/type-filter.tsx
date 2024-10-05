"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Typography } from "@/ui/components/typography/typography";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const TypeFilter = () => {
  const orders = [
    { id: "online", name: "En ligne" },
    { id: "domicile", name: "À domicile" },
    { id: "mobile", name: "Mobile" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) {
      setFilter(typeParam);
    } else {
      setFilter(null);
    }
  }, [searchParams, setFilter]);

  const handleClick = (type: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("type", type);
    router.push(`/courses?${newSearchParams.toString()}`);
    setFilter(type);
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
              "inline-block cursor-pointer text-xs px-4 py-2 rounded animate hover:bg-red-600 hover:text-white border border-red-900/50 hover:border-red-600",
              filter === item.id ? "bg-red-600 border-red-600 text-white" : ""
            )}
          >
            <Typography>{item.name}</Typography>
          </div>
        );
      })}
    </div>
  );
};
