"use client";

import { Container } from "@/ui/components/container/container";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type CoursesToProps = {};

export default function CoursesToValidate(props: CoursesToProps) {
  return (
    <Container className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl md:text-3xl font-bold">Cours à valider</h2>
      <div className="p-6 rounded-lg bg-gray-50">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="animate-pulse bg-white border-gray-100">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {/* {index + 1} */}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Container>
  );
}
