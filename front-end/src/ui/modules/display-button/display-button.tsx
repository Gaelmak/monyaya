'use client'
import { Buttons } from "@/ui/components/buttons/buttons"
import { LogIn } from "lucide-react"

export const GoToAuthentication = () => {
  return(
    <Buttons Icon={LogIn} buttonType="link" baseUrl="/signin">Connecter</Buttons>
  )
}