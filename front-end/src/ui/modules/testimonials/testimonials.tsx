import { ListOfTestimonials } from "@/lib/testimonials-list/list-of-testimonials"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import DefaultImage from '../../../../public/rekreatioon.jpg'
import Image from "next/image"

export const Testimonials = () => {
  return (
    <Container className="px-4 md:px-6 flex flex-col gap-8">
      <Container className="w-full text-center">
        <Typography variant="display" component="h2">Ce qu'ils pensent de nous :</Typography>
      </Container>
      {
        ListOfTestimonials.map(({id, name, position, company, message, imgUrl}) => 
          <Container key={id} className="w-full flex flex-col items-center">
            <Container className="w-full md:w-[60%] hover:shadow-md hover:cursor-pointer p-4 md:p-8 flex flex-col border-gray-100 rounded bg-white_powder gap-8 animate">
              <Container>
                <Typography>{message}</Typography>
              </Container>
              <Container className="flex gap-4 flex-row items-center">
                <Container className="flex justify-center items-center">
                {
                  imgUrl ?
                  <Container className="w-[80px] h-[80px] flex rounded-full overflow-hidden">
                    <Image src={imgUrl} alt="Default image" className="h-full"/>
                  </Container>
                  :
                  <Container className="w-[80px] h-[80px] flex rounded-full overflow-hidden">
                    <Image src={DefaultImage} alt="Default image" className="h-full"/>
                  </Container>
                }
                </Container>

                <Container>
                  <Typography variant="title-base" component="h3">{name}</Typography>
                  <Typography className="text-secondary-Default">{position} | {company}</Typography>
                </Container>
              </Container>
            </Container>
          </Container>
        )
      }
      
    </Container>
  )
}