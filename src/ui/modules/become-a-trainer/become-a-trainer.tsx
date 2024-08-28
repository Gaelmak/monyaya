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
import { HoverCardArrow } from "@radix-ui/react-hover-card";


export const BecomeATrainer = async () => {
  const user = await userAuth();
  return (
    <Container className="bg-secondary-50 flex flex-col-reverse md:flex-row-reverse items-center justify-center gap-6 ">
      <Container className="flex  pb-24 md:pb-0">
        <Container className="rounded-b-full border-dashed border-2 border-primary-Default p-2 md:w-full m-auto">
          <Image src={yaya} width={300} height={300} alt="yaya" className="object-cover rounded-b-full"/>
        </Container>
      </Container>
      <Container className="px-4  py-10 md:py-24 flex flex-col md:w-3/5 gap-8">
        <Container className="flex flex-col items-start gap-2 text-center md:text-left">
          <Typography variant="title-base" className=" ">
          Vous êtes un enseignant certifié ? <br/> <span className="text-primary-Default"> devenez instructeur</span> .
          </Typography>
          <Typography className="">
          Partagez votre expertise et enrichissez votre parcours professionnel 
          en rejoignant notre plateforme conviviale et innovante, où vous pouvez 
          inspirer, éduquer, et avoir un impact en tant qu'instructeur certifié.
          </Typography>
        </Container>
        <Typography variant="title-base" className="">Bénéficiez de nombreux avantages</Typography>
        <Container className="grid grid-cols-2 md:grid-cols-2 gap-2 ">
          {OurBenefitsForTrainers.map(({ Icon, title, description }) => (
              <HoverCard key={title} >
                <Container className="">
                <HoverCardTrigger className="flex flex-row md:flex-row gap-4 py-4 cursor-pointer">
                <Container className="">
                  <Icon className="text-primary-50 bg-primary-Default rounded-full p-1" size={30} />
                </Container>
                <Container className="basis-5/6">
                  <Typography variant="title-sm">{title}</Typography>
                </Container>
                </HoverCardTrigger>
                <HoverCardContent className="bg-black rounded-xl -mt-7 -mb-4" >
                  <Typography className="text-primary-50  leading-relaxed ">{description}</Typography>
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
