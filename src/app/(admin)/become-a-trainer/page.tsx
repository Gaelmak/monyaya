import { userAuth } from '@/lib/helper';
import prisma from '@/lib/prisma';
import { ProcessToBecomeATrainer } from '@/ui/modules/process-to-become-a-trainer/process-to-become-a-trainer';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await userAuth();
  const userRole = await prisma?.user.findUnique({
    where: {
      name: user!.name!,
    },
    select: {
      role: true,
    },
  });

  if (userRole!.role === 'TRAINER') {
    redirect('/my-trainings');
  }

  return (
    <main className="w-full h-full flex flex-col p-4">
      <ProcessToBecomeATrainer />
    </main>
  );
}
