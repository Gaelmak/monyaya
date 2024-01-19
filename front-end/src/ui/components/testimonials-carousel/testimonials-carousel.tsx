"use client"; // <===== REQUIRED

import React from "react";

// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Container } from "../container/container";
import { Typography } from "../typography/typography";
import { Testimony } from "@/types/testimony";
import Image from "next/image";

import DefaultImage from '../../../../public/rekreatioon.jpg'
import { AlignStartVertical, Quote } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Stars } from "../stars/stars";

interface CarouselProps {
  data: Testimony[];
}

export const TestimonialsCarousel : React.FC<CarouselProps> = ({ data }) => {

  const Element = (
    <>
      {
        data.map(({id, name, position, company, message, imgUrl, stars}) => 
          <SwiperSlide key={id} className="p-4 my-12 flex flex-col rounded bg-white gap-4 relative drop-shadow-xl">
            <Container className="flex justify-end">
              <Quote className="text-primary-Default mb-4" size={50} />
            </Container>
            <Container className="h-[20vh] md:h-[10vh]">
              <Typography variant="body-sm">{message}</Typography>
            </Container>
            <Container className="flex flex-row gap-2 items-center justify-between pt-4 border-t-2 border-white_powder">
              <Container className="flex gap-4 flex-row items-center">
                <Container className="flex justify-center items-center">
                {
                  imgUrl ?
                  <Container className="w-[40px] h-[40px] flex rounded-full overflow-hidden">
                    <Image src={imgUrl} alt="Default image" className="h-full"/>
                  </Container>
                  :
                  <Container className="w-[40px] h-[40px] flex rounded-full overflow-hidden">
                    <Image src={DefaultImage} alt="Default image" className="h-full"/>
                  </Container>
                }
                </Container>

                <Container className="flex flex-col gap-2">
                  <Typography variant="title-sm" component="h4">{name}</Typography>
                  <Typography variant="body-sm" className="text-secondary-200">{position} - {company}</Typography>
                </Container>
              </Container>
              <Container>
                  <Stars rate={stars} color="#ffdf00" />
                </Container>
            </Container>
          </SwiperSlide>
        )
      }
    </>
  )

  return (
    <>
    <Container className="relative hidden md:block">
      <Swiper
        autoplay={true}
        data-swiper-autoplay={"2000"}
        slidesPerView={3}
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
      >
        {Element}
      </Swiper>
    </Container>
    <Container className="relative block md:hidden">
      <Swiper
        autoplay={true}
        data-swiper-autoplay={"2000"}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={8}
      >
        {Element}
      </Swiper>
    </Container>
    </>
  );
};
