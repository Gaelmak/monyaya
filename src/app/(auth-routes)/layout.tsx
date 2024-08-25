"use server";

import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { userAuth } from "@/lib/helper";

export default async function AuthRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await userAuth();

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
