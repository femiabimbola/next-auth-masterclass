"use server"

import * as z from "zod"
import { NewPasswordSchema } from "@/schemas"

export const newPassword = async( values: z.infer< typeof NewPasswordSchema>, token?: string | null ) => {
  if(!token) { return {error: "Missing token"}}
}