import {UserRole} from "@prisma/client";
import * as z from "zod";

// refine check if password matches or
export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabbled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      if (!data.password && data.newPassword) return false;
      return true;
    },
    {message: "New Password is required", path: ["newPassword"]}
  );

export const LoginSchema = z.object({
  email: z
    .string({invalid_type_error: "Must be a string"})
    .email({message: "Valid email is required"}),
  password: z.string().min(2, {message: "Password is required"}),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string({invalid_type_error: "Must be a string"})
    .email({message: "Valid email is required"}),
  password: z.string().min(6, {message: "Minimun of 6 characters required"}),
  name: z.string().min(1, {message: "name is required"}),
});

export const ResetSchema = z.object({
  email: z.string({invalid_type_error: "Must be a string"}).email({
    message: "Valid email is required",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {message: "Minimun of 6 characters required"}),
});
