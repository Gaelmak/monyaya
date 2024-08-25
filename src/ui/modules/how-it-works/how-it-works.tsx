'use client'

import { Container } from "@/ui/components/container/container"
import { Typography } from "@/ui/components/typography/typography"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { HowItWorks_BecomeATrainer, HowItWorks_SuscribeToTraining } from '@/lib/how-it-works/how-it-works'

export const HowItWorks = () => {
  return(
    <Container className="flex flex-col gap-8 px-4 md:px-8 py-16 bg-secondary-950">
      <Container className="basis-1/3">
        <Typography variant="title-lg" className="text-white text-center md:text-left">Découvrez comment ça marche ?</Typography>
      </Container>
      <Container className="basis-2/3">
        <Tabs defaultValue='suscribe-to-training' className='w-full bg-white rounded p-4 md:p-8 shadow-lg'>
          <TabsList className='w-full grid grid-cols-2'>
            <TabsTrigger value='suscribe-to-training' className='basis-1/2 rounded'>
              <Typography className="flex-wrap hidden md:block">Souscrire à une formation</Typography>
              <Typography className="flex-wrap md:hidden">Souscrire<br/>à une formation</Typography>
            </TabsTrigger>
            <TabsTrigger value='become-a-trainer' className='basis-1/2 rounded'>
              <Typography className="flex-wrap hidden md:block">Devenir formateur</Typography>
              <Typography className="flex-wrap md:hidden">Devenir<br/>formateur</Typography>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='suscribe-to-training'>
            <Container className='flex flex-col gap-4 py-8'>
              {HowItWorks_SuscribeToTraining.map(({title, Icon, description}) => (
                <Container key={title} className="flex flex-row gap-4">
                  <Container>
                    {Icon && <Icon className="text-primary-Default"/>}
                  </Container>
                  <Container>
                    <Typography>
                      {description}
                    </Typography>
                  </Container>
                </Container>
              ))}
            </Container>
          </TabsContent>
          <TabsContent value='become-a-trainer'>
            <Container className='flex flex-col gap-4 py-8'>
              {HowItWorks_BecomeATrainer.map(({title, Icon, description}) => (
                <Container key={title} className="flex flex-row gap-4">
                  <Container>
                    {Icon && <Icon className="text-primary-Default"/>}
                  </Container>
                  <Container>
                    <Typography>
                      {description}
                    </Typography>
                  </Container>
                </Container>
              ))}
            </Container>
          </TabsContent>

        </Tabs>
      </Container>
    </Container>
  )
}
