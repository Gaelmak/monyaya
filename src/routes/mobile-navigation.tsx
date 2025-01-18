"use client";

import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
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
import NavigationCourse from "./navigationCourses";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  className: string;
  user: {
    firstName: string;
    lastName: string;
    image: string;
  } | null;
}

export const MobileNavigation = ({ className, user }: Props) => {
  const [open, setOpen] = useState(false);

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
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-[90vw] bg-white">
            <SheetDescription className="h-full">
              <nav className=" h-full pt-8 text-left justify-between flex flex-col">
                <div className="flex flex-col justify-start items-start gap-3 ">
                  <NavLink href="/" onClick={() => setOpen(false)}>
                    Accueil
                  </NavLink>
                  <NavigationCourse />
                  <NavLink href="/about" onClick={() => setOpen(false)}>
                    À propos
                  </NavLink>
                  <NavLink href="/contact" onClick={() => setOpen(false)}>
                    Contact
                  </NavLink>
                </div>
                <Container className="w-full flex flex-col gap-2 my-4">
                  {user ? (
                    <ProfileButton
                      profileImg={user.image ? user.image : undefined}
                      name={user!.firstName! + " " + "" + user!.lastName!}
                    />
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

const NavLink = ({ href, children, ...props }) => {
  const pathname = usePathname();

  function isCurrentPath(path: string) {
    return pathname === path;
  }

  return (
    <Link href={href} {...props}>
      <div
        className={cn(
          "px-4 py-2 rounded text-sm font-medium hover:bg-primary-400 focus:bg-primary-300 hover:text-primary-50 focus:text-primary-50",
          isCurrentPath(href) && "bg-primary-300"
        )}
      >
        {children}
      </div>
    </Link>
  );
};
