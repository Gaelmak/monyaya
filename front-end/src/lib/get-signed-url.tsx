import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth-routes)/api/auth/[...nextauth]/auth-otions"

export async function GetSignedURL() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return {
      error: {message: "Not authenticated"}
    }
  }

  return {
    succes: {url: ""}
  }
}