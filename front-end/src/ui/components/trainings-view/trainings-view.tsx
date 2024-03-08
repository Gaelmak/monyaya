"use client"

import { pusherClient } from "@/lib/pusher"
import { useState } from "react"
import { Container } from "../container/container"
import { Typography } from "../typography/typography"
import { SearchResultButtons, SearchResultTrainer } from "@/ui/modules/search-result/search-result-buttons"
import { List, Map, } from "lucide-react"
import DefaultAvatar from '../../../../public/default_avatar.jpg'
import { truncateText } from "@/lib/truncate-text"
import clsx from "clsx"
import { SheetContent, SheetDescription, SheetFooter, SheetTitle } from "@/components/ui/sheet"
import { Accordion,AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { YayaProfil } from "@/ui/modules/yaya-profil/yaya-profil"

interface Props {
  data: {
    id : string
    name : string
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

  const channel = pusherClient.subscribe("myLearnings");
  channel.bind("add", function (data: any) { 
    const parsedLearnings = JSON.parse(data.result);
    setLearnings((prev) => [...prev, parsedLearnings]);
  })

  return (
    <Container className={clsx(className)}>
        {
          data.map(({id, modules, name, description, price,_count, user, courses}) => (
            <Container key={id} className="group p-4 hover:cursor-pointer rounded flex flex-col gap-2 justify-between bg-white shadow hover:shadow-lg animate">
              <Container className="flex flex-row justify-between">
                <Typography variant="body-sm" className="bg-secondary-50 p-2 text-[0.6rem] rounded">{courses.category.name} /<br/>{courses.name}</Typography>
                {
                  user && <SearchResultTrainer name={user.name} image={user!.image ? user!.image : DefaultAvatar} isMyAccount={sessionName === user.name}/>
                }              
              </Container>
              <Container className="flex flex-col p-2 rounded group-hover:bg-primary-Default animate bg-primary-300">
                <Typography variant="title-sm" className="text-white">{truncateText(name, 65)}</Typography>
              </Container>
              <Container className="flex flex-col gap-1">
                <Typography variant="body-sm" className="text-secondary-Default">{truncateText(description, 100)}</Typography>
                <Container className="flex flex-row gap-1 items-center">
                  <List width={16} height={16} className="text-secondary-Default"/>
                  <Typography variant="body-sm" className="text-secondary-Default">{_count.modules}</Typography>
                </Container>
                <Container className="flex flex-row gap-1 items-center">
                  <Map width={16} height={16} className="text-secondary-Default"/>
                  <Typography variant="body-sm" className="text-secondary-Default">{user && user.municipality} - {user && user.district}</Typography>
                </Container>
              </Container>
              <Container className="flex flex-row justify-between">
                <Container className="flex flex-row gap-1 items-center">
                  <Typography variant="body-lg" className="text-primary-Default">${price}</Typography>
                </Container>  
                <SearchResultButtons 
                  userId={userId ? userId : null} 
                  trainingId={id} 
                  isMyAccount={sessionName === user!.name} 
                  amLearner={learnings.some(objet => objet.trainingId === id)} 
                  status={learnings.find(obj => obj!.trainingId === id)?.status}  
                >
                  <SheetContent className="bg-white w-[40%] py-12 gap-4 flex flex-col overflow-y-scroll">
                    <SheetTitle>
                      <Container className="flex flex-col p-2 rounded group-hover:bg-primary-Default animate bg-primary-300">
                        <Typography variant="title-base" className="text-white">{name}</Typography>
                      </Container>
                    </SheetTitle>
                    <SheetDescription className="flex flex-col gap-2">
                      <Container className="flex flex-col gap-2">
                        <Typography>{description}</Typography>
                      </Container>
                      <Container className="flex flex-col gap-2">
                        <Accordion type="single" collapsible className="w-full">
                          {modules.map(({title, description}) => (  
                            <AccordionItem key={title} value={title}>
                              <AccordionTrigger>{title}</AccordionTrigger>
                              <AccordionContent>{description}</AccordionContent>
                            </AccordionItem>
                          ))
                          }
                        </Accordion>
                      </Container>
                      <Container className="my-8 flex flex-row items-center justify-between w-full">
                        <Container className="flex flex-row gap-1 items-center">
                          <Typography variant="title-lg" className="text-primary-Default">${price}</Typography>
                        </Container> 
                        <SearchResultButtons 
                          userId={userId ? userId : null} 
                          trainingId={id} 
                          isMyAccount={sessionName === user!.name} 
                          amLearner={learnings.some(objet => objet.trainingId === id)} 
                          status={learnings.find(obj => obj!.trainingId === id)?.status}  
                        />
                      </Container>
                      <Container className="">
                        {
                          user &&
                          <YayaProfil 
                            data = {
                              [{
                              name : user.name,
                              image : user.image!,
                              email : user.email!,
                              createdAt: user.createdAt,
                              municipality : user.municipality!,
                              district : user.district!,
                              avenue : user.avenue!,
                              number : user.number!
                              }]
                            }
                            className="w-full"
                          />
                        }
                      </Container>
                    </SheetDescription>
                    <SheetFooter>

                    </SheetFooter>
                  </SheetContent>
                </SearchResultButtons>
              </Container>
            </Container>
          ))
        }
      </Container>
  )
}