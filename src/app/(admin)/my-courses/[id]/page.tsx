import SingleCourse from "@/components/admin/my-courses/single-course";
import { apiUrl } from "@/lib/api-url";
import { userAuth, userAuthYaya } from "@/lib/helper";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Container } from "@/ui/components/container/container";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export type PageProps = {
  params: { id: string };
};

export default async function Page(props: PageProps) {
  const id = props.params.id;
  const userLogged = await userAuth();
  const user = await prisma.user.findUnique({
    where: {
      name: userLogged!.name!,
    },
    select: {
      id: true,
      role: true,
      email: true,
      name: true,
    },
  });
  const yayaId = await userAuthYaya().then((res) => res?.id);

  if (!user) {
    redirect("/signin");
  }

  const courseResponse = await fetch(`${apiUrl()}/api/courses/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!courseResponse.ok) {
    console.error("Error fetching course:", courseResponse.statusText);
    return notFound();
  }

  const course = await courseResponse.json();

  // Check if user is enrolled in the course
  if (user.role != "ADMIN" && course.yaya.user.id != user.id) {
    const userCourse = await fetch(
      `${apiUrl()}/api/courses/${id}/user-course?userId=${user.id}`
    );
    if (userCourse.ok) {
      const data = await userCourse.json();
      if (!data) {
        redirect(`/courses/${id}`);
      }
    }
  }

  return (
    <div className="w-full md:w-10/12 flex flex-col gap-4">
      <SingleCourse course={course} user={user} yayaId={yayaId} />
    </div>
  );
}
