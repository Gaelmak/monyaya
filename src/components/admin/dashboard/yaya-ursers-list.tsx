"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MailIcon,
  MapPinIcon,
  MoveRightIcon,
  SmartphoneIcon,
  User,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Courses, UserCourse, Yaya } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CourseCompletionBar from "../my-courses/course-completion-bar";
import { getYayaUsersList } from "./dashboard.action";
import { cn } from "@/lib/utils";

export type YayaUsersListProps = {
  yayaId: string | undefined;
};

type CourseCustom = UserCourse & {
  course: Courses;
};

export default function YayaUsersList(props: YayaUsersListProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["yayaUsersList"],
    queryFn: async () => {
      return await getYayaUsersList(props.yayaId ?? "");
    },
  });

  if (isLoading) {
    return <div className="w-full p-4 text-center text-xs">Chargement...</div>;
  }

  if (data?.length === 0) {
    return (
      <div className="w-full p-4 text-center text-xs">
        Personne n&apos;a encore souscrit à vos cours
      </div>
    );
  }

  return (
    <Table>
      <TableBody>
        {data?.map((userCourse, index) => (
          <TableRow key={index}>
            <TableCell
              className={cn(
                "font-medium w-2/12 max-md:hidden border-l-4",
                userCourse.completed
                  ? "border-primary-700"
                  : "border-orange-300"
              )}
            >
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6 rounded-full border border-muted">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs">
                    <User size={12} />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  {userCourse.user.firstName} {userCourse.user.lastName}
                </p>
              </div>
            </TableCell>
            <TableCell className="font-medium w-6/12 md:w-3/12">
              {userCourse.course.title}
            </TableCell>
            <TableCell className="font-medium w-3/12 md:w-5/12">
              <CourseCompletionBar
                userId={userCourse.userId}
                courseId={userCourse.course.id}
                className="h-2 w-full"
              />
            </TableCell>
            <TableCell className="text-right font-medium w-3/12 md:w-2/12">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Détails</Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      {userCourse.user.firstName} {userCourse.user.lastName}{" "}
                      <MoveRightIcon size={16} /> {userCourse.course.title}
                    </DialogTitle>
                    <DialogDescription className="grid grid-cols-1 md:grid-cols-2 pt-4 gap-2">
                      <Link
                        href={`tel:${userCourse.user.phoneNumber}`}
                        target="_blank"
                        className="p-4 flex gap-2 items-center rounded bg-blue-100 hover:bg-blue-200 transition-all"
                      >
                        <SmartphoneIcon size={20} className="text-blue-600" />
                        <span className="text-sm text-blue-950">
                          {userCourse.user.phoneNumber}
                        </span>
                      </Link>
                      <Link
                        href={`mailto:${userCourse.user.email}`}
                        target="_blank"
                        className="p-4 flex gap-2 items-center rounded bg-green-100 hover:bg-green-200 transition-all"
                      >
                        <MailIcon size={20} className="text-green-600" />
                        <span className="text-sm text-green-950">
                          {userCourse.user.email}
                        </span>
                      </Link>
                      <div className="p-4 flex gap-2 items-center rounded bg-orange-100 col-span-2">
                        <MapPinIcon size={20} className="text-orange-600" />
                        <span className="text-sm text-orange-950">
                          {userCourse.user.number} {userCourse.user.avenue},{" "}
                          {userCourse.user.district},{" "}
                          {userCourse.user.municipality}
                        </span>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
