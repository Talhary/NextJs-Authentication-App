"use server";
import * as z from "zod";
import { LoginSchema } from "@/Schemas";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { revalidatePath, revalidateTag } from "next/cache";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
export const login = async (value: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: " Invalid Fields" };
  }
  const { email, password } = validateFields.data;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user?.password) return { error: "Invalid Credentials" };
    if (!user?.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      if (verificationToken.id) {
        await sendVerificationEmail(
          verificationToken.email,
          verificationToken.token
        );
        return { success: "Email not verified, Confirmation Email Send" };
      } else return { error: "Something went wrong!" };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Logged in!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };

        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
