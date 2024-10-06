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
import { useQuery } from "@tanstack/react-query";
import {
  BookAIcon,
  BookCopyIcon,
  BookUser,
  FileSpreadsheetIcon,
  User,
  User2Icon,
  Users,
} from "lucide-react";

export type UserStatsProps = {
  yayaId: string | undefined;
};

export default function AdminStats(props: UserStatsProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["statsAdmnin"],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/stats-admin`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-8 -mt-16 z-20">
      <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
        <CardContent className="p-6 flex gap-2 justify-between items-center">
          <div>
            <p className="text leading-4">Total d&apos;utilisateurs</p>
            <p className="text-5xl font-bold">
              {isLoading ? <Loader /> : stats?.users}
            </p>
          </div>
          <Users size={80} strokeWidth={1} className="text-primary-600" />
        </CardContent>
        <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
          Le nombre total d&apos;utilisateurs de la plateforme.
        </CardFooter>
      </Card>
      <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
        <CardContent className="p-6 flex gap-2 justify-between items-center">
          <div>
            <p className="text leading-4">Total de yayas</p>
            <p className="text-5xl font-bold">
              {isLoading ? <Loader /> : stats?.yayas}
            </p>
          </div>
          <BookUser size={80} strokeWidth={1} className="text-primary-600" />
        </CardContent>
        <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
          Le nombre total de yayas de la plateforme
        </CardFooter>
      </Card>
      <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
        <CardContent className="p-6 flex gap-2 justify-between items-center">
          <div>
            <p className="text leading-4">Total de cours</p>
            <p className="text-5xl font-bold">
              {isLoading ? <Loader /> : stats?.courses}
            </p>
          </div>
          <BookAIcon size={80} strokeWidth={1} className="text-primary-600" />
        </CardContent>
        <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
          Le nombre total de cours pour l&apos;ensemble de vos yayas
        </CardFooter>
      </Card>
      <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
        <CardContent className="p-6 flex gap-2 justify-between items-center">
          <div>
            <p className="text leading-4">Total de leçons</p>
            <p className="text-5xl font-bold">
              {isLoading ? <Loader /> : stats?.lessons}
            </p>
          </div>
          <FileSpreadsheetIcon
            size={80}
            strokeWidth={1}
            className="text-primary-600"
          />
        </CardContent>
        <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
          Le nombre total de lecons pour l&apos;ensemble de cours de la
          plateforme
        </CardFooter>
      </Card>
    </div>
  );
}
