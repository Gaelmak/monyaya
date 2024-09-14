import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { userAuth, userAuthRole, userAuthYaya } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import YayaCoursesList from "@/components/admin/my-courses/yaya-courses-list";
import UserCoursesList from "@/components/admin/my-courses/user-courses-list";

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
    <main className="w-full min-h-[100dvh] pt-24 md:pt-0 pb-8 flex flex-col p-4">
      <Container className="w-full py-4 md:py-10 flex flex-col md:flex-row justify-between gap-4 rounded">
        <div>
          <Typography component="h3" className="text-xl md:text-2xl font-bold">
            Mes formations
          </Typography>
          {role === "TRAINER" ? (
            <p>Créez votre propre cours en ligne, en domicile ou en personne</p>
          ) : (
            <p>Consultez les cours que vous avez rejoints</p>
          )}
        </div>
        {role === "TRAINER" && (
          <Link href="/my-courses/add">
            <Button>Ajouter une formation</Button>
          </Link>
        )}
      </Container>
      {role === "TRAINER" && <YayaCoursesList yayaId={yaya?.id} />}
      {role === "USER" && <UserCoursesList user={user} />}
    </main>
  );
}
