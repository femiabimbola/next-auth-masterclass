"use server"

import * as z from 'zod'

import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail, sendTwoFactorTokenEmail} from "@/lib/mail";
import { getUserByEmail } from '@/data/user'
import { generateTwoFactorToken } from '@/lib/tokens'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'


export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = await LoginSchema.safeParse(values)
  
  if(!validatedFields.success) return{ error: "Invalid fields"}
  // For API route, you should use Nextresponse.json

  const { email, password, code} = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if(!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email or User does not exist"}
  }

  if(!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)
    return { success: "confirmation email is sent"}; 
  }

//  code is for verifying & else is for generating six code
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
      if(!twoFactorToken) { return {error: "Invalid code"}}
    } else {
    const twoFactorToken = await generateTwoFactorToken(existingUser.email)
    await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)

    return { twoFactor: true}
    }
  }

  try{
    await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT})
  }catch(error){
    if(error instanceof AuthError){
      switch ( error.type) { 
        case "CredentialsSignin": return { error: "Invalid credentials"}
        default : return { error: "something went wrong"}
      }
    }
    // You've gotta throw an error
    throw  { error: "something went wrong again 2"}
  }
  
  
}
