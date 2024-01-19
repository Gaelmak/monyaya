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

  return (
    <div className='mt-[-8vh] md:mt-[-10vh] z-50'>
      <Container className='h-[100vh] flex flex-row'>
        <Container className='basis-1/5 overflow-hidden'>
          <AsideNav/>
        </Container>
        <Container className='basis-4/5 overflow-auto bg-secondary-50'>
          {children}
        </Container>
      </Container>
      <Toaster/>
    </div>
  )
}
