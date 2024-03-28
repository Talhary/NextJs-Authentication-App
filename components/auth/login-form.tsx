"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import * as z from "zod";
import { LoginSchema } from "@/Schemas";
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
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const paramError =
    searchParams
      .get("error")
      ?.split("+")
      .join("")
      .split("%20")
      .join("")
      .split(" ")
      .join("") === "OAuthAccountNotLinked"
      ? "Account Already Exist Please choose another path."
      : "";

  const [error, setError] = useState<string | null | undefined>(null);

  const [success, setSuccess] = useState<string | null | undefined>(null);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setSuccess(null);
    setError(null);
    startTransition(() => {
      login(values).then((res) => {
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
      headerLabel="Welcome Back"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account"
      showSocial
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
                <Button
                  variant={"link"}
                  size={"sm"}
                  asChild
                  className="font-normal px-0"
                >
                  <Link href="/auth/reset">
                    Forgot Password? Reset it here.
                  </Link>
                </Button>
              </FormItem>
            )}
          />
          {<FormSuccess message={success} />}
          {<FormError message={error || paramError} />}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};