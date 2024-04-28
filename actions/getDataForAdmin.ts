"use server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { USERROLE } from "@prisma/client";
const Data = async () => {
  const user = await currentUser();
  const userFromDb = await db.user.findFirst({
    where: {
      email: user?.email,
    },
  });
  if (user?.role === userFromDb?.role && user?.role == USERROLE.ADMIN) {
    return { status: "200", data: "Talha" };
  }
  return { status: "500", data: "Error" };
};
export default Data;
