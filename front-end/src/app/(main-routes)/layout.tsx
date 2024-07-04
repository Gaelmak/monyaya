import { Navigation } from '@/routes/navigation'
import { MobileNavigation } from '@/routes/mobile-navigation'
import { Toaster } from '@/components/ui/toaster'
import { Footer } from '@/ui/modules/footer/footer'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { redirect } from 'next/navigation'

export default async function MainRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  const user = session ? await prisma!.user.findUnique({
    where: {
      name: session!.user!.name!
    },
    select: {
      image: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      password: true,
      municipality: true,
      district: true,
      avenue: true,
      number: true,
    }
  }) : null 

  if(session) {
    if(
      !user?.firstName ||
      user.firstName === '' ||
      !user?.lastName ||
      user.lastName === '' ||
      !user?.phoneNumber ||
      user.phoneNumber === '' ||
      !user?.municipality ||
      user.municipality === '' ||
      !user?.district ||
      user.district === '' ||
      !user?.avenue ||
      user.avenue === '' ||
      !user?.number ||
      user.number === ''
    ) {
      redirect('/onboarding')
    }
  }
  
  return (
    <div className=''>
      <Navigation className='hidden md:block'/>
      <MobileNavigation className='md:hidden'/>
      {children}
      <Footer/>
      <Toaster/>
    </div>
  )
}
