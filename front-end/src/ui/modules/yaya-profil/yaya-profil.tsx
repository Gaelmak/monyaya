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
      <Container className="rounded border sticky top-[12vh]">
      {
        data.map(({name, image, bio, municipality, createdAt}) => (
          <Container key={name} className={clsx("p-4 md:p-8 flex flex-col gap-4 relative", children?'':'md:h-[76vh]')}>
            <Container className="flex flex-col gap-4">
              <Container className="flex flex-row justify-between">
                <Container className="rounded-full w-[160px] h-[160px] overflow-hidden">
                  <Image 
                    width={160} 
                    height={160} 
                    src={image ? image : DefaultAvatar}
                    alt="User profile image"
                  />
                </Container>
                {
                  children ?
                  <Container className="flex flex-col gap-2">
                    {children}
                  </Container>
                  : null
                }
              </Container>
              

              <Container className="flex flex-col w-full">
                <Typography variant="title-base">{name}</Typography>
                <Typography>{bio}</Typography>
              </Container>
              <Container className="flex flex-col w-full">
                <Typography variant="body-sm">Commune de résidence : {municipality}</Typography>
                <Typography variant="body-sm">A réjoins mon yaya le {format(createdAt!, 'dd MMMM yyyy', { locale: fr })}</Typography>
              </Container>
            </Container>
          </Container>
        ))
      }
      </Container>
    </Container>
  )
}
