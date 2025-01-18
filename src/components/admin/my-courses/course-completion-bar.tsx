"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function CourseCompletionBar({
  userId,
  courseId,
  className,
}: {
  userId: string | undefined;
  courseId: string;
  className?: string;
}) {
  const key = `${courseId ?? "9793" + userId ?? "8723"}`;
  const { data, isLoading } = useQuery({
    queryKey: [`${key}`],
    queryFn: async () => {
      return await fetch(
        `/api/user-course/lessons-completion?userId=${userId}&courseId=${courseId}`
      ).then((res) => res.json());
    },
  });

  if (isLoading) {
    return (
      <div
        className={cn("bg-black/20 rounded-lg animate-pulse", className)}
      ></div>
    );
  }

  return <Progress value={data} className={className} />;
}
