"use client";

import { Typography } from "../typography/typography";
import { BadgeCheckIcon, Library, LoaderIcon, User } from "lucide-react";
import { truncateText } from "@/lib/truncate-text";
import RekreationPaysage from "../../../../public/rekreatioonPaysage.jpg";
import Image from "next/image";
import {
  Courses,
  Lessons,
  UserCourse,
  User as UserProps,
  Yaya,
} from "@prisma/client";
import { cn } from "@/lib/utils";
import { Container } from "../container/container";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/components/ui/loader";
import Link from "next/link";
import { getDicebearImage } from "@/utils/dicebearImage";

type TrainingsViewProps = {
  className?: string;
  data: (UserCourse & {
    course: Courses & { yaya: Yaya & { user: UserProps }; lessons: Lessons[] };
  })[];
  env?: "back" | "front";
};

export const UserTrainingsView = ({
  className,
  data,
  env,
}: TrainingsViewProps) => {
  const baseLink = env === "back" ? "/my-courses" : "/courses";
  if (data?.length > 0) {
    return (
      <Container className={cn(className, "w-full")}>
        {data.map((userCourse, index) => (
          <Link key={index} href={`${baseLink}/${userCourse.course.id}`}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all">
              <CardHeader className="p-2 rounded-lg">
                <Image
                  src={userCourse.course.cover || RekreationPaysage}
                  alt="Training image"
                  className="rounded-lg aspect-video"
                  width={1920}
                  height={1080}
                />
              </CardHeader>
              <CardContent className="p-2 flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <Badge className="py-1 rounded-lg bg-primary-200 text-black/80 flex items-center">
                    <span className="text-sm bg-primary-600 w-2 h-2 rounded-full mr-[6px]"></span>
                    {userCourse.course.type}
                  </Badge>
                  <Badge className="py-1 rounded-lg bg-primary-600 text-white/80">
                    {userCourse.course.duration} mois
                  </Badge>
                </div>
                <div className="pr-4 md:pr-16">
                  <Typography className="text-xl md:text-2xl font-semibold text-primary-900">
                    {truncateText(userCourse.course.title, 65)}
                  </Typography>
                </div>
                <div className="flex gap-2 items-center text-black/80 text-sm">
                  <div className="flex gap-1 items-center">
                    <Library size={14} />{" "}
                    {userCourse.course.lessons
                      ? userCourse.course.lessons.length
                      : 0}{" "}
                    leçons
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-2 mx-2 border-t flex justify-between text-primary-950">
                <p className="text-sm font-semibold">
                  {userCourse.completed ? (
                    <div className="flex gap-1 items-center text-primary-800">
                      <BadgeCheckIcon size={18} />
                      Terminé
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center text-orange-400">
                      <LoaderIcon size={18} />
                      En cours
                    </div>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6 rounded-full border border-muted">
                    <AvatarImage
                      src={
                        userCourse.course.yaya.user.image ||
                        getDicebearImage(userCourse.course.yaya.user.name)
                      }
                    />
                    <AvatarFallback className="text-xs">
                      <User size={12} />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{`${userCourse.course.yaya.user.firstName} ${userCourse.course.yaya.user.lastName}`}</p>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </Container>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center overflow-hidden">
        Aucun cours pour le moment
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden">
      <Loader />
    </div>
  );
};
