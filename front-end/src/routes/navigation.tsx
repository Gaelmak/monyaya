'use client'

import { Typography } from "@/ui/components/typography/typography"
import { Buttons } from "@/ui/components/buttons/buttons"
import MonYayaLogo from '../../public/Monyaya.png'
import Link from "next/link"
import { ActiveLink } from "./active-link"
import clsx from 'clsx'
import Image from "next/image"
import { MainRoutes } from "@/lib/page-routes/page-routes"
import { Container } from "@/ui/components/container/container"

interface Props {
  className: string
}

export const Navigation = ({ className }: Props) => {

  return(
    <header 
      className={
        clsx(
          "z-[100] fixed top-0 left-0 right-0 border-b-[1px] border-slate-50 bg-white",
          className
        )
      }
    >
      <Container className="flex flex-row items-center justify-between px-16 py-2 h-[10vh]">
        <Link href="/">
          <Image src={MonYayaLogo} alt='Logo MonYaya' priority/>
        </Link>
        <nav className="flex items-center gap-6">
          {
            MainRoutes.map(route => 
              <Typography key={route.label} variant="body-base" component="p">
                <ActiveLink href={route.baseUrl}>
                  {route.label}
                </ActiveLink>
              </Typography>  
            )
          }
          <Buttons variant="ghost">Connexion</Buttons>
          <Buttons>Inscription</Buttons>
        </nav>
      </Container>
    </header>
  )
}