import {db } from "@/lib/db"

export const getVerificationTokenByEmail = async( token: string) => {
  try {
    const verificiationToken = await db.verficiationToken.findUnique({
      
    })
  } catch(error) {
    return null
  }
}