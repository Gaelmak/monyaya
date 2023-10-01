'use client'
import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import Image from "next/image"
import Typewriter from 'typewriter-effect'
import Cover from '../../../../public/cover.jpg'

export const HeroBanner = () => {

  return(
    <Container className="flex flex-col md:flex-row px-4 md:px-16 h-[90vh] gap-4">
      <Container className="basis-1/4 flex flex-col justify-center gap-4 md:gap-8">
        <Typography component="h1" variant="title-lg">
          Apprenez<br/>ce que vous voulez,<br/>où vous voulez
        </Typography>
        <Container>
          <Typography component="p" variant="body-base">
            Que vous soyez intéressé par
          </Typography>
          <span className="font-bold text-primary-Default">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}

              onInit={(typewriter) => {
                typewriter
                  .typeString('le développement personnel')
                  .pauseFor(1000)
                  .deleteChars(25)
                  .typeString('a carrière')
                  .pauseFor(1000)
                  .deleteChars(8)
                  .typeString('technologie')
                  .pauseFor(1000)
                  .deleteChars(14)
                  .typeString('ou tout autre domaine')
                  .pauseFor(1000)
                  .deleteAll()
                  .start();
              }}
            />
          </span>
          <Typography component="p" variant="body-base">
            nous avons le formateur parfait pour vous.<br/>
            Découvrez notre sélection de formateurs dès aujourd'hui !
          </Typography>
        </Container>
        <Container>
          <Buttons>Commencer</Buttons>
        </Container>
      </Container>
      <Container className="basis-3/4 flex">
        <Image src={Cover} alt='cover' priority/>
      </Container>
    </Container>
  )
}