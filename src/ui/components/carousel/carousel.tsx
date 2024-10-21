import {
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import clsx from 'clsx';
import { Container } from '../container/container';
interface Props {
  data: {
    id: string;
    element: React.ReactNode;
  }[];
  className?: string;
}
export const Carousel = ({ data, className }: Props) => {
  return (
    <ShadcnCarousel
      opts={{
        align: 'start',
      }}
      className="w-[100vw] h-[100vh] relative"
    >
      <CarouselContent className="">
        {data.map(({ id, element }) => (
          <CarouselItem key={id} className="w-full">
            <Container className={clsx(className)}>{element}</Container>
          </CarouselItem>
        ))}
      </CarouselContent>
      <Container className="absolute bottom-16 left-16 flex flex-row justify-center items-center">
        <CarouselPrevious className="md:flex hidden" />
        <CarouselNext className="md:flex hidden" />
      </Container>
    </ShadcnCarousel>
  );
};
