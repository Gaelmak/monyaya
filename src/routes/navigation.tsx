import Link from "next/link";
import Image from "next/image";
import { MainRoutes } from "@/lib/page-routes/page-routes";
import { Container } from "@/ui/components/container/container";
import { ProfileButton, SignInButton } from "./auth-buttons";
import clsx from "clsx";
import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";
import NavigationCourse from "./navigationCourses";

interface Props {
  className?: string;
}

export const Navigation = async ({ className }: Props) => {
  const session = await userAuth();
  const user = session
    ? await prisma?.user.findUnique({
        where: {
          name: session!.name!,
        },
        select: {
          name: true,
          image: true,
        },
      })
    : null;

  return (
    <header
      className={clsx(
        "z-40 fixed top-0 left-0 right-0 border-b-[1px] border-slate-50 bg-primary-50",
        className
      )}
    >
      <Container className="flex flex-row items-center justify-between px-8 lg:px-[7vw] lg:h-[7vh] md:h-[8vh]">
        <Link href="/">
          <Image
            src="/monyaya.png"
            alt="Logo MonYaya"
            width={100}
            height={100}
            priority
          />
        </Link>
        <nav className="">
          <div className="flex items-center  justify-between gap-3">
            <Link href={"/"}>
              <div className="px-4 py-2 rounded text-sm font-medium hover:bg-primary-400 focus:bg-primary-300 hover:text-secondary-900 focus:text-secondary-900 data-[active]:bg-primary-300 data-[state=open]:bg-primary-300">
                {"Accueil"}
              </div>
            </Link>
            <NavigationCourse />
            <Link href={"/about"}>
              <div className="px-4 py-2 rounded text-sm font-medium hover:bg-primary-400 focus:bg-primary-300 hover:text-secondary-900 focus:text-secondary-900 data-[active]:bg-primary-300 data-[state=open]:bg-primary-300">
                {"À propos"}
              </div>
            </Link>
            <Link href={"/contact"}>
              <div className="px-4 py-2 rounded text-sm font-medium hover:bg-primary-400 focus:bg-primary-300 hover:text-secondary-900 focus:text-secondary-900 data-[active]:bg-primary-300 data-[state=open]:bg-primary-300">
                {"Contact"}
              </div>
            </Link>
          </div>
        </nav>
        <Container>
          {session ? (
            user ? (
              <ProfileButton profileImg={user.image ? user.image : undefined} />
            ) : (
              <SignInButton />
            )
          ) : (
            <SignInButton />
          )}
        </Container>
      </Container>
    </header>
  );
};
