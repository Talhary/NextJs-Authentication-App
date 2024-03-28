import { db } from "@/lib/db";
export const getTwoFactorAuthenticationByUserId = async (userId: string) => {
  return await db.twoFactorConfirm.findFirst({
    where: {
      userId,
    },
  });
};
