import { Container } from '@/ui/components/container/container'
import { AsideNav } from '@/routes/aside-nav'
import { Toaster } from '@/components/ui/toaster'
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
 
  if (!session) {
    redirect('/signin')
  } 

  const user = await prisma!.user.findUnique({
    where: {
      name: session!.user!.name!
    },
    select: {
      firstName: true,
      lastName: true,
      phoneNumber: true,
      municipality: true,
      district: true,
      avenue: true,
      number: true,
    }
  }) 

  if(
    user?.firstName &&
    user?.lastName &&
    user?.phoneNumber &&
    user?.municipality &&
    user?.district &&
    user?.avenue &&
    user?.number 
  ) {
    redirect('/dashboard')
  }

  return (
    <div className='mt-[-8vh] md:mt-[-10vh] z-50 block'>
      <Container className='flex flex-row min-h-[100dvh] '>
        <Container className='w-full'>
          {children}
        </Container>
      </Container>
      <Toaster/>
    </div>
  )
}
