'use client'

import { Container } from "@/ui/components/container/container"
import Mobile from '../../../../public/mobile.png'
import Image from "next/image"
import { Typography } from "@/ui/components/typography/typography"
import { Buttons } from "@/ui/components/buttons/buttons"
import { Download } from "lucide-react"

export const AppMobile = () => {
  return (
    <Container className="w-full flex flex-row p-6 pt-12">
      <Container className="basis-1/2">
        <Image
          src={Mobile} 
          alt="Mobile app"
          className=""
          sizes="100%"
          priority
        />
      </Container>
      <Container className="basis-1/2 flex flex-col justify-center gap-8">
        <Typography variant="display" component="h1">
          Restez à l'affût et obtenez l'application mobile dès sa sortie sur tous les stores.
        </Typography>
        <Container className="flex flex-row gap-4">
          <Buttons disabled={true} Icon={Download}>Play Store</Buttons>
          <Buttons disabled={true} Icon={Download}>App Store</Buttons>
          <Buttons disabled={true} Icon={Download}>Fichier .Apk</Buttons>
        </Container>
      </Container>
    </Container>
  )
}