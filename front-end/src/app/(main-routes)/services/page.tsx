import { Container } from "@/ui/components/container/container";
import { FilterCourses } from "@/ui/modules/filter-courses/filter-courses";
import prisma from '@/lib/prisma'
import { SearchResults } from "@/ui/modules/search-result/search-result";

export default async function Home() {
  const courses = await prisma.category.findMany({
    include: {
      courses: true
    }
  })

  return (
    <main>
      <Container className="px-4 md:px-8">
        <SearchResults/>
      </Container>
    </main>
  )
}
