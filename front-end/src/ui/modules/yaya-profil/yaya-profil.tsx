import { Container } from "@/ui/components/container/container"
import Image from 'next/image'
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { Typography } from "@/ui/components/typography/typography"
import clsx from "clsx";
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { BgImg } from "@/ui/components/bg-img/bg-img";

interface Props {
  data : [{
    name: string,
    image: string | null,
    bio?: string,
    createdAt?: Date,
    phoneNumber?: string,
    email: string,
    firstName?: string,
    lastName?: string,
    municipality : string,
    district : string,
    avenue : string,
    number : string,
  }]
  children? : React.ReactNode
  className?: string,
}
export const YayaProfil = ({
  data,
  className,
  children
} : Props) => {
  return(
    <Container className={clsx(className, "relative")}>
      <Container className="rounded shadow-md sticky top-[12vh]">
      {
        data.map(({name, image, bio, municipality, createdAt}) => (
          <Container key={name} className={clsx("p-4 flex flex-col gap-4 relative")}>
            <Container className="flex flex-col gap-4">
              <Container className="flex flex-row justify-between">
                <Container className="rounded-full w-[100px] h-[100px] overflow-hidden">
                  <Image 
                    width={100} 
                    height={100} 
                    src={image ? image : DefaultAvatar}
                    alt="User profile image"
                  />
                </Container>
              </Container>
              

              <Container className="flex flex-col w-full">
                <Typography variant="title-sm">{name}</Typography>
                <Typography variant="body-sm">{bio}</Typography>
              </Container>
              <Container className="flex flex-col w-full">
                <Typography variant="body-sm">Commune de résidence : {municipality}</Typography>
                <Typography variant="body-sm">A réjoins mon yaya le {format(createdAt!, 'dd MMMM yyyy', { locale: fr })}</Typography>
              </Container>
              <Container className="flex flex-col w-full">
                {
                  children ?
                  <Container className="flex flex-col gap-2">
                    {children}
                  </Container>
                  : null
                }
              </Container>
            </Container>
          </Container>
        ))
      }
      </Container>
    </Container>
  )
}
