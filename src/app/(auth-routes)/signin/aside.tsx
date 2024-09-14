"use client";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";

export const Aside = () => {
  return (
    <Container className="w-full h-full">
      <Container className="text-center flex flex-col gap-8 px-4 md:px-8 bg-primary-600 h-full justify-center items-center">
        <Typography
          variant="title-base"
          component="h2"
          className="text-white text-2xl md:text-4xl xl:text-5xl font-bold leading-10 md:leading-[40px] xl:leading-[60px]"
        >
          Découvrez les formations qui vous correspondent auprès de formateurs
          passionnés !
        </Typography>
      </Container>
    </Container>
  );
};
