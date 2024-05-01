"use client";
import { useRouter } from "next/navigation";
import  {Dialog,DialogContent,DialogTrigger} from '@/components/ui/dialog';
import { LoginForm } from "./login-form";

type LoginButton = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

const LoginButton = ({ children, mode = "redirect", asChild }: LoginButton) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
    
  };

  if (mode == "modal") {
    return <Dialog>
        <DialogTrigger asChild = {asChild} >
              {children}
        </DialogTrigger>
        <DialogContent  className="p-0 w-auto bg-transparent" >
          <LoginForm/>
        </DialogContent>
    </Dialog>;
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
export default LoginButton;
