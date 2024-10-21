"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { UserLesson } from "@prisma/client";
import { getAdminUserLessons } from "./dashboard.action";

export const description = "An interactive area chart";

const chartConfig = {
  completed: {
    label: "Compléter",
    color: "hsl(var(--chart-1))",
  },
  total: {
    label: "Total",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function LessonsAdminChart() {
  const [timeRange, setTimeRange] = React.useState("30d");
  const [filteredData, setFilteredData] = React.useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["adminUsersLessons"],
    queryFn: async () => {
      const response = await getAdminUserLessons();
      if (!response) {
        throw new Error("Network response was not ok");
      }
      return response;
    },
  });

  React.useEffect(() => {
    if (data) {
      const groupedData = data.reduce(
        (
          acc: Record<string, { total: number; completed: number }>,
          item: UserLesson
        ) => {
          const date = new Date(item.completedAt).toISOString().split("T")[0]; // Format date to YYYY-MM-DD
          acc[date] = {
            total: (acc[date]?.total || 0) + 1, // Count total lessons per date
            completed: item.completed
              ? (acc[date]?.completed || 0) + 1
              : acc[date]?.completed || 0, // Count completed lessons per date
          };
          return acc;
        },
        {}
      );

      const formattedData = Object.entries(groupedData).map(
        ([date, counts]) => ({
          date,
          total: counts.total,
          completed: counts.completed,
        })
      );

      const filtered = formattedData.filter((item) => {
        const date = new Date(item.date);
        const now = new Date();
        let daysToSubtract = 90;
        if (timeRange === "30d") {
          daysToSubtract = 30;
        } else if (timeRange === "7d") {
          daysToSubtract = 7;
        }
        now.setDate(now.getDate() - daysToSubtract);
        return date >= now;
      });
      setFilteredData(filtered);
    }
  }, [data, timeRange]);

  if (isLoading) {
    return;
  }

  return (
    <Card className="bg-white">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Complétion des cours</CardTitle>
          <CardDescription>
            Affichage du total des leçons complétées par date
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Dernier mois" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="30d" className="rounded-lg">
              30 derniers jours
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              7 derniers jours
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-total)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-total)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("fr-FR", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("fr-FR", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-completed)"
              stackId="a"
            />
            <Area
              dataKey="total"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-total)"
              stackId="b"
              top={10}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
