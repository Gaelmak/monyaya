'use client'

import { Container } from "@/ui/components/container/container"
import Mobile from '../../../../public/mobile.png'
import Image from "next/image"
import { Typography } from "@/ui/components/typography/typography"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Download } from "lucide-react"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { NewsletterRegisterFormFieldsType } from "@/types/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { InputField } from "@/ui/components/input-field/input-field"

export const AppMobile = () => {

  const form = useForm<z.infer<typeof NewsletterRegisterFormFieldsType>>({
    resolver: zodResolver(NewsletterRegisterFormFieldsType),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit(values: z.infer<typeof NewsletterRegisterFormFieldsType>) {

  }

  return (
    <Container className="w-full flex flex-col md:flex-row px-4 md:px-6 py-10 md:py-20">
      <Container className="basis-1/2">
        <Image
          src={Mobile} 
          alt="Mobile app"
          className=""
          sizes="100%"
          priority
          width={100} height={100}
        />
      </Container>
      <Container className="basis-1/2 flex flex-col justify-center gap-8">
        <Typography variant="display" component="h1" className="text-secondary-950">
          L'application mobile bientôt disponible !
        </Typography>
        <Container className="flex flex-col md:flex-row gap-4">
          <Buttons disabled={true} Icon={Download} className="w-full md:w-auto">Play Store</Buttons>
          <Buttons disabled={true} Icon={Download} className="w-full md:w-auto">App Store</Buttons>
          <Buttons disabled={true} Icon={Download} className="w-full md:w-auto">Fichier .Apk</Buttons>
        </Container>
        <Container className="rounded bg-secondary-950 text-white p-4 flex flex-col justify-center gap-4">
          <Container>
            <Typography variant="body-lg" component="p">
            Soyez le premier(ère) à tout savoir ! Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités, offres et événements.  
            </Typography>
          </Container>
          <Container className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-4 justify-between">
                <Container className="w-full">
                  <InputField
                    control={form.control}
                    name="email"
                    placeholder="Entrez votre adresse mail"
                  />
                </Container>
                <Container>
                  <Buttons>Enregistrer</Buttons>
                </Container>
              </form>
            </Form>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}