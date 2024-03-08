import { Container } from "@/ui/components/container/container"
import Image from 'next/image'
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { Typography } from "@/ui/components/typography/typography"
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import clsx from "clsx";

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

  className?: string,
}
export const YayaProfil = ({
  data,
  className
} : Props) => {
  return(
    <Container className={clsx(className)}>
      <Container className="bg-secondary-50 p-4 rounded">
      {
        data.map(({name, image, email,  bio, createdAt, municipality, district, avenue, number}) => (
        <Container key={name} className="flex flex-col gap-8">
          <Container className="flex flex-col gap-4 items-center">
            <Container className="flex items-center justify-center rounded-full w-[150px] h-[150px] overflow-hidden">
              <Image 
                width={150} 
                height={150} 
                src={image ? image : DefaultAvatar}
                alt="User profile image"
              /> 
            </Container>
            <Container className="flex flex-col gap-1">
              <Typography variant="title-base" className="text-center">{name}</Typography>
              <Typography variant="body-sm" className="text-center">{email}</Typography>
            </Container>
          </Container>
          
          <Container className="flex flex-col gap-4">
            {
            createdAt &&
            <Container className="flex flex-col gap-1">
              <Typography variant="body-sm" className="text-gray-500">Inscrit depuis </Typography>
              <Typography>{format(createdAt, 'dd MMMM yyyy', { locale: fr })}</Typography>
            </Container>
            }
            <Container className="flex flex-col gap-1">
              <Typography variant="body-sm" className="text-gray-500">Adresse </Typography>
              <Typography>{number + ", Av. " + avenue + " C. " + municipality + " Q. " + district}</Typography>
            </Container>
            {
            bio &&
            <Container className="flex flex-col gap-1">
              <Typography variant="body-sm" className="text-gray-500">Description</Typography>
              <Typography>{bio}</Typography>
            </Container>
            }
          </Container>
        </Container>
        ))
      }
      </Container>
    </Container>
  )
}
