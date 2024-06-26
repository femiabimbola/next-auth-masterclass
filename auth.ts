/**
 * This file is where you get the auth, signin and signout methods
 * Because of methods like getUserById we have to use prisma adapater
 * that only works with this time of file
 */

import NextAuth, {DefaultSession, Session} from "next-auth";
import authConfig from "@/auth.config";
import {getUserById} from "@/data/user";
import {UserRole} from "@prisma/client";
import {db} from "@/lib/db";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {JWT} from "next-auth/jwt";
import {getTwoFactorConfirmationByUserId} from "@/data/two-factor-confirmation";
import {getAccountByUserId} from "./data/account";

// TODO: Check the source file for arhijan

// declare module "@auth/core" {
//   interface Session {
//     user: {
//       role:   UserRole //"ADMIN" | "USER",
//      } & DefaultSession["user"]
//   }
// }

// auth, signIn  and signOut can only be used in server components or server actions

export const {
  handlers: {GET, POST},
  auth,
  signIn,
  signOut,
  // update
} = NextAuth({
  //  It is for using your own designed pages
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    // for email verifing for oAuth sign in
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()},
      });
    },
  },

  callbacks: {
    // Adding a field to the token
    async jwt({token}) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      // !! --> turns it to a boolean

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },

    // You caan manipulate the session ID
    async session({token, session}: any) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as Boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth;
      }

      return session;
    },

    async signIn({user, account}) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      // Prevent sign in without email verification
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) {
        return false;
      }

      //  TODO: Add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        //  Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {id: twoFactorConfirmation.id},
        });
      }

      return true;
    },
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  ...authConfig,
});
