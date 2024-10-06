"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Share2Icon,
  CheckIcon,
  CopyIcon,
  Layers3Icon,
  ChevronRightIcon,
} from "lucide-react";
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
import { AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { TitapParser } from "@/components/minimal-tiptap";
import Image from "next/image";
import Link from "next/link";
import { BanknoteIcon, ChevronLeft, Clock2, Library } from "lucide-react";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import BeforeBuy from "./before-buy";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { toast } from "@/components/ui/use-toast";

export default function SingleCourseFront({
  user,
  courseUrl,
}: {
  user: { id: string; firstName: string } | null;
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

  function handleCopied() {
    copyToClipboard(courseUrl);
    toast({
      variant: "success",
      title: "Lien copié",
      description: "Le lien a bien été copié dans le presse-papier.",
    });
  }

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
        <h1 className="text-lg md:text-2xl leading-5 md:leading-6 font-bold flex gap-2 items-center">
          <Link href="/my-courses">
            <ChevronLeft
              size={20}
              className="text-primary-600 hover:text-primary-700"
            />
          </Link>
          {course.title}
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8">
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
              <Library size={14} /> {course.lessons ? course.lessons.length : 0}{" "}
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
                    <Input
                      className="w-full pr-8 border focus-visible:ring-0"
                      value={courseUrl}
                    />
                    <button
                      disabled={hasCopiedText}
                      className="link absolute top-3 right-2"
                      onClick={() => handleCopied()}
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
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center w-full">
                  <Avatar>
                    <AvatarImage
                      src={course.yaya.user.image ?? "/default_avatar.jpg"}
                      className="rounded-full w-12 h-12 overflow-hidden"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-base">
                      {course.yaya.user.firstName} {course.yaya.user.lastName}
                    </h3>
                    <p className="text-xs">
                      Yaya depuis le{" "}
                      {dayjs(course?.yaya?.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
                <div className="opacity-70 text-sm text-left">
                  {course.yaya.user.bio ?? "Pas encore de bio"}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {course.lessons.length > 0 ? (
                <div className="p-3 bg-blue-100 rounded">
                  <h4 className="mb-2 font-semibold">Programmes</h4>
                  <ul className="space-y-2 text-sm list-none">
                    {course?.lessons?.map((lesson, index) => (
                      <li key={index} className="flex gap-2 items-center">
                        <ChevronRightIcon size={10} /> {lesson.title}
                      </li>
                    ))}
                  </ul>
                </div>
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
                yayaEmail={course.yaya.user.email}
                userName={user?.firstName}
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
