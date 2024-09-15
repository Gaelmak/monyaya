import { Container } from "@/ui/components/container/container";
import prisma from "@/lib/prisma";
import { userAuth } from "@/lib/helper";

export default async function Home() {
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
  const trainings: any = [];
  return (
    <main>
      <Container className="px-4 md:px-8 my-[12vh]">
        {/* <SearchResults
          session={session}
          myLearnings={null}
          userId={userId}
          trainings={trainings}
        /> */}
      </Container>
    </main>
  );
}
