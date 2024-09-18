import { Container } from "@/ui/components/container/container";
import { Toaster } from "@/components/ui/toaster";
import { redirect } from "next/navigation";
import { userAuth } from "@/lib/helper";

export default async function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await userAuth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="z-50 block">
      <Container className="flex flex-row min-h-[100dvh] ">
        <Container className="w-full">{children}</Container>
      </Container>
      <Toaster />
    </div>
  );
}
