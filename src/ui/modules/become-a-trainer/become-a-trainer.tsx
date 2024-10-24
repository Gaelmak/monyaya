import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { OurBenefitsForTrainers } from "@/lib/our-benefits/our-benefits";
import { SignInButton } from "@/routes/auth-buttons";
import { userAuth } from "@/lib/helper";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import yaya from "../../../../public/yayaMonyaya.png";

export const BecomeATrainer = async () => {
  const user = await userAuth();
  return (
    <Container className="bg-secondary-50 flex flex-col-reverse md:flex-row-reverse items-center justify-center w-full ">
      <Container className="flex pb-24 md:pb-0">
        <Container className="rounded-b-full hidden md:block border-dashed border-2 border-primary-Default p-2 md:w-full m-auto">
          <Image
            src={yaya}
            width={300}
            height={300}
            alt="yaya"
            className="object-cover rounded-b-full"
          />
        </Container>
      </Container>
      <Container className="px-4  py-10 md:py-24 flex flex-col w-full md:w-3/5 gap-8">
        <Container className="flex flex-col items-start gap-2 text-center md:text-left">
          <Typography className="text-center md:text-left text-2xl md:text-3xl font-semibold">
            Vous êtes prêt à transmettre vos connaissances ? <br />
            <span className="text-primary-Default"> Devenez formateur</span>.
          </Typography>
          <Typography className="text-base md:w-4/5">
            Partagez votre expertise et enrichissez votre parcours professionnel
            en rejoignant notre plateforme conviviale et innovante, où vous
            pouvez inspirer, éduquer, et avoir un impact en tant
            qu&apos;instructeur certifié.
          </Typography>
        </Container>
        <Typography className="text-center md:text-left text-xl md:text-3xl font-semibold">
          Bénéficiez de nombreux avantages
        </Typography>
        <Container className="grid-cols-2  gap-2 hidden xl:grid">
          {OurBenefitsForTrainers.map(({ Icon, title, description }) => (
            <HoverCard key={title} openDelay={300}>
              <Container className="">
                <HoverCardTrigger className="flex flex-row md:flex-row gap-2 md:gap-4 py-3 cursor-pointer">
                  <Container className="">
                    <Icon
                      className="text-primary-50 bg-primary-Default rounded-full p-1"
                      size={30}
                      strokeWidth={1}
                    />
                  </Container>
                  <Container className="basis-5/6">
                    <Typography className="text-lg font-semibold">
                      {title}
                    </Typography>
                  </Container>
                </HoverCardTrigger>
                <HoverCardContent className="bg-primary-50 rounded-xl -mt-5 -mb-5">
                  <Typography className="text-black  leading-relaxed">
                    {description}
                  </Typography>
                </HoverCardContent>
              </Container>
            </HoverCard>
          ))}
        </Container>
        <Container className="grid grid-cols-2  gap-2 xl:hidden">
          {OurBenefitsForTrainers.map(({ Icon, title, description }, index) => (
            <>
              <Popover key={index}>
                <PopoverTrigger className="flex flex-row md:flex-row gap-2 md:gap-4 py-3 cursor-pointer text-left">
                  <Container className="">
                    <Icon
                      className="text-primary-50 bg-primary-Default rounded-full p-1"
                      size={30}
                      strokeWidth={1}
                    />
                  </Container>
                  <Typography className="text-sm font-semibold">
                    {title}
                  </Typography>
                </PopoverTrigger>
                <PopoverContent className="bg-primary-50 rounded-xl -mt-5 -mb-5">
                  <Typography className="text-black  leading-relaxed">
                    {description}
                  </Typography>
                </PopoverContent>
              </Popover>
            </>
          ))}
        </Container>
        {!user && (
          <Container className="w-full flex justify-start">
            <SignInButton />
          </Container>
        )}
      </Container>
    </Container>
  );
};
