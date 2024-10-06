"use client";

import { TitapParser } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Typography } from "@/ui/components/typography/typography";
import { Courses, Lessons } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowBigLeft,
  CheckCheckIcon,
  ChevronLeft,
  ChevronRight,
  Link2Icon,
  MapIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";

export type LessonProps = {
  user:
    | {
        id: string;
        yaya: {
          id: string;
        };
      }
    | undefined;
  courseId: string;
  lessonId: string;
  lesson: Lessons & { course: Courses };
};

export default function LessonContent({
  user,
  courseId,
  lessonId,
  lesson,
}: LessonProps) {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const router = useRouter();
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    setIsPlayerReady(true);
  }, []);

  const userLesson = useQuery({
    queryKey: ["userLesson", refetch],
    queryFn: async () => {
      const response = await fetch(
        `/api/lessons/${lessonId}/complete?userId=${user?.id}`
      );
      if (!response.ok) {
        return null;
      }
      setRefetch(false);
      return await response.json();
    },
  });

  const handleCompleteLesson = useMutation({
    mutationKey: ["handleCompleteLesson"],
    mutationFn: async () => {
      return await fetch(`/api/lessons/${lessonId}/complete`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
        }),
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Leçon complétée",
        description: (
          <Typography component="p" variant="body-sm">
            La leçon a été complétée avec succès
          </Typography>
        ),
      });
      setRefetch(true);
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: (
          <Typography component="p" variant="body-sm">
            Une erreur est survenue durant la complétion de la leçon. Veuillez
            réessayer plus tard.
          </Typography>
        ),
      });
    },
  });

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8 items-center">
      {lesson.videoUrl && (
        <Card className="bg-white aspect-video overflow-hidden w-full">
          {isPlayerReady && (
            <ReactPlayer
              url={lesson.videoUrl}
              controls={true}
              light={true}
              width="100%"
              height="100%"
            />
          )}
        </Card>
      )}
      {lesson.course.type === "ONLINE" && lesson.meetUrl && (
        <Card className="bg-white overflow-hidden w-full xl:w-8/12 p-4">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Lien de la séance
          </CardTitle>
          <CardContent className="w-full p-4 bg-blue-100 rounded-lg mt-2 flex gap-2 items-center">
            <Link2Icon size={20} className="text-blue-600" />
            <Link
              href={lesson.meetUrl}
              target="_blank"
              className="text-blue-950"
            >
              {lesson.meetUrl}
            </Link>
          </CardContent>
        </Card>
      )}
      {lesson.course.type === "DOMICILE" && (
        <Card className="bg-white overflow-hidden w-full xl:w-8/12 p-4">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Adresse du cours
          </CardTitle>
          <CardDescription>
            Ce cours est à domicile, donc le Yaya va se déplacer vers le
            domicile de l&apos;apprenant.
          </CardDescription>
        </Card>
      )}
      {lesson.course.type === "ONSITE" && (
        <Card className="bg-white overflow-hidden w-full xl:w-8/12 p-4">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Adresse du cours
          </CardTitle>
          <CardDescription>
            Ce cours est sur site, donc l&apos;apprenant va se déplacer vers le
            lieu du Yaya.
          </CardDescription>
          {lesson.adress && (
            <CardContent className="w-full p-4 bg-blue-100 rounded-lg mt-2 flex gap-2 items-center">
              <MapIcon size={20} className="text-blue-600" />
              {lesson.adress}
            </CardContent>
          )}
        </Card>
      )}
      <div className="w-full xl:w-8/12 space-y-4">
        <h1 className="text-xl md:text-2xl font-bold">{lesson.title}</h1>
        <div className="space-y-2">
          <TitapParser value={lesson.content} />
        </div>
        <div className="w-full flex gap-2">
          <Button
            className="w-5/12 h-12 items-center bg-orange-100 hover:bg-orange-200 text-black/80 transition-all"
            onClick={() => router.push(`/my-courses/${courseId}#ltimeline`)}
          >
            <ChevronLeft size={18} />
            Precedent
          </Button>
          {userLesson.isLoading ? (
            <div className="w-full h-12 bg-gray-50 rounded flex items-center justify-center animate-pulse"></div>
          ) : (
            user?.yaya?.id != lesson.course.yayaID && (
              <Button
                className={cn(
                  "w-7/12 h-12 items-center transition-all text-white/90",
                  userLesson.data
                    ? "bg-green-600 hover:bg-green-600 hover:cursor-default pointer-events-none"
                    : "bg-blue-600 hover:bg-blue-700"
                )}
                onClick={() => handleCompleteLesson.mutateAsync()}
              >
                {userLesson.data ? (
                  <div className="flex items-center gap-2">
                    <CheckCheckIcon />
                    Déjà terminé
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {handleCompleteLesson.isPending && <Loader />}
                    Terminer la leçon
                  </div>
                )}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
