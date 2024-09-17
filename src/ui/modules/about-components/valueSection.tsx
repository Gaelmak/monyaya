import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";

export default function ValueSection() {
  return (
    <Container className="flex flex-col justify-center items-center bg-secondary-50 py-8 lg:px-[7vw]">
      {/* Titre */}
      <Typography
        className="text-[#39ae44] text-2xl md:text-3xl font-semibold"
        component="h4"
        variant="title-lg"
      >
        Nos Valeurs
      </Typography>

      {/* Valeurs */}
      <Container className="flex flex-col md:flex-wrap lg:flex-nowrap justify-center items-center lg:items-stretch px-4 lg:flex-row gap-12 lg:gap-20 py-12 lg:px-8 w-full">
        {/* Valeur 1 */}
        <Container className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-white rounded-2xl shadow-2xl p-6 hover:shadow-none transition-shadow duration-300">
          <Typography
            className="text-[#39ae44] text-xl md:text-2xl font-semibold"
            variant="title-base"
            component="h4"
          >
            Partage
          </Typography>
          <Typography
            component="p"
            variant="body-base"
            className="text-sm leading-relaxed mt-4 text-center"
          >
            <span className="font-semibold hover:text-[#39ae44] transition-colors">
              {"Il y'a plus de bonheur à donner qu'à recevoir "}
            </span>
            :<br />
            Nous croyons que le véritable bénéfice réside dans le partage des
            connaissances et l&apos;acte de donner. En offrant nos compétences
            et notre expertise, nous contribuons au bonheur des autres et à
            notre propre épanouissement.
          </Typography>
        </Container>

        {/* Valeur 2 */}
        <Container className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-white rounded-2xl shadow-2xl p-6 hover:shadow-none transition-shadow duration-300">
          <Typography
            className="text-[#39ae44] text-xl md:text-2xl font-semibold"
            variant="title-base"
            component="h4"
          >
            Apprentissage
          </Typography>
          <Typography
            component="p"
            variant="body-base"
            className="text-sm leading-relaxed mt-4 text-center"
          >
            <span className="font-semibold hover:text-[#39ae44] transition-colors">
              {"L'envie et la capacité d'apprendre"}
            </span>
            :<br />
            Nous croyons que chacun a la capacité d&apos;apprendre et
            d&apos;enseigner. Nous encourageons l&apos;envie d&apos;apprendre et
            reconnaissons que ceux qui apprennent aujourd&apos;hui peuvent
            devenir les enseignants de demain, créant ainsi une chaîne
            d&apos;apprentissage sans fin.
          </Typography>
        </Container>

        {/* Valeur 3 */}
        <Container className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-white rounded-2xl shadow-2xl p-6 hover:shadow-none transition-shadow duration-300">
          <Typography
            className="text-[#39ae44] text-xl md:text-2xl font-semibold"
            variant="title-base"
            component="h4"
          >
            Confiance
          </Typography>
          <Typography
            component="p"
            variant="body-base"
            className="text-sm leading-relaxed mt-4 text-center"
          >
            <span className="font-semibold hover:text-[#39ae44] transition-colors">
              {"Confiance mutuelle"}
            </span>
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
