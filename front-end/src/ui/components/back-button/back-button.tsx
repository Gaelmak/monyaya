'use client'
import { Buttons } from "@/ui/components/buttons/buttons"
import { MoveLeft } from "lucide-react"

interface Props {
  backTo : string,
}

export const BackButton = ({backTo} : Props) => {
  return(
    <>
      <Buttons Icon={MoveLeft} variant="secondary" buttonType="link" baseUrl={backTo} className=""/>
    </>
  )
}