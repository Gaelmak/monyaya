'use client'

import { Container } from "@/ui/components/container/container"
import { Loader2, Pen, Upload } from "lucide-react"
import UseLoading from "@/hooks/use-loading"
import { useToast } from "@/components/ui/use-toast"
import { Typography } from "@/ui/components/typography/typography"
import { useRouter } from "next/navigation"
import clsx from "clsx"
import Image from "next/image"
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { UploadButton } from "@/lib/uploadthings"

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
  
  async function onSubmit(url_address: string) {
    startLoading();
    
    const url = url_address

    const registration  = await fetch(`/api/user/userimage/${name}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url
      }),
    });

    if(registration.status === 200) {
      toast({
        variant: "success",
        title: "Bienvenue !",
        description: <Typography component="p" variant="body-sm">Votre photo de profil a correctement été enrégistré</Typography>,
      })
      stopLoading()
    } else {
      toast({
        variant: "destructive",
        title: "Utilisateur déjà existant",
        description: <Typography component="p" variant="body-sm">Une erreur est survenue, veuillez réessayer plus tard.
        </Typography>,
      })
      stopLoading()
    }
    stopLoading()
  }


  return(
    <Container 
      className={clsx(
        "flex flex-col gap-2 p-4"
      )}
    > 
      <Container
        className={clsx(
          "w-full flex flex-col gap-2 lg:gap-4 items-center"
        )}
      >
        <Container className="relative w-[24rem] h-[24rem] p-2 flex justify-center items-center overflow-hidden z-10">
          <Container className="w-full h-full rounded-full overflow-hidden">
            <Image 
              width={100}
              height={100}
              src={data.image ? data.image : DefaultAvatar}
              alt="User profile image"
              className="h-full w-full object-cover "
            />
          </Container>
          <span className="z-20 flex flex-row items-center gap-2 cursor-pointer absolute bottom-8 right-8 rounded-full shadow-md">
            <Container className="">
              <UploadButton
                endpoint="imageUploader"
                appearance={{
                  button:"w-full h-full p-4 focus:ring-primary-Default border-secondary-300 rounded-full ut-readying:bg-primary-50 ring-none ut-uploading:bg-white after:ut-uploading:bg-primary-50/50 bg-white text-primary-Default",
                  container:"w-auto",
                  allowedContent:"hidden"
                }}      
                onClientUploadComplete={(res: any) => {
                  onSubmit(res[0].url);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
                content={{
                  button({ready, isUploading, }) {
                    if(isUploading) return <Loader2 size={20} className="animate-spin" />
                    if(ready) return <Pen size={20} className="" />
                    return <Loader2 size={20} className="animate-spin" />
                  },
                }}
              />
            </Container>
          </span>
        </Container>
      </Container>
    </Container>
  )
}