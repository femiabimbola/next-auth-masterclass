/**
 * This file is where you get the auth, signin and signout methods
 * Because of methods like getUserById we have to use prisma adapater
 * that only works with this time of file
 */

// import GitHub from "next-auth/providers/github"
import NextAuth, {DefaultSession} from "next-auth"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

declare module "@auth/core" {
  interface Session {
    user: {
      role: "ADMIN" | "USER"
     } & DefaultSession["user"]
  }
}

export const { handlers: { GET, POST },
 auth, signIn, signOut,
} = NextAuth({ 
  callbacks: {
    async jwt({token}) {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token
      token.role = existingUser.role
      return token;
    },
    async session({ token , session}){
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      if(token.role && session.user){
        session.user.role = token.role 
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
  // providers: [GitHub],
})