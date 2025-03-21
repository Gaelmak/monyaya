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
  data: (Courses & { yaya: Yaya & { user: UserProps }; lessons: Lessons[] })[];
  env?: "back" | "front";
};

export const AdminTrainingsView = ({
  className,
  data,
  env,
}: TrainingsViewProps) => {
  const baseLink = env === "back" ? "/my-courses" : "/courses";
  if (data?.length > 0) {
    return (
      <Container className={cn(className, "w-full")}>
        {data.map((course, index) => (
          <Link key={index} href={`${baseLink}/${course.id}`}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all">
              <CardHeader className="p-2 rounded-lg">
                <Image
                  src={course.cover || RekreationPaysage}
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
                    {course.type}
                  </Badge>
                  <Badge className="py-1 rounded-lg bg-primary-600 text-white/80">
                    {course.duration} mois
                  </Badge>
                </div>
                <div className="pr-4 md:pr-16">
                  <Typography className="text-xl md:text-2xl font-semibold text-primary-900">
                    {truncateText(course.title, 65)}
                  </Typography>
                </div>
                <div className="flex gap-2 items-center text-black/80 text-sm">
                  <div className="flex gap-1 items-center">
                    <Library size={14} />{" "}
                    {course.lessons ? course.lessons.length : 0} leçons
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-2 mx-2 border-t flex justify-between text-primary-950">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6 rounded-full border border-muted">
                    <AvatarImage
                      src={
                        course.yaya.user.image ||
                        getDicebearImage(course.yaya.user.name)
                      }
                    />
                    <AvatarFallback className="text-xs">
                      <User size={12} />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{`${course.yaya.user.firstName} ${course.yaya.user.lastName}`}</p>
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
