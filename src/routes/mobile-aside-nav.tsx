import MonYayaLogo from "../../public/Monyaya.png";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { Container } from "@/ui/components/container/container";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Default from "../../public/default_avatar.jpg";
import { AsideNav } from "./aside-nav";
import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/helper";

interface Props {
  className: string;
}

export const MobileAsideNav = async ({ className }: Props) => {
  const session = await userAuth();

  const user = await prisma?.user.findUnique({
    where: {
      name: session!.name!,
    },
    select: {
      image: true,
    },
  });
  return (
    <header
      className={clsx(
        "z-40 fixed top-0 left-0 right-0 border-b-[1px] bg-white border-slate-50",
        className
      )}
    >
      <Container className="flex flex-row items-center justify-between px-4 py-2 gap-4 h-[8vh]">
        <Link href="/">
          <Image
            src={MonYayaLogo}
            alt="Logo MonYaya"
            priority
            width={100}
            height={100}
          />
        </Link>
        <Sheet>
          <SheetTrigger>
            <Container className="flex items-center justify-center rounded-full w-[40px] h-[40px] overflow-hidden">
              <Image
                src={user!.image ? user!.image : Default}
                alt="Profil image"
                priority
                width={40}
                height={40}
                className="w-full h-full object-cover object-center rounded-full"
              />
            </Container>
          </SheetTrigger>
          <SheetContent className="w-[90vw] bg-white pt-8">
            <AsideNav />
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
};
