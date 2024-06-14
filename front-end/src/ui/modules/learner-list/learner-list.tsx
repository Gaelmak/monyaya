import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ValidationButton } from "../validation-button/validation-button"

interface Props {
  learners: {
    id: string,
    trainingId: string,
    userId: string,
    status: 'PENDING'| 'APPROVED' | 'REJECTED',
    createdAt: Date,
    user: {
      id: string,
      name: string,
      firstName: string | null,
      lastName: string | null,
      image: string | null,
      municipality: string | null,
      district: string | null,
      number: string | null,
      avenue: string | null
    }
  }[]
}

export const LearnerList = ({ learners }: Props) => {
  return (
    <Container className="flex flex-col gap-4">
      <Container>
        <Typography variant="title-base">Apprenants</Typography>
      </Container>
      <Container className="overflow-hidden">
        <Container className="flex flex-col gap-4">
          {
            learners.map(({id, status, user, userId}) => (
              <Container key={user.id} className="p-4 bg-white rounded">
                <Container className="flex flex-row gap-2">
                  <Container>
                    <Container className="flex items-center justify-center rounded-full w-[100px] h-[100px] overflow-hidden">
                      <Image 
                        width={40} 
                        height={40} 
                        src={user.image ? user.image : DefaultAvatar}
                        alt="User profile image"
                        className="rounded-full object-cover w-full h-full"
                      />
                    </Container>
                  </Container>
                  <Container>
                    <Typography variant="title-sm">{user.firstName && user.firstName} {user.lastName && user.lastName}</Typography>
                    <Typography variant="body-sm" className="text-gray-500">{user.number}, {user.avenue} C. {user.municipality} Q. {user.district}</Typography>
                    <Container className="pt-4">
                      <ValidationButton 
                        userId={userId} 
                        trainingId={id} 
                        isMyAccount={true} 
                        amLearner={true} 
                        status={status}  
                      />
                    </Container>
                  </Container>
                </Container>
              </Container>
            ))
          }
        </Container>
      </Container>
    </Container>
  )
}