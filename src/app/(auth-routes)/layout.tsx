"use server";

import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { userAuth } from "@/lib/helper";
import prisma from "@/lib/prisma";

export default async function AuthRoutesLayout({
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

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="mt-[-8vh] md:mt-[-10vh] z-50">
      {children}
      <Toaster />
    </div>
  );
}
