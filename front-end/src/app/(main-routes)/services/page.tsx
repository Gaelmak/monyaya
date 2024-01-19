import { Container } from "@/ui/components/container/container";
import { FilterCourses } from "@/ui/modules/filter-courses/filter-courses";

export default function Home() {
  return (
    <main>
      <Container variant="Glass-Effect" className="px-4 md:px-8 py-2 fixed left-0 right-0 drop-shadow-none" >
        <FilterCourses/>
      </Container>
      <Container className="pt-[20vh] p-8">
        boke
      </Container>
    </main>
  )
}
