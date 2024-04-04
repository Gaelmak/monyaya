'use client'

import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { LoginFormFieldsType } from "@/types/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { InputField } from "@/ui/components/input-field/input-field"
import { Container } from "@/ui/components/container/container"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Eye, EyeOff, Lock, LogIn, User, UserPlus } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import UseLoading from "@/hooks/use-loading"
import { useToast } from "@/components/ui/use-toast"
import { Typography } from "@/ui/components/typography/typography"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export const SigninForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, startLoading, stopLoading] = UseLoading();
  const form = useForm<z.infer<typeof LoginFormFieldsType>>({
    resolver: zodResolver(LoginFormFieldsType),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof LoginFormFieldsType>) {
    startLoading();
    const { name, password } = values
    const loginRespose = await signIn("credentials", {
      name: name,
      password: password,
      redirect: false,
    });

    if(loginRespose?.status === 200) {
      toast({
        variant: "success",
        title: "Connexion réussie",
        description: "Content de vous revoir !",
      })
      stopLoading()
      router.push('/dashboard')
    } else {
      toast({
        variant: "destructive",
        title: "Une erreur est survenue",
        description: <Typography component="p" variant="body-sm">Votre nom d'utilisateur ou votre mot de passe a été saisi incorrectement. Veuillez réessayer.</Typography>,
      })
      stopLoading()
    }

    stopLoading();
  }


  const ShowPasswordButton = (visibility: boolean) => {
    if(visibility) {
      return <EyeOff className="w-5 h-5 absolute right-4 cursor-pointer text-secondary-300"  onClick={() => {setShowPassword(!showPassword)}}/>
    } else {
      return  <Eye className="w-5 h-5 absolute right-4 cursor-pointer text-secondary-300"  onClick={() => {setShowPassword(!showPassword)}}/>
    }
  }

  const PasswordIcon = () => {
    return <Lock className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300"/>
  }

  const UserIcon = () => {
    return <User className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300"/>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Container className="flex flex-col gap-2">
          <Container>
            <InputField
              placeholder="Nom d'utilisateur"
              control={form.control}
              name="name"
            >
              {UserIcon()}
            </InputField>
          </Container>
          <Container className="w-full relative">
            <InputField
              placeholder="Mot de passe"
              control={form.control}
              name="password"
              type={showPassword ? "text" : "password"}
              description={<Link href="/" className="text-secondary-Default">Mot de passe oublié ?</Link>}
            >
              {PasswordIcon()}
              {ShowPasswordButton(showPassword)}
            </InputField>
          </Container>
        </Container>
        <Container className="flex flex-col justify-between items-center gap-2">
          <Buttons type="submit" Icon={LogIn} isLoading={isLoading} className="w-full">Se connecter</Buttons>
          <Typography variant="body-sm" className="pt-8">
            Vous n'avez pas de compte ? Enregistrez vous.
          </Typography>
          <Buttons buttonType="link" baseUrl="/new-user" Icon={UserPlus} variant="ghost" outline="outline" className="text-secondary-Default w-full">S'enregistrer</Buttons>
        </Container>
      </form>
    </Form>
  )
}