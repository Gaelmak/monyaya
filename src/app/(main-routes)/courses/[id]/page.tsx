import { userAuth } from "@/lib/helper";
import SingleCourseFront from "./single-course-front";
import { getServerUrl } from "@/lib/server-url";

export default async function SingleCoursePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await userAuth();
  const user = await prisma.user.findUnique({
    where: {
      name: session?.name ?? "",
    },
    select: {
      id: true,
    },
  });
  const courseUrl = getServerUrl() + `/api/courses/${params.id}`;

  return (
    <main className="py-4 md:py-8">
      <SingleCourseFront user={user} courseUrl={courseUrl} />
    </main>
  );
}
