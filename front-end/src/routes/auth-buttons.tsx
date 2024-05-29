'use client'

import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { Home, LogOut, User } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import DefaultAvatar from "../../public/default_avatar.jpg"
import { Typography } from "@/ui/components/typography/typography"

interface Props {
  profileImg? : StaticImageData | undefined | string
  className?: string
  children?: React.ReactNode
  name?: string
}

export const HomeButton = ({className}: Props) => {
  return(
    <Buttons 
      variant="primary"
      outline="outline"
      buttonType="link"
      Icon={Home}
      baseUrl="/"
      className={className}
    >
      Page d'acceuil
    </Buttons>
  )
}
 
export const ServiceButton = ({children} : Props) => {
  return(
    <Buttons 
      variant="primary"
      buttonType="link"
      baseUrl="/trainings"
      className="w-full"
    >
      {children ? children : 'Services'}
    </Buttons>
  )
}

export const SignInButton = () => {
  return(
    <Buttons 
      variant="primary"
      buttonType="link"
      baseUrl="/signin"
      className="w-full md:w-auto"
    >
      Se connecter
    </Buttons>
  )
}

export const SignOutButton = ({className}: Props) => {
  return(
    <Buttons 
      variant="primary"
      buttonType="action"
      action = {() => { signOut({ callbackUrl: '/' }) }}
      className={className}
    >
      <LogOut className="mr-4 h-5 w-5"/> Déconnexion
    </Buttons>
  )
}

export const ProfileButton = ({ profileImg, name }: Props) => {
  return(
    <>
    {
      profileImg ?
        <Link href="/dashboard">
          <Container className="items-start w-full flex flex-row gap-4 rounded p-4 md:p-0 md:bg-white bg-secondary-100">
            <Container className="flex items-center justify-center rounded-full w-[60px] md:w-[40px] h-[60px] md:h-[40px] overflow-hidden">
              <Image 
                width={40} 
                height={40} 
                src={profileImg}
                alt="User profile image"
                className="hidden md:block"
              /> 
              <Image 
                width={60} 
                height={60} 
                src={profileImg}
                alt="User profile image"
                className="md:hidden"
              /> 
            </Container>
            <Container className="md:hidden">
              <Typography variant="title-sm">{name}</Typography>
            </Container>
          </Container>
        </Link>  
      :
        <Link href="/dashboard">
          <Container className="items-start w-full flex flex-row gap-4 rounded p-4 md:p-0 md:bg-white bg-secondary-100">
            <Container className="flex items-center justify-center rounded-full w-[60px] md:w-[40px] h-[60px] md:h-[40px] overflow-hidden">
              <Image 
                width={40} 
                height={40} 
                src={DefaultAvatar}
                alt="User profile image"
                className="hidden md:block"
              /> 
              <Image 
                width={60} 
                height={60} 
                src={DefaultAvatar}
                alt="User profile image"
                className="md:hidden"
              /> 
            </Container>
            <Container className="md:hidden">
              <Typography variant="title-sm">{name}</Typography>
            </Container>
          </Container>
        </Link>  
    }
    </>
  )
}