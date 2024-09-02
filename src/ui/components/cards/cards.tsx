import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Typography } from '../typography/typography';
import { BedDouble, Hotel, LocateFixed, Timer } from 'lucide-react';
import { Container } from '../container/container';

interface Props {
  bedroom: {};
}

let description =
  'Chambre, salon, wifi inclus, ... Description complete de la chambre mise en location';
export const Cards = ({ bedroom }: Props) => {
  return (
    <>
      {/* {
        bedroom.map(room => 
          <Card key={room.id} className="rounded w-full h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{room.name}</CardTitle>
              <CardDescription>
                {description}
              </CardDescription>
              <Container className="flex flex-col gap-1">
                {room.stars ? <Stars rate={room.stars} color="#7386be"/> : null}
                <Container className="flex flex-row gap-2 items-end text-gray-400">
                  <Hotel className="h-4 w-4"/>
                  <Typography variant="body-base" component="p" className="w-[280px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-400">
                    {room.establishment}
                  </Typography>
                </Container>
                <Container className="flex flex-row gap-2 items-end text-gray-400">
                  <LocateFixed className="h-4 w-4"/>
                  <Typography variant="body-base" component="p" className="w-[280px] whitespace-nowrap overflow-hidden text-ellipsis text-gray-400">
                    {room.address}{' ('}{room.distance}{')'} 
                  </Typography>
                </Container>
                <Container className="flex flex-row gap-2 items-end text-primary-Default">
                  <Timer className="h-4 w-4"/>
                  <Typography variant="body-base" component="p" className="whitespace-nowrap overflow-hidden text-ellipsis" color="primary">
                    {room.niche}
                  </Typography>
                </Container>
              </Container>
            </CardHeader>
            <CardContent className="text-center">
              <Typography variant="title-lg" component="h1">{room.price.toFixed(2)} $</Typography>
            </CardContent>
            <CardFooter>
              <Button Icon={BedDouble} className="w-full">Reserver</Button>
            </CardFooter>
          </Card>
        )
      } */}
    </>
  );
};
