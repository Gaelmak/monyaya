import { Container } from "@/ui/components/container/container"
import Image from "next/image"
import Young from '../../../../public/young.png'
import { Typography } from "@/ui/components/typography/typography"
import { Buttons } from "@/ui/components/buttons/buttons"

export const BecomeATrainer = () => {
  return (
    <Container className="bg-primary-Default flex flex-col py-16 px-4 md:py-0 md:px-16 md:flex-row items-center">
      <Container>
        <Image src={Young} alt="young man" className="hidden md:block h-full"/>
      </Container>
      <Container className="flex flex-col gap-8 md:gap-6">
        <Typography component="h1" variant="title-lg" color="white">
          Devenez formateur et partagez vos connaissances
        </Typography>
        <Container>
          <Typography component="p" variant="body-base" color="white">
            Vous avez des connaissances et des compétences que vous souhaitez partager ?
          </Typography>
          <Typography component="p" variant="body-base" color="white">
            Notre plateforme vous permet de proposer vos cours à domicile et de générer des revenus.
          </Typography>
          <Typography component="p" variant="body-base" color="white">
            Inscrivez-vous dès aujourd'hui et commencez à partager vos connaissances !
          </Typography>
        </Container>
        <Container>
          <Buttons variant="ghost">Inscription</Buttons>
        </Container>
      </Container>
    </Container>
  )
}