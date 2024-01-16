import * as z  from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({message: "Valid email is required"}),
  password: z.string()
})