import { Container } from "@/ui/components/container/container";
import { FrontCoursesList } from "@/ui/modules/courses/courses-list";

export default function AllCourses() {
  return (
    <main className="px-4 py-8 md:px-8 md:py-12 min-h-dvh">
      <FrontCoursesList />
    </main>
  );
}
