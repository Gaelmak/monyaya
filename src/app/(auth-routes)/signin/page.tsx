"use client";

import { getProviders } from "next-auth/react";
import { ProvidersList } from "./providers-list";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { Aside } from "./aside";
import { SigninForm } from "./signin-form";
import { BackButton } from "@/ui/components/back-button/back-button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ResetPasswordForm } from "./reset-form";

export default function SignIn() {
  const [providerslist, setProvidersList] = useState<any>([]);
  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  useEffect(() => {
    const getProvidersList = async () => {
      const providers = await getProviders();
      setProvidersList(Object.values(providers));
    };
    getProvidersList();
  }, []);

  return (
    <Container className="bg-white relative md:h-[100dvh] flex flex-col-reverse md:flex-row">
      <Container className="absolute top-8 left-8 z-10">
        <BackButton
          icon="home"
          backTo="/"
          className="bg-primary-600 hover:bg-primary-700"
        />
      </Container>
      <Container className="h-80 md:h-full md:basis-2/5">
        <Aside />
      </Container>
      <Container className="py-32 px-8 md:py-0 md:basis-3/5 flex flex-col justify-center items-center md:px-16">
        <Container className="md:w-[30vw] flex flex-col gap-8">
          <Container className="flex flex-col gap-2 ">
            <Typography
              variant="title-lg"
              component="h2"
              className="text-2xl font-semibold"
            >
              Heureux de vous revoir !
            </Typography>
            <Typography variant="body-base" component="p">
              {action === "reset-password"
                ? "Veuillez saisir votre adresse email pour réinitialiser votre mot de passe."
                : "Veuillez selectionner un mode de connexion"}
            </Typography>
          </Container>
          {providerslist.length > 0 && (
            <>
              <Container className="w-full">
                <ProvidersList providers={providerslist} />
              </Container>
              <Container className="w-full flex items-center after:basis-1/2 after:content-[''] after:p-[0.5px] after:m-2 after:bg-secondary-100 before:basis-1/2 before:content-[''] before:p-[0.5px] before:m-2 before:bg-secondary-100">
                <Typography
                  variant="body-sm"
                  component="p"
                  className="text-secondary-300"
                >
                  Ou
                </Typography>
              </Container>
            </>
          )}
          <Container className="w-full px-2">
            {action === "reset-password" ? (
              <ResetPasswordForm />
            ) : (
              <SigninForm />
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
