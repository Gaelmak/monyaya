import { ListOfTestimonials } from "@/lib/list-of-testimonials/list-of-testimonials"
import { BgImg } from "@/ui/components/bg-img/bg-img"
import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import DefaultImage from '../../../../public/rekreatioon.jpg'
import Image from "next/image"

export const Testimonials = () => {
  return (
    <Container className="px-6 flex flex-col gap-8">
      <Container className="w-full text-center">
        <Typography variant="display" component="h2">Ce qu'ils pensent de nous :</Typography>
      </Container>
      {
        ListOfTestimonials.map(({id, name, position, company, message, imgUrl}) => 
          <Container key={id} className="w-full flex flex-col items-center">
            <Container className="w-[80%] hover:drop-shadow-md hover:cursor-pointer p-8 flex flex-row items-center border-gray-100 rounded bg-[#fdfdfd] gap-8 animate">
              <Container className="basis-1/6 flex justify-center items-center">
                {
                  imgUrl ?
                  <Container className="w-[150px] h-[150px] flex items-center justify-center rounded-full overflow-hidden">
                    <Image src={imgUrl} alt="Default image" className="h-full"/>
                  </Container>
                  :
                  <Container className="w-[150px] h-[150px] flex items-center justify-center rounded-full overflow-hidden">
                    <Image src={DefaultImage} alt="Default image" className="h-full"/>
                  </Container>
                }
              </Container>
              <Container className="basis-5/6 flex flex-col gap-4">
                <Container>
                  <Typography>{message}</Typography>
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