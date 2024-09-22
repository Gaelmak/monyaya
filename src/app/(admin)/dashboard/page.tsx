import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import { Container } from "@/ui/components/container/container";
import prisma from "@/lib/prisma";
import { Typography } from "@/ui/components/typography/typography";
import Link from "next/link";
import clsx from "clsx";
import { userAuth } from "@/lib/helper";
import dayjs from "dayjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookCopyIcon, FileSpreadsheetIcon, User, Users } from "lucide-react";
import { LessonsCompletedChart } from "@/components/admin/dashboard/lessons-completed";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Progress } from "@/components/ui/progress";
import UserStats from "@/components/admin/dashboard/user-stats";
import YayaStats from "@/components/admin/dashboard/yaya-stats";
import ProgressionCourses from "@/components/admin/dashboard/progression-courses";
import YayaUsersList from "@/components/admin/dashboard/yaya-ursers-list";

export default async function Home() {
  const userConnected = await userAuth();
  const user = await prisma.user.findUnique({
    where: {
      name: userConnected?.name,
    },
    select: {
      id: true,
      role: true,
      firstName: true,
      lastName: true,
      image: true,
      yaya: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <main className="flex flex-col mt-16 md:mt-0">
      <div className="w-full bg-primary-950 px-4 md:px-8 pt-20 pb-20 flex items-end relative z-10 overflow-hidden">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(42,145,52,.25),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-30%] top-[-20%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(42,145,52,.35),rgba(255,255,255,0))]"></div>
        <div className="space-y-2 text-white">
          <Avatar className="w-20 h-20 rounded-full border border-primary-500">
            <AvatarImage
              src={`${user?.image ? user.image : "/default_avatar.jpg"}`}
            />
            <AvatarFallback className="bg-primary-700">CN</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold">
            Bienvenue {user?.firstName} {user?.lastName} 🙌🏼💫
          </h1>
          {user?.role === "ADMIN" && (
            <Typography className="font-thin">
              Vous etes Administrateur de la plateforme
            </Typography>
          )}
          {user?.role === "TRAINER" && (
            <Typography className="font-thin">
              Vous etes un &apos;yaya&apos; sur la plateforme
            </Typography>
          )}
          {user?.role === "USER" && (
            <Typography className="font-thin">
              Explorez vos cours et commencez votre apprentissage dès
              aujourd&apos;hui.
            </Typography>
          )}
        </div>
        <p className="text-xs font-bold absolute top-8 right-8 text-white/80">
          {dayjs().format("DD/MM/YYYY")}
        </p>
      </div>
      {user?.role === "USER" && <UserStats userId={user?.id} />}
      {user?.role === "TRAINER" && <YayaStats yayaId={user?.yaya?.id} />}
      {user?.role === "USER" && (
        <>
          <div className="w-full px-4 md:px-8 pt-8">
            <LessonsCompletedChart />
          </div>
          <div className="w-full p-4 md:px-8">
            <Card className="bg-white">
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                  <CardTitle>Continue votre progression</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="px-2 py-0">
                <ProgressionCourses userId={user?.id} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
      {user?.role === "TRAINER" && (
        <div className="w-full p-4 md:px-8">
          <Card className="bg-white">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Vos souscripteurs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <YayaUsersList yayaId={user?.yaya?.id} />
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
