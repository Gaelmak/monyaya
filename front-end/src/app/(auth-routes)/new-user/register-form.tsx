'use client'
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { RegisterFormFieldsType } from "@/types/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { InputField } from "@/ui/components/input-field/input-field"
import { Container } from "@/ui/components/container/container"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Eye, EyeOff, Lock, LogIn, Mail, Phone, User } from "lucide-react"
import { useState } from "react"
import { saltPassword } from "@/lib/password-to-salt"
import UseLoading from "@/hooks/use-loading"
import { useToast } from "@/components/ui/use-toast"
import { Typography } from "@/ui/components/typography/typography"
import { useRouter } from "next/navigation"
import clsx from "clsx"

export const RegisterForm = () => { 
  const router = useRouter()
  const { toast } = useToast()
  const [ isLoading , startLoading, stopLoading ] = UseLoading()
  const form = useForm<z.infer<typeof RegisterFormFieldsType>>({
    resolver: zodResolver(RegisterFormFieldsType),
    defaultValues: {
      firstname: '',
      lastname: '',
      phonenumber: '',
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    }
  })

  const [showPassword, setShowPassword] = useState(false)

  async function onSubmit(values: z.infer<typeof RegisterFormFieldsType>) {
    startLoading();
    
    const { firstname, lastname, phonenumber, name, email, password, confirmpassword } = values
    if(password !== confirmpassword) {
      toast({
        title: "Mot de passe ne correspondent pas",
        description: <Typography component="p" variant="body-sm">Veuillez vous assurer de bien avoir confirmé votre mot de passe</Typography>,
      })
      stopLoading()
    } else {
      const saltedPassword = saltPassword(password)
      const hash = saltedPassword.hash
      const salt = saltedPassword.salt
      const registration  = await fetch(`/api/user`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname, 
          phonenumber, 
          name, 
          email, 
          hash,
          salt
        }),
      });
  
      if(registration.status === 200) {
        toast({
          variant: "success",
          title: "Bienvenue !",
          description: <Typography component="p" variant="body-sm">Vos informations ont correctement été enregistré</Typography>,
        })
        stopLoading()
        router.push("/signin")
      } else {
        toast({
          variant: "destructive",
          title: "Utilisateur déjà existant",
          description: <Typography component="p" variant="body-sm">Veuillez utiliser une autre adresse email</Typography>,
        })
        stopLoading()
      }
    }

    stopLoading()
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

  const MailIcon = () => {
    return <Mail className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300"/>
  }

  const PhoneIcon = () => {
    return <Phone className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300"/>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Container 
          className={clsx(
            "flex flex-col gap-2 pt-8"
          )}
        >
            <Container>
              <InputField
                placeholder="Prénom"
                control={form.control}
                name="firstname"
              >
                {UserIcon()}
              </InputField>
            </Container>
            <Container>
              <InputField
                placeholder="Nom"
                control={form.control}
                name="lastname"
              >
                {UserIcon()}
              </InputField>
            </Container>
            <Container>
              <InputField
                placeholder="Nom d'utilisateur"
                control={form.control}
                name="name"
                description={
                  <>
                    <span className="text-body-sm flex flex-row gap-1">
                      <span>*</span>
                      <span>
                        Votre nom d'utilisateur est le nom que vous utiliserez pour vous connecter à notre site
                      </span>
                    </span>
                    <span className="text-body-sm flex flex-row gap-1">
                      <span>*</span>
                      <span>
                      Il doit avoir au moins 2 caractères et peut contenir des lettres, des chiffres et des symboles.
                      </span>
                    </span>
                  </>
                }
              >
                {UserIcon()}
              </InputField>
            </Container>
            <Container>
              <InputField
                placeholder="Adresse mail"
                control={form.control}
                name="email"
                type="email"
              >
                {MailIcon()}
              </InputField>
            </Container>
            <Container>
              <InputField
                placeholder="Numéro de téléphone"
                control={form.control}
                name="phonenumber"
              >
                {PhoneIcon()}
              </InputField>
            </Container>
            <Container>
              <InputField
                placeholder="Mot de passe"
                control={form.control}
                name="password"
                type={showPassword ? "text" : "password"}
              >
                {PasswordIcon()}
                {ShowPasswordButton(showPassword)}
              </InputField>
            </Container>
            <Container>
              <InputField
                placeholder="Confirmer le mot de passe"
                control={form.control}
                name="confirmpassword"
                type={showPassword ? "text" : "password"}
              >
                {PasswordIcon()}
              </InputField>
            </Container>
          </Container>
        <Container className="flex flex-row justify-between items-center">
          <Buttons type='submit' isLoading={isLoading} Icon={LogIn}>Enrégistrer et se connecter</Buttons>
        </Container>
      </form>
    </Form>
  )
}

