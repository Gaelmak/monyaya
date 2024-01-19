'use client'

import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import Rekreation from '../../../../public/rekreatioon.jpg'
import Image from "next/image"
import RekreationPaysage from '../../../../public/rekreatioonPaysage.png'

export const BestTrainingCourses = () => {
  let t = [
    {id:1, nom: 'Yves Boke', domain_id: 1, title: 'Ma formation', description: 'Tailled de la description doit etre assez pour tenir description de la formation avec du contexte', price: '110.5$'},
    {id:2, nom: 'Divine Ifuwa', domain_id: 1, title: 'Ma formation', description: 'description de la formation avec du contexte', price: '0.5$'},
    {id:3, nom: 'Marel Limaya', domain_id: 1, title: 'Ma formation', description: 'description de la formation avec du contexte', price: '10$'},
    {id:4, nom: 'Nathan Boke', domain_id: 1, title: 'Ma formation', description: 'description de la formation avec du contexte', price: '90.5$'},
  ]
  return (
    <Container className="block overflow-hidden py-8 px-4 md:px-8 md:py-8 bg-white relative">
      <Container className="">
        <Typography variant="title-lg" component="h2">Formations a l'affiche</Typography>
      </Container>
      <br/>
      <Container className="overflow-auto flex flex-row gap-4 no-scrollbar">
        {
          t.map(x => 
            <Container key={x.id} className="cursor-pointer flex flex-col md:basis-1/4 bg-white gap-2 rounded relative group">
              <Container className="w-[80vw] md:w-auto aspect-video bg-primary-50 rounded overflow-hidden flex justify-center items-center">
                <Image src={RekreationPaysage} alt="rekreatioon logo" className="h-auto w-full group-hover:scale-150 animate"/>
              </Container>
              <Container variant="Glass-Effect" className="hidden md:block absolute top-4 left-4 p-2 rounded bg-secondary-Default">
                <Typography variant="body-sm" component="p" className="text-white">Anglais</Typography>
              </Container>
              <Container className="flex flex-row md:w-full items-center gap-2">
                <Container className="w-[30px] h-[30px] flex rounded-full overflow-hidden">
                  <Image src={Rekreation} alt="Default image" className="h-full"/>
                </Container>
                <Typography variant="title-sm" className="font-bold" component="h4">{x.nom}</Typography>
              </Container>
              <Container className="w-full h-[3rem] overflow-hidden">
                <Typography variant="body-base" className="text-secondary-Default">{x.description}</Typography>
              </Container>
              <Container className="">
                <Typography variant="title-sm" className="">{x.price}</Typography>
              </Container>
            </Container>
          )
        }
      </Container>
    </Container>
    
  )
}