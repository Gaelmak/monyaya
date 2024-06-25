import { Container } from '@/ui/components/container/container'
import { AsideNav } from '@/routes/aside-nav'
import { Toaster } from '@/components/ui/toaster'
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"
import { MobileAsideNav } from '@/routes/mobile-aside-nav'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
 
  if (!session) {
    redirect('/signin')
  } 

  return (
    <div className='mt-[-8vh] md:mt-[-10vh] z-50 block'>
      <Container className='flex flex-row min-h-[100dvh] '>
        <MobileAsideNav className='md:hidden'/>
        <Container className='w-[20%] relative h-[100dvh] hidden md:block'>
          <div className='fixed w-[20%] h-[100dvh]'>
            <AsideNav className='h-[100dvh] w-full'/>
          </div>
        </Container>
        <Container className='w-full md:w-[80%]'>
          {children}
        </Container>
      </Container>
      <Toaster/>
    </div>
  )
}
