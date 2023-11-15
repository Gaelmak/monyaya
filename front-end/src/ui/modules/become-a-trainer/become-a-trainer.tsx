import { Container } from "@/ui/components/container/container"
import Image from "next/image"
import Young from '../../../../public/young.png'
import { Typography } from "@/ui/components/typography/typography"
import { Buttons } from "@/ui/components/buttons/buttons"

export const BecomeATrainer = () => {
  return (
    <Container className="md:mt-8 bg-primary-Default flex flex-col-reverse px-4 py-0 md:px-8 md:flex-row items-center md:items-end md:h-[450px]">
      <Container className="md:basis-1/4">
        <Image 
          src={Young} 
          alt="young man"
        />
      </Container>
      <Container className="flex flex-col gap-8 md:gap-4 h-full py-10 md:py-0 justify-center md:basis-3/4">
        <Typography component="h1" variant="display" className="text-white">
          Devenez formateur et partagez vos connaissances
        </Typography>
        <Container>
          <Typography component="p" variant="body-base" className="text-white">
            Vous avez des connaissances et des compétences que vous souhaitez partager ?
          </Typography>
          <Typography component="p" variant="body-base" className="text-white">
            Notre plateforme vous permet de proposer vos cours à domicile et de générer des revenus.
          </Typography>
          <Typography component="p" variant="body-base" className="text-white">
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