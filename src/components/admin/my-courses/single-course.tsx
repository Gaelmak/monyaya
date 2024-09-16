"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Buttons } from "@/ui/components/buttons/buttons";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonsTimelineLayout } from "@/components/timeline/timeline-layout";
import { Category, Courses, User as UserType, Yaya } from "@prisma/client";
import {
  BanknoteIcon,
  ChevronLeft,
  Clock2,
  Layers3Icon,
  Library,
  User,
} from "lucide-react";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { TitapParser } from "@/components/minimal-tiptap";
import { usePathname } from "next/navigation";

export type SingleCourseProps = {
  course: Courses & {
    yaya: Yaya & { user: UserType };
    category: Category;
    lessons: { id: string; title: string }[];
  };
  user: {
    id: string;
    role: string;
  };
  yayaId: string | undefined;
};

export default function SingleCourse({
  course,
  user,
  yayaId,
}: SingleCourseProps) {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsPlayerReady(true);
  }, []);

  return (
    <div className="space-y-6">
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
        {yayaId === course.yayaID && (
          <Link href={`${pathname}/edit`}>
            <Buttons>Editer</Buttons>
          </Link>
        )}
      </div>
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
        <Badge className="rounded-md bg-purple-100 text-black/80 px-4 py-2 flex gap-1 items-center md:ml-auto">
          <BanknoteIcon size={14} /> {course.monthlyPrice}$/mois
        </Badge>
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

      <div className="w-full" id="ltimeline">
        <LessonsTimelineLayout
          userId={user.id}
          yayaId={yayaId}
          course={course}
        />
      </div>
    </div>
  );
}
