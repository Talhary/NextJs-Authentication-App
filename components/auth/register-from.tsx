"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import * as z from "zod";
import { registerSchema } from "@/Schemas";
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
import { Register } from "@/actions/register";
import { useState, useTransition } from "react";
export const RegisterForm = () => {
  const [error, setError] = useState<string | null | undefined>(null);
  const [success, setSuccess] = useState<string | null | undefined>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  function onSubmit(values: z.infer<typeof registerSchema>) {
    setSuccess(null);
    setError(null);
    startTransition(() => {
      Register(values).then((res) => {
        if ("error" in res) {
          setError(res.error);
          setSuccess(null);
        } else {
          setSuccess(res.success);
          setError(null);
        }
      });
    });
  }

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="John Doe"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emai</FormLabel>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="*******"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
