'use client'
import { Buttons } from "@/ui/components/buttons/buttons";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="h-[100dvh] w-full flex flex-row relative">
       <Container className="absolute top-8 left-8">
        <Buttons Icon={MoveLeft} variant="secondary" buttonType="link" baseUrl="/" className="">Retourner à l'écran d'acceuil</Buttons>
      </Container>
      <Container className="w-full flex flex-col justify-center items-center gap-8 bg-secondary-100">
        <Container className="text-center w-[30%] flex flex-col justify-center items-center">
          <Typography variant="title-lg" component="h2" className="">Bienvenue !</Typography>
          <Typography variant="body-base" component="p" className="">Veuillez sélectionner le type de compte que vous voulez créer</Typography>
        </Container>
        <Container 
          className="flex flex-row justify-center items-center gap-6 
          [&>*]:h-80 [&>*]:w-[20rem] [&>*]:p-8 [&>*]:rounded [&>*]:overflow-hidden [&>*]:bg-black [&>*]:flex [&>*]:flex-col [&>*]:justify-between"
        >
          <Container className="">
            <Typography variant="title-lg" component="h2" className="text-white">Compte étudiant</Typography>
            <Typography variant="body-base" component="p" className="text-white">Inscrivez vous et accédez à une variété de cours proposés sur notre plateforme.</Typography>
            <Buttons className="w-full" buttonType="link" baseUrl="/new-user" Icon={MoveRight}>Continuer</Buttons>
          </Container>
          <Container className="">
            <Typography variant="title-lg" component="h2" className="text-white">Compte formateur</Typography>
            <Typography variant="body-base" component="p" className="text-white">Inscrivez vous, creez des cours sur des sujets que vous maîtrisez et gagnez des sous en les publiants sur notre plateforme.</Typography>
            <Buttons className="w-full" buttonType="link" baseUrl="/new-trainer" Icon={MoveRight}>Continuer</Buttons>
          </Container>
        </Container>
        <Container className="text-center w-[30%] flex flex-col justify-center items-center">
          <Typography variant="body-base" component="span" className="">Vous avez deja un compte ? <Link href={"/signin"} className="text-primary-Default">Se connecter</Link></Typography>
        </Container>
      </Container>
    </Container>
  )
}