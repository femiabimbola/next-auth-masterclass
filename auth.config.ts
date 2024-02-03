
/**
 * The file is used by middleware.ts It does not support the database adapter
 */

import Credentials from "next-auth/providers/credentials"
// import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

import { LoginSchema } from "./schemas"
import { getUserByEmail } from "@/data/user"

export default {
  providers: [
    Credentials({
    async authorize(credentials){
      const validatedFields = LoginSchema.safeParse(credentials)
      if (validatedFields.success){
        const { email, password} = validatedFields.data;

        const user = await getUserByEmail(email)

      }
    }
  })],
} satisfies NextAuthConfig
