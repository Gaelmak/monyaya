import CoursesToValidate from "@/components/admin/yaya/courses-to-validate";
import YayaToValidate from "@/components/admin/yaya/yaya-to-validate";
import { userAuth } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function BecomeTrainerPage() {
  const userLogged = await userAuth();
  const user = await prisma?.user.findUnique({
    where: {
      name: userLogged?.name,
    },
    select: { role: true, yaya: true },
  });

  if (user?.role != "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <main className="w-full h-full flex flex-col p-4 mt-16 md:mt-0">
      <main className="w-full h-full flex flex-col p-4 space-y-12">
        <YayaToValidate />
        <CoursesToValidate />
      </main>
    </main>
  );
}
