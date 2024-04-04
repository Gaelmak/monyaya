import { Container } from "@/ui/components/container/container"
import Image from "next/image"
import Young from '../../../../public/young.png'
import { Typography } from "@/ui/components/typography/typography"
import { UserDescription } from "../user-description/user-description"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"

export const ProcessToBecomeATrainer = async() => {
  const session = await getServerSession(authOptions)
  
  return (
    <Container className="flex flex-col gap-4 pt-20 pb-16 md:pt-0">
      <Container className="bg-gradient-to-br from-primary-800 to-primary-400 rounded flex flex-col px-4 py-0 md:px-16 md:flex-row items-center md:items-end md:h-[240px]">
        <Container className="hidden md:block md:basis-1/4">
          <Image 
            src={Young} 
            alt="young man"
            width={140}
          />
        </Container>
        <Container className="flex flex-col gap-8 md:gap-4 h-full py-10 md:py-0 justify-center md:basis-3/4">
          <Typography component="h2" variant="title-lg" className="text-white">
            Devenez formateur et partagez vos connaissances
          </Typography>
          <Container>
            <Typography component="p" variant="body-base" className="text-white">
              Vous avez des connaissances et des compétences que vous souhaitez partager ?
            </Typography>
            <Typography component="p" variant="body-base" className="text-white">
              Notre plateforme vous permet de proposer vos cours à domicile et de générer des revenus.
            </Typography>
          </Container>
        </Container>
      </Container>
      <Container>
        <UserDescription name={session!.user!.name!} />
      </Container>
    </Container>
  )
}