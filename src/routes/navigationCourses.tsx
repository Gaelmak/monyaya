"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function NavigationCourse() {
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

  return (
    <div>
      <NavigationMenu className="">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-2 py-2 hover:bg-primary-400 focus:bg-primary-300 data-[active]:bg-primary-300 data-[state=open]:bg-primary-300">
              {"Formations"}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white text-sm p-4 flex flex-col gap-2 w-full md:w-[250px] ">
              <NavigationMenuLink
                href="/courses"
                className="w-full px-4 py-2 bg-primary-100 hover:bg-primary-200 rounded"
              >
                Voir tout les cours
              </NavigationMenuLink>
              {categories?.map((categorie, index) => (
                <NavigationMenuLink
                  key={index}
                  href={`/courses?category=${categorie.id}`}
                  className="w-full p-2 bg-primary-100 hover:bg-primary-200 rounded"
                >
                  {categorie.name}
                </NavigationMenuLink>
              ))}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
