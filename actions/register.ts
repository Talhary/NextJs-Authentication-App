"use server";
import * as z from "zod";
import { registerSchema } from "@/Schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const Register = async (value: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: " Invalid Fields" };
  }
  const { email, password, name } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in exists!" };
  }

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  const verificationToken = await generateVerificationToken(email);
  // console.log("verficationTOken", verificationToken);
  //Send verification token to user email
  if (verificationToken.id) {
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation Email Sended" };
  } else return { error: "Something went wrong!" };
};
