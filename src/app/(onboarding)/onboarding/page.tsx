import { Container } from "@/ui/components/container/container";
import { Init } from "../steps/init";
import { ScrollOnboard } from "@/ui/components/scroll-onboard/scroll-onboard";
import { CompleteRegistration } from "../steps/complete-registration";
import { userAuth } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await userAuth();

  if (!session) {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      name: session?.name,
    },
    select: {
      email: true,
      name: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      password: true,
      municipality: true,
      district: true,
      avenue: true,
      number: true,
    },
  });

  if (!user) {
    redirect("/signin");
  }

  if (user?.email && user?.firstName && user?.lastName) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col h-dvh w-full overflow-hidden relative">
      <ScrollOnboard
        data={[
          {
            id: "init",
            element: <Init />,
          },
          {
            id: "init2",
            element: <CompleteRegistration data={user} name={user?.name} />,
          },
        ]}
      />
    </div>
  );
}
