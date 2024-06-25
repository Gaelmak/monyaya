'use client'
import { Form} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { BecomeATrainerFormFieldsType } from "@/types/forms"
import { InputField } from "@/ui/components/input-field/input-field"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { InputFieldCheckbox } from "@/ui/components/input-field-checkbox/input-field-checbox"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { TermsAndConditions } from "../terms_and_conditions/terms_and_conditions"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import UseLoading from "@/hooks/use-loading"
import { Buttons } from "@/ui/components/buttons/buttons"

interface Props {
  name: string
}

export const UserDescription = ({ name }: Props) => {
  const router = useRouter()
  const { toast } = useToast()
  const [ isLoading , startLoading, stopLoading ] = UseLoading()
  const form = useForm<z.infer<typeof BecomeATrainerFormFieldsType>>({
    resolver: zodResolver(BecomeATrainerFormFieldsType),
    defaultValues: {
      bio: '', 
      terms_and_conditions: false,
    }
  })

  async function onSubmit(values: z.infer<typeof BecomeATrainerFormFieldsType>) {
    startLoading();
    const { bio, terms_and_conditions } = values
    
    const userToTrainer = await fetch(`/api/user/${name}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bio,  
        terms_and_conditions
      })
    })
    

    if(userToTrainer.status === 200) {
      toast({
        variant: "success",
        title: "Maintenant YAYA!",
        description: <Typography component="p" variant="body-sm">Bienvenue parmi nous! Vous venez officiellement de devenir un "YAYA".</Typography>,
      })
      stopLoading()
      router.push("/my-trainings")
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Container className=" bg-white rounded">
            <Container className="flex flex-col gap-2 p-4">
              <Typography variant="title-sm" component="h4" className="mb-2">Bio{' '}<span className="text-red-500">*</span></Typography>
              <InputField
                control={form.control}
                name="bio"
                placeholder="Parlez nous de vous"
                description={
                  <span>
                    <span>
                      Dites nous en quelques lignes ce qui fait de vous un bon formateur
                    </span> <br/>
                    <span>
                      La pertinence de votre description sera determinant de votre réputation sur le site
                    </span>
                  </span>
                }
                type="textarea"
              />
            </Container>
            <Container className="flex flex-col gap-2 p-4">
              <Typography variant="title-sm" component="h4" className="mb-2">Termes et conditions d'utilisation{' '}<span className="text-red-500">*</span></Typography>
              <InputFieldCheckbox
                control={form.control}
                name="terms_and_conditions"
                label={
                <span>
                  J'accepte les {" "}
                  <Sheet>
                    <SheetTrigger className="text-primary-Default">
                      termes et conditions d'utilisation
                    </SheetTrigger>
                    <TermsAndConditions/>
                  </Sheet>
                </span>}
                description="En cochant cette case, vous acceptez les termes et conditions d'utilisation du site"
              />
            </Container>
          </Container>
          <Container className="flex flex-row justify-between items-center">
            <Buttons type='submit' isLoading={isLoading}>Devenir YAYA</Buttons>
          </Container>
        </form>
      </Form>
  )
}