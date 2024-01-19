import NextAuth from "next-auth"
import { authOptions } from "./auth-otions"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }