import { NextAuthOptions } from "next-auth"
import GoogleProviders from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/lib/prisma"
import { verifyPassword } from "@/lib/password-to-salt"

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      credentials: {
        name: {},
        password: {},
      },

      async authorize(credentials, req) {
        if (credentials) {
          const user = await prisma.user.findUnique({
            where: {
              name: credentials.name,
            },
          });
          
          if (user) {
            if (verifyPassword(credentials.password, user.password!, user.salt!)) {
              return user
            }
            return null
          }
          return null
        }
        return null
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error", // Error code passed in query string as ?error=
    verifyRequest: "/verify-request", // (used for check email message)
    newUser: "/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  
} satisfies NextAuthOptions


