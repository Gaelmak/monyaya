import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { OurBenefitsForTrainers } from "@/lib/our-benefits/our-benefits"
import { SignInButton } from "@/routes/auth-buttons"

export const BecomeATrainer = () => {
  return (
    <Container className="px-6 md:px-8 py-24 flex flex-col gap-20 bg-secondary-50">
      <Container className="flex flex-col items-center">
        <Typography variant="title-lg" className="md:w-[60%] text-center">Devenez formateur sur notre plateforme et profitez de nombreux avantages !</Typography>
        <Typography className="md:w-[60%] text-center">Partagez votre expertise et enrichissez votre parcours professionnel grâce à notre plateforme conviviale et innovante.</Typography>
      </Container>
      <Container className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {
          OurBenefitsForTrainers.map(({Icon, title, description}) => (
            <Container key={title} className="flex flex-col md:flex-row gap-4">
              <Container className="basis-1/6">
                <Icon className="text-secondary-Default" size={48}/>
              </Container>
              <Container className="basis-5/6">
                <Typography variant="title-sm">{title}</Typography>
                <Typography>{description}</Typography>
              </Container>
            </Container>
          ))
        }
      </Container>
      <Container className="w-full flex justify-center">
        <SignInButton/>
      </Container>
    </Container>
  )
}