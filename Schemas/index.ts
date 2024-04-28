import * as z from "zod";

export const settingsSchema = z.object({
  name:z.optional(z.string()),
  isTwoFactorEnabled:z.optional(z.boolean())
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, { message: "Password is required" }),
  code:z.optional(z.string())
});
export const registerSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, { message: "Minimum 6 character is required" }),
  name: z.string().min(1, { message: "Name is required" }),
});
// schema for forgot password
export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
// schema for reset password
export const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Minimum 6 character is required" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Minimum 6 character is required" }),
  token: z.string().min(1, { message: "Token is required" }),
});
