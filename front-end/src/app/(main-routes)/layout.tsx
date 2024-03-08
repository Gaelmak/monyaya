import { Navigation } from '@/routes/navigation'
import { MobileNavigation } from '@/routes/mobile-navigation'
import { Toaster } from '@/components/ui/toaster'
import { Breadcrumbs } from '@/ui/components/breadcrumbs/breadcrumbs'

export default function MainRoutesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className=''>
      <Navigation className='hidden md:block'/>
      <MobileNavigation className='md:hidden'/>
      {children}
      <Toaster/>
    </div>
  )
}
