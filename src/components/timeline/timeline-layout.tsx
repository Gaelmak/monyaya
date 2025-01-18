"use client";

import React, { useState } from "react";
import { TimelineElement } from "./data";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineDescription,
  TimelineContent,
  TimelineTime,
} from "./timeline";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MixedSortingLessons } from "./mixed-sorting-lessons";
import { dataConfig } from "./data";
import { Buttons } from "@/ui/components/buttons/buttons";
import CreateSection from "../admin/my-courses/create-section";
import { Courses, Sections } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../ui/loader";

interface TimelineLayoutProps {
  userId: string | undefined;
  yayaId: string | undefined;
  course: Courses; // Replace any[] with the actual type of items.
}
export const LessonsTimelineLayout = ({
  userId,
  yayaId,
  course,
}: TimelineLayoutProps) => {
  const [isPopOpen, setIsPopOpen] = useState(false);

  const {
    data: sections,
    isLoading: isSectionsLoading,
    refetch: refetchSections,
  } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${course.id}/sections`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: lessons, isLoading: isLoadingLessons } = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const response = await fetch(`/api/courses/${course.id}/lessons`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isSectionsLoading) {
    return <Loader />;
  }

  return (
    <Timeline>
      {sections.map((section: Sections, index: number) => (
        <TimelineItem key={index}>
          <TimelineConnector />
          <TimelineHeader>
            {/* <TimelineTime>{section.date}</TimelineTime> */}
            <TimelineIcon className="w-3 h-3" />
            <TimelineTitle>{section.title}</TimelineTitle>
          </TimelineHeader>
          <TimelineContent>
            {isLoadingLessons ? (
              <Loader />
            ) : (
              <MixedSortingLessons
                userId={userId}
                yayaId={yayaId}
                course={course}
                section={section}
                lessons={lessons}
              />
            )}
            {/* <TimelineDescription>{section.description}</TimelineDescription> */}
          </TimelineContent>
        </TimelineItem>
      ))}

      {yayaId === course.yayaID && (
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="w-3 h-3" />
            <TimelineContent className="p-0">
              <AlertDialog open={isPopOpen} onOpenChange={setIsPopOpen}>
                <AlertDialogTrigger className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg">
                  Ajouter une section
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <CreateSection
                    sections={sections}
                    courseId={course.id}
                    isPopOpen={isPopOpen}
                    setIsPopOpen={setIsPopOpen}
                    refetchSections={refetchSections}
                  />
                </AlertDialogContent>
              </AlertDialog>
            </TimelineContent>
          </TimelineHeader>
        </TimelineItem>
      )}
    </Timeline>
  );
};
