
/**
 * The file is used by middleware.ts It does not support the database adapter. It does not run on the edge
 */

import Credentials from "next-auth/providers/credentials"
// import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"
import bcrypt from 'bcryptjs'

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

        // The reason for password is because oAuth does not need a password
        if(!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if(passwordsMatch) return user;
      }
      return null
    }
  })],
} satisfies NextAuthConfig
