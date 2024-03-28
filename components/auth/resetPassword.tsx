"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { VerifyResetToken } from "@/actions/verifyResetToken";
import { useTransition } from "react";
import { FormError } from "../form-error";
import { resetPasswordSchema } from "@/Schemas";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { CardWrapper } from "./card-wrapper";
import { FormSuccess } from "../form-success";
export const ResetPassword = () => {
  const token = useSearchParams().get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setShowSuccess] = useState(false);
  if (!token) redirect("/auth/reset?error=Token is required Please try again");
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: token || "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    if (data.password !== data.confirmPassword) {
      setError("Password does not match");
      return;
    }
    startTransition(() => {
      VerifyResetToken(data).then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setShowSuccess(true);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <CardWrapper
            backButtonHref="/auth/login"
            backButtonLabel="Back to Login"
            headerLabel="Reset Password"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type Your Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*******" {...field} type="password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel> 
                    <FormControl>
                      <Input placeholder="*******" {...field} type="password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {!success && <FormError message={error} />}
              {!error && (
                <FormSuccess
                  message={success ? "Password reset successfully" : ""}
                />
              )}
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? <BeatLoader /> : "Reset Password"}
              </Button>
            </div>
          </CardWrapper>
        </div>
      </form>
    </Form>
  );
};
