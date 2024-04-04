import { Typography } from "@/ui/components/typography/typography"
import MonYayaLogo from '../../public/Monyaya.png'
import Link from "next/link"
import { ActiveLink } from "./active-link"
import clsx from 'clsx'
import Image from "next/image"
import { MainRoutes } from "@/lib/page-routes/page-routes"
import { Container } from '@/ui/components/container/container'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { ProfileButton, SignInButton } from "./auth-buttons"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import Default from "../../public/default_avatar.jpg"
import { AsideNav } from "./aside-nav"
interface Props {
  className: string
}

export const MobileAsideNav = async ({ className }: Props) => {
  const session = await getServerSession(authOptions)
  return(
    <header
      className={
        clsx(
          "z-40 fixed top-0 left-0 right-0 border-b-[1px] bg-white border-slate-50",
          className
        )
      }
    >
      <Container className="flex flex-row items-center justify-between px-4 py-2 gap-4 h-[8vh]">
        <Link href="/">
          <Image src={MonYayaLogo} alt='Logo MonYaya' priority width={100} height={100}/>
        </Link>
        <Sheet>
          <SheetTrigger>
            <Container className="flex items-center justify-center rounded-full w-[40px] h-[40px] overflow-hidden">
              <Image src={session!.user!.image ? session!.user!.image : Default } alt='Profil image' priority width={40} height={40}/>
            </Container>
          </SheetTrigger>
          <SheetContent className="w-[90vw] bg-white pt-8">
            <AsideNav/>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}