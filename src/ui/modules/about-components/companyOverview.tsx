import { BgImg } from "@/ui/components/bg-img/bg-img";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";

export default function CompanyOverview() {
  return (
    <Container className="w-full flex flex-col lg:flex-row justify-between items-center px-4 lg:px-[7vw] py-6">
      <Container className="py-4 w-full lg:w-1/2">
        <Typography
          className="text-[#737373] text-sm md:text-base"
          component="span"
          variant="title-sm"
        >
          À propos de nous
        </Typography>
        <Typography
          className="py-2 lg:text-6xl text-4xl font-semibold"
          component="h3"
        >
          C&apos;est quoi monyaya ?
        </Typography>
        <Container>
          <Typography
            className="py-4 text-justify md:text-left text-base md:text-lg"
            component="p"
          >
            Monyaya est bien plus qu&apos;une simple plateforme de mise en
            relation. C&apos;est une communauté dynamique qui connecte les
            passionnés et les apprenants à travers des services
            d&apos;apprentissage disponibles directement au domicile du client
            ou dans tout autre lieu de son choix. Notre objectif est de créer
            des connexions significatives entre ceux qui souhaitent apprendre et
            ceux qui possèdent les connaissances nécessaires, en leur offrant un
            service personnalisé répondant à leurs besoins réels.
          </Typography>
          <Typography
            className="py-4 text-justify md:text-left text-base md:text-lg"
            component="p"
          >
            <span>Alors, Apprenez ce que vous aimez et où vous voulez </span>:
            Que vous rêviez d&apos;apprendre un instrument de musique, de
            maîtriser une nouvelle langue étrangère ou de perfectionner une
            compétence particulière, nous mettons à votre disposition des
            experts qualifiés qu&apos;on appelle ici “yayaˮ, d&apos;où le nom de
            “mon_yayaˮ, prêts à partager leur passion, chez vous ou dans le lieu
            de votre choix.
          </Typography>
        </Container>
      </Container>

      {/* Image */}
      <Container className="mt-6 lg:mt-0 w-full lg:w-1/2 flex justify-center">
        <BgImg
          src="/hero-img-from-about.png"
          alt={"aboutUs"}
          className="w-[18rem] h-[20rem] sm:w-[20rem] sm:h-[25rem] md:w-[25rem] md:h-[30rem] lg:w-[32rem] lg:h-[32rem] overflow-hidden"
          classNameImg="w-full h-full"
        />
      </Container>
    </Container>
  );
}
