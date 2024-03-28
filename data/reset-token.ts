import {db } from "@/lib/db";
export const getResetTokenByToken = async (token: string) => {
    return await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
  }
  export const getResetTokenByEmail = async (email: string) => {
    return await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
  }