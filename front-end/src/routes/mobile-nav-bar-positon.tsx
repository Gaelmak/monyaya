import { Container } from "@/ui/components/container/container"
import clsx from "clsx"
import { useState } from "react"

interface Props {
  children : React.ReactNode
}

export const MobileNavBarPosition = ({children }:Props) => {
  
  const [navbarOpen, setNavbarOpen] = useState(false)
  return(
    <Container 
      className={
        clsx(
          navbarOpen ? 'right-0' : ' right-[-90vw] ',
          'shaddow md:hidden border-l-[1px] border-slate-50 px-4 absolute block h-[92vh] w-[90vw] z-[100] py-6 top-[8vh] bg-white animate'
        )
      }
    >

    </Container>
  )
}