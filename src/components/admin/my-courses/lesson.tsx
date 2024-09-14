"use client";

import { TitapParser } from "@/components/minimal-tiptap";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Courses, Lessons } from "@prisma/client";
import { ArrowBigLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

export type LessonProps = {
  courseId: string;
  lessonId: string;
  lesson: Lessons & { course: Courses };
};

export default function LessonContent({
  courseId,
  lessonId,
  lesson,
}: LessonProps) {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    setIsPlayerReady(true);
  }, []);

  console.log(lesson);

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 items-center">
      {lesson.course.type === "DOMICILE" && (
        <Card className="bg-white overflow-hidden w-full xl:w-8/12 p-4">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Adresse du cours
          </CardTitle>
          <CardDescription>
            Ce cours est à domicile, donc le Yaya va se déplacer vers le
            domicile de l'apprenant.
          </CardDescription>
          <CardContent className="w-full h-20 bg-blue-100 rounded-lg mt-2"></CardContent>
        </Card>
      )}
      {lesson.course.type === "ONLINE" && (
        <Card className="bg-white aspect-video overflow-hidden w-full">
          {isPlayerReady && (
            <ReactPlayer
              url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
              controls={true}
              light={true}
              width="100%"
              height="100%"
            />
          )}
        </Card>
      )}
      {lesson.course.type === "ONSITE" && (
        <Card className="bg-white overflow-hidden w-full xl:w-8/12 p-4">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Adresse du cours
          </CardTitle>
          <CardDescription>
            Ce cours est sur site, donc l'apprenant va se déplacer vers le lieu
            du Yaya.
          </CardDescription>
          <CardContent className="w-full h-20 bg-blue-100 rounded-lg mt-2"></CardContent>
        </Card>
      )}
      <div className="w-full xl:w-8/12 space-y-4">
        <h1 className="text-xl md:text-2xl font-bold">{lesson.title}</h1>
        <div className="space-y-2">
          <TitapParser value={lesson.content} />
        </div>
        <div className="w-full flex gap-2">
          <Buttons className="w-5/12 h-12 items-center bg-orange-100 hover:bg-orange-200 text-black/80 transition-all tra">
            <ChevronLeft size={18} />
            Precedent
          </Buttons>
          <Buttons className="w-7/12 h-12 items-center">
            Completer et suivant
            <ChevronRight size={18} />
          </Buttons>
        </div>
      </div>
    </div>
  );
}
