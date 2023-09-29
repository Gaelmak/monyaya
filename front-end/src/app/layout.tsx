import { Navigation } from '@/routes/navigation'
import './globals.css'
import type { Metadata } from 'next'
import { Inter  } from 'next/font/google'
import { MobileNavigation } from '@/routes/mobile-navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MonYaya',
  description: '%s | MonYaya',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation className='hidden md:block'/>
        <MobileNavigation className='md:hidden'/>
        {children}
      </body>
    </html>
  )
}
