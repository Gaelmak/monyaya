"use client";

import { Container } from "@/ui/components/container/container";
import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import { Typography } from "@/ui/components/typography/typography";
import { Filter } from "./filter";
import useFilterTypeStore from "@/store/filter-type-store";
import { FilterData } from "@/lib/filter-data/filter-data";

interface Props {
  session?: any;
  userId?: any;
  MyCourses: any;
  courses: any;
}

export const SearchResults = ({
  session,
  userId,
  MyCourses,
  courses,
}: Props) => {
  const filter = useFilterTypeStore((state) => state.filterType);
  const filteredData = FilterData(courses, filter);

  return (
    <Container className="flex flex-row gap-4 ">
      <Container className="w-full flex flex-col md:flex-row gap-8 md:gap-4">
        <Container className="basis-1/5 relative">
          <Container className="flex flex-col gap-4 sticky top-[14vh]">
            <Typography variant="title-base">Filtre</Typography>
            <Filter />
          </Container>
        </Container>
        <Container className="basis-4/5">
          <Container className="w-full">
            {session || MyCourses ? (
              <TrainingsView
                className="grid grid-cols-1 md:grid-cols-3 gap-2 *:bg-[#fdfdfd]"
                data={filteredData}
              />
            ) : (
              <TrainingsView
                className="grid grid-cols-1 md:grid-cols-3 gap-2"
                data={filteredData}
              />
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
