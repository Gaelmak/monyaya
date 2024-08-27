import { Typography } from "@/ui/components/typography/typography";
import MonYayaLogo from "../../public/Monyaya.png";
import Link from "next/link";
import { ActiveLink } from "./active-link";
import Image from "next/image";
import { MainRoutes } from "@/lib/page-routes/page-routes";
import { Container } from "@/ui/components/container/container";
import { ProfileButton, SignInButton } from "./auth-buttons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import clsx from "clsx";
import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/helper";

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
      <Container className="flex flex-row items-center justify-between px-8 h-[10vh]">
        <Link href="/">
          <Image
            src={MonYayaLogo}
            alt="Logo MonYaya"
            width={120}
            height={120}
            priority
          />
        </Link>
        <nav className="flex items-center gap-4 justify-between">
          {MainRoutes.map((route) => (
            <NavigationMenu >
              <NavigationMenuList>
                <NavigationMenuItem >
                  <NavigationMenuTrigger className="hover:bg-primary-400 focus:bg-primary-300 hover:text-primary-50 focus:text-primary-50   data-[active]:bg-primary-300 data-[state=open]:bg-primary-300">{route.title}</NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-primary-300">
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ))}
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
