'use client'
import { BgImg } from "@/ui/components/bg-img/bg-img"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { LogIn, MoveLeft } from "lucide-react"
import Student from "../../../../public/HowItWork.jpg"
import Link from "next/link"

export const Aside = () => {
  return (
    <BgImg src={Student} alt={"student"} className="w-full h-full relative">
      <Container className="absolute top-8 left-8">
        <Buttons Icon={MoveLeft} variant="secondary" buttonType="link" baseUrl="/" className=""> Retourner à l'écran d'acceuil</Buttons>
      </Container>
      <Container className="text-center flex flex-col gap-8 px-4 bg-secondary-Default h-full justify-center items-center bg-opacity-50">
        <Typography variant="title-lg" component="h2" className="text-white">
          J'ai deja un compte !
        </Typography>
        <Container>
          <Buttons buttonType="link" baseUrl="/signin" Icon={LogIn} variant="ghost" className="text-secondary-Default">Se connecter</Buttons>
        </Container>
      </Container>
      <Container variant="Glass-Effect" className="absolute bottom-8 left-8 right-8 p-4 rounded">
        <Typography variant="title-sm" className="text-white text-center">Devenez formateur et transformez votre passion en revenu !<br/> Cliquez <Link href={"/"} className="text-accent">ici</Link> pour creer votre compte</Typography>
      </Container>
    </BgImg>
  )
}