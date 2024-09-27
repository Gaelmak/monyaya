import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import Image from "next/image";
import studentImage from "../../../../public/oip.jpg";

export default function MissionSection() {
  return (
    <Container className="w-full flex flex-col lg:flex-row-reverse lg:justify-between items-center gap-6 lg:gap-8 py-6 lg:py-10 bg-secondary-50 px-4 lg:px-[7vw]">
      <Container className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-4 lg:gap-8">
        <Typography
          className="text-[#39ae44] text-2xl md:text-3xl font-semibold"
          component="h4"
          variant="title-lg"
        >
          Notre Mission
        </Typography>
        <Typography
          className="leading-relaxed text-base md:text-lg text-justify md:text-left"
          component="p"
          variant="body-base"
        >
          Notre mission est de toucher chaque individu de la RDC dans un premier
          temps, puis d&apos;élargir notre horizon au fil du temps. Parce que
          nous croyons que tout le monde mérite d&apos;apprendre quelque chose
          de nouveau, notre mission est de rapprocher les apprenants et les
          mentors en créant des connexions au niveau local, pour faciliter
          l&apos;accès à l&apos;éducation et l&apos;enrichissement personnel.
        </Typography>
      </Container>

      {/* Bloc Image */}
      <Container className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <Image
          width={500}
          src={studentImage}
          height={300}
          alt="image"
          className="rounded-2xl w-full h-auto object-cover"
        />
      </Container>
    </Container>
  );
}
