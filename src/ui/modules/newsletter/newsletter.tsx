'use client'

import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { InputField } from "@/ui/components/input-field/input-field"
import { useToast } from "@/components/ui/use-toast"
import UseLoading from "@/hooks/use-loading"
import { Buttons } from "@/ui/components/buttons/buttons"
import { NewsletterRegisterFormFieldsType } from "@/types/forms";
import Image from "next/image";
import Mail from '../../../../public/mail.jpg'

export const Newsletter = () => {
  const { toast } = useToast()
  const [ isLoading , startLoading, stopLoading ] = UseLoading()
  const form = useForm<z.infer<typeof NewsletterRegisterFormFieldsType>>({
    resolver: zodResolver(NewsletterRegisterFormFieldsType),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit(values: z.infer<typeof NewsletterRegisterFormFieldsType>) {
    startLoading();
    const { email } = values
    
    const newsletter = await fetch('/api/newsletter', {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      })
    })

    if(newsletter.status === 200) {
      toast({
        variant: "success",
        title: "Enregistrement réussi !",
        description: <Typography component="p" variant="body-sm">Enrégistrement réussi</Typography>,
      })
      stopLoading()
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: <Typography component="p" variant="body-sm">Une erreur est survenue. Veuillez réessayer.</Typography>,
      })
      stopLoading()
    }

  }


  return (
    <Container className="bg-primary-400">
      <Container className="bg-white px-4 py-8 md:px-8 md:py-16 flex flex-col md:flex-row gap-8 items-center rounded-tl-full rounded-br-full">
        <Container className="text-primary-50 basis-1/2 flex flex-col items-center justify-center gap-4 bg-primary-400 rounded-xl m-auto py-8 px-4">
          <Typography variant="title-base" component="h4">
            Abonnez-vous à notre newsletter
          </Typography>
          <Typography>
            Recevez les dernières mises à jour du site et des offres exclusives de nos formateurs en vous abonnant à notre newsletter.
          </Typography> 
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row justify-center items-center gap-2 w-full m-auto">
              <Container className="flex justify-center  flex-row w-full gap-2 m-auto">
                <InputField
                  control={form.control}
                  name="email"
                  placeholder="Entrez votre adresse email"
                  className="w-[30vw]"
                />
                <Buttons type='submit' isLoading={isLoading} className="">S'abonner</Buttons>
              </Container>
            </form>
          </Form>
        </Container>
        {/* <Container className="basis-1/2 flex flex-col gap-4">
          <Container className="flex justify-end">
            <Image src={Mail} alt='newsletter' width={500} height={500} className="rounded-full"/>
          </Container>
        </Container> */}
      </Container>
    </Container>
  );
};
