// "use client";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Container } from "@/ui/components/container/container";
import { Typography } from "@/ui/components/typography/typography";
import { termOfUseForYaya } from "@/lib/terme-of-use-data/term-of-use";
import { userAuth } from "@/lib/helper";

interface Props {
  className?: string;
}
export async function TermsAndConditions() {
  return (
    <SheetContent
      side={"bottom"}
      className="bg-white w-full flex flex-col gap-8 lg:px-80 h-2/3 overflow-y-scroll "
    >
      <SheetHeader>
        <SheetTitle>
          <Typography component="h3" variant="title-base">
            {"Termes et conditions d'utilisation du yaya"}
          </Typography>
        </SheetTitle>
      </SheetHeader>
      <Container>
        <Container className="overflow-y">
          {termOfUseForYaya.map((article) => (
            <Container key={article.id}>
              <Typography
                className="my-4 text-[#39ae44] font-semibold"
                variant="title-sm"
              >
                <span className="text-semibold text-[#545454] mr-4">
                  {article.id.replace("article", "Article ")}
                </span>
                {article.title}
              </Typography>
              <Typography className="leading-relaxed" variant="body-base">
                {article.content.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </Typography>
            </Container>
          ))}
        </Container>
        <Container className=" flex flex-col my-4">
          <Typography className="flex flex-col  gap-1 ">
            <span className="font-bold">Fait à Kinshasa, le [date]</span>
            <span className="font-bold">deux exemplaires</span>
            <span className="font-bold">Pour Monyaya </span>
            <span>[Nom du représentant légal]</span>
            <span className="font-bold">Pour [Nom du prestataire]</span>
            <span>[Nom du prestataire]</span>
          </Typography>
          <Container className="flex flex-row justify-between items-center">
            {/* <Buttons type='submit'>Obtenir mon exemplaire</Buttons> */}
          </Container>
        </Container>
      </Container>
    </SheetContent>
  );
}
