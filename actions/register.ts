"use server"

import * as z from 'zod'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'

import { RegisterSchema } from '@/schemas'
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export const Register = async (values: z.infer<typeof RegisterSchema >) => {

  const validatedFields = await RegisterSchema.safeParse(values)
  if(!validatedFields.success) return { error: "Invalid fields"}
  // For API route, you should use Nextresponse.json

  const {password, email, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email)

  if(existingUser) return {error: "Email already in use"}

  await db.user.create({ data: {name, email, password: hashedPassword}})

  // create the data on the database
  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)


  return { 
    success: "confirmation email sent",
    // Response.redirect(new URL('/auth/login', ))
  }
  
}
