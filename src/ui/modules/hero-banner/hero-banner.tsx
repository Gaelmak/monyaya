'use client'
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import Typewriter from 'typewriter-effect'
import Cover from '../../../../public/hero.png'
import Cover_v from '../../../../public/hero_v.png'
import { BgImg } from "@/ui/components/bg-img/bg-img"
import { Carousel } from "@/components/ui/carousel"
import { Sponsors } from "@/lib/sponsors-liste/sponsors-listes"

const BackgroundImage = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <BgImg className="h-[90vh] hidden lg:flex" src={Cover} alt="cover">
        {children}
      </BgImg>
      <BgImg className="h-[92vh] lg:hidden" src={Cover_v} alt="cover">
        {children}
      </BgImg>
    </>
  )
}
export const HeroBanner = () => {

  return(
    <Container>
    <BackgroundImage>
      <Container className="flex flex-col md:flex-row px-6 py-8 md:py-0 md:px-8 h-full gap-6  overflow-hidden">
        <Container className="basis-1/3 md:basis-3/6 flex flex-col justify-center items-center md:items-start gap-4 md:gap-8">
          <Typography component="h1" variant="large-medium" className="text-center md:text-left">
            Apprenez ce que <br/> vous voulez,<br/>où vous voulez
          </Typography>
          <Container className="flex flex-col items-center md:items-start">
            <Typography component="p" variant="body-lg" className="text-secondary-700">
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
            <Typography component="p" variant="body-lg" className="text-center md:text-left text-secondary-700">
              nous avons le formateur parfait pour vous.<br/>
              <span className="hidden md:block">
              Découvrez notre sélection de formateurs <br/> dès aujourd'hui !
              </span>
            </Typography>
          </Container>
        </Container>
      </Container>
    </BackgroundImage>
    <Container className="bg-primary-300  h-20">
    <Carousel className="flex items-center justify-center h-full overflow-x-hidden ">
          {Sponsors.map((sponsor, index) => (
            <Typography key={index} component="p" variant="body-lg" className="text-white mx-4">
              {sponsor.name}
            </Typography>
          ))}
    </Carousel>
    </Container>
  </Container>

  )
}