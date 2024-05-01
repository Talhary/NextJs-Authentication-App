import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
import { generateTwoFactorToken } from "./tokens";
const domain = process.env.NEXT_PUBLIC_APP_URL
export const sendTwoFactorToken = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two Factor Authentication",
    html: `<p>Your two factor authentication token is : ${token}</p>`,
  });
};
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink =
    domain+"/auth/new-verification?token=" + token;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please verify your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`,
  });
};
export const sendVerificationEmailForReset = async (
  email: string,
  token: string
) => {
  const confirmLink = domain+"/auth/resetPassword?token=" + token;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please Reset your password",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password</p>`,
  });
};
