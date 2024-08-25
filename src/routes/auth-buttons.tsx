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
      Page d'accueil
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
      <Link href="/dashboard">
        <Container className="items-center w-full flex justify-center flex-row gap-2 pb-4 lg:pb-0">
          <Container>
            <Container className="flex items-start rounded-full w-[180px] h-[180px] lg:w-[50px] lg:h-[50px] overflow-hidden">
              <Image 
                width={240}
                height={240}
                className="w-full h-full object-cover"
                src={profileImg ? profileImg : DefaultAvatar}
                alt="User profile image"
              /> 
            </Container>
          </Container>
        </Container>
      </Link> 
    </>
  )
}