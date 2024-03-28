"use server";
import { getResetTokenByToken } from "@/data/reset-token";
import { db } from "@/lib/db";
import { resetPasswordSchema } from "@/Schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
export const VerifyResetToken = async (
  value: z.infer<typeof resetPasswordSchema>
) => {
  try {
    console.log(value);
    const { password, token } = value;
    const user = await getResetTokenByToken(token);
    console.log(user);
    if (!user) return { error: "Invalid token" };
    if (user.expires < new Date()) return { error: "Token expired" };
    const encryptedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(user.email);
    if (!existingUser) {
      return { error: "User does not exist" };
    }
    await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: encryptedPassword,
      },
    });
    await db.passwordResetToken.delete({
      where: {
        token,
      },
    });
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
