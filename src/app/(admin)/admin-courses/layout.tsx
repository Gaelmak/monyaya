import { userAuthRole } from "@/lib/helper";
import { redirect } from "next/navigation";

export default async function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userRole = await userAuthRole();

  if (userRole !== "ADMIN") {
    return redirect("/dashboard");
  }

  return (
    <main className="w-full min-h-[100dvh] pt-20 md:pt-4 pb-8 flex flex-col p-4">
      {children}
    </main>
  );
}
