'use client'
import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import Image from "next/image"
import Typewriter from 'typewriter-effect'
import Cover from '../../../../public/cover.jpg'
import { BgImg } from "@/ui/components/bg-img/bg-img"

export const HeroBanner = () => {

  return(
    <Container className="flex flex-col md:flex-row px-4 md:px-8 h-[90vh]">
      <Container className="basis-3/4 md:basis-3/5 flex flex-col justify-center gap-4 md:gap-8">
        <Typography component="h1" variant="display">
          Apprenez<br/>ce que vous voulez,<br/>où vous voulez
        </Typography>
        <Container>
          <Typography component="p" variant="body-lg">
            Que vous soyez intéressé par
          </Typography>
          <span className="text-[1.5rem] font-bold text-primary-Default">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
              }}

              onInit={(typewriter) => {
                typewriter
                  .typeString('le développement personnel')
                  .pauseFor(500)
                  .deleteChars(25)
                  .typeString('a carrière')
                  .pauseFor(500)
                  .deleteChars(8)
                  .typeString('technologie')
                  .pauseFor(500)
                  .deleteChars(14)
                  .typeString('ou tout autre domaine')
                  .pauseFor(500)
                  .deleteAll()
                  .start();
              }}
            />
          </span>
          <Typography component="p" variant="body-lg">
            nous avons le formateur parfait pour vous.<br/>
            Découvrez notre sélection de formateurs dès aujourd'hui !
          </Typography>
        </Container>
        <Container>
          <Buttons width="lg">Commencer</Buttons>
        </Container>
      </Container>
      <Container className="basis-1/4 md:basis-2/5 flex md:justify-end md:items-center md:my-8">
        <BgImg src={Cover} alt={"cover"} className="w-full h-full md:rounded-full md:overflow-hidden" classNameImg="w-full h-full"/>
      </Container>
    </Container>
  )
}