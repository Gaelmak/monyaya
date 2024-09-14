"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useFilterTypeStore from "@/store/filter-type-store";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import clsx from "clsx";
import { useEffect } from "react";

export const Filter = () => {
  const branch = [
    { name: "Tous" },
    { name: "Anglais" },
    { name: "Français" },
    { name: "Guitare" },
    { name: "Piano" },
    { name: "Coach sportif" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = useFilterTypeStore((state) => state.filterType);
  const setFilter = useFilterTypeStore((state) => state.setFilterType);

  // Défini "Tous" comme valeur par défaut si aucun paramètre n'est présent
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setFilter(categoryParam);
    } else {
      setFilter("Tous");
    }
  }, [searchParams, setFilter]);

  const handleClick = (category: string) => {
    // Mettre à jour l'URL avec le paramètre de recherche
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (category === "Tous") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", category.toLowerCase());
    }
    router.push(`/courses?${newSearchParams.toString()}`);
    setFilter(category);
  };

  return (
    <Container className="flex flex-wrap gap-4">
      {branch.map((item, index) => {
        // Ajouter une vérification pour éviter les erreurs si item est undefined
        if (!item || !item.name) return null;

        return (
          <div
            onClick={() => handleClick(item.name)}
            key={index} // Utiliser index comme clé de secours si `item.name` peut être dupliqué
            className={clsx(
              "inline-block cursor-pointer px-4 py-2 rounded animate hover:bg-primary-Default hover:text-white",
              filter === item.name
                ? "bg-primary-Default text-white"
                : "bg-primary-100"
            )}
          >
            <Typography>{item.name}</Typography>
          </div>
        );
      })}
    </Container>
  );
};
