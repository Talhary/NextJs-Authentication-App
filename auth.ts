import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { USERROLE } from "@prisma/client";
import { getTwoFactorAuthenticationByUserId } from "./data/two-factor-confirmation";
declare module "next-auth" {
  interface User {
    /** The user's postal address. */

    role: "ADMIN" | "USER";
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    role?: USERROLE;
  }
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",

    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id);
      if (!existingUser) return false;
      if (!existingUser.emailVerified) return false;
        
      if(existingUser.isTwoFactorEnabled){
        const twoFactorConfirmation = await getTwoFactorAuthenticationByUserId(existingUser.id)
        console.log(twoFactorConfirmation)
        if(!twoFactorConfirmation) return false;
        await db.twoFactorConfirm.delete({
          where:{id:twoFactorConfirmation.id}
        })
        
      }
      return true;
    },
    session: async ({ session, token }) => {
      // console.log("session:", session);
      if (token.sub && !session?.user?.id) session.user.id = token.sub;
      if (token.role && !session?.user?.role) session.user.role = token.role;
      // console.log("sessionToken", token);
      return session;
    },
    jwt: async ({ token }) => {
      // set the user role to token.role by user role from database
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
