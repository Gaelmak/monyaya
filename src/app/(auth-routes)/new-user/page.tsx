"use client";

import { getProviders } from "next-auth/react";
import { Container } from "@/ui/components/container/container";
import { Aside } from "./aside";
import { RegisterForm } from "./register-form";
import { BackButton } from "@/ui/components/back-button/back-button";
import { Typography } from "@/ui/components/typography/typography";
import { ProvidersList } from "../signin/providers-list";
import { useEffect, useState } from "react";

export default function NewUser() {
  const [providerslist, setProvidersList] = useState<any>([]);

  useEffect(() => {
    const getProvidersList = async () => {
      const providers = await getProviders();
      setProvidersList(Object.values(providers));
    };
    getProvidersList();
  }, []);

  return (
    <Container className="bg-white md:h-[100dvh] flex flex-col md:flex-row relative">
      <Container className="absolute top-8 left-8 z-10">
        <BackButton
          icon="home"
          backTo="/"
          className="bg-primary-600 hover:bg-primary-700"
        />
      </Container>
      <Container className="py-32 px-8 md:py-0 md:basis-3/5 flex flex-col justify-center items-center md:px-16">
        <Container className="md:w-[40vw] flex flex-col gap-8">
          <Container className="flex flex-col gap-2 ">
            <Typography
              className="text-2xl font-semibold text-secondary-950"
              component="h2"
            >
              Inscription
            </Typography>
            <Typography variant="body-base" component="p">
              Inscrivez vous et accédez à une variété de cours proposés sur
              notre plateforme.
            </Typography>
          </Container>
          <Container className="w-full">
            <ProvidersList providers={providerslist} />
          </Container>
          <Container className="w-full">
            <RegisterForm />
          </Container>
        </Container>
      </Container>
      <Container className="h-80 md:h-full md:basis-2/5">
        <Aside />
      </Container>
    </Container>
  );
}
