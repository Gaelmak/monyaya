import { Container } from "@/ui/components/container/container"
import Image from 'next/image'
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { Typography } from "@/ui/components/typography/typography"
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
        <Container key={name} className="flex flex-col gap-4 relative">
          <Container className="flex flex-row gap-4 items-start">
            <Container className="flex flex-row rounded-full w-[80px] h-[80px] overflow-hidden">
              <Image 
                width={80} 
                height={80} 
                src={image ? image : DefaultAvatar}
                alt="User profile image"
              />
            </Container>
            <Container className="flex flex-col">
              <Typography variant="title-sm">Yaya</Typography>
              <Typography variant="title-base">{name}</Typography>
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
