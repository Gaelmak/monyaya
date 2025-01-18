import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { verifyPassword } from "@/lib/password-to-salt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        const user = await prisma.user.findUnique({
          where: {
            name: credentials.name,
          },
        });

        if (!user) {
          // No user found, so this is their first attempt to login
          throw new Error("User not found.");
        }

        const passwordMatch = verifyPassword(
          credentials.password,
          user.password!,
          user.salt!
        );

        if (!passwordMatch) {
          throw new Error("password incorrect");
        }

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
  },
  trustHost: true,
});
