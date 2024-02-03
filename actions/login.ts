"use server"

import * as z from 'zod'

import { LoginSchema } from '@/schemas'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = await LoginSchema.safeParse(values)
  
  if(!validatedFields.success) return{ error: "Invalid fields"}
  // For API route, you should use Nextresponse.json

  const { email, password} = validatedFields.data

  try{

  }catch{
    
  }
  
  
}
