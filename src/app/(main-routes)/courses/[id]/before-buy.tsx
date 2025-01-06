"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "@/components/ui/loader";
import { toast } from "@/components/ui/use-toast";
import { onCourseJoined } from "@/lib/notification/course-join";
import { cn } from "@/lib/utils";
import { Typography } from "@/ui/components/typography/typography";
import { Courses, Yaya } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type BeforeBuyProps = {
  userId: string | null;
  userEmail: string;
  yayaEmail: string;
  userName: string;
  course: Courses & {
    yaya: Yaya;
  };
  courseUrl: string;
};

export default function BeforeBuy(props: BeforeBuyProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: userCourse, isLoading } = useQuery({
    queryKey: ["userCourseCheck"],
    queryFn: async () => {
      const response = await fetch(
        `/api/courses/${props.course.id}/user-course?userId=${props.userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const abonneCourse = useMutation({
    mutationKey: ["postUserCourse"],
    mutationFn: async (userId: string) => {
      return await fetch(`/api/user-course`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          courseId: props.course.id,
        }),
      }).then((res) => res.json());
    },
    onSuccess: async (data) => {
      await onCourseJoined(
        props.yayaEmail,
        props.userEmail,
        props.userName,
        props.course.title,
        props.course.yaya.id
      );
      toast({
        variant: "success",
        title: "Formation ajoutée !",
        description: (
          <Typography component="p" variant="body-sm">
            Vous avez rejoint la formation avec succès
          </Typography>
        ),
      });
      router.push(`/my-courses/${props.course.id}`);
      router.refresh();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: (
          <Typography component="p" variant="body-sm">
            Une erreur est survenue. veuillez réessayer plus tard.
          </Typography>
        ),
      });
    },
  });

  function handleOpen() {
    if (props.userId) {
      abonneCourse.mutateAsync(props.userId);
    } else {
      if (open) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
  }

  if (isLoading) {
    <Button className="px-4 py-8 text-base text-white w-full bg-primary-600 hover:bg-primary-600 cursor-pointer pointer-events-none">
      <Loader />
    </Button>;
  }

  if (props.userId === props.course.yaya.userId) {
    return (
      <Button
        className={cn(
          "text-sm font-normal text-white w-full bg-gray-600 hover:bg-gray-700 cursor-pointer"
        )}
        asChild
      >
        <Link href={`/my-courses/${props.course.id}`}>Gerer ma formation</Link>
      </Button>
    );
  }

  if (userCourse) {
    return (
      <Button
        className={cn(
          "text-sm font-normal text-white w-full bg-blue-600 hover:bg-blue-700 cursor-pointer"
        )}
        asChild
      >
        <Link href={`/my-courses/${props.course.id}`}>Continuer</Link>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "px-4 py-8 text-base text-white w-full bg-primary-600 hover:bg-primary-700 cursor-pointer"
          )}
        >
          {abonneCourse.isPending ? <Loader /> : "Commencer maintenant"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-lg font-bold">
            Oups ! Vous n&apos;êtes pas connecte
          </DialogTitle>
          <DialogDescription>
            Pour commencer à apprendre, vous devez vous connecter ou créer un
            compte.
          </DialogDescription>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              className="px-4 py-8 text-base text-white w-full bg-primary-600 hover:bg-primary-700"
              asChild
            >
              <Link href={`/signin?callback=${props.courseUrl}`}>
                Se connecter
              </Link>
            </Button>
            <Button
              className="px-4 py-8 text-base text-white w-full bg-blue-600 hover:bg-blue-700"
              asChild
            >
              <Link href={"/new-user"}>Créer un compte</Link>
            </Button>
          </div>
          <div className="p-2 bg-red-50 rounded text-xs">
            <b>Formation:</b> {props.course.title}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
