import { Container } from "@/ui/components/container/container"
import Mobile from '../../../../public/mobile.png'
import { BgImg } from "@/ui/components/bg-img/bg-img"

export const AppMobile = () => {
  return (
    <Container className="w-full p-6 pt-12">
      <BgImg className="overflow-visible h-[120vh] flex justify-center" src={Mobile} alt="Mobile app" classNameImg="w-[70%]"/>
    </Container>
  )
}