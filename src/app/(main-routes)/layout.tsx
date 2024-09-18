import { Navigation } from "@/routes/navigation";
import { MobileNavigation } from "@/routes/mobile-navigation";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/ui/modules/footer/footer";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/helper";

export default async function MainRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-16 md:mt-16">
      <Navigation className="hidden md:block" />
      <MobileNavigation className="md:hidden" />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
}
