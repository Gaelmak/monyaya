'use client'

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { SliderContents } from '@/types/slider-contents';
import { Container } from '../container/container';
import clsx from 'clsx';
import { Typography } from '../typography/typography';
import { Buttons } from '../buttons/buttons';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface Props {
  contents? : SliderContents[]
  className? : string
}

export const Scroll = ({
  contents,
  className
}:Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastElement, setLastElement] = useState(0)

  useEffect(() => {
    const content = document.querySelector<HTMLElement>('.content-scroll-animation');
    const slider : HTMLElement[] = gsap.utils.toArray(content? content.children : null);
    setLastElement(slider.length)

    gsap.set(content, { y: `-${currentIndex * 100}%` });

  }, [currentIndex, lastElement]);

  return (
    <Container
      className={clsx("container-scroll-animation h-full relative overflow-hidden", className)}
    >
      <Container
        className={clsx("h-full content-scroll-animation")}
      >
        {
          contents?.map(({title, id, description, Icon, bgColor, color}) =>
            <Container key={id} className={clsx("w-full h-full rounded", bgColor ? bgColor : 'bg-white', color ? color : 'text-black')}>
              <Container className='h-full flex flex-col p-4 gap-4 md:gap-8 justify-center items-center'>
                <Container>
                  {
                    title ?
                    <Typography variant='title-base' component='h2'>
                      {title}
                    </Typography>
                    : null
                  }
                </Container>
                <Container>
                  <Container>
                    {
                      description?
                      <Typography variant='body-base' component='p'>
                        {description}
                      </Typography>
                      : null
                    }
                    {
                      Icon ?
                      <Icon className={clsx( description || title ? 'w-16 h-16' : 'w-24 h-24' )} />
                      : null
                    }
                  </Container>
                </Container>
              </Container>
            </Container>
          )
        }
      </Container>
      <Container className='absolute bottom-4 right-4'>
        <Container className='relative flex flex-col justify-between gap-4'>
          <Container className='basis-1/2 flex justify-start-start'>
            <Buttons
              variant='ghost'
              buttonType='action' 
              disabled = {currentIndex === 0 ? true : false}
              action={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
              Icon={ArrowUp}
            />
          </Container>
          <Container className='basis-1/2 flex justify-end'>
            <Buttons 
              variant='ghost'
              buttonType='action'
              disabled = {currentIndex === lastElement - 1 ? true : false}
              action={() => setCurrentIndex((prevIndex) => prevIndex + 1)} 
              Icon={ArrowDown}
            />
          </Container>
          </Container>
      </Container>
    </Container>
  );
};

