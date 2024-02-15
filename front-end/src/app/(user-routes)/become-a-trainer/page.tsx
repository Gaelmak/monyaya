import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import prisma from '@/lib/prisma'
import { ProcessToBecomeATrainer } from "@/ui/modules/process-to-become-a-trainer/process-to-become-a-trainer"
import { getServerSession } from "next-auth"
import { redirect } from 'next/navigation'

export default async function Home()  {
  const session = await getServerSession(authOptions)
  const userRole = await prisma?.user.findUnique({
    where: {
      name: session!.user!.name!
    },
    select: {
      role: true
    }
  })

  if(userRole!.role === 'TRAINER') {
    redirect('/my-trainings')
  }

  return (
    <main className="w-full h-full flex flex-col p-4">
      <ProcessToBecomeATrainer/>
    </main>
  )
}