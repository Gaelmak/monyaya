'use client'

import { HowItWorks as informaton } from "@/lib/how-it-works/how-it-works"
import { Container } from "@/ui/components/container/container"
import { Scroll } from "@/ui/components/scroll/scroll"

export const HowItWorks = () => {
  return(
    <Container className="flex p-8">
      <Container className="h-[380px] w-full rounded flex flex-col justify-center items-center text-center">
        <Scroll className="w-full" contents={informaton}/>
      </Container>
    </Container>
  )
}
