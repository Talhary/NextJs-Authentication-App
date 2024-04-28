"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/auth/user-button";
export const Navbar = () => {
  const addresses = ["/server", "/client", "/admin", "/settings"];
  const pathname = usePathname();
  const path = "/" + pathname.split("/")[2];
  return (
    <div className="flex py-3 px-3 rounded-md justify-between w-full items-center  bg-gray-200">
      <div className="flex gap-x-2 ">
        {addresses.map((el, index) => (
          <div key={index}>
            <Button
              className={el === path?'bg-gray-300':'f'}
              asChild
              variant={el === "/settings" ? "default" : "outline"}
            >
              <Link href={"/settings" === el ? "/settings" : "/settings" + el}>
                {el.split("/")}
              </Link>
            </Button>
          </div>
        ))}
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};
