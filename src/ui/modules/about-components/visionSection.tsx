import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import studentImage from "public/img/WhatsApp Image 2024-09-18 à 22.00.51_a23d5a6b.jpg";

export default function VisionSection() {
  return (
    <Container className="flex w-full flex-col-reverse lg:flex-row-reverse justify-between items-center gap-6 lg:gap-8 lg:px-[7vw] p-6 lg:py-10 max-w-full bg-secondary-50">
      <Container className="w-full lg:w-1/2 flex justify-center lg:justify-start">
        <Image
          width={500}
          src={studentImage}
          height={300}
          alt="image"
          className="rounded-2xl w-full h-auto object-cover"
        />
      </Container>

      {/* Bloc Texte */}
      <Container className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4 lg:gap-8">
        <Typography
          className="text-[#39ae44] font-semibold text-2xl md:text-3xl"
          component="h4"
          variant="title-lg"
        >
          Notre Vision
        </Typography>
        <Typography
          className="leading-relaxed text-base md:text-lg text-justify md:text-left"
          component="p"
          variant="body-base"
        >
          Notre vision est de devenir la plateforme numéro un
          d&apos;apprentissage, le réflexe naturel pour toute personne
          souhaitant acquérir de nouvelles compétences. Nous voulons que nos
          utilisateurs n&apos;aient plus besoin d&apos;être qualifiés ou de
          parcourir de longues distances pour apprendre. Grâce à un simple clic,
          un &apos;yaya&apos; (mentor) sera à leur disposition, prêt à les
          accompagner dans leur parcours d&apos;apprentissage. Notre vision est
          de toucher chaque individu et de créer une chaîne continue
          d&apos;apprentissage, où ceux qui apprennent aujourd&apos;hui pourront
          enseigner à d&apos;autres demain.
        </Typography>
      </Container>
    </Container>
  );
}
