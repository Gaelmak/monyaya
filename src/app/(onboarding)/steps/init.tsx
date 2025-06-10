"use client";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Cover from "../../../../public/onboard.png";
import Cover_v from "../../../../public/onboard_v.png";
import { BgImg } from "@/ui/components/bg-img/bg-img";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const BackgroundImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BgImg className="h-[100vh] hidden lg:flex" src={Cover} alt="cover">
        {children}
      </BgImg>
      <BgImg className="h-[100vh] lg:hidden" src={Cover_v} alt="cover">
        {children}
      </BgImg>
    </>
  );
};
export const Init = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <BackgroundImage>
      <Container className="h-full w-full md:w-[50vw] flex flex-col p-8 lg:justify-center gap-4">
        <Typography
          variant="title-lg"
          component="h2"
          className="text-white text-4xl font-bold text-center md:text-left"
        >
          Bienvenue <br />
          chez Monyaya !
        </Typography>
        <Typography className="text-white text-center md:text-left">
          Nous sommes ravis de vous accueillir dans notre communauté ! La
          création d&apos;un compte est votre première étape pour débloquer tout
          le potentiel de nos services.
        </Typography>
        <Typography className="text-white text-center md:text-left">
          Que vous soyez ici pour explorer de nouvelles opportunités, proposer
          des formations à domicile, ou acquerir des nouvelles connaissances,
          nous sommes là pour vous accompagner à chaque étape.
        </Typography>
        <Buttons variant="ghost" buttonType="action" action={onComplete}>
          Suivant
        </Buttons>
        <Button
          type="button"
          variant="link"
          className="p-0"
          onClick={async () => signOut({ callbackUrl: "/signin" })}
        >
          Déconnexion
        </Button>
      </Container>
    </BackgroundImage>
  );
};
