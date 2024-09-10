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

export default async function Home() {
  const user = await userAuth();
  const userId = await prisma!.user.findUnique({
    where: {
      name: user!.name!,
    },
    select: {
      id: true,
    },
  });

  // return (
  //   <Container className={clsx("p-4 rounded")}>
  //     <Container className="h-[100vh] flex flex-col justify-center items-center">
  //       <Typography variant="title-lg" className="w-full text-center">
  //         Aucune formation trouvée
  //       </Typography>
  //       <Typography className="w-full md:w-[50%] text-center">
  //         Vous pouvez découvrir la formation qui vous convient et commencer
  //         votre apprentissage en consultant notre page "
  //         <Link href={"/courses"} className="text-primary-Default underline">
  //           Formations
  //         </Link>
  //         ".
  //       </Typography>
  //     </Container>
  //   </Container>
  // );

  return (
    <div className="flex flex-col mt-16 md:mt-0">
      <div className="w-full bg-primary-900 px-8 pt-20 pb-20 flex items-end relative z-10">
        <div className="space-y-2 text-white">
          <Avatar className="w-20 h-20 rounded-full border border-neutral-700">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold">Bienvenue User 🙌🏼💫</h1>
          <Typography className="font-thin">
            Explorez vos cours et commencez votre apprentissage dès aujourd'hui.
          </Typography>
        </div>
        <p className="text-xl absolute font-light top-8 right-8 text-white">
          {dayjs().format("DD/MM/YYYY")}
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 px-8 -mt-16 z-20">
        <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
          <CardContent className="p-6 flex gap-2 justify-between items-center">
            <div>
              <p className="text">Total de cours</p>
              <p className="text-5xl font-bold">20</p>
            </div>
            <BookCopyIcon
              size={80}
              strokeWidth={1}
              className="text-primary-600"
            />
          </CardContent>
          <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
            Le nombre total de cours que vous avez créés
          </CardFooter>
        </Card>
        <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
          <CardContent className="p-6 flex gap-2 justify-between items-center">
            <div>
              <p className="text">Total de eleves</p>
              <p className="text-5xl font-bold">160</p>
            </div>
            <FileSpreadsheetIcon
              size={80}
              strokeWidth={1}
              className="text-primary-600"
            />
          </CardContent>
          <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
            Le nombre total des utilisateurs qui ont rejoint vos cours
          </CardFooter>
        </Card>
        <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
          <CardContent className="p-6 flex gap-2 justify-between items-center">
            <div>
              <p className="text">Total des lecons</p>
              <p className="text-5xl font-bold">400</p>
            </div>
            <Users size={80} strokeWidth={1} className="text-primary-600" />
          </CardContent>
          <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
            Le nombre total de lecons pour l'ensemble de vos cours
          </CardFooter>
        </Card>
      </div>
      <div className="w-full px-8 pt-8">
        <LessonsCompletedChart />
      </div>
      <div className="w-full p-8">
        <Card className="bg-white">
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
              <CardTitle>Continue votre progression</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-2 py-0">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium w-3/12">
                    Introduction à la Programmation Python
                  </TableCell>
                  <TableCell className="font-medium w-5/12">
                    <Progress value={33} className="h-2 w-full" />
                  </TableCell>
                  <TableCell className="font-medium w-2/12">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6 rounded-full border border-muted">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xs">
                          <User size={12} />
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm">Nom yaya</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium w-2/12">
                    <Buttons>Continuer</Buttons>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
