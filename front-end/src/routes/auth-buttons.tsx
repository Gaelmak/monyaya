'use client'

import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { Home, LogOut, User } from "lucide-react"
import { signIn, signOut } from "next-auth/react"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import DefaultAvatar from "../../public/default_avatar.jpg"

interface Props {
  profileImg? : StaticImageData | undefined | string
  className?: string
  children?: React.ReactNode
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
      baseUrl="/services"
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

export const ProfileButton = ({ profileImg }: Props) => {
  return(
    <>
    {
      profileImg ?
        <Link href="/dashboard">
          <Container className="flex items-center justify-center rounded-full w-[40px] h-[40px] overflow-hidden">
            <Image 
              width={40} 
              height={40} 
              src={profileImg}
              alt="User profile image"
            /> 
          </Container>
        </Link>  
      :
        <Link href="/dashboard">
          <Container className="flex items-center justify-center rounded-full w-[40px] h-[40px] overflow-hidden">
            <Image 
              width={40} 
              height={40} 
              src={DefaultAvatar}
              alt="User profile image"
            /> 
          </Container>
        </Link>  
    }
    </>
  )
}