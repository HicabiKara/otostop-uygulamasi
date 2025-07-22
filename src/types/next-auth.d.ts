import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      gender?: "male" | "female";
      birthDate?: string;
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    gender?: "male" | "female";
    birthDate?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    gender?: "male" | "female";
    birthDate?: string;
  }
}