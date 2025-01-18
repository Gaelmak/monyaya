import { YayaProfil } from "@/ui/modules/yaya-profil/yaya-profil";
import { Container } from "@/ui/components/container/container";
import { TrainingsView } from "@/ui/components/trainings-view/trainingsView";
import prisma from "@/lib/prisma";
import { Typography } from "@/ui/components/typography/typography";
import { userAuth } from "@/lib/helper";

export default async function Home({ params }: { params: { name: string } }) {
  const name = decodeURIComponent(params.name);
  const session = await userAuth();
  const userId = session
    ? await prisma?.user.findUnique({
        where: {
          name: session!.name!,
        },
        select: {
          id: true,
        },
      })
    : null;
  const user = await prisma?.user.findUnique({
    where: {
      name: name!,
    },
    select: {
      id: true,
      name: true,
      image: true,
      createdAt: true,
      phoneNumber: true,
      email: true,
      firstName: true,
      lastName: true,
      bio: true,
      municipality: true,
      district: true,
      avenue: true,
      number: true,
    },
  });

  return (
    <main className="flex flex-col md:flex-row gap-4 p-4 w-full">
      {user ? (
        <>
          <YayaProfil
            data={[
              {
                name: user.name,
                image: user.image,
                bio: user.bio!,
                createdAt: user.createdAt,
                phoneNumber: user.phoneNumber!,
                email: user.email!,
                firstName: user.firstName!,
                lastName: user.lastName!,
                municipality: user.municipality!,
                district: user.district!,
                avenue: user.avenue!,
                number: user.number!,
              },
            ]}
            className="w-full md:w-[25%]"
          />
          <Container className="w-full md:w-[75%]">
            <Typography variant="title-lg" className="pb-4">
              Formations
            </Typography>
            {/* {session || myLearnings ? (
              <TrainingsView
                className="grid grid-cols-1 md:grid-cols-3 gap-4 "
                data={user.trainings}
                userId={userId!.id!}
                myLearnings={myLearnings!}
                sessionName={session!.name!}
              />
            ) : (
              <TrainingsView
                className="grid grid-cols-1 md:grid-cols-3 gap-4 "
                data={user.trainings}
              />
            )} */}
          </Container>
        </>
      ) : null}
    </main>
  );
}
