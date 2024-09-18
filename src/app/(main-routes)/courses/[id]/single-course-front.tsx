"use client";

import { useQuery } from "@tanstack/react-query";
import { Share2Icon, CheckIcon, CopyIcon, Layers3Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { TitapParser } from "@/components/minimal-tiptap";
import Image from "next/image";
import Link from "next/link";
import { BanknoteIcon, ChevronLeft, Clock2, Library, User } from "lucide-react";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import BeforeBuy from "./before-buy";
import { User as UserType } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function SingleCourseFront({
  user,
  courseUrl,
}: {
  user: { id: string } | null;
  courseUrl: string;
}) {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsPlayerReady(true);
  }, []);

  const params = useParams<{ id: string; item: string }>();
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);
  const { data: course, isLoading } = useQuery({
    queryKey: ["frontSingleCourse"],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${params.id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="w-full px-4 lg:px-[7vw] mb-20 space-y-4">
      <div className="flex justify-between gap-4">
        <h1 className="text-2xl font-bold flex gap-2 items-center">
          <Link href="/my-courses">
            <ChevronLeft
              size={20}
              className="text-primary-600 hover:text-primary-700"
            />
          </Link>
          {course.title}
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-8/12 space-y-6">
          {(course.videoUrl || course.cover) && (
            <Card className="w-full aspect-video overflow-hidden">
              {course.videoUrl && isPlayerReady ? (
                <ReactPlayer
                  url={course.videoUrl}
                  controls={true}
                  light={true}
                  width="100%"
                  height="100%"
                />
              ) : (
                <Image
                  src={course.cover ?? ""}
                  alt="Course cover image"
                  width={1920}
                  height={1080}
                />
              )}
            </Card>
          )}

          <div className="wp-full flex flex-wrap gap-2 md:gap-4 items-center">
            <Badge className="rounded-md bg-primary-100 text-black/80 px-4 py-2 flex gap-1 items-center">
              <span className="text-sm bg-primary-600 w-2 h-2 rounded-full"></span>
              {course.type}
            </Badge>
            {course.duration && (
              <Badge className="rounded-md bg-orange-100 text-black/80 px-4 py-2 flex gap-1 items-center">
                <Clock2 size={14} />
                <span>{course.duration} mois</span>
              </Badge>
            )}
            <Badge className="rounded-md bg-red-100 text-black/80 px-4 py-2 flex gap-1 items-center">
              <Library size={14} /> {course.lesson ? course.lesson.length : 0}{" "}
              leçons
            </Badge>
            {course.category && (
              <Badge className="rounded-md bg-blue-100 text-black/80 px-4 py-2 flex gap-1 items-center">
                <Layers3Icon size={14} /> {course.category.name}
              </Badge>
            )}

            <div className="ml-auto">
              <Popover>
                <PopoverTrigger>
                  <Share2Icon size={20} />
                </PopoverTrigger>
                <PopoverContent className="bg-white">
                  <h6 className="text-sm font-bold mb-2">Partager</h6>
                  <div className="relative">
                    <Input className="w-full pr-8" value={courseUrl} />
                    <button
                      disabled={hasCopiedText}
                      className="link absolute top-3 right-2"
                      onClick={() => copyToClipboard(pathname)}
                    >
                      {hasCopiedText ? (
                        <CheckIcon size={16} />
                      ) : (
                        <CopyIcon size={16} />
                      )}
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Tabs defaultValue="description" className="w-full p-0">
              <TabsList className="p-0">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="avis">Avis</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <TitapParser value={course.description} />
              </TabsContent>
              <TabsContent value="avis">
                <TitapParser value={course.description} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <Card className="bg-white sticky top-[10vh]">
            <CardHeader className="gap-2">
              <CardTitle className="text-black/80 text-lg flex gap-1 justify-between items-center">
                <div className="flex items-center gap-1">
                  <BanknoteIcon size={24} className="text-primary-800" /> Prix
                </div>
                <div>{course.monthlyPrice}$/mois</div>
              </CardTitle>
              <hr />
              <CardDescription className="flex flex-col justify-center items-center gap-2 text-center px-4">
                <Avatar>
                  <AvatarImage
                    src={course.yaya.user.image ?? "/default_avatar.jpg"}
                    className="rounded-full w-24 h-24 overflow-hidden hi"
                  />
                </Avatar>
                <div>
                  <h3 className="font-semibold">
                    {course.yaya.user.firstName} {course.yaya.user.lastName}
                  </h3>
                  <p className="opacity-70">
                    {course.yaya.user.bio ?? "Pas encore de bio"}
                  </p>
                </div>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <h4 className="mb-2">Programmes</h4>
              {course.lessons.length > 0 ? (
                <ul className="p-3 pl-6 bg-blue-100 rounded space-y-2 text-sm list-disc">
                  {course?.lessons?.map((lesson, index) => (
                    <li key={index}>{lesson.title}</li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 bg-gray-50 w-full" />
                  <Skeleton className="h-6 bg-gray-50 w-8/12" />
                  <Skeleton className="h-6 bg-gray-50 w-4/12" />
                  <Skeleton className="h-6 bg-gray-50 w-10/12" />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <BeforeBuy
                userId={user?.id}
                course={course}
                courseUrl={courseUrl}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
