import { ListOfTestimonials } from "@/lib/testimonials-list/list-of-testimonials"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import DefaultImage from '../../../../public/rekreatioon.jpg'
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const Testimonials = () => {
  return (
    <Container className="px-4 md:px-6 flex flex-col md:flex-row md:items-center">
      <Container className="w-full basis-1/4 text-center md:text-left">
        <Typography variant="display" component="h2" className="text-secondary-800">Ce qu'ils pensent de nous :</Typography>
      </Container>
      <ScrollArea className="basis-3/4 p-4"> 
        <Container className="flex flex-row gap-4">
        {
          ListOfTestimonials.map(({id, name, position, company, message, imgUrl}) => 
            <Container key={id} className="shrink-0 w-[75vw] md:w-[20vw] p-4 flex flex-col border-gray-100 rounded bg-secondary-100 gap-4">
              <Container className="h-[15vh] md:h-[25vh] border-b-2 border-b-secondary-50">
                <Typography>{message}</Typography>
              </Container>
              <Container className="flex gap-4 flex-row items-center">
                <Container className="flex justify-center items-center">
                {
                  imgUrl ?
                  <Container className="w-[40px] h-[40px] flex rounded-full overflow-hidden">
                    <Image src={imgUrl} alt="Default image" className="h-full"/>
                  </Container>
                  :
                  <Container className="w-[40px] h-[40px] flex rounded-full overflow-hidden">
                    <Image src={DefaultImage} alt="Default image" className="h-full"/>
                  </Container>
                }
                </Container>

                <Container>
                  <Typography variant="title-sm" component="h4">{name}</Typography>
                  <Typography variant="body-sm" className="text-secondary-Default">{position} | {company}</Typography>
                </Container>
              </Container>
            </Container>
          )
        }
        </Container>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Container>
  )
}