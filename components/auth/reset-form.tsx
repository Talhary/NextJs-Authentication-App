"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import * as z from "zod";
import { forgotPasswordSchema } from "@/Schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import Link from "next/link";
import { reset } from "@/actions/reset";
import { useSearchParams } from "next/navigation";

export const ResetForm = () => {
  const errorMessage = useSearchParams().get("error") || "";

  const [error, setError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    startTransition(() => {
      reset(values).then((res) => {
        setError(res?.error);

        setSuccess(res?.success);
      });
    });
  }
  return (
    <CardWrapper
      headerLabel="Back to Login"
      backButtonHref="/auth/login"
      backButtonLabel="back to Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="example@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!error && <FormSuccess message={success} />}
          {!success && <FormError message={error || errorMessage} />}
          <Button type="submit" className="w-full">
            Reset
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
