import { Container } from "@/ui/components/container/container";
import { FilterCourses } from "@/ui/modules/filter-courses/filter-courses";
import prisma from '@/lib/prisma'

export default async function Home() {
  const courses = await prisma.category.findMany({
    include: {
      courses: true
    }
  })

  return (
    <main>
      <Container variant="Glass-Effect" className="px-4 md:px-8 py-2 fixed left-0 right-0 drop-shadow-none" >
        <FilterCourses CourseList={courses}/>
      </Container>
      <Container className="pt-[20vh] p-8">
        boke
      </Container>
    </main>
  )
}
