/**
 * This file is where you get the auth, signin and signout methods
 * Because of methods like getUserById we have to use prisma adapater
 * that only works with this time of file
 */

import NextAuth, {DefaultSession, Session} from "next-auth"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { UserRole } from "@prisma/client"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { JWT } from "next-auth/jwt"

// declare module "@auth/core" {
//   interface Session {
//     user: {
//       role:   UserRole //"ADMIN" | "USER",
//      } & DefaultSession["user"]
//   }
// }

// auth, signIn  and signOut can only be used in server components or server actions

export const { handlers: { GET, POST },
 auth, signIn, signOut,
} = NextAuth({ 
  //  It is for using your own generated pages
  // It is located in the app folder
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    // for email verifing for oAuth sign in
    async linkAccount({ user }){
      await db.user.update({
        where: {id: user.id},
        data: { emailVerified: new Date()}
      })
    }
  },

  callbacks: {
    async jwt({token}) {
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token
      token.role = existingUser.role
      return token;
    },

    // You caan manipulate the session ID 
    async session({ token , session} : any){
      if( session.user&& token.sub){
        session.user.id = token.sub
      }
      
      if(token.role && session.user){
        session.user.role = token.role 
      }
      return session;
    },

    async signIn({user}) {
      // const existingUser = await getUserById(user.id) 
      // if(!existingUser || !existingUser.emailVerified) {return false}
      return true;
    }
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
})