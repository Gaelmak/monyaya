"use client"

import { pusherClient } from "@/lib/pusher"
import { useState } from "react"
import { Container } from "../container/container"
import { Typography } from "../typography/typography"
import { SearchResultButtons, SearchResultTrainer } from "@/ui/modules/search-result/search-result-buttons"
import { Calendar, List, Map, } from "lucide-react"
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { truncateText } from "@/lib/truncate-text"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import RekreationPaysage from '../../../../public/rekreatioonPaysage.jpg'
import Image from "next/image"
import Link from "next/link"

interface Props {
  data: {
    id : string
    name : string
    image : string | null
    description : string
    userId : string
    price : number
    coursesId : string
    createdAt : Date
    _count : {
      modules: number
    }
    modules : {
      title: string
      description: string
    }[]
    user: {
      name: string
      firstName: string | null
      lastName: string | null
      municipality: string | null
      email: string | null
      createdAt?: Date
      district: string | null
      avenue: string | null
      number: string | null
      image?: string | null
    }
    courses: {
      name: string
      category: {
        name: string
      }
    }
  }[]
  userId?: string
  sessionName?: string
  myLearnings?: {
    trainingId: string
    status: "PENDING" | "APPROVED" | "REJECTED"
  }[]
  className?: string
}

export const TrainingsView = ({data, userId, sessionName, myLearnings, className}: Props) => {
  const [learnings, setLearnings] = useState(myLearnings ? myLearnings : [])
  const pathname = usePathname()

  if(userId) {
    const channel = pusherClient.subscribe(userId!);
    channel.bind("add", function (data: any) { 
      const parsedLearnings = JSON.parse(data.result);
      setLearnings((prev) => [...prev, parsedLearnings]);
    })
  }
  
  return (
    <Container className={clsx(className)}>
      {
        data.map(({id, createdAt, image, name, description, price,_count, user, courses}) => (
          <Container key={id} className="group p-4 hover:cursor-pointer rounded overflow-hidden flex flex-col gap-2 justify-between bg-white animate">
            <Container className="rounded w-full relative md:w-auto aspect-video overflow-hidden flex justify-center items-center">
              <Link href={`/trainings/training/${id}`}>
                <Image width={100} height={100} src={image ? image : RekreationPaysage} alt="rekreatioon logo" className="h-full w-full object-cover group-hover:scale-150 animate"/>
              </Link>
            </Container>
            <Container className="gap-4 flex flex-row justify-between">
              <Container className="flex flex-row gap-1 items-center">
                <Typography variant="body-sm">{courses.name}</Typography>
              </Container>
              <Container className="flex flex-row gap-1 items-center">
                <Calendar width={14} height={14}/>
                <Typography variant="body-sm">{format(createdAt, 'dd MMMM yyyy', { locale: fr })}</Typography>
              </Container>
            </Container>
            <Container className="flex flex-row w-full gap-4">
              <Link href={`/trainings/training/${id}`}  className="w-full">
                <Typography variant="title-sm">{truncateText(name, 65)}</Typography>
              </Link>
            </Container>
            <Link href={`/trainings/training/${id}`}>
              <Container className="flex flex-col">
                <Typography variant="body-sm" className="text-secondary-Default">{truncateText(description, 90)}</Typography>
                <Container className="flex flex-row gap-2">
                  <Container className="flex flex-row gap-1 items-center">
                    <List width={14} height={14} className="text-secondary-Default"/>
                    <Typography variant="body-sm" className="text-secondary-Default">{_count.modules} {_count.modules > 1 ? "Modules" : "Module"}</Typography>
                  </Container>
                  <Container className="flex flex-row gap-1 items-center">
                    <Map width={14} height={14} className="text-secondary-Default"/>
                    <Typography variant="body-sm" className="text-secondary-Default">{user && user.municipality}</Typography>
                  </Container>
                </Container>
              </Container>
            </Link>
            <Container className="flex flex-row justify-between">
              <Container className="flex flex-row gap-1 items-center">
                <Link href={`/trainings/training/${id}`}>
                  <Typography variant="title-base" className="text-primary-Default">${price}</Typography>
                </Link>
              </Container>
              <Container className="flex flex-row gap-2 items-center justify-center">
                <SearchResultButtons 
                  userId={userId ? userId : null} 
                  trainingId={id} 
                  isMyAccount={sessionName === user!.name} 
                  amLearner={learnings.some(objet => objet.trainingId === id)} 
                  status={learnings.find(obj => obj!.trainingId === id)?.status}  
                />
                <Container className="flex justify-center items-center">
                  {
                    pathname != `/profil/${user.name}` ? <SearchResultTrainer name={user.name} fullName={user.firstName + " " + user.lastName} image={user!.image ? user!.image : DefaultAvatar} isMyAccount={sessionName === user.name}/> : null
                  }              
                </Container>
              </Container>
            </Container>
          </Container>
        ))
      }
    </Container>
  )
}