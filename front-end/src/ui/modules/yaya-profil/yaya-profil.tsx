import { Container } from "@/ui/components/container/container"
import Image from 'next/image'
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { Typography } from "@/ui/components/typography/typography"
import clsx from "clsx";
import { Buttons } from "@/ui/components/buttons/buttons";

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
      <Container className="border p-4 rounded sticky top-[12vh]">
      {
        data.map(({name, image, email}) => (
        <Container key={name} className="flex flex-col gap-8 relative">
          <Container className="flex flex-col gap-4 items-center">
            <Container className="flex items-center justify-center rounded-full w-[160px] h-[160px] overflow-hidden">
              <Image 
                width={160} 
                height={160} 
                src={image ? image : DefaultAvatar}
                alt="User profile image"
              />
            </Container>
            <Container className="flex flex-col gap-1">
              <Typography variant="title-base" className="text-center">{name}</Typography>
              <Typography variant="body-sm" className="text-center text-primary-600">{email}</Typography>
            </Container>
          </Container>
          {
            children ?
            <Container className="flex flex-col gap-2">
              {children}
            </Container>
            : null
          }
        </Container>
        ))
      }
      </Container>
    </Container>
  )
}
