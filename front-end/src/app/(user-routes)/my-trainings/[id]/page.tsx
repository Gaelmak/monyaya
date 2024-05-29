import { Container } from "@/ui/components/container/container"
import prisma from "@/lib/prisma"
import { Typography } from "@/ui/components/typography/typography"
import { Calendar, List, PenBox, Map } from "lucide-react"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import RekreationPaysage from '../../../../../public/rekreatioonPaysage.png'
import Image from "next/image"
import { truncateText } from "@/lib/truncate-text"
import { LearnerList } from "@/ui/modules/learner-list/learner-list"

export default async function Home({ params } : { params: { id: string } }) {
  const id = decodeURIComponent(params.id)
  const training = await prisma.trainings.findUnique({
    where: {
      id: id
    },
    include: {
      _count: {
        select: {
          modules: true
        }
      },
      learners : {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              municipality: true,
              district: true,
              number: true,
              avenue: true,
              firstName: true,
              lastName: true,
            }
          }
        }
      }
    }
  })
  return(
    <Container className="p-4 flex flex-col gap-16 pt-[10vh] md:pt-4">
      <Container className="bg-primary-50 p-4 gap-2 rounded flex flex-col md:flex-row">
        <Container className="basis-1/3">
          <Container className="w-full relative md:w-auto aspect-video bg-primary-50 rounded overflow-hidden flex justify-center items-center">
            <Image src={RekreationPaysage} alt="rekreatioon logo" className="h-auto w-full group-hover:scale-150 animate"/>
          </Container>
        </Container>
        <Container className="basis-2/3">
          <Container className="">
            <Typography variant="title-base">{training?.name}</Typography>
            <Typography variant="body-base" className="text-secondary-Default">{training!.description}</Typography>
          </Container>
          <Container>
            <Typography variant="title-base">${training?.price}</Typography>
          </Container>
        </Container>
      </Container>
      <Container>
        <LearnerList learners={training!.learners}/>
      </Container>
    </Container>
  )
}