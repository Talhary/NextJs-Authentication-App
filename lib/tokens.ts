import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import crypto from "crypto";
import { getVerificationTokenByEmail } from "../data/verification-token";
import { getResetTokenByEmail } from "@/data/reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
export const generateVerificationToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  return await db.verificationToken.create({
    data: {
      token: uuidv4(),
      email,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });
};

export const generateResetToken = async (email: string) => {
  const existingToken = await getResetTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  return await db.passwordResetToken.create({
    data: {
      token: uuidv4(),
      email,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });
};
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  return await db.twoFactorToken.create({
    data: {
      token,
      email,
      expires: new Date(Date.now() + 1000 * 60 * 15),
    },
  });
};
