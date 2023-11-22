import { Container } from "@/ui/components/container/container"
import { FilterCourses } from "../filter-courses/filter-courses"

export const Profils = () => {
  return(
    <Container className="px-4 md:px-8">
      <Container>
        <FilterCourses/>
      </Container>
    </Container>
  )
}