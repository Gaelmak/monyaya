'use client'

import { SessionProvider } from "next-auth/react"

interface Props {
  children : React.ReactElement
}

export const AuthProvider = ({
  children
}: Props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}