import { Container } from "@/ui/components/container/container";
import { AsideNav } from "@/routes/aside-nav";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { MobileAsideNav } from "@/routes/mobile-aside-nav";
import { userAuth } from "@/lib/helper";
import prisma from "@/lib/prisma";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await userAuth();
  const user = await prisma.user.findUnique({
    where: {
      name: session?.name ?? "",
    },
    select: {
      id: true,
      email: true,
      role: true,
      firstName: true,
      lastName: true,
      image: true,
    },
  });

  if (!user) {
    redirect("/signin");
  }

  if (!user.email || user.email === "") {
    redirect("/onboarding");
  }

  return (
    <div className="mt-[-8vh] md:mt-[-10vh] z-50 block">
      <div className="flex flex-row min-h-[100dvh] ">
        <MobileAsideNav className="md:hidden" />
        <div className="w-[20%] relative h-[100dvh] hidden md:block">
          <div className="fixed w-[20%] h-[100dvh]">
            <AsideNav className="h-[100dvh] w-full" />
          </div>
        </div>
        <div className="w-full md:w-[80%]">{children}</div>
      </div>
      <Toaster />
    </div>
  );
}
