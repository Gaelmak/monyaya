import { userAuth, userAuthRole } from '@/lib/helper';
import prisma from '@/lib/prisma';
import { ProcessToBecomeATrainer } from '@/ui/modules/process-to-become-a-trainer/process-to-become-a-trainer';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function BecomeTrainerPage() {
  const userLogged = await userAuth();
  const user = await prisma?.user.findUnique({
    where: {
      name: userLogged?.name,
    },
    select: { role: true, yaya: true },
  });

  if (user?.role === 'TRAINER') {
    redirect('/my-courses');
  }

  if (user?.yaya?.status === 'PENDING') {
    return (
      <main className="w-full h-full flex flex-col p-4 justify-center items-center">
        <Card className="w-[350px] rounded-lg overflow-hidden bg-yellow-100 border-yellow-300">
          <CardHeader>
            <CardTitle className="text-black/90">
              Statut de votre demande
            </CardTitle>
            <CardDescription className="text-sm">
              Votre statut est en cours de validation. Vous serez notifié au
              besoin.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            Merci de votre patience pendant que nous traitons votre demande.
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="w-full h-full flex flex-col p-4">
      <ProcessToBecomeATrainer />
    </main>
  );
}
