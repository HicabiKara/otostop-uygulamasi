import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"
import type { Session } from "next-auth"

type ExtendedUser = Session["user"] & {
  gender?: "male" | "female"
}

type ExtendedSession = Session & {
  user: ExtendedUser
}

export async function getServerAuthSession(): Promise<ExtendedSession | null> {
  return await getServerSession(authOptions) as ExtendedSession | null
}