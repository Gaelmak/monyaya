import { Container } from "@/ui/components/container/container"
import prisma from "@/lib/prisma"
import { Typography } from "@/ui/components/typography/typography"
import { Calendar, List, PenBox, Trash } from "lucide-react"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

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
            }
          }
        }
      }
    }
  })

  console.log(training)
  return(
    <Container className="p-4 flex flex-col gap-2">
      <Container className="bg-primary-Default text-white p-4 rounded">
        <Typography variant="title-lg">{training?.name}</Typography>
      </Container>
      <Container className="flex flex-row justify-between">
        <Container className="flex flex-row gap-4">
          <Container className="flex flex-row gap-1 items-center">
            <List width={20} height={20}/>
            <Typography>{training!._count.modules}</Typography>
          </Container>
          <Container className="flex flex-row gap-1 items-center">
            <Calendar width={20} height={20}/>
            <Typography>{format(training!.createdAt, 'dd MMMM yyyy', { locale: fr })}</Typography>
          </Container>
        </Container>
        <Container className="flex flex-row gap-4">
          <Container className="flex flex-row gap-1 items-center">
            <PenBox className="text-primary-300" width={20} height={20}/>
            <Typography className="text-primary-300">Modifier la formation</Typography>
          </Container>
          <Container className="flex flex-row gap-1 items-center">
            <Trash className="text-red-300" width={20} height={20}/>
            <Typography className="text-red-300">Supprimer la formation</Typography>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}