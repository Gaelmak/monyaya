"use client";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@/ui/components/typography/typography";
import {
  Calendar,
  List,
  PenBox,
  Map,
  Share2,
  Bookmark,
  ChevronDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { string } from "zod";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";

export default function HandleCourse() {
  const params = useParams<{ id: string; item: string }>();
  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${params.id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // Gérer l'état de chargement
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  // Gérer l'état d'erreur
  if (error) {
    return <div>Une erreur est survenue: {(error as Error).message}</div>;
  }

  console.log(course);
  // const tags = course?.tags || [];

  // //tableau provisoir pour faire passé les lecons
  const tags = Array.from({ length: 10 }).map(
    (_, i, a) => `Developpement web Chapitre.${a.length - i}`
  );

  return (
    <main>
      <main className="hidden md:flex max-w-full select-none w-full px-4  lg:px-[7vw] mb-20">
        <div className="flex  flex-row-reverse  md:justify-between md:items-start relative gap-6 pt-4 w-full">
          <Card className="hidden md:block lg:w-1/3 md:w-1/3  sticky right-0 top-0  rounded-xl h-[calc(115vh-65px)]">
            <CardHeader className="">
              <CardTitle className="flex flex-row justify-between items-center border-b-2 pb-2">
                <Typography className="text-base">
                  {`$ ${course?.monthlyPrice}`}
                  <span className="text-secondary-600">/Mois</span>
                </Typography>
                <Badge className="bg-primary-Default text-primary-50 font-normal ">
                  {course?.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <Typography className="text-sm font-medium text-primary-400 pb-2">
                  {"Appercu de lecon pour ce cours"}
                </Typography>
                <ScrollArea className="md:h-[10vw] lg:h-[20vw] border-none rounded-md ">
                  <div className="pt-2">
                    <div>
                      <div className=" w-full ">
                        {tags.map((tag, index) => (
                          <div key={index}>
                            <Typography className="text-secondary-800 font-medium">
                              {tag}
                            </Typography>
                            <div className="border-b-secondary-900"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
            <CardFooter>
              <Buttons className="w-full">Demarer</Buttons>
            </CardFooter>
          </Card>
          <div className="flex flex-col gap-5 md:w-[60%]">
            <div className="">
              <iframe
                width="100%"
                height="auto"
                src="https://youtu.be/jOHVRabET4w?list=RDjOHVRabET4w"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-[60vh] rounded-xl"
              ></iframe>
            </div>
            <div className=" flex flex-row justify-between items-center">
              <div className=" flex flex-row justify-start items-center gap-3 text-xs">
                <div className="flex flex-row items-center p-2 bg-primary-100 rounded py-1 text-center ">
                  <Typography className="semibold font-semibold text-center m-auto text-primary-600">
                    {course?.type}
                  </Typography>
                </div>
                <div className="flex flex-row items-center p-2 bg-amber-100 rounded py-1 text-center ">
                  <Typography className="semibold font-semibold text-center m-auto text-amber-600">
                    {"6 mois"}
                  </Typography>
                </div>
                <div className="flex flex-row items-center p-2 bg-teal-100 rounded py-1 text-center ">
                  <Typography className="semibold font-semibold text-center m-auto text-teal-600">
                    {course?.Category}
                  </Typography>
                </div>
                <div className="flex flex-row items-center p-2 bg-red-100 rounded py-1 text-center ">
                  <Typography className="semibold font-semibold text-center m-auto text-red-600">
                    {"16 lecons"}
                  </Typography>
                </div>
                <div className="flex flex-row items-center p-2 bg-amber-100 rounded py-1 text-center ">
                  <Typography className="semibold font-semibold text-center m-auto text-amber-600">
                    {"16 etudiants"}
                  </Typography>
                </div>
              </div>
              <div className=" flex flex-row justify-between items-center gap-2 text-secondary-600">
                <Share2 size={20} strokeWidth={1} />
                <Bookmark size={20} strokeWidth={1} />
              </div>
            </div>
            <div>
              <Typography className="text-lg font-bold text-primary-900">
                {course?.title}
              </Typography>
              <div className="flex items-center justify-start gap-3 text-secondary-400 text-xs font-medium">
                <Avatar>
                  <AvatarImage
                    src={course?.avatar}
                    alt={course?.yaya}
                    className="rounded-full w-6 h-6"
                  />
                  <AvatarFallback>theodore</AvatarFallback>
                </Avatar>
                <Typography>{"course"}</Typography>
                <Typography>{"Municipality"}</Typography>
                <Typography>{"district"}</Typography>{" "}
                <Typography>{"avenue"}</Typography>
                <Typography>{"numero"}</Typography>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Tabs className="" defaultValue="Description">
                <TabsList
                  defaultValue={"Description"}
                  className="text-sm font-medium gap-5 text-secondary-900"
                >
                  <TabsTrigger
                    value="Description"
                    className="border-none  data-[state=active]:border-none data-[state=active]:shadow-none p-0 data-[state=active]:decoration-4 data-[state=active]:decoration-primary-600 data-[state=active]:underline data-[state=active]:underline-offset-8 active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary-600"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="Yaya"
                    className="border-none data-[state=active]:border-none data-[state=active]:shadow-none p-0 data-[state=active]:decoration-4 data-[state=active]:decoration-primary-600 data-[state=active]:underline data-[state=active]:underline-offset-8 active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary-600"
                  >
                    yaya
                  </TabsTrigger>
                  {/* <TabsTrigger
                      value="lecons"
                      className="border-none data-[state=active]:border-none data-[state=active]:shadow-none p-0 data-[state=active]:decoration-4 data-[state=active]:decoration-primary-600 data-[state=active]:underline data-[state=active]:underline-offset-8 active:bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary-600"
                    >
                      lecons
                    </TabsTrigger> */}
                </TabsList>
                <TabsContent
                  value="Description"
                  className="text-secondary-600 text-base "
                >
                  {course?.description}
                </TabsContent>
                <TabsContent
                  value="Yaya"
                  className="text-secondary-600 text-base"
                >
                  {}
                </TabsContent>
                <TabsContent
                  value="lecons"
                  className="text-secondary-600 text-base "
                >
                  {}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
