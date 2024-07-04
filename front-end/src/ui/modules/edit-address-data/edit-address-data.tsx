'use client'
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { EditAddressFormFieldsType } from "@/types/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { InputField } from "@/ui/components/input-field/input-field"
import { Container } from "@/ui/components/container/container"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Home, Pen } from "lucide-react"
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
    avenue: string
    district: string
    municipality: string
    number: string
  }
  name: string
}

export const EditAddressData = ({name, data}: Props) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading , startLoading, stopLoading] = UseLoading()
  const [update, setUpdate] = useState(true)

  const form = useForm<z.infer<typeof EditAddressFormFieldsType>>({
    resolver: zodResolver(EditAddressFormFieldsType),
    defaultValues: {
      avenue: data.avenue,
      district: data.district,
      municipality: data.municipality,
      number: data.number,
    }
  })

  useEffect(() => {
    const {avenue, district, municipality, number} = form.getValues();
    const updated = 
      avenue.trim() == data.avenue &&
      district.trim() == data.district &&
      municipality.trim() == data.municipality &&
      number.trim() == data.number
    setUpdate(updated)
  }, [form.getValues()])
  
  async function onSubmit(values: z.infer<typeof EditAddressFormFieldsType>) {
    startLoading();
    
    const {avenue, district, municipality, number} = values
    const registration  = await fetch(`/api/user/address/${name}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avenue,
        district,
        municipality, 
        number
      }),
    });

    if(registration.status === 200) {
      toast({
        variant: "success",
        title: "Succes",
        description: <Typography component="p" variant="body-sm">Votre adresse a correctement été modifié</Typography>,
      })
      stopLoading()
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: <Typography component="p" variant="body-sm">Une erreur est survenue, veuillez réessayer plus tard.</Typography>,
      })
      stopLoading()
    }
    stopLoading()
  }

  const HomeIcon = () => {
    return <Home className="w-5 h-5 absolute left-4 cursor-pointer text-secondary-300"/>
  }
  
  return(
    <Dialog>
      <Container>
        <Container className="flex flex-col gap-4">
          <Container className="flex flex-col gap-4">
            <Container>
              <Typography variant="body-sm">Adresse</Typography>
              { data.avenue && data.number && data.district && data.municipality ?
                  <Typography variant="title-sm">N° {data.number}, Av. {data.avenue}<br/>C. {data.municipality}, Q. {data.district}</Typography>
                :
                  <Typography variant="title-sm">Adresse non définie</Typography>
              }
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
            <form onSubmit={form.handleSubmit(onSubmit)} className={clsx("flex flex-col gap-8 ")}>
              <Container 
                className={clsx(
                  "flex flex-col gap-2 p-4 rounded"
                )}
              >
                <Container className="flex flex-row gap-4">
                  <Container className="basis-1/2">
                    <InputField
                      control={form.control}
                      name="municipality"
                      placeholder="Commune"
                      label='Commune'
                    >
                      {HomeIcon()}
                    </InputField>
                    <InputField
                      control={form.control}
                      name="district"
                      placeholder="Quartier"
                      label='Quartier'
                    >
                      {HomeIcon()}
                    </InputField>
                  </Container>
                  <Container className="basis-1/2">
                    <InputField
                      control={form.control}
                      name="avenue"
                      placeholder="Avenue"
                      label='Avenue'
                    >
                      {HomeIcon()}
                    </InputField>
                    <InputField
                      control={form.control}
                      name="number"
                      placeholder="Numéro"
                      label='Numéro'
                    >
                      {HomeIcon()}
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