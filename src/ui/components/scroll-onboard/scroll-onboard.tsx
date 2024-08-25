'use client'

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';
import { Container } from '../container/container';
import { Buttons } from '../buttons/buttons';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  data?: {
    id: string,
    element: React.ReactNode,
  }[]
  className?: string
}

export const ScrollOnboard = ({
  data,
  className
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastElement, setLastElement] = useState(0)

  useEffect(() => {
    const content = document.querySelector<HTMLElement>('.content-scroll-animation');
    const slider: HTMLElement[] = gsap.utils.toArray(content ? content.children : null);
    setLastElement(slider.length)

    gsap.set(content, { x: `-${currentIndex * 100}%` });

  }, [currentIndex, lastElement]);

  return (
    <Container
      className={clsx("container-scroll-animation relative overflow-hidden", className)}
    >
      <Container
        className={clsx("content-scroll-animation flex h-full w-full")}
      >
        {
          data?.map(({ id, element }, index) => (
            <Container className='w-full h-full flex-shrink-0' key={id}>
              {element}
            </Container>
          ))
        }
      </Container>
      <Container className='absolute bottom-4 right-4'>
        <Container className='relative flex flex-row justify-between gap-4'>
          <Container className='basis-1/2 flex justify-start'>
            <Buttons
              variant='ghost'
              buttonType='action'
              disabled={currentIndex === 0}
              className={clsx(currentIndex === 0 && 'hidden')}
              action={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
            >
              Précédent
            </Buttons>
          </Container>
          <Container className='basis-1/2 flex justify-end'>
            <Buttons
              variant='ghost'
              buttonType='action'
              disabled={currentIndex === lastElement - 1 }
              action={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
              className={clsx(currentIndex === lastElement - 1 && 'hidden')}
            >
              Suivant
            </Buttons>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
