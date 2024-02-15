import { Container } from "@/ui/components/container/container"
import { FilterCourses } from "../filter-courses/filter-courses"
import prisma from '@/lib/prisma'

export const Profils = async () => {
  const courses = await prisma.category.findMany({
    include: {
      courses: true
    }
  })

  return(
    <Container className="px-4 md:px-8">
      <Container>
        <FilterCourses CourseList={courses}/>
      </Container>
    </Container>
  )
}