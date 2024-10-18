import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { userAuth, userAuthRole, userAuthYaya } from "@/lib/helper";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AdminCoursesList from "@/components/admin/my-courses/admin-courses-list";

export default async function MyTrainingsPage() {
  const authUser = await userAuth();
  const user = await prisma?.user.findUnique({
    where: {
      name: authUser!.name!,
    },
    select: {
      id: true,
    },
  });
  const role = await userAuthRole();
  const yaya = await userAuthYaya();

  if (!user) {
    redirect("/signin");
  }

  return (
    <>
      <Container className="w-full pb-4 md:pb-10 flex flex-col md:flex-row justify-between gap-4 rounded">
        <div>
          <Typography component="h3" className="text-xl md:text-2xl font-bold">
            Les formations
          </Typography>
          <p>Toutes les formations valider de la plateforme</p>
        </div>
      </Container>
      <AdminCoursesList user={user} />
    </>
  );
}
