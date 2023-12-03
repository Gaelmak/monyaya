'use client'
import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import Typewriter from 'typewriter-effect'
import Cover from '../../../../public/cover.jpg'
import { BgImg } from "@/ui/components/bg-img/bg-img"

export const HeroBanner = () => {

  return(
    <Container className="flex flex-col md:flex-row px-4 py-2 md:py-0 md:px-8 h-[92vh] md:h-[90vh] gap-6 md:gap-0 justify-between">
      <Container className="basis-1/3 md:basis-3/5 flex flex-col justify-center items-center md:items-start gap-4 md:gap-8">
        <Typography component="h1" variant="display" className="text-center md:text-left">
          Apprenez<br/>ce que vous voulez,<br/>où vous voulez
        </Typography>
        <Container className="flex flex-col items-center md:items-start">
          <Typography component="p" variant="body-lg">
            Que vous soyez intéressé par
          </Typography>
          <span className="text-[1rem] md:text-[1.5rem] font-bold text-primary-Default">
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
          <Typography component="p" variant="body-lg" className="text-center md:text-left">
            nous avons le formateur parfait pour vous.<br/>
            Découvrez notre sélection de formateurs dès aujourd'hui !
          </Typography>
        </Container>
        <Container>
          <Buttons width="lg">Commencer</Buttons>
        </Container>
      </Container>
      <Container className="basis-1/3 md:basis-2/5 flex justify-center md:justify-end items-center md:my-0">
        <BgImg src={Cover} alt={"cover"} className="w-[18rem] h-[18rem] md:w-[35rem] md:h-[35rem] rounded-full overflow-hidden" classNameImg="w-full h-full"/>
      </Container>
    </Container>
  )
}