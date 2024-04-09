"use server";
import * as z from "zod";

// import {update} from "@/auth"
import {db} from "@/lib/db";
import {SettingSchema} from "@/schemas";
import {getUserByEmail, getUserById} from "@/data/user";
import {currentUser} from "@/lib/auth";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) return {error: "Unauthorized"};

  const dbUser = await getUserById(user.id);
  if (!dbUser) return {error: "Unauthorized"};

  // Should not be modified for oauth
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  //  To confirm they are not taking another person email
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return {error: "Email already in use"};
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {sucess: "Verification email sent"};
  }

  // To check if the password matches
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) return {error: "Incorrect Password"};

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined; // no newPassword field in the db
  }

  const updatedUser = await db.user.update({
    where: {id: dbUser.id},
    data: {...values},
  });

  // update({
  //   user: {
  //     name: updatedUser.name,
  //     email: updatedUser.email,
  //     role: updatedUser.role,
  //   }
  // })

  return {success: "settings updated"};
};
