"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Logout } from "@/actions/logout";

export const LogoutButton = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <Button
        variant={"link"}
        onClick={() => {
          Logout();
        }}
      >
        <Link href="/" className="cursor-pointer">
          {children}
        </Link>
      </Button>
    </div>
  );
};
