import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import { Container } from "@/ui/components/container/container";
import prisma from "@/lib/prisma";
import { Typography } from "@/ui/components/typography/typography";
import Link from "next/link";
import clsx from "clsx";
import { userAuth } from "@/lib/helper";

export default async function Home() {
  const user = await userAuth();
  const userId = await prisma!.user.findUnique({
    where: {
      name: user!.name!,
    },
    select: {
      id: true,
    },
  });

  console.log(userId);

  return (
    <Container className={clsx("p-4 rounded")}>
      <Container className="h-[100vh] flex flex-col justify-center items-center">
        <Typography variant="title-lg" className="w-full text-center">
          Aucune formation trouvée
        </Typography>
        <Typography className="w-full md:w-[50%] text-center">
          Vous pouvez découvrir la formation qui vous convient et commencer
          votre apprentissage en consultant notre page "
          <Link href={"/courses"} className="text-primary-Default underline">
            Formations
          </Link>
          ".
        </Typography>
      </Container>
    </Container>
  );
}
