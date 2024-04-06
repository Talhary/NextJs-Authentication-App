"use server";
import * as z from "zod";
import { LoginSchema } from "@/Schemas";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { revalidatePath, revalidateTag } from "next/cache";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken,generateTwoFactorToken } from "@/lib/tokens";
import { sendVerificationEmail ,sendTwoFactorToken} from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getTwoFactorAuthenticationByUserId } from "@/data/two-factor-confirmation";
export const login = async (value: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(value);
  if (!validateFields.success) {
    return { error: " Invalid Fields" };
  }
  const { email, password,code } = validateFields.data;
  
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
    if(user.isTwoFactorEnabled && user.email){
     if(code){
     const twoFactortoken = await getTwoFactorTokenByEmail(user.email);
     if(!twoFactortoken) return {error:'Invalid code!'}
     if(twoFactortoken.token !== code) return {error:'Invalid Code'};
     const hasExpired = new Date(twoFactortoken.expires)  < new Date();
     if(hasExpired) return {error:'code is expired'}
      await db.twoFactorToken.delete({
        where:{id:twoFactortoken.id}
      })
      const existingConfirmation = await getTwoFactorAuthenticationByUserId(twoFactortoken.id);
      if(existingConfirmation){
        await db.twoFactorConfirm.delete({
          where:{id:existingConfirmation.id}
        })
      }
      await db.twoFactorConfirm.create({
        data:{
          userId:user.id
        }
      })
    }
     else{
       const {email,token} = await generateTwoFactorToken(user.email)
      await sendTwoFactorToken(email,token)
      return {twoFactor:true}
     }
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
