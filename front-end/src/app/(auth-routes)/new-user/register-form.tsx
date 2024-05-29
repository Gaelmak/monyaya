'use client'
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { RegisterFormFieldsType } from "@/types/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { InputField } from "@/ui/components/input-field/input-field"
import { Container } from "@/ui/components/container/container"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Check, Eye, EyeOff, Lock, LogIn, Mail, Pen, Phone, User, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { saltPassword } from "@/lib/password-to-salt"
import UseLoading from "@/hooks/use-loading"
import { useToast } from "@/components/ui/use-toast"
import { Typography } from "@/ui/components/typography/typography"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export const RegisterForm = () => { 
  const router = useRouter()
  const { toast } = useToast()
  const [ isLoading , startLoading, stopLoading ] = UseLoading()
  const [isFormFilled, setIsFormFilled] = useState(false)
  const [isFormAddFilled, setIsFormAddFilled] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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

  useEffect(() => {
    const { firstname, lastname, email, password, confirmpassword} = form.getValues();
    const isFilled = firstname.trim() !== '' && lastname.trim() !== '' && email.trim() !== '' && password.trim() !== '' && confirmpassword.trim() !== '';
    setIsFormFilled(isFilled)
  }, [form.getValues()])

  useEffect(() => {
    const { name, phonenumber} = form.getValues();
    const isFilled = name.trim() !== '' && phonenumber.trim() !== '';
    setIsFormAddFilled(isFilled)
  }, [form.getValues()])

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
    <Dialog>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={clsx("flex flex-col gap-8 ")}>
        <Container 
          className={clsx(
            "flex flex-col gap-2"
          )}
        > 
          <Container
            className={clsx(
              "w-full flex flex-col lg:flex-row gap-2 lg:gap-4"
            )}
          >
            <Container className="lg:basis-1/2">
              <InputField
                placeholder="John"
                control={form.control}
                name="firstname"
                label='Prénom'
              >
                {UserIcon()}
              </InputField>
            </Container>
            <Container className="lg:basis-1/2">
              <InputField
                placeholder="Doe"
                control={form.control}
                name="lastname"
                label='Nom'
              >
                {UserIcon()}
              </InputField>
            </Container>
          </Container>
            <Container>
              <InputField
                placeholder="JohnDoe12@jd.com"
                control={form.control}
                name="email"
                type="email"
                label='Adresse email'
              >
                {MailIcon()}
              </InputField>
            </Container>
            <Container
              className={clsx(
                "w-full flex flex-col lg:flex-row gap-2 lg:gap-4"
              )}
            >
              <Container className="lg:basis-1/2">
                <InputField
                  placeholder="••••••••"
                  control={form.control}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label='Mot de passe'
                  className="pr-12"
                >
                  {PasswordIcon()}
                  {ShowPasswordButton(showPassword)}
                </InputField>
              </Container>
              <Container className="lg:basis-1/2">
                <InputField
                  placeholder="••••••••"
                  control={form.control}
                  name="confirmpassword"
                  type={showPassword ? "text" : "password"}
                  label='Confirmer le mot de passe'
                >
                  {PasswordIcon()}
                </InputField>
              </Container>
            </Container>
          </Container>
        <Container className="flex flex-col justify-between items-center gap-2">
            <DialogTrigger asChild>
              <Button disabled={!isFormFilled} className="w-full bg-primary-Default hover:bg-primary-600 rounded"> 
                {isFormAddFilled ? <><Pen className="mr-2 h-5 w-5"/>Modifier</>  : <><Check className="mr-2 h-5 w-5"/>Valider</>}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[86vw] lg:w-[40vw] bg-white rounded">
              <DialogDescription className="flex flex-col gap-8">
                <Container className="flex flex-col gap-2 ">
                  <Typography variant="title-lg" component="h2">Informations complémentaires</Typography>
                  <Typography variant="body-base" component="p">Inscrivez vous et accédez à une variété de cours proposés sur notre plateforme.</Typography>
                </Container>
                <Container className="flex flex-col gap-2">
                  <Container className="">
                    <InputField
                      placeholder="@JohnD12"
                      control={form.control}
                      name="name"
                      label="Nom d'utilisateur"
                      description={
                        <>
                          <span className="text-body-sm flex flex-row gap-1">
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
                  <Container className="">
                    <InputField
                      placeholder="0*********"
                      control={form.control}
                      name="phonenumber"
                      label='Numéro de téléphone'
                      description={
                        <>
                          <span className="text-body-sm flex flex-row gap-1">
                            <span>
                              Le numéro doit comporter 10 chiffres et commencer par le chiffre 0
                            </span>
                          </span>
                        </>
                      }
                    >
                      {PhoneIcon()}
                    </InputField>
                  </Container>
                </Container>
              </DialogDescription>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="w-full bg-primary-Default hover:bg-primary-600 rounded"> 
                    <Check className="mr-2 h-5 w-5"/>Enrégistrer
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          <Buttons type='submit' isLoading={isLoading} Icon={UserPlus} className={clsx("w-full animate", isFormAddFilled ? 'flex' : 'hidden')}>S'enrégistrer</Buttons>
          <Typography variant="body-sm" className="pt-8">
            Vous avez déjà un compte ? Connectez vous.
          </Typography>
          <Buttons buttonType="link" baseUrl="/signin" Icon={LogIn} variant="ghost" outline="outline" className="text-secondary-Default w-full">Se connecter</Buttons>
        </Container>
      </form>
    </Form>
    </Dialog>
  )
}

