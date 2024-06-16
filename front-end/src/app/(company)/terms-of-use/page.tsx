"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/ui/components/container/container';
import {termOfUse} from '@/lib/terme-of-use-data/term-of-use'
import { Typography } from '@/ui/components/typography/typography';

export default function TermOfUse() {
    const [activeSection, setActiveSection] = useState<string>(termOfUse[0].id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offset = 100; 
  
      termOfUse.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const elementPosition = element.offsetTop;
          const elementHeight = element.clientHeight;
          if (scrollPosition >= elementPosition - offset && scrollPosition < elementPosition + elementHeight - offset) {
            setActiveSection(section.id);
          }
        }
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);


  return (
    <main className=" flex w-full  ">
        <Container className="hidden md:block w-1/4 fixed bg-gray-100 p-4 -z-20 h-[calc(90vh-64px)]">
        <ul>
          {termOfUse.map(section => (
            <li key={section.id}>
              <Link className={`block p-2 ${activeSection === section.id ? 'font-semibold text-[#39ae44]' : 'text-gray-700'}`} href={`#${section.id}`}>
              {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="flex flex-col sticky justify-end items-start ml-4 md:ml-52 lg:ml-80   overflow-y-auto leading-relaxed">
        <Container className=' leading-relaxed'>
          <Typography className='leading-relaxed' component='h3' variant='title-lg'>Contrats</Typography>
          <Typography>Pour Clients,</Typography>
          <Typography>
            Contrat de service d'apprentissage à domicile
            Entre
            Monyaya, société par actions simplifiée dont le siège social est situé [adresse],représentée par [nom du représentant légal], en qualité de [fonction],
            D'une part,et [Nom du client], [qualité du client], demeurant [adresse],D'autre part, il a été conclu le présent contrat de service d'apprentissage à domicile, ci- après dénommé le "Contrat".
          </Typography>
        </Container>
       
        {termOfUse.map(section => (
          <div id={section.id} key={section.id} className="mb-20">
            <Typography className="text-2xl font-bold mb-4">{section.title}</Typography>
            <Typography> {section.title}</Typography>
            <Typography>{section.content}</Typography>
          </div>
        ))}
      </Container>
     
    </main>
  );
}

