"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Typography } from "@/ui/components/typography/typography";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const TypeFilter = ({
  setTypeDesc,
}: {
  setTypeDesc: (value: ReactNode | null) => void;
}) => {
  const orders = [
    {
      id: "online",
      name: "En ligne",
      description: "Profitez de cours en direct via Zoom, Meet ou Teams…",
    },
    {
      id: "domicile",
      name: "À domicile",
      description: "Le yaya se déplace chez vous",
    },
    {
      id: "mobile",
      name: "Mobile",
      description:
        "Le yaya vient à l'endroit de votre choix, que ce soit un parc ou un café.",
    },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) {
      setFilter(typeParam);
      const order = orders?.find((item) => item.id === typeParam);
      const typeDesc = (
        <p>
          <span className="font-semibold">{order?.name}:</span>{" "}
          {order?.description}
        </p>
      );
      setTypeDesc(typeDesc);
    } else {
      setFilter(null);
      setTypeDesc(null);
    }
  }, [searchParams, setFilter]); // eslint-disable-line

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
