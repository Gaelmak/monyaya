"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ResetLoginFormFieldsType } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputField } from "@/ui/components/input-field/input-field";
import { Container } from "@/ui/components/container/container";
import { Buttons } from "@/ui/components/buttons/buttons";
import { UserPlus } from "lucide-react";
import UseLoading from "@/hooks/use-loading";
import { useToast } from "@/components/ui/use-toast";
import { Typography } from "@/ui/components/typography/typography";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { createToken, findToken, isEmailExist } from "./signin.action";
import { getServerUrl } from "@/lib/server-url";

export const ResetPasswordForm = () => {
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof ResetLoginFormFieldsType>>({
    resolver: zodResolver(ResetLoginFormFieldsType),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ResetLoginFormFieldsType>) {
    startLoading();
    const { email } = values;
    const bodyData = {
      email: email,
      title: "Réinitialiser votre mot de passe",
      content:
        "Vous avez reçu cet email car vous avez demandé à réinitialiser votre mot de passe. Pour réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-dessous.",
      buttonText: "Réinitialiser mon mot de passe",
      buttonLink: null,
      footerMessage:
        "Si vous n'avez pas demandé à réinitialiser votre mot de passe, veuillez ignorer ce message.",
    };

    const userFinded = await isEmailExist(email);

    if (!userFinded) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Nous n'avons pas trouvé de compte associé à cette adresse email. Veuillez vérifier votre email et réessayer.",
      });
      stopLoading();
      return;
    }

    const tokenFound = await findToken(email);

    if (tokenFound) {
      bodyData.buttonLink = `${getServerUrl()}/signin/reset-password?token=${
        tokenFound.token
      }&email=${email}`;
    } else {
      const tokenCreated = await createToken(email);
      if (tokenCreated) {
        bodyData.buttonLink = `/signin/reset-password?token=${tokenCreated.token}&email=${email}`;
      } else {
        stopLoading();
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Une erreur est survenue lors de la création du token.",
        });
        return;
      }
    }

    const sendToken = await fetch(`/api/send-email`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    if (sendToken.ok) {
      toast({
        variant: "success",
        title: "Email envoyé",
        description:
          "Un email de recuperation de mot de passe a été envoyé à votre adresse email.",
      });
      stopLoading();
      return;
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'email.",
      });
      stopLoading();
    }

    stopLoading();
  }

  const EmailIcon = () => {
    return (
      <EnvelopeOpenIcon className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Container className="flex flex-col gap-2">
          <Container>
            <InputField
              placeholder="Adresse email"
              control={form.control}
              name="email"
            >
              {EmailIcon()}
            </InputField>
          </Container>
        </Container>
        <Container className="flex flex-col justify-between items-center gap-2">
          <Buttons type="submit" isLoading={isLoading} className="w-full">
            Récupérer le mot de passe
          </Buttons>
          <Typography variant="body-sm" className="pt-8">
            Vous n&apos;avez pas de compte ? Inscrivez vous.
          </Typography>
          <Buttons
            buttonType="link"
            baseUrl="/new-user"
            Icon={UserPlus}
            variant="ghost"
            outline="outline"
            className="text-secondary-Default w-full"
          >
            S&apos;enregistrer
          </Buttons>
        </Container>
      </form>
    </Form>
  );
};
