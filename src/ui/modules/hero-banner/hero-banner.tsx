'use client';
import { Container } from '@/ui/components/container/container';
import { Typography } from '@/ui/components/typography/typography';
import Typewriter from 'typewriter-effect';
import Cover from '../../../../public/hero.png';
import Cover_v from '../../../../public/hero_v.png';
import { BgImg } from '@/ui/components/bg-img/bg-img';
import { Carousel } from '@/components/ui/carousel';
import { Sponsors } from '@/lib/sponsors-liste/sponsors-listes';
import { Buttons } from '@/ui/components/buttons/buttons';
import { Play } from 'lucide-react';
import { ActiveLink } from '@/routes/active-link';

const BackgroundImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BgImg className="h-[94vh] hidden lg:flex" src={Cover} alt="cover">
        {children}
      </BgImg>
      <BgImg className="h-[94vh] lg:hidden md:hidden" src={Cover_v} alt="cover">
        {children}
      </BgImg>
      <BgImg
        className="h-screen lg:hidden hidden md:flex"
        src={Cover_v}
        alt="cover"
      >
        {children}
      </BgImg>
    </>
  );
};
export const HeroBanner = () => {
  return (
    <Container>
      <BackgroundImage>
        <Container className="flex flex-col lg:flex-row px-6 lg:px-[7vw] py-8 lg:py-0  h-full gap-6  overflow-hidden">
          <Container className="basis-1/3 lg:basis-3/6 flex flex-col justify-center items-center lg:items-start gap-3 lg:gap-6 ">
            <Typography
              component="h1"
              className="text-center lg:text-left lg:text-6xl text-4xl font-semibold"
            >
              Apprenez ce que <br /> vous voulez,
              <br />
              où vous voulez
            </Typography>
            <Container className="flex flex-col items-center lg:items-start">
              <Typography component="p" className="text-secondary-700 text-xl">
                Que vous soyez intéressé par
              </Typography>
              <span className="text-[1rem] lg:text-[1.25rem] font-bold text-primary-Default">
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
              <Typography
                component="p"
                className="text-center lg:text-left text-secondary-700 text-xl"
              >
                nous avons le formateur parfait pour vous.
                <br />
                <span className="hidden lg:block">
                  Découvrez notre sélection de formateurs <br /> dès aujourd'hui
                  !
                </span>
              </Typography>
            </Container>
            <Container className="lg:flex gap-14 hidden justify-center items-center">
              <Buttons buttonType="link" baseUrl="/new-user">
                S'Inscrire Maintenant
              </Buttons>
              <Container className="flex items-center justify-center">
                <Buttons
                  Icon={Play}
                  className="border-dashed border-2 border-primary-50 p-2 rounded-3xl"
                />
                <ActiveLink
                  href="/"
                  className="hover:underline-offset-4 hover:underline bg-transparent hover:bg-transparent"
                >
                  Qui sommes nous?
                </ActiveLink>
              </Container>
            </Container>
          </Container>
        </Container>
      </BackgroundImage>
      <Container className="bg-primary-400  h-20">
        <Carousel className="flex items-center justify-center h-full overflow-x-hidden ">
          {Sponsors.map((sponsor, index) => (
            <Typography
              key={index}
              component="p"
              className="text-white mx-4 text-xl font-bold lg:mx-[7vw]"
            >
              {sponsor.name}
            </Typography>
          ))}
        </Carousel>
      </Container>
    </Container>
  );
};
