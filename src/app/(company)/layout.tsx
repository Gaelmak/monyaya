import { Navigation } from "@/routes/navigation";
import { MobileNavigation } from "@/routes/mobile-navigation";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/ui/modules/footer/footer";
import { userAuth } from "@/lib/helper";

export default async function MainRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await userAuth();
  const user = session
    ? await prisma?.user.findUnique({
        where: {
          name: session!.name!,
        },
        select: {
          firstName: true,
          lastName: true,
          image: true,
        },
      })
    : null;
  return (
    <div className="mt-16 md:mt-12">
      <Navigation className="hidden md:block" />
      <MobileNavigation className="md:hidden" user={user} />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
}
