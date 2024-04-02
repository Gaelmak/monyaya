'use client'
import { BgImg } from "@/ui/components/bg-img/bg-img"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { MoveLeft, UserPlus } from "lucide-react"
import Student from "../../../../public/student.jpg"

export const Aside = () => {
  return(
    <BgImg src={Student} alt={"student"} className="w-full h-full relative">
      <Container className="text-center flex flex-col gap-8 px-4 bg-secondary-Default h-full justify-center items-center bg-opacity-50">
        <Typography variant="title-base" component="h2" className="text-white md:text-title-lg">
          Découvrez les formations qui vous correspondent auprès de formateurs passionnés !
        </Typography>
        <Container>
          <Buttons buttonType="link" baseUrl="/registration" Icon={UserPlus} variant="ghost" className="text-secondary-Default">S'inscrire</Buttons>
        </Container>
      </Container>
    </BgImg>
  )
}