import { currentUser } from "@/lib/auth";
import { USERROLE } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await currentUser();
  if (user?.role == USERROLE.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }
  return new NextResponse(null, { status: 403 });
};
