import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import studentImage from "../../../../public/oip.jpg";
export default function VisionSection() {
  return (
    <Container className=" lg:px-[7vw] flex flex-col-reverse lg:flex-row-reverse max-w-full lg:justify-between  items-center gap-8 lg:my-10 p-8 ">
      <Container className="">
        <Image
          width={500}
          src={studentImage}
          height={300}
          alt="image"
          className="rounded-2xl "
        />
      </Container>
      <Container className="lg:w-1/2 flex flex-col justify-between items-center gap-8">
        <Typography
          className="text-[#39ae44] font-semibold text-3xl"
          component="h4"
          variant="title-lg"
        >
          Notre Vision
        </Typography>
        <Typography
          className="leading-relaxed text-lg"
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
          enseigner à d&apos;autres demain
        </Typography>
      </Container>
    </Container>
  );
}
