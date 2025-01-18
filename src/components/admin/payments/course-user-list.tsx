"use client";

import dayjs from "dayjs";
import "dayjs/locale/fr";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { MoveRightIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Container } from "@/ui/components/container/container";
import { getAllUserCourses } from "./action.payments";
import { Button } from "@/components/ui/button";
import CoursesUserSingle from "./course-user-single";
import { Loader } from "@/components/ui/loader";
import { useDebounce } from "@uidotdev/usehooks";

type CoursesUserListProps = {};

export default function CoursesUserList(props: CoursesUserListProps) {
  const [open, setOpen] = useState(false);
  const [currentUserCourse, setCurrentUserCourse] = useState(null);
  const [filterCompleted, setFilterCompleted] = useState(false);
  const [filterSearch, setFilterSearch] = useState(null);
  const debouncedSearchTerm = useDebounce(filterSearch, 500);

  const { data: usersCourses, isPending } = useQuery({
    queryKey: ["pUsersCourses", filterCompleted, debouncedSearchTerm],
    queryFn: async () => {
      const res = await getAllUserCourses(filterCompleted, filterSearch);
      if (!res) {
        throw new Error("Network response was not ok");
      }
      return res;
    },
  });

  return (
    <>
      <Container className="flex flex-col gap-4 w-full">
        <h2 className="text-2xl md:text-3xl font-bold">Paiements</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
          <Card className="bg-white shadow-none hover:shadow-none transition-all col-span-1 md:col-span-4">
            <CardHeader className="p-4">
              <div className="w-full flex items-center justify-between">
                <CardTitle className="text-xl">Liste de paiements</CardTitle>
                <div className="flex gap-2 items-center">
                  <Input
                    type="text"
                    placeholder="Rechercher"
                    value={filterSearch ?? ""}
                    onChange={(e) => setFilterSearch(e.target.value)}
                  />
                  <Select
                    onValueChange={(value) =>
                      setFilterCompleted(value === "true")
                    }
                    defaultValue="false"
                  >
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status des cours ?" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="false">En cours</SelectItem>
                      <SelectItem value="true">Terminés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent className="p-0">
              {isPending ? (
                <div className="h-40 w-full flex justify-center items-center">
                  <Loader />
                </div>
              ) : usersCourses?.length === 0 ? (
                <div className="w-full h-20 flex justify-center items-center text-sm">
                  Aucun resultat
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="w-full md:w-full overflow-scroll">
                      <TableHead className="w-4/12">Cours</TableHead>
                      <TableHead className="w-5/12">Personnes</TableHead>
                      <TableHead className="w-2/12">Date</TableHead>
                      <TableHead className="text-right w-1/12">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs md:text-sm leading-3">
                    {usersCourses?.map((userCourse) => {
                      return (
                        <TableRow className="align-middle" key={userCourse.id}>
                          <TableCell className="font-medium">
                            <h5>{userCourse?.course?.title}</h5>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2 items-center">
                              <div className="flex gap-1 items-center">
                                <Avatar className="w-7 h-7 rounded-full border border-primary-500">
                                  <AvatarImage
                                    src={`${
                                      userCourse?.user?.image
                                        ? userCourse?.user?.image
                                        : "/default_avatar.jpg"
                                    }`}
                                  />
                                  <AvatarFallback className="bg-primary-700">
                                    CN
                                  </AvatarFallback>
                                </Avatar>
                                {`${userCourse?.user?.firstName} ${userCourse?.user?.lastName}`}
                              </div>
                              <MoveRightIcon
                                className="text-muted-500"
                                strokeWidth={0.5}
                              />
                              <div className="flex gap-1 items-center">
                                <Avatar className="w-7 h-7 rounded-full border border-primary-500">
                                  <AvatarImage
                                    src={`${
                                      userCourse?.course?.yaya?.user?.image
                                        ? userCourse?.course?.yaya?.user?.image
                                        : "/default_avatar.jpg"
                                    }`}
                                  />
                                  <AvatarFallback className="bg-primary-700">
                                    CN
                                  </AvatarFallback>
                                </Avatar>
                                {`${userCourse?.course?.yaya?.user?.firstName} ${userCourse?.course?.yaya?.user?.lastName}`}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {dayjs(userCourse?.createdAt)
                              .locale("fr")
                              .format("dd DD/MM/YYYY")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => {
                                setOpen(true);
                                setCurrentUserCourse(userCourse);
                              }}
                              className="py-2 px-4 h-max text-xs bg-primary-600"
                            >
                              Voir
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
      <CoursesUserSingle
        open={open}
        setOpen={setOpen}
        currentUserCourse={currentUserCourse}
        isAdmin={true}
      />
    </>
  );
}
