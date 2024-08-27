import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { OurBenefitsForTrainers } from "@/lib/our-benefits/our-benefits";
import { SignInButton } from "@/routes/auth-buttons";
import { userAuth } from "@/lib/helper";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from "next/image";
import yaya from "../../../../public/yayaMonyaya.png"


export const BecomeATrainer = async () => {
  const user = await userAuth();
  return (
    <Container className="bg-secondary-50 flex flex-row-reverse items-center justify-between gap-8">
      <Container className=" flex items-center m-auto">
        <div className="rounded-b-full border-dashed border-2 border-primary-Default p-2 ">
          <Image src={yaya} width={300} height={300} alt="yaya" className="rounded-b-full"/>
        </div>
      </Container>
      <Container className="px-6 md:px-8 py-24 flex flex-col w-1/2 gap-8">
        <Container className="flex flex-col items-start gap-2">
          <Typography variant="title-base" className=" ">
          Vous êtes un enseignant certifié ? <br/> <span className=""> devenez instructeur</span> .
          </Typography>
          <Typography className="">
          Partagez votre expertise et enrichissez votre parcours professionnel 
          en rejoignant notre plateforme conviviale et innovante, où vous pouvez text-primary-Default
          inspirer, éduquer, et avoir un impact en tant qu'instructeur certifié.
          </Typography>
        </Container>
        <Container className="grid grid-cols-3 md:grid-cols-2 ">
          {OurBenefitsForTrainers.map(({ Icon, title, description }) => (
              <HoverCard key={title} >
                <Container className="gap-4">
                <HoverCardTrigger className="flex flex-row md:flex-row gap-4 py-4">
                <Container className="">
                  <Icon className="text-primary-50 bg-primary-Default rounded-full p-1" size={30} />
                </Container>
                <Container className="basis-5/6">
                  <Typography variant="title-sm">{title}</Typography>
                </Container>
                </HoverCardTrigger>
                <HoverCardContent className="bg-primary-700 rounded-xl">
                  <Typography className="text-primary-50">{description}</Typography>
                </HoverCardContent>
                </Container>
              </HoverCard>
            
          ))}
        </Container>
        {!user && (
          <Container className="w-full flex justify-start">
            <SignInButton/>
          </Container>
        )}
      </Container>
    </Container>
  );
};
