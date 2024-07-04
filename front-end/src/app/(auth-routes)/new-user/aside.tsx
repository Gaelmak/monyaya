'use client'
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"

export const Aside = () => {
  return (
    <Container className="w-full h-full bg-primary-600">
      <Container className="text-center flex flex-col gap-8 px-4 h-full justify-center items-center bg-opacity-50">
        <Typography variant="title-base" component="h2" className="text-white md:text-title-lg">
          Découvrez les formations qui vous correspondent auprès de formateurs passionnés !
        </Typography>
      </Container>
    </Container>
  )
}