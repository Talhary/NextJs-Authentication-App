"use server";
import * as z from "zod";
import { forgotPasswordSchema } from "@/Schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateResetToken } from "@/lib/tokens";
import { sendVerificationEmailForReset } from "@/lib/mail";
export const reset = async (value: z.infer<typeof forgotPasswordSchema>) => {
  const validateFields = forgotPasswordSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: " Invalid Fields" };
  }
  const user = await getUserByEmail(value.email);
  if (!user) {
    return { error: "User not found" };
  }

  const resetToken = await generateResetToken(value.email);
  await sendVerificationEmailForReset(value.email, resetToken.token);

  // const resetToken = await generateVerificationTokenForReset(value.email);
  // await sendVerificationEmailForReset(value.email, resetToken.token);

  return { success: "Email sent!" };
};
