'use client'
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import Typewriter from 'typewriter-effect'
import Cover from '../../../../public/hero.png'
import Cover_v from '../../../../public/hero_v.png'
import { BgImg } from "@/ui/components/bg-img/bg-img"
import { Carousel } from "@/components/ui/carousel"
import { Sponsors } from "@/lib/sponsors-liste/sponsors-listes"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Play } from "lucide-react"
import { ActiveLink } from "@/routes/active-link"

const BackgroundImage = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <BgImg className="h-[94vh] hidden lg:flex" src={Cover} alt="cover">
        {children}
      </BgImg>
      <BgImg className="h-[94vh] lg:hidden md:hidden" src={Cover_v} alt="cover">
        {children}
      </BgImg>
      <BgImg className="h-screen lg:hidden hidden md:flex" src={Cover_v} alt="cover">
        {children}
      </BgImg>
    </>
  )
}
export const HeroBanner = () => {

  return(
    <Container>
    <BackgroundImage >
      <Container className="flex flex-col lg:flex-row px-6 py-8 lg:py-0 lg:px-8 h-full gap-6  overflow-hidden">
        <Container className="basis-1/3 lg:basis-3/6 flex flex-col justify-center items-center lg:items-start gap-4 lg:gap-8 ">
          <Typography component="h1" variant="large-medium" className="text-center lg:text-left">
            Apprenez ce que <br/> vous voulez,<br/>où vous voulez
          </Typography>
          <Container className="flex flex-col items-center lg:items-start">
            <Typography component="p" variant="body-lg" className="text-secondary-700">
              Que vous soyez intéressé par
            </Typography>
            <span className="text-[1rem] lg:text-[1.5rem] font-bold text-primary-Default">
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
            <Typography component="p" variant="body-lg" className="text-center lg:text-left text-secondary-700">
              nous avons le formateur parfait pour vous.<br/>
              <span className="hidden lg:block">
              Découvrez notre sélection de formateurs <br/> dès aujourd'hui !
              </span>
            </Typography>
          </Container>
          <Container className="lg:flex gap-14 hidden">
            <Buttons>S'Inscrire Maintenant</Buttons>
            <Container className="flex items-center justify-center">
              <Buttons Icon={Play} className="border-dashed border-2 border-primary-50 p-2 rounded-3xl"/>
              <ActiveLink href="/" className="hover:underline-offset-4 hover:underline">Qui sommes nous?</ActiveLink>
            </Container>
          </Container>
        </Container>
      </Container>
    </BackgroundImage>
    <Container className="bg-primary-400  h-20">
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