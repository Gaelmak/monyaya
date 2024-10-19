import { Typography } from "@/ui/components/typography/typography";
import Link from "next/link";
import { ActiveLink } from "./active-link";
import clsx from "clsx";
import Image from "next/image";
import { MainRoutes } from "@/lib/page-routes/page-routes";
import { Container } from "@/ui/components/container/container";
import { ProfileButton, SignInButton } from "./auth-buttons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/helper";
import NavigationCourse from "./navigationCourses";

interface Props {
  className: string;
}

export const MobileNavigation = async ({ className }: Props) => {
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
    <header
      className={clsx(
        "z-40 fixed top-0 left-0 right-0 border-b-[1px] bg-white border-slate-50",
        className
      )}
    >
      <Container className="flex flex-row items-center justify-between px-4 py-2 gap-4 h-16">
        <Link href="/">
          <Image
            src="/img/logo-monyaya.webp"
            alt="Logo MonYaya"
            width={459}
            height={200}
            className="h-12 w-auto"
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-[90vw] bg-white">
            <SheetDescription className="h-full">
              <nav className=" h-full pt-8 text-left justify-between flex flex-col">
                <div className="flex flex-col justify-start items-start gap-3 ">
                  <SheetClose asChild>
                    <Link href={"/"}>
                      <div className="px-4 py-2 rounded text-sm font-medium hover:bg-primary-400 focus:bg-primary-300 hover:text-primary-50 focus:text-primary-50   data-[active]:bg-primary-300 data-[state=open]:bg-primary-300">
                        {"Accueil"}
                      </div>
                    </Link>
                  </SheetClose>
                  <NavigationCourse />
                  <SheetClose asChild>
                    <Link href={"/about"}>
                      <div className="px-4 py-2 rounded text-sm font-medium hover:bg-primary-400 focus:bg-primary-300 hover:text-primary-50 focus:text-primary-50   data-[active]:bg-primary-300 data-[state=open]:bg-primary-300">
                        {"À propos"}
                      </div>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href={"/contact"}>
                      <div className="px-4 py-2 rounded text-sm font-medium hover:bg-primary-400 focus:bg-primary-300 hover:text-primary-50 focus:text-primary-50   data-[active]:bg-primary-300 data-[state=open]:bg-primary-300">
                        {"Contact"}
                      </div>
                    </Link>
                  </SheetClose>
                </div>
                <Container className="w-full flex flex-col gap-2 my-4">
                  {session ? (
                    user ? (
                      <ProfileButton
                        profileImg={user.image ? user.image : undefined}
                        name={user!.firstName! + " " + "" + user!.lastName!}
                      />
                    ) : (
                      <SignInButton />
                    )
                  ) : (
                    <SignInButton />
                  )}
                </Container>
              </nav>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
};
