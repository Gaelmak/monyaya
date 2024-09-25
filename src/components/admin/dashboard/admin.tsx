"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableUser from "@/ui/modules/table-admin/table-users";
import { useQuery } from "@tanstack/react-query";
import { BookCopyIcon, FileSpreadsheetIcon, User, Users } from "lucide-react";

export type UserStatsProps = {
  yayaId: string | undefined;
};

export default function AdminStats(props: UserStatsProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["statsYaya"],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/stats-admin`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  console.log(stats);
  return (
    <div className="w-full  md:px-4 -mt-16 z-10">
      <Tabs defaultValue="users" className="flex flex-col md:gap-44">
        <TabsList className="w-full grid grid-cols-1 gap-4 md:grid-cols-4">
          <TabsTrigger
            value="users"
            className=" w-full data-[state=active]:text-secondary-950 data-[state=active]:bg-inherit  data-[state=active]:border-none"
          >
            <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
              <CardContent className="p-6 flex gap-2 justify-between items-center">
                <div>
                  <p className="text">Total des Utilisateurs</p>
                  <p className="text-5xl font-bold">
                    {isLoading ? <Loader /> : stats?.users}
                  </p>
                </div>
                <FileSpreadsheetIcon
                  size={80}
                  strokeWidth={1}
                  className="text-primary-600"
                />
              </CardContent>
              <CardFooter className="bg-primary-600 py-4 px-2 text-white/90 text-xs">
                Total des utilisateurs de la plateforme
              </CardFooter>
            </Card>
          </TabsTrigger>
          <TabsTrigger
            value="courses"
            className="w-full data-[state=active]:text-secondary-950 data-[state=active]:bg-inherit  data-[state=active]:border-none"
          >
            <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
              <CardContent className="p-6 flex gap-2 justify-between items-center">
                <div>
                  <p className="text">Total de cours</p>
                  <p className="text-5xl font-bold">
                    {isLoading ? <Loader /> : stats?.courses}
                  </p>
                </div>
                <BookCopyIcon
                  size={80}
                  strokeWidth={1}
                  className="text-primary-600"
                />
              </CardContent>
              <CardFooter className="bg-primary-600 py-4 px-2 text-white/90 text-xs">
                Total de cours dans la plateforme
              </CardFooter>
            </Card>
          </TabsTrigger>
          <TabsTrigger
            value="lessons"
            className="w-full data-[state=active]:text-secondary-950 data-[state=active]:bg-inherit  data-[state=active]:border-none"
          >
            <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
              <CardContent className="p-6 flex gap-2 justify-between items-center">
                <div>
                  <p className="text">Total des leçons</p>
                  <p className="text-5xl font-bold">
                    {isLoading ? <Loader /> : stats?.lessons}
                  </p>
                </div>
                <Users size={80} strokeWidth={1} className="text-primary-600" />
              </CardContent>
              <CardFooter className="bg-primary-600 py-4 px-2 text-white/90 text-xs">
                Le nombre total de lecons
              </CardFooter>
            </Card>
          </TabsTrigger>
          <TabsTrigger
            value="sessions"
            className="w-full data-[state=active]:text-secondary-950 data-[state=active]:bg-inherit data-[state=active]:border-none"
          >
            <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
              <CardContent className="p-6 flex gap-2 justify-between items-center">
                <div>
                  <p className="text">Total des yayas</p>
                  <p className="text-5xl font-bold">
                    {isLoading ? <Loader /> : stats?.yayas}
                  </p>
                </div>
                <Users size={80} strokeWidth={1} className="text-primary-600" />
              </CardContent>
              <CardFooter className="bg-primary-600 py-4 px-2 text-white/90 text-xs">
                Le nombre total de sessions
              </CardFooter>
            </Card>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <TableUser />
        </TabsContent>
        <TabsContent value="courses">Course</TabsContent>
        <TabsContent value="lessons">Lessons </TabsContent>
        <TabsContent value="sessions">yayas</TabsContent>
      </Tabs>
    </div>
  );
}
