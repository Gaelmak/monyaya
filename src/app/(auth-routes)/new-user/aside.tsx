"use client";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";

export const Aside = () => {
  return (
    <Container className="w-full h-full bg-primary-600">
      <Container className="text-center flex flex-col gap-8 px-4 h-full justify-center items-center bg-opacity-50">
        <Typography
          variant="title-base"
          component="h2"
          className="text-white text-2xl md:text-5xl xl:text-6xl font-bold leading-10 md:leading-[60px]"
        >
          Créez votre compte pour accéder à des formations adaptées à vos
          besoins et à votre rythme !
        </Typography>
      </Container>
    </Container>
  );
};
