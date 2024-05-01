import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { USERROLE } from "@prisma/client";
import { getTwoFactorAuthenticationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/accouts";
declare module "next-auth" {
  interface User {
    role: "ADMIN" | "USER";
  }
}
declare module "@auth/core/jwt" {
  interface JWT {
    role?: USERROLE;
    isTwoFactorEnabled: boolean;
    isOAuth:boolean
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

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorAuthenticationByUserId(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;
        await db.twoFactorConfirm.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },
    session: async ({ session, token }) => {
      if (token.sub && !session?.user?.id) session.user.id = token.sub;
      if (token.role && !session?.user?.role) session.user.role = token.role;

      if (
        token?.isTwoFactorEnabled === false ||
        (token?.isTwoFactorEnabled == true &&
          !session?.user?.isTwoFactorEnabled)
      )
      if( !session.user.isOAuth){
        session.user.isOAuth = token?.isOAuth
      }
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;

      return session;
    },
    jwt: async ({ token,trigger,session }) => {
      
       if(trigger === 'update') {
        token = {...token,...session.data}
      }
 
      // set the user role to token.role by user role from database
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
       const existingAccount = await getAccountByUserId(existingUser.id);
       
       token.isOAuth = !! existingAccount
      
       token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
