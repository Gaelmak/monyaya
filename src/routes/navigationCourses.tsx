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
  console.log(categories);
  return (
    <div>
      <NavigationMenu className="">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-2 py-2 hover:bg-primary-400 focus:bg-primary-300 hover:text-primary-50 focus:text-primary-50   data-[active]:bg-primary-300 data-[state=open]:bg-primary-300">
              {"Formations"}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-primary-50 text-sm pt-2">
              <NavigationMenuLink className="">
                <Link href={"/courses"} className="p-4 text-base font-medium">
                  Voir tout les cours
                </Link>
              </NavigationMenuLink>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[300px] ">
                {categories?.map((categorie, index) => (
                  <Link
                    key={index}
                    href={"/"}
                    className="text-base font-medium bg-primary-100 px-2 py-2 rounded hover:bg-white hover:text-secondary-950"
                  >
                    {categorie.name}
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
