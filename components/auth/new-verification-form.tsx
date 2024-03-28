"use client";

import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Verify } from "@/actions/verify";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FormError } from "../form-error";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export const NewVerificationForm = () => {
  const token = useSearchParams().get("token");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit = useCallback(() => {
    if (isPending) return;
    startTransition(() =>
      Verify(token as string)
        .then((res) => {
          if (res?.error) {
            setError(res.error);
            return;
          }

          router.push(DEFAULT_LOGIN_REDIRECT);
          return;
        })
        .catch((err) => {
          setError("Something went wrong. Please try again."    );
        })
    );
  }, [token]);
  useEffect(() => {
    if (!token) return setError("Missing Token");
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="back to Login"
      headerLabel="Confirmating your Verification"
    >
      <div className="flex flex-col items-center justify-center">
        {!error && <BeatLoader />}
        {error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
