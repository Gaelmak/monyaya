import { PrivacyPolicy } from "@/lib/terme-of-use-data/term-of-use";
import { Typography } from "@/ui/components/typography/typography";

export default function TermOfUse() {
  return (
    <main className="flex justify-center max-w-full select-none w-full lg:px-[7vw] py-8 md:py-12 px-4">
      <div className="flex flex-col md:w-2/3 lg:w-4/6">
        <div className="leading-relaxed mb-6 flex flex-col gap-4">
          <Typography
            className="leading-relaxed text-[#39ae44] text-2xl md:text-4xl font-bold"
            component="h1"
          >
            Politique de confidentialité de Monyaya
          </Typography>
          <div className="flex flex-col leading-relaxed">
            <em>
              La dernière mise à jour de la présente Politique de
              confidentialité date du 3 décembre 2024.
            </em>
            <p>
              Merci d’avoir choisi Monyaya. Chez Monyaya (<b>Monyaya</b>,{" "}
              <b>nous</b>, <b>notre</b>), nous respectons votre vie privée, et
              il est important pour nous que vous compreniez comment nous
              collectons, utilisons et partageons vos données. La présente
              Politique de confidentialité décrit nos pratiques en matière de
              collecte de données et vos droits relatifs à l’utilisation de vos
              données personnelles. Sauf mention contraire ou renvoi vers une
              autre politique, cette Politique de confidentialité s’applique
              lorsque vous visitez ou utilisez le site Web de Monyaya, ses
              applications mobiles, ses API ou ses services associés (les{" "}
              <b>Services</b>). Elle s’applique également aux utilisateurs
              potentiels et aux clients intéressés par les expériences
              d’apprentissage proposées via notre plateforme.{" "}
              <b>
                En utilisant nos Services, vous acceptez les conditions énoncées
                dans cette Politique de confidentialité.
              </b>
              N’utilisez pas les Services si vous n’acceptez pas cette Politique
              de confidentialité ou tout autre contrat régissant votre
              utilisation des Services.
            </p>
          </div>
        </div>
        {PrivacyPolicy.map((section, index) => (
          <div id={section.id} key={index} className="mb-10 ppolitic">
            <div className="mb-4 text-[#39ae44] text-xl font-semibold">
              {section.title}
            </div>
            <div className="leading-relaxed">{section.content}</div>
          </div>
        ))}
        <Typography
          component="p"
          className="flex flex-col leading-relaxed"
          variant="body-base"
        >
          En utilisant la plateforme Monyaya, vous reconnaissez avoir lu et
          accepté les présentes conditions.
        </Typography>
      </div>
    </main>
  );
}
