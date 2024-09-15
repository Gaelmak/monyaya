import { Container } from "@/ui/components/container/container";
import { FrontCoursesList } from "@/ui/modules/courses/courses-list";

export default function AllCourses() {
  return (
    <main>
      <Container className="px-4 md:px-8 my-[12vh] min-h-dvh">
        <FrontCoursesList />
      </Container>
    </main>
  );
}
