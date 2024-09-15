"use client";

import React from "react";
import Slider from "react-slick";
import { ListOfTestimonials } from "@/lib/testimonials-list/list-of-testimonials";
import Image from "next/image";
import defaultImage from "public/default_avatar.jpg";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TestimonialCarousel: React.FC = () => {
  return (
    <Container className=" bg-white py-18 w-full px-4 lg:px-[7vw]">
      <Slider {...settings}>
        {ListOfTestimonials.map((testimonial, index) => (
          <Container key={index} className="flex flex-col p-4 rounded">
            <Container className="flex justify-start items-center gap-8 my-8">
              <Container className="flex  justify-start items-center gap-4 py-4">
                <Image
                  src={testimonial.imgUrl ?? defaultImage}
                  width={64}
                  height={64}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border mx-auto object-cover"
                />
                <Container className="flex justify-between items-center flex-col">
                  <Typography
                    className="font-semibold text-center mt-4 from-neutral-700"
                    variant="title-xs"
                    component="h5"
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    className="text-xs"
                    variant="body-sm"
                    component="span"
                  >
                    {testimonial.position} <span>{testimonial.company}</span>
                  </Typography>
                </Container>
              </Container>
            </Container>
            <Typography
              className="mb-2 leading-relaxed py-3 text-[#535353]"
              variant="body-sm"
              component="span"
            >
              {testimonial.message}
            </Typography>
            <span>{testimonial.stars}</span>
          </Container>
        ))}
      </Slider>
    </Container>
  );
};

export default TestimonialCarousel;
