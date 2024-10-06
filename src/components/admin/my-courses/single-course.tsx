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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { onCourseRequest } from "@/lib/notification/course-request";
import { onCourseConfirm } from "@/lib/notification/course-confirm";

export type SingleCourseProps = {
  course: Courses & {
    yaya: Yaya & { user: UserType };
    category: Category;
    lessons: { id: string; title: string }[];
  };
  user: {
    id: string;
    role: string;
    email: string;
    name: string;
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
  const router = useRouter();

  useEffect(() => {
    setIsPlayerReady(true);
  }, []);

  const { mutateAsync: updateCourse, isPending } = useMutation({
    mutationKey: ["postCourseToValidate"],
    mutationFn: async () => {
      const res = await fetch(`/api/courses/${course.id}/pended`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: user?.id,
          status: "PENDING",
        }),
      });
      if (res.ok) {
        await onCourseRequest(user?.email, user?.name);
        toast({
          variant: "success",
          title: "Action réussie",
          description: "Votre cours a bien été soumis pour validation.",
        });
        router.push(`/my-courses`);
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Une erreur est survenue lors de l'enregistrement du cours.",
        });
      }
    },
  });

  const { mutateAsync: pubishCourse, isPending: isPubishPending } = useMutation(
    {
      mutationKey: ["pubishCourse"],
      mutationFn: async () => {
        const res = await fetch(`/api/courses/${course.id}/publish`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "APPROVED",
          }),
        });
        if (res.ok) {
          await onCourseConfirm(user?.email, user?.name, course.id);
          toast({
            variant: "success",
            title: "Action réussie",
            description: "Le cours a bien été publié.",
          });
          router.push(`/to-review`);
          router.refresh();
        } else {
          toast({
            variant: "destructive",
            title: "Erreur",
            description:
              "Une erreur est survenue lors de l'enregistrement du cours.",
          });
        }
      },
    }
  );

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
          {course.title}{" "}
          {course.status === "DRAFT" && (
            <Badge variant="destructive" className="text-white">
              Brouillon
            </Badge>
          )}
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

      <div className="w-full pb-10" id="ltimeline">
        <LessonsTimelineLayout
          userId={user.id}
          yayaId={yayaId}
          course={course}
        />
      </div>

      {course.status === "DRAFT" && yayaId === course.yayaID && (
        <AlertDialog>
          <AlertDialogTrigger
            className={cn(
              "w-full h-12 bg-blue-700 text-sm text-white rounded hover:bg-blue-800",
              isPending && "pointer-events-none"
            )}
          >
            {isPending ? "Enregistrement..." : "Publier le cours"}
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-primary-50">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Le cours sera envoyé pour validation.
              </AlertDialogTitle>
              <AlertDialogDescription>
                Nous devons verifier le cours que vous avez ajouté. Assurez-vous
                que toutes les informations sont correctes avant de continuer.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                className="bg-primary-600 hover:bg-primary-400"
                onClick={() => updateCourse()}
              >
                Envoyer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {course.status === "PENDING" &&
        (user.role === "ADMIN" || user.role === "MANAGER") && (
          <AlertDialog>
            <AlertDialogTrigger
              className={cn(
                "w-full h-12 bg-blue-700 text-sm text-white rounded hover:bg-blue-800",
                isPubishPending && "pointer-events-none"
              )}
            >
              {isPubishPending ? "Enregistrement..." : "Valider ce cours"}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-primary-50">
              <AlertDialogHeader>
                <AlertDialogTitle>Le cours sera publié</AlertDialogTitle>
                <AlertDialogDescription>
                  Ce cours sera publié sur le site et sera visible par tous les
                  utilisateurs.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-primary-600 hover:bg-primary-400"
                  onClick={() => pubishCourse()}
                >
                  Publier
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
    </div>
  );
}
