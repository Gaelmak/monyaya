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
import { BookCopyIcon, FileSpreadsheetIcon, User, Users } from "lucide-react";

export type UserStatsProps = {
  yayaId: string | undefined;
};

export default function YayaStats(props: UserStatsProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["statsYaya"],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboard/stats-yaya?yayaId=${props.yayaId ?? ""}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-8 -mt-16 z-20">
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
        <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
          Le nombre total de cours que vous avez créés
        </CardFooter>
      </Card>
      <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
        <CardContent className="p-6 flex gap-2 justify-between items-center">
          <div>
            <p className="text">Total de eleves</p>
            <p className="text-5xl font-bold">
              {isLoading ? <Loader /> : stats?.etudiants}
            </p>
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
            <p className="text-5xl font-bold">
              {isLoading ? <Loader /> : stats?.lessons}
            </p>
          </div>
          <Users size={80} strokeWidth={1} className="text-primary-600" />
        </CardContent>
        <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
          Le nombre total de lecons pour l'ensemble de vos cours
        </CardFooter>
      </Card>
    </div>
  );
}
