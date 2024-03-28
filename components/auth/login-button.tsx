"use client";
import { useRouter } from "next/navigation";
type LoginButton = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

const LoginButton = ({ children, mode = "redirect", asChild }: LoginButton) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
    console.log("Button Clicked");
  };

  if (mode == "modal") {
    return <span>TODO : Implement mode Modal</span>;
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
export default LoginButton;
