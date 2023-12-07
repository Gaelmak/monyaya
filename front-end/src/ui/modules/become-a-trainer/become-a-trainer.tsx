import { Container } from "@/ui/components/container/container"
import Image from "next/image"
import Young from '../../../../public/young.png'
import { Typography } from "@/ui/components/typography/typography"
import { Buttons } from "@/ui/components/buttons/buttons"

export const BecomeATrainer = () => {
  return (
    <Container className="bg-gradient-to-r from-primary-800 to-primary-400 mx-4 md:mx-8 rounded flex flex-col px-4 py-0 md:px-8 md:flex-row items-center md:items-end md:h-[450px]">
      <Container className="hidden md:block md:basis-1/3">
        <Image 
          src={Young} 
          alt="young man"
        />
      </Container>
      <Container className="flex flex-col gap-8 md:gap-4 h-full py-10 md:py-0 justify-center md:basis-2/3">
        <Typography component="h1" variant="display" className="text-white">
          Devenez formateur et partagez vos connaissances
        </Typography>
        <Container>
          <Typography component="p" variant="body-lg" className="text-white">
            Vous avez des connaissances et des compétences que vous souhaitez partager ?
          </Typography>
          <Typography component="p" variant="body-lg" className="text-white">
            Notre plateforme vous permet de proposer vos cours à domicile et de générer des revenus.
          </Typography>
          <Typography component="p" variant="body-lg" className="text-white">
            Inscrivez-vous dès aujourd'hui et commencez à partager vos connaissances !
          </Typography>
        </Container>
        <Container>
          <Buttons variant="ghost" className="w-full md:w-auto">Inscription</Buttons>
        </Container>
      </Container>
    </Container>
  )
}