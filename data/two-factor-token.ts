import { db } from "@/lib/db";
export const getTwoFactorToken = async (token: string) => {
  const res = await db.twoFactorToken.findUnique({
    where: {
      token,
    },
  });
  return res;
};
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const res = await db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
    return res;
  } catch (error) {
    return null;
  }
};
