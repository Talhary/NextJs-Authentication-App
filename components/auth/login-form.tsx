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
import { useRef, useState, useTransition } from "react";
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
  const btnRef = useRef<any>();
  const [success, setSuccess] = useState<string | null | undefined>(null);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setSuccess(null);
    setError(null);
    btnRef.current.style.opacity = "0.7";
    startTransition(() => {
      login(values)
        .then(({ success, error, twoFactor }) => {
          if (success || error) {
            form.reset();
            setError(error);
            setSuccess(success);
          }
          if (twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((err) => setError("Something gone wrong."));
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
          {showTwoFactor ? (
            <>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Code</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="123456"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
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
            </>
          )}
          {<FormSuccess message={success} />}
          {<FormError message={error || paramError} />}
          <Button type="submit" className="w-full" ref={btnRef}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
