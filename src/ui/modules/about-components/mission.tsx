import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import studentImage from "../../../../public/OIP (4).jpg";
export default function MissionSection() {
  return (
    <Container className="flex flex-col lg:flex-row-reverse lg:justify-between max-w-full md:items-center gap-8  py-4 lg:py-10 bg-secondary-50 lg:px-[7vw]">
      <Container className="lg:w-1/2 flex flex-col justify-between items-center gap-8">
        <Typography
          className="text-[#39ae44] text-3xl font-semibold"
          component="h4"
          variant="title-lg"
        >
          Notre Mission
        </Typography>
        <Typography
          className="leading-relaxed text-lg"
          component="p"
          variant="body-base"
        >
          Notre mission est de toucher chaque individu de la RDC dans un premier
          temps, puis d'élargir notre horizon au fil du temps. Parce que nous
          croyons que tout le monde mérite d'apprendre quelque chose de nouveau,
          notre mission est de rapprocher les apprenants et les mentors en
          créant des connexions au niveau local, pour faciliter l'accès à
          l'éducation et l'enrichissement personnel.
        </Typography>
      </Container>
      <Container className="lg:w-1/2">
        <Image
          width={500}
          src={studentImage}
          height={300}
          alt="image"
          className="rounded-2xl "
        />
      </Container>
    </Container>
  );
}
