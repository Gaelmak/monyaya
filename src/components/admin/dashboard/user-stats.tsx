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
  userId: string;
};

export default function UserStats(props: UserStatsProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await fetch(
        `/api/dashboard/stats-user?userId=${props.userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8 -mt-16 z-20">
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
          Le nombre total de cours que vous avez rejoints
        </CardFooter>
      </Card>
      <Card className="bg-white p-0 flex flex-col justify-between overflow-hidden">
        <CardContent className="p-6 flex gap-2 justify-between items-center">
          <div>
            <p className="text">Total des leçons </p>
            <p className="text-5xl font-bold">
              {isLoading ? <Loader /> : stats?.lessons}
            </p>
          </div>
          <Users size={80} strokeWidth={1} className="text-primary-600" />
        </CardContent>
        <CardFooter className="bg-primary-600 p-4 text-white/90 text-xs">
          Le nombre total de leçons pour l&apos;ensemble de cours que vous avez
          rejoints
        </CardFooter>
      </Card>
    </div>
  );
}
