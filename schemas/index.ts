import * as z  from 'zod'

export const LoginSchema = z.object({
  email: z.string({invalid_type_error:"Must be a string"}).email({message: "Valid email is required"}),
  password: z.string().min(2, {message: "Password is required"})
})

export const RegisterSchema = z.object({
  email: z.string({invalid_type_error:"Must be a string"}).email({message: "Valid email is required"}),
  password: z.string().min(6, {message: "Minimun of 6 characters required"}),
  name:z.string().min(1, { message: "name is required"})
})

export const ResetSchema = z.object({
  email: z.string({invalid_type_error:"Must be a string"}).email({
    message: "Valid email is required"
  }),
})
