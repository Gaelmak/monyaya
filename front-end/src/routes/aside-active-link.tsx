'use client'

import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

interface Props {
  href: string
  children: React.ReactNode
  className?: string
}

export const AsideActiveLink = ({href, children, className}: Props) => {
  const pathname = usePathname()
  const isActive : boolean = useMemo(() => {
    return pathname === href
  }, [pathname, href])
  
  return (
    <Link
      className={
        clsx(
          'hover:text-primary-Default animate block p-2 rounded',
          isActive ? 'text-primary-Default bg-primary-50' : '',
          className
        )
      }
      href={href}
    >
      {children}
    </Link>
  )
}