import * as z from "zod";

export const settingsSchema = z.object({
  name:z.optional(z.string()),
  isTwoFactorEnabled:z.optional(z.boolean()),
  isOAuth:z.optional(z.boolean()),
  email:z.optional(z.string().email()),
  password:z.optional(z.string().min(5)),
  newPassword:z.optional(z.string().min(5))
}).refine((data)=>{
  if(data.password && ! data.newPassword || data.newPassword && !data.password){
    return false
  }
  return true
},{
  message:'Please enter password on both fields',
  path:['newPassword']
}).refine(data=>{
  if(data.password != data.newPassword )
  return false
return true
},{message:'Please match your passwords',path:['password']})

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
