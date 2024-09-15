"use client";
import { Buttons } from "@/ui/components/buttons/buttons";
import { signIn } from "next-auth/react";
import Google_Icon from "../../../../public/icons/google.png";
import { Container } from "@/ui/components/container/container";
import UseLoading from "@/hooks/use-loading";

interface Props {
  providers: {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
    callbackUrl: string;
  }[];
}

export const ProvidersList = ({ providers }: Props) => {
  const [isLoading, startLoading, stopLoading] = UseLoading();

  const filteredProviders = providers!.filter(
    (provider) => provider.name !== "Credentials"
  );

  const signInWithProvider = async (provider: string) => {
    startLoading();
    await signIn(provider, { callbackUrl: "/dashboard" });
    stopLoading();
  };

  return (
    <Container className="flex flex-col gap-4">
      {filteredProviders!.map((provider) => (
        <Container key={provider.name}>
          <Buttons
            className="w-full"
            variant="secondary"
            CustomIcon={provider.name === "Google" ? Google_Icon : Google_Icon}
            buttonType="action"
            isLoading={isLoading}
            action={() => signInWithProvider(provider.id)}
          >
            Se connecter avec {provider.name}
          </Buttons>
        </Container>
      ))}
    </Container>
  );
};
