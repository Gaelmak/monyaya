import { Container } from "@/ui/components/container/container"
import Image from 'next/image'
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { Typography } from "@/ui/components/typography/typography"
import clsx from "clsx";
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

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
      <Container className="bg-white rounded shadow-md sticky top-[12vh]">
      {
        data.map(({name, firstName, lastName, image, bio, municipality, createdAt}) => (
          <Container key={name} className={clsx("p-4 flex flex-col gap-4 relative")}>
            <Container className="flex flex-col gap-4">
              <Container className="flex flex-col justify-between gap-4">
                <Container className="basis-1/4">
                  <Container className="rounded-full w-[120px] h-[120px] lg:w-[100px] lg:h-[100px] overflow-hidden">
                    <Image 
                      width={100} height={100}
                      src={image ? image : DefaultAvatar}
                      alt="User profile image"
                      className="w-full h-full object-cover"
                    />
                  </Container>
                </Container>
                <Container className="basis-3/4 flex flex-col w-full">
                  <Container className="block w-full">
                    <Typography className="text-title-base break-words">{firstName + " " + lastName}</Typography>
                  </Container>
                  <Container className="flex flex-col w-full">
                    <Typography variant="body-sm">Résidence : {municipality}</Typography>
                    <Typography variant="body-sm">Yaya depuis le {format(createdAt!, 'dd MMMM yyyy', { locale: fr })}</Typography>
                  </Container>
                </Container>
              </Container>
              <Container className="flex flex-col w-full">
                <Typography variant="title-xs">Bio</Typography>
                <Typography variant="body-base">{bio}</Typography>
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
