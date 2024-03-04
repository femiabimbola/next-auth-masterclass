import {db } from "@/lib/db"

export const getVerificationTokenByEmail = async( email: string) => {
  try {
    const verificiationToken = await db.verificationToken.findFirst({ where: {email} })
    return verificiationToken
  } catch(error) {
    return null
  }
}