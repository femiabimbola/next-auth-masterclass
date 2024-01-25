"use server"

import * as z from 'zod'

import { RegisterSchema } from '@/schemas'

export const Register = async (values: z.infer<typeof RegisterSchema >) => {
  const validatedFields = await RegisterSchema .safeParse(values)
  
  if(!validatedFields.success) return{ error: "Invalid fields"}
  // For API route, you should use Nextresponse.json

  return { success: "Email Sent!"}
  
}
