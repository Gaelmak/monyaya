import { Toaster } from "@/components/ui/toaster"
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"

export default async function AuthRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }
  return (
    <div className='mt-[-8vh] md:mt-[-10vh] z-50'>
      {children}
      <Toaster/>
    </div>
  )
}
