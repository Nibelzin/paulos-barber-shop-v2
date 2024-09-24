import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      image: string
      name: string
      email: string
      isAdmin: boolean
      isBarber: boolean
    }
  }

  interface User {
    id: string
    name?: string | null | undefined
    email?: string | null | undefined
    image?: string | null | undefined
    admin?: boolean | null
    barber?: boolean | null
  }
}
