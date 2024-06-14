'use client'
import { Buttons } from "@/ui/components/buttons/buttons";
import { Container } from "@/ui/components/container/container";
import { CalendarCheck, CalendarClock, CalendarX, Plus, Trash2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { Typography } from "@/ui/components/typography/typography";
import { truncateText } from "@/lib/truncate-text";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast"
import UseLoading from "@/hooks/use-loading"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface Props {
  trainingId?: string
  userId?: string | null
  isMyAccount?: boolean
  image?: StaticImageData | string
  name?: string
  fullName?: string
  amLearner?: boolean
  status?: "PENDING" | "APPROVED" | "REJECTED" 
  seeDetails?: Function
  children?: React.ReactNode
}

export const SearchResultButtons = ({status, trainingId, userId, isMyAccount = false , amLearner = false, seeDetails = () => {}, children}: Props) => {
  const { toast } = useToast()
  const [ isLoading , startLoading, stopLoading ] = UseLoading()

  function logIn () {
    toast({
      variant: "default",
      title: "Authentification requise",
      description: <Typography component="p" variant="body-sm">Pour ajouter cette formation à votre panier, veuillez vous connecter ou créer un compte.</Typography>,
      action: <Buttons variant="primary" buttonType="link" baseUrl="/signin">Connexion</Buttons>
    })
  }
  async function addLearners (trainingId: string, userId: string) {
    startLoading()
    const add = await fetch(`/api/learners`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId : userId,
        trainingId : trainingId,
      })
    })
    
    if(add.status === 200) {
      toast({
        variant: "success",
        title: "Formation ajoutée !",
        description: <Typography component="p" variant="body-sm">La formation a été ajoutée avec succès et est en attente de validation de la part du yaya. Vous récévrez une notification de la part du yaya concernant la suite.</Typography>,
      })
      stopLoading()
    } else {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: 
        <Typography component="p" variant="body-sm">
          Une erreur est survenue durant l'ajout de la formation. Veuillez recommencer l'opération.
        </Typography>,
      })
      stopLoading()
    }
  }

  return(
    <Container className="flex flex-row gap-2">
      {
        amLearner ?
        <Container className="flex flex-row gap-2">
          {
            status === "PENDING" ?
            <Buttons Icon={CalendarClock} className="text-white bg-orange-400 hover:bg-orange-400" isLoading={isLoading}/>
            : status === "REJECTED" ?
            <Buttons Icon={CalendarX} className="text-white bg-red-400 hover:bg-red-400" isLoading={isLoading}/>
            :
            <Buttons Icon={CalendarCheck} className="text-white bg-primary-400 hover:bg-primary-400" isLoading={isLoading}/>
          }
          <Buttons Icon={Trash2} disabled={isMyAccount} variant="ghost" outline="outline" className="text-red-500 hover:text-red-600" isLoading={isLoading} buttonType="action" action={() => addLearners(trainingId!, userId!)}/>
        </Container>
        :
        userId ?
        <Buttons Icon={Plus} disabled={isMyAccount} isLoading={isLoading} buttonType="action" action={() => addLearners(trainingId!, userId!)}/>
        :
        <Buttons Icon={Plus} disabled={isMyAccount} isLoading={isLoading} buttonType="action" action={() => logIn()}/>
      }
    </Container>
  )
}

export const SearchResultTrainer = ({ image = DefaultAvatar, name, fullName, isMyAccount = false }: Props) => {
  return(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href={isMyAccount ? '/dashboard' : `/profil/${name}`}>
            <Container className="flex flex-row justify-end gap-2">
              <Container className="flex items-center justify-center rounded-full w-[40px] h-[40px] overflow-hidden">
                <Image 
                  width={40} 
                  height={40} 
                  src={image}
                  alt="User profile image"
                  className="w-full h-full object-cover"
                />
              </Container>
            </Container>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="bg-white rounded">
          <Link href={isMyAccount ? '/dashboard' : `/profil/${name}`}>
            <Container className="flex flex-col items-center gap-2 p-2 rounded">
              <Container className="flex items-center justify-center rounded-full w-[80px] h-[80px] overflow-hidden">
                <Image 
                  width={80} 
                  height={80} 
                  src={image}
                  alt="User profile image"
                  className="w-full h-full object-cover"
                />
              </Container>
              <Container className="flex flex-col gap-1 w-28 items-center">
                <Typography variant="title-xs" className="text-center underline">{truncateText(fullName!, 50)}</Typography>
              </Container>
            </Container>
          </Link>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    
  )
}