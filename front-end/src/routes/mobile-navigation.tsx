'use client'

import React, { useState } from 'react'

import { Typography } from "@/ui/components/typography/typography"
import { Buttons } from "@/ui/components/buttons/buttons"
import MonYayaLogo from '../../public/Monyaya.png'
import Link from "next/link"
import { ActiveLink } from "./active-link"
import clsx from 'clsx'
import Image from "next/image"
import { MainRoutes } from "@/lib/page-routes/page-routes"
import { Container } from '@/ui/components/container/container'

interface Props {
  className: string
}

export const MobileNavigation = ({ className }: Props) => {

  const [navbarOpen, setNavbarOpen] = useState(false)

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
        {/* Burger Button Menu */}
        <Link href="/">
          {/* <Image src={MonYayaLogo} alt='Logo MonYaya' priority/> */}
          Mon Yaya
        </Link>
        <button
          className='md:hidden'
          onClick={() => {
            if(navbarOpen) {
              setNavbarOpen(false)
            } else {
              setNavbarOpen(true)
            }
          }}
        >
          <div className={navbarOpen ? 'active hamburger' : 'hamburger'}>
            <svg viewBox="0 0 32 32">
              <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </div>
        </button>
      </Container>
      
      {/* Mobile Menu */}
      <Container 
        className={
          clsx(
            navbarOpen ? 'right-0' : ' right-[-90vw] ',
            'md:hidden border-l-[1px] border-slate-50 px-4 absolute block h-[92vh] w-[90vw] z-[100] py-6 top-[8vh] bg-white animate'
          )
        }
      >
        <nav className="flex flex-col items-center gap-4 justify-between h-full">
          <Container className='w-full flex flex-col gap-2'>
          {
            MainRoutes.map(route => 
              <Typography key={route.title!} variant="body-base" component="p">
                <ActiveLink href={route.baseUrl!}>
                  {route.title}
                </ActiveLink>
              </Typography>  
            )
          }
          </Container>
          <Container className='w-full flex flex-col gap-2 mb-4'>
            <Buttons className='w-full'>Connexion</Buttons>
            <Buttons variant="secondary" className='w-full'>Inscription</Buttons>  
          </Container>
        </nav>
      </Container>
    </header>
  )
}