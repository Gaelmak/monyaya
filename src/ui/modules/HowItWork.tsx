'use client';

import { Container } from '@/ui/components/container/container';
import Image from 'next/image';
import imageHowItWork from '../../../public/etudiant-positif-peau-foncee-porte-dossiers-livre-pointe-expression-joyeuse-cote-sourire-pleines-dents.png';
import imageW from '../../../public/jeune-femme-coupe-cheveux-afro-portant-pull-rose-tenant-manuels.png';
import {
  HowItWorks_BecomeATrainer,
  HowItWorks_SuscribeToTraining,
} from '@/lib/how-it-works/how-it-works';
import { Typography } from '../components/typography/typography';

export const HowItWork = () => {
  return (
    <Container className="flex flex-col md:flex-col gap-8 px-4 md:px-[7vw] py-16 md:py-8  bg-primary-400 w-full">
      <Container className="flex justify-between flex-col gap-3 items-center pb-4">
        <Typography className="text-2xl  font-bold text-primary-50 text-center">
          Comment Rejoindre Monyaya ?
        </Typography>
        <Typography className=" text-primary-50  md:w-1/2 text-sm text-center">
          Devenez expert dans un domaine de votre choix !<br /> La meilleure
          façon de créer de la valeur est de devenir soi-même une valeur.
        </Typography>
      </Container>

      <Container className="relative  flex flex-col-reverse md:flex-row-reverse items-center justify-between md:space-x-4 w-full py-3">
        <Container className="pt-4 md:pt-0">
          <Image
            src={imageW}
            width={400}
            height={400}
            alt="howItWorks"
            className="object-right"
          />
        </Container>
        <Container className="relative bg-white text-primary-Default p-4 md:w-1/2 rounded-xl  md:rounded-br-full md:rounded-bl-full  md:rounded-tr-full">
          <Container className="flex flex-col gap-4 py-8 md:px-[8vh] w-full">
            {HowItWorks_SuscribeToTraining.map(
              ({ title, Icon, description }) => (
                <Container
                  key={title}
                  className="flex flex-row gap-4 justify-center items-center"
                >
                  <Container>
                    {Icon && <Icon className="text-primary-Default" />}
                  </Container>
                  <Container>
                    <Typography className="font-medium">
                      {description}
                    </Typography>
                  </Container>
                </Container>
              )
            )}
          </Container>
          <Container className="hidden md:flex absolute top-1/2 right-0 -mr-9 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[40px] border-l-white"></Container>
        </Container>
      </Container>
      <Container className="flex flex-col-reverse w-full">
        <Typography className=" font-bold text-primary-50 text-xl">
          Vous voulez devenir YAYA ?
        </Typography>
        <Container className="relative flex flex-col-reverse md:flex-row items-center justify-between space-x-4 w-full">
          <Container className="pt-4 md:pt-0">
            <Image
              src={imageHowItWork}
              width={400}
              height={400}
              alt="howItWorks"
              className="object-cover"
            />
          </Container>
          <Container className="relative bg-white text-primary-Default p-4 md:w-1/2 w-full  rounded-xl md:rounded-br-full md:rounded-bl-full  md:rounded-tl-full">
            <Container className="flex flex-col gap-4 py-8 md:px-[8vh] w-full">
              {HowItWorks_BecomeATrainer.map(({ title, Icon, description }) => (
                <Container
                  key={title}
                  className="flex flex-row gap-4 justify-center items-center"
                >
                  <Container>
                    {Icon && <Icon className="text-primary-Default" />}
                  </Container>
                  <Container>
                    <Typography className="font-medium">
                      {description}
                    </Typography>
                  </Container>
                </Container>
              ))}
            </Container>
            <Container className="hidden md:flex absolute top-1/2 left-0 -ml-8 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[40px] border-r-white"></Container>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};
