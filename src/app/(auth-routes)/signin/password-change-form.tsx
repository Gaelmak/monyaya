"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PasswordChangeFormFieldsType } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InputField } from "@/ui/components/input-field/input-field";
import { Container } from "@/ui/components/container/container";
import { Buttons } from "@/ui/components/buttons/buttons";
import { Eye, EyeOff, Lock, UserPlus } from "lucide-react";
import { useState } from "react";
import { saltPassword } from "@/lib/password-to-salt";
import UseLoading from "@/hooks/use-loading";
import { useToast } from "@/components/ui/use-toast";
import { Typography } from "@/ui/components/typography/typography";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { updatePassword } from "./signin.action";

export const PasswordChangeForm = (props: { token: string; email: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof PasswordChangeFormFieldsType>>({
    resolver: zodResolver(PasswordChangeFormFieldsType),
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof PasswordChangeFormFieldsType>
  ) {
    startLoading();

    const { password, confirmpassword } = values;
    if (password !== confirmpassword) {
      toast({
        title: "Mot de passe ne correspondent pas",
        description: (
          <Typography component="p" variant="body-sm">
            Veuillez vous assurer de bien avoir confirmé votre mot de passe
          </Typography>
        ),
      });
      stopLoading();
    } else {
      const saltedPassword = saltPassword(password);
      const hash = saltedPassword.hash;
      const salt = saltedPassword.salt;
      const res = await updatePassword(props.email, hash, salt);

      if (res) {
        toast({
          variant: "success",
          title: "Mot de passe modifié",
          description: "Votre mot de passe a été modifié avec succès.",
        });
        stopLoading();
        router.push("/signin");
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            "Une erreur est survenue lors de la modification du mot de passe. Veuillez réessayer.",
        });
        stopLoading();
      }
    }
    stopLoading();
  }

  const ShowPasswordButton = (visibility: boolean) => {
    if (visibility) {
      return (
        <EyeOff
          className="w-5 h-5 absolute right-4 cursor-pointer text-secondary-300"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      );
    } else {
      return (
        <Eye
          className="w-5 h-5 absolute right-4 cursor-pointer text-secondary-300"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      );
    }
  };

  const PasswordIcon = () => {
    return (
      <Lock className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300" />
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx("flex flex-col gap-8 ")}
      >
        <Container className={clsx("flex flex-col gap-2")}>
          <Container className={clsx("w-full flex flex-col gap-2 lg:gap-4")}>
            <Container className="lg:basis-1/2">
              <InputField
                placeholder="•••••••••••••••"
                control={form.control}
                name="password"
                type={showPassword ? "text" : "password"}
                label="Nouveau mot de passe"
                className="pr-12"
              >
                {PasswordIcon()}
                {ShowPasswordButton(showPassword)}
              </InputField>
            </Container>
            <Container className="lg:basis-1/2">
              <InputField
                placeholder="•••••••••••••••"
                control={form.control}
                name="confirmpassword"
                type={showPassword ? "text" : "password"}
                label="Confirmer le mot de passe"
              >
                {PasswordIcon()}
              </InputField>
            </Container>
          </Container>
        </Container>
        <Container className="flex flex-col justify-between items-center gap-2">
          <Buttons
            type="submit"
            Icon={UserPlus}
            isLoading={isLoading}
            className="w-full"
          >
            Enregister
          </Buttons>
        </Container>
      </form>
    </Form>
  );
};
