"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container } from '@/ui/components/container/container';


const sections = [
    { id: 'section1', title: 'Section 1' },
    { id: 'section2', title: 'Section 2' },
    { id: 'section3', title: 'Section 3' },
    { id: 'section4', title: 'Section 4' },
    { id: 'section5', title: 'Section 5' },
    { id: 'section6', title: 'Section 6' }
  ];
export default function TermOfUse() {
    const [activeSection, setActiveSection] = useState<string>(sections[0].id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offset = 100; 
  
      sections.forEach(section => {
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
    <main className=" flex w-full ">
        <Container className=" w-1/4 fixed bg-gray-100 p-4 -z-20 h-[calc(90vh-64px)]">
        <ul>
          {sections.map(section => (
            <li key={section.id}>
              <Link className={`block p-2 ${activeSection === section.id ? 'bg-blue-500 text-white' : 'text-gray-700'}`} href={`#${section.id}`}>
              {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <div className="flex flex-col sticky justify-end items-center  ml-80   overflow-y-auto">
        {sections.map(section => (
          <div id={section.id} key={section.id} className="mb-20">
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <p> {section.title} Lorem ipsum dolor sit amet consectetur, 
              adipisicing elit. Quasi, voluptas culpa architecto facere, 
              vel maiores iure sint totam ullam numquam magni libero at 
              est porro, mollitia inventore repellendus repudiandae. Dolorum 
              voluptates, non debitis odio porro exercitationem. Error amet 
              aut, quis dicta animi ducimus eaque explicabo iure minima eum 
              ipsum laborum porro aliquam nihil alias! Aut aliquid temporibus 
              ut? Ipsa, omnis illum. Dicta ad sed quae, non voluptas est illum 
              earum officiis deleniti rerum possimus dolore itaque perspiciatis 
              reiciendis nesciunt. Laborum iste modi assumenda eius atque enim 
              consequuntur voluptatem qui. Omnis, repellendus. Ratione voluptas 
              ipsa corrupti laborum, alias suscipit quaerat omnis.</p>
          </div>
        ))}
      </div>
     
    </main>
  );
}

