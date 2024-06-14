'use client'
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { EditUsersFormFieldsType } from "@/types/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { InputField } from "@/ui/components/input-field/input-field"
import { Container } from "@/ui/components/container/container"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Mail, Pen, Phone, User } from "lucide-react"
import { useState, useEffect } from "react"
import UseLoading from "@/hooks/use-loading"
import { useToast } from "@/components/ui/use-toast"
import { Typography } from "@/ui/components/typography/typography"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Props {
  data : {
    firstname: string
    lastname: string
    email: string
    phonenumber: string
  }
  name: string
}

export const EditUsersData = ({name, data}: Props) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading , startLoading, stopLoading] = UseLoading()
  const [update, setUpdate] = useState(true)

  const form = useForm<z.infer<typeof EditUsersFormFieldsType>>({
    resolver: zodResolver(EditUsersFormFieldsType),
    defaultValues: {
      firstname: data.firstname,
      lastname: data.lastname,
      phonenumber: data.phonenumber,
      email: data.email,
    }
  })

  useEffect(() => {
    const {firstname, lastname, email, phonenumber} = form.getValues();
    const updated = 
      firstname.trim() == data.firstname && 
      lastname.trim() == data.lastname && 
      email.trim() == data.email && 
      phonenumber.trim() == data.phonenumber
    setUpdate(updated)
  }, [form.getValues()])
  
  async function onSubmit(values: z.infer<typeof EditUsersFormFieldsType>) {
    startLoading();
    
    const { firstname, lastname, phonenumber, email} = values
    const registration  = await fetch(`/api/user/userdata/${name}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phonenumber,
      }),
    });

    if(registration.status === 200) {
      toast({
        variant: "success",
        title: "Succes !",
        description: <Typography component="p" variant="body-sm">Vos informations ont correctement été enregistré</Typography>,
      })
      stopLoading()
      router.push("/signin")
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: <Typography component="p" variant="body-sm">Une erreur est survenue, veuillez réessayer plus tard.
        </Typography>,
      })
      stopLoading()
    }
    stopLoading()
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

  return(
    <Dialog>
      <Container>
        <Container className="flex flex-col gap-4">
          <Container className="flex">
            <Typography variant="title-base">
              Informations personnelles
            </Typography>
          </Container>
          <Container className="flex flex-col gap-2">
            <Container>
              <Typography variant="body-sm">Nom</Typography>
              <Typography variant="title-sm">{data.firstname}{" "}{data.lastname}</Typography>
            </Container>
            <Container>
              <Typography variant="body-sm">Adresse mail</Typography>
              <Typography variant="title-sm">{data.email}</Typography>
            </Container>
            <Container>
              <Typography variant="body-sm">Numéro de téléphone</Typography>
              <Typography variant="title-sm">{data.phonenumber ? data.phonenumber : "Numéro de téléphone non defini"}</Typography>
            </Container>
          </Container>
          <Container>
            <DialogTrigger asChild>
              <Button className="w-auto bg-primary-Default hover:bg-primary-600 rounded"> 
                <Pen className="mr-2 h-5 w-5"/>Modifier
              </Button>
            </DialogTrigger>
          </Container>
        </Container>
        <DialogContent className="bg-white rounded">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={clsx("flex flex-col gap-8")}>
              <Container 
                className={clsx(
                  "flex flex-col gap-2 p-4 rounded"
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
                <Container
                  className={clsx(
                    "w-full flex flex-col lg:flex-row gap-2 lg:gap-4"
                  )}
                >
                  <Container className="lg:basis-1/2">
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
                  <Container className="lg:basis-1/2">
                    <InputField
                      placeholder="0*********"
                      control={form.control}
                      name="phonenumber"
                      label='Numéro de téléphone'
                    >
                      {PhoneIcon()}
                    </InputField>
                  </Container>
                </Container>
                <Container className="flex flex-row justify-between items-center">
                  <Buttons disabled={update} type='submit' isLoading={isLoading}>Enregistrer</Buttons>
                </Container>
              </Container>
            </form>
          </Form>
        </DialogContent>
      </Container>
    </Dialog>
  )
}