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
          <Container className="items-center w-full md:flex-row md:items-start gap-2 rounded">
            <Container className="flex items-center justify-center rounded-full w-[120px] md:w-[40px] h-[120px] md:h-[40px] overflow-hidden">
              <Image 
                width={40} 
                height={40} 
                src={profileImg}
                alt="User profile image"
                className="hidden md:block"
              /> 
              <Image 
                width={120} 
                height={120} 
                src={profileImg}
                alt="User profile image"
                className="md:hidden"
              /> 
            </Container>
          </Container>
        </Link>  
      :
        <Link href="/dashboard">
          <Container className="items-center w-full flex flex-col md:flex-row md:items-start gap-2 rounded">
            <Container className="flex items-center justify-center rounded-full w-[120px] md:w-[40px] h-[120px] md:h-[40px] overflow-hidden">
              <Image 
                width={40} 
                height={40} 
                src={DefaultAvatar}
                alt="User profile image"
                className="hidden md:block"
              /> 
              <Image 
                width={120} 
                height={120} 
                src={DefaultAvatar}
                alt="User profile image"
                className="md:hidden"
              /> 
            </Container>
          </Container>
        </Link>  
    }
    </>
  )
}