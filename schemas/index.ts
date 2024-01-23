import * as z  from 'zod'

export const LoginSchema = z.object({
  email: z.string({invalid_type_error:"Must be a string"}).email({message: "Valid email is required"}),
  password: z.string().min(2, {message: "Password is required"})
})

export const RegisterSchema = z.object({
  email: z.string({invalid_type_error:"Must be a string"}).email({message: "Valid email is required"}),
  password: z.string().min(6, {message: "Password is required"}),
  name:g

})