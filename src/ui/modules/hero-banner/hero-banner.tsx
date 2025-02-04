"use client";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Typewriter from "typewriter-effect";
import { BgImg } from "@/ui/components/bg-img/bg-img";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Sponsors } from "@/lib/sponsors-liste/sponsors-listes";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Play } from "lucide-react";
import { ActiveLink } from "@/routes/active-link";

const BackgroundImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BgImg
        className="h-[92vh] hidden lg:flex bg-cover"
        src="/img/monyaya-hero.webp"
        alt="cover"
      >
        {children}
      </BgImg>
      <BgImg
        className="h-[94vh] lg:hidden md:hidden"
        src="/img/monyaya-hero-mobile.webp"
        alt="cover"
      >
        {children}
      </BgImg>
      <BgImg
        className="h-screen lg:hidden hidden md:flex"
        src="/img/monyaya-hero.webp"
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
                      .typeString("le développement personnel")
                      .pauseFor(500)
                      .deleteChars(25)
                      .typeString("a carrière")
                      .pauseFor(500)
                      .deleteChars(8)
                      .typeString("technologie")
                      .pauseFor(500)
                      .deleteChars(14)
                      .typeString("ou tout autre domaine")
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
                  Découvrez notre sélection de formateurs <br /> dès
                  aujourd&apos;hui !
                </span>
              </Typography>
            </Container>
            <Container className="lg:flex gap-14 hidden justify-center items-center">
              <Buttons buttonType="link" baseUrl="/new-user">
                S&apos;Inscrire Maintenant
              </Buttons>
              <Container className="flex items-center justify-center">
                <ActiveLink
                  href="/about"
                  className="hover:underline-offset-4 hover:underline bg-transparent hover:bg-transparent flex justify-center items-center gap-2"
                >
                  <Buttons
                    Icon={Play}
                    className="border-dashed border-2 border-primary-50 p-2 rounded-3xl"
                  />
                  <p> Qui sommes nous ?</p>
                </ActiveLink>
              </Container>
            </Container>
          </Container>
        </Container>
      </BackgroundImage>
      <Container>
        <Carousel opts={{ loop: true }} className="bg-primary-400 ">
          <CarouselContent className="h-20">
            <CarouselItem className="flex items-center justify-center h-full  ">
              {Sponsors.map((sponsor, index) => (
                <Typography
                  key={index}
                  component="p"
                  className="text-white mx-4 text-xl font-bold lg:mx-[4vw] text-center"
                >
                  {sponsor.name}
                </Typography>
              ))}
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </Container>
    </Container>
  );
};
