import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProviders from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"

export const authConfig = {
  providers: [
    // GoogleProviders({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
  ],
  adapter: PrismaAdapter(prisma),
} satisfies NextAuthOptions

export default NextAuth(authConfig)