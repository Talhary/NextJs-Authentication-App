import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Provider } from "react-redux";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export const Social = () => {
  const sign = (Provider: "google" | "github") => {
    signIn(Provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="w-full flex justify-center items-center">
      <Button
        size="lg"
        variant={"outline"}
        className="w-full"
        onClick={() => {
          sign("google");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant={"outline"}
        className="w-full"
        onClick={() => {
          sign("github");
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
