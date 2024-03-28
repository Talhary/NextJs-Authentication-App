import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import LoginButton from "@/components/auth/login-button";
const fontPoppin600 = Poppins({
  subsets: ["latin"], 
  weight: ["600"],
});
const fontPoppin100 = Poppins({
  subsets: ["latin"],
  weight: ["100"],
});

export default function Home() {
  return (
    <div className="h-full sky-blue-background flex justify-center items-center flex-col space-y-6 ">
      <h2 className={cn("text-8xl drop-shadow-md", fontPoppin600.className)}>
        🔒 Auth
      </h2>
      <p className={cn("text-2xl", fontPoppin100.className)}>
        This is simple authentication
      </p>
      <LoginButton>
        <Link href="/auth/login">
          <Button variant={"secondary"} size="lg">
            Sign in
          </Button>
        </Link>
      </LoginButton>
    </div>
  );
}
