"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/ui/components/container/container';
import {termOfUse} from '@/lib/terme-of-use-data/term-of-use'
import { Typography } from '@/ui/components/typography/typography';

export default function TermOfUse() {
    const [activeSection, setActiveSection] = useState<string>(termOfUse[0].id);
    const [isSidebarFixed, setIsSidebarFixed] = useState<boolean>(true);


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
    <main className=" flex w-full select-none">
        <Container className={`hidden ${isSidebarFixed ? 'fixed' : 'relative'} md:flex w-1/4 fixed bg-gray-100 p-4 -z-20 h-[calc(100vh-64px)]`}>
          <ul className=''>
            {termOfUse.map(article => (
              <Container key={article.id} className='flex justify-start gap-4 items-center'>

                <Link href={`#${article.id}`} className="text-sm text-slate-400" >
                {article.id}
                </Link>
              <li>
                <Link href={`${article.id}`} className={`block px-2 py-1  ${activeSection === article.id ? 'font-semibold text-[#39ae44]' : 'text-gray-700'}`} >
                {article.title}
                </Link>
              </li>
              </Container>
            
            ))}
          </ul>
      </Container>
      <Container className="flex flex-col   items-start ml-4 md:ml-52 lg:ml-80 lg:pr-5 ">
        <Container className=' leading-relaxed mb-6 flex flex-col gap-4'>
          <Typography className='leading-relaxed text-[#39ae44]' component='h3' variant='title-lg'>Contrats</Typography>
          <Typography className='text-[#424242]' component='h5' variant='title-sm'>Pour Clients,</Typography>
          <Typography component='p' className='flex flex-col leading-relaxed' variant='body-base'>
            Contrat de service d'apprentissage à domicile<br/>
            <span className=''>Entre</span><br/>
            Monyaya, société par actions simplifiée dont le siège social est situé [adresse],représentée par [nom du représentant légal], en qualité de [fonction],<br/>
            <span className='font-semibold'>{"D'une part,"}</span><br/>et [Nom du client], [qualité du client], demeurant [adresse],
            <br/><span className='font-bold'>{"D'autre part,"}</span><br/> il a été conclu le présent contrat de service d'apprentissage à domicile, ci- après dénommé le "Contrat".
          </Typography>
        </Container>
       
        {termOfUse.map(section => (
          <div id={section.id} key={section.id} className="mb-10">
            <Typography className="text-3xl font-bold mb-4 text-[#39ae44]">{section.title}</Typography>
            <Typography className='leading-relaxed' variant='body-base'>{section.content}</Typography>
          </div>
        ))}
      </Container>
     
    </main>
  );
}

