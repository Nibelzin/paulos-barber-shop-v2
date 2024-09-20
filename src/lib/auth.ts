import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters"
import { db } from "./prisma"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 2 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {}
        if (!email || !password) {
          throw new Error("Por favor, insira email e senha.")
        }

        const user = await db.user.findUnique({
          where: { email },
        })

        console.log("User found:", user)

        if (!user) {
          throw new Error("Email ou senha inválidos.")
        }

        const passwordMatch = await compare(password, user.password)
        if (!passwordMatch) {
          throw new Error("Email ou senha inválidos.")
        }

        return {
          ...user,
          id: user.id.toString(),
          image: user.avatarImg,
          admin: user.admin,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, session, trigger, user }) {
      if (user) {
        token.isAdmin = user.admin
      }

      if (trigger === "update" && session.image) {
        token.picture = session.image
      }
      if ((trigger === "update" && session?.name) || session?.email) {
        token.name = session.name
        token.email = session.email
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub,
        isAdmin: token.isAdmin,
      } as any
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
