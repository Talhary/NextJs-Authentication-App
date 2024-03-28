"use server";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
export const Verify = async (token: string) => {
  try {
    const verificationToken = await getVerificationTokenByToken(token);
    console.log(verificationToken);
    // return { error: "Invalid Token" };
    if (!verificationToken) return { error: "Invalid Token" };
    const user = await getUserByEmail(verificationToken.email);

    const hasExpired = new Date() > new Date(verificationToken.expires);
    if (hasExpired) {
      await db.verificationToken.delete({
        where: { id: verificationToken.id },
      });
      return { error: "Token Expired" };
    }
    if (!user) return { error: "User not found" };
    await db.user.update({
      where: { id: verificationToken.id },
      data: { emailVerified: new Date(), email: user.email },
    });
    await db.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
