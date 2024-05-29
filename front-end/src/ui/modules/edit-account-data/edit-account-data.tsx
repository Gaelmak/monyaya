'use client'
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { EditAccountFormFieldsType } from "@/types/forms"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { InputField } from "@/ui/components/input-field/input-field"
import { Container } from "@/ui/components/container/container"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Pen } from "lucide-react"
import { useState, useEffect } from "react"
import UseLoading from "@/hooks/use-loading"
import { useToast } from "@/components/ui/use-toast"
import { Typography } from "@/ui/components/typography/typography"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import Image from "next/image"
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { GetSignedURL } from "@/lib/get-signed-url"

interface Props {
  data: {
    image: string
  }
  name: string
}

export const EditAccountData = ({name, data}: Props) => {
  const router = useRouter()
  const { toast } = useToast()
  const [ isLoading , startLoading, stopLoading ] = UseLoading()
  const [update, setUpdate] = useState(true)

  const form = useForm<z.infer<typeof EditAccountFormFieldsType>>({
    resolver: zodResolver(EditAccountFormFieldsType),
    defaultValues: {
      image: {},
    }
  })

  useEffect(() => {
    const {image} = form.getValues();
    console.log(image)
  }, [form.getValues()])

  
  async function onSubmit(values: z.infer<typeof EditAccountFormFieldsType>) {
    startLoading();
    
    const { image } = values

    const signedURL = GetSignedURL()

    console.log(signedURL)

    // const registration  = await fetch(`/api/user/userimage/${name}`, {
    //   method: "PATCH",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     image
    //   }),
    // });

    // if(registration.status === 200) {
    //   toast({
    //     variant: "success",
    //     title: "Bienvenue !",
    //     description: <Typography component="p" variant="body-sm">Vos informations ont correctement été enregistré</Typography>,
    //   })
    //   stopLoading()
    //   router.push("/signin")
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: "Utilisateur déjà existant",
    //     description: <Typography component="p" variant="body-sm">Une erreur est survenue, veuillez réessayer plus tard.
    //     </Typography>,
    //   })
    //   stopLoading()
    // }
    stopLoading()
  }


  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={clsx("flex flex-col gap-8 ")}>
        <Container 
          className={clsx(
            "flex flex-col gap-2 p-4 border rounded"
          )}
        > 
          <Container>
            <Typography variant="title-base">Image de profil</Typography>
          </Container>
          <Container
            className={clsx(
              "w-full flex flex-col gap-2 lg:gap-4 items-center"
            )}
          >
            <Container className="relative w-80 h-80 p-2 flex justify-center items-center overflow-hidden z-10">
              <Container className="w-full h-full rounded-full overflow-hidden bg-red-500">
                <Image 
                  width={100}
                  height={100}
                  src={data.image ? data.image : DefaultAvatar}
                  alt="User profile image"
                  className="h-full w-full object-cover"
                />
              </Container>
              <InputField
                control={form.control}
                name="image"
                label={
                  <span className="z-20 flex flex-row items-center gap-2 cursor-pointer absolute bottom-8 right-8 p-4 bg-white rounded-full shadow-md">
                    <Pen className="w-5 h-5 text-primary-Default"/>
                  </span>
                }
                type="file"
                className="hidden"
              />
            </Container>
            
          </Container>
          <Container className="flex flex-row justify-between items-center">
            <Buttons type='submit' isLoading={isLoading} className="lg:w-auto w-full">Modifier l'image de profil</Buttons>
          </Container>
        </Container>
      </form>
    </Form>
  )
}