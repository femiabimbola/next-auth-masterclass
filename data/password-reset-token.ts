import {db } from "@/lib/db"

export const getPasswordRestTokenByToken = async(token:string) => {
  try {
    const passwordRestToken = await db.passwordResetToken.findUnique({
      where:{token}
    })
    return passwordRestToken;
  } catch (error) {
    return null
  }
}