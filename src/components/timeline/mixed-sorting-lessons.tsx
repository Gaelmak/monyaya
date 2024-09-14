"use client";

import * as React from "react";
import { closestCorners } from "@dnd-kit/core";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/ui/sortable";
import { Lessons, Sections } from "@prisma/client";
import { CircleEllipsisIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Buttons } from "@/ui/components/buttons/buttons";
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons";

export function MixedSortingLessons({
  section,
  lessons,
}: {
  section: Sections;
  lessons: Lessons[] | any;
}) {
  const [specialTricks, setSpecialTricks] = React.useState([]);
  const pathname = usePathname();

  React.useEffect(() => {
    setSpecialTricks(lessons);
  }, [lessons]);

  return (
    <Card>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <CardHeader>
          <CardDescription>{section.description}</CardDescription>
        </CardHeader>
      </div>
      <CardContent>
        <Sortable
          orientation="mixed"
          collisionDetection={closestCorners}
          value={specialTricks}
          onValueChange={setSpecialTricks}
          overlay={<div className="size-full rounded-md bg-primary/10" />}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {getSectionLessons(lessons, section.id).map((lesson, index) => (
              <SortableItem
                key={lesson.id}
                value={lesson.id}
                className="space-y-0"
                asChild
              >
                <Card className="rounded-md bg-gray-50 hover:bg-gray-50/80 relative">
                  <SortableDragHandle className="w-full p-0 bg-transparent h-auto hover:bg-transparent absolute top-0 right-0 left-0 z-20">
                    <DotsHorizontalIcon className="text-black/50 hover:text-black" />
                  </SortableDragHandle>
                  <Link
                    href={`/my-courses/${section.courseId}/l/${lesson.id}`}
                    className="z-10"
                  >
                    <CardHeader className="items-center h-full">
                      <CardTitle className="text-lg leading-5">
                        {lesson.title}
                      </CardTitle>
                      {/* <CardDescription>{item.points} points</CardDescription> */}
                    </CardHeader>
                  </Link>
                </Card>
              </SortableItem>
            ))}
            <Link href={`${pathname}/l/create?sid=${section.id}`}>
              <Card className="flex aspect-video items-center justify-center rounded-md bg-transparent hover:bg-gray-50/80 hover:cursor-pointer">
                <CardHeader className="items-center">
                  <CardTitle>
                    <PlusIcon />
                  </CardTitle>
                  <CardDescription>Ajouter une leçon</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </Sortable>
      </CardContent>
    </Card>
  );
}

function getSectionLessons(lessons: Lessons[], sectionId: string) {
  const sectionLessons = lessons.filter(
    (lesson) => lesson.sectionId === sectionId
  );
  return sectionLessons;
}
