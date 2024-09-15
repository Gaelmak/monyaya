import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";

export default function ValueSection() {
  return (
    <Container className="lg:px-[7vw] flex flex-col  justify-center items-center bg-secondary-50 py-8">
      <Typography
        className="text-[#39ae44] text-3xl font-semibold "
        component="h4"
        variant="title-lg"
      >
        Nos Valeurs
      </Typography>
      <Container className="lg:px-8 md:px-3 lg:w-full py-20 flex flex-col  md:flex-wrap lg:flex-nowrap  md:justify-center md:items-center lg:flex-row gap-20">
        <Container className="flex justify-center items-center  lg:w-1/3 md:w-full flex-col md:bg-white md:rounded-2xl  md:shadow-2xl  md:p-4 hover:shadow-none">
          <Typography
            className="text-[#39ae44] md:p-4 text-2xl font-semibold"
            variant="title-base"
            component="h4"
          >
            Partage
          </Typography>
          <Typography
            component="p"
            variant="body-base"
            className="md:px-2 md:py-8  py-3 leading-relaxed text-sm"
          >
            <span className="font-semibold hover:text-[#39ae44] text-sm">
              {"Il y'a plus de bonheur à donner qu'à recevoir "}
            </span>{" "}
            :<br />
            Nous croyons que le véritable bénéfice réside dans le partage des
            connaissances et l&apos;acte de donner. En offrant nos compétences
            et notre expertise, nous contribuons au bonheur des autres et à
            notre propre épanouissement.
          </Typography>
        </Container>
        <Container className="flex justify-center items-center  lg:w-1/3 md:w-full flex-col md:bg-white md:rounded-2xl  md:shadow-2xl hover:shadow-none  md:p-4">
          <Typography
            className="text-[#39ae44] md:p-4 text-2xl font-semibold"
            variant="title-base"
            component="h4"
          >
            Apprentissage
          </Typography>
          <Typography
            component="p"
            variant="body-base"
            className="md:px-3 md:py-6  text-start  py-3 leading-relaxed text-sm"
          >
            <span className="font-semibold hover:text-[#39ae44] text-sm">
              {"L'envie et la capacité d'apprendre"}{" "}
            </span>
            :<br />
            Nous croyons que chacun a la capacité d&apos;apprendre et
            d&apos;enseigner. Nous encourageons l&apos;envie d&apos;apprendre et
            reconnaissons que ceux qui apprennent aujourd&apos;hui peuvent
            devenir les enseignants de demain, créant ainsi une chaîne
            d&apos;apprentissage sans fin.
          </Typography>
        </Container>
        <Container className="flex justify-center items-center  lg:w-1/3 md:w-full flex-col md:bg-white md:rounded-2xl  md:shadow-2xl hover:shadow-none  md:p-4">
          <Typography
            className="text-[#39ae44] text-2xl font-semibold"
            variant="title-base"
            component="h4"
          >
            Confiance
          </Typography>
          <Typography
            component="p"
            variant="body-base"
            className="md:px-3 md:py-2 text-justify lg:text-start  py-3 leading-relaxed text-sm"
          >
            <span className="font-semibold hover:text-[#39ae44] text-sm">
              {"Confiance mutuelle"}
            </span>{" "}
            :<br />
            Nous plaçons la confiance au cœur de notre communauté Monyaya. Nous
            croyons en l&apos;importance d&apos;une relation de confiance entre
            nos &apos;yayas&apos; et nos clients. Nous nous engageons à créer un
            environnement où la confiance est primordiale, permettant aux
            apprenants de se sentir en sécurité et aux mentors de partager leurs
            connaissances en toute sérénité.
          </Typography>
        </Container>
      </Container>
    </Container>
  );
}
