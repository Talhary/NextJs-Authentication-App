import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";

// export default auth((req) => {
//   const isLoggedIn = !!req.auth;
//   const { nextUrl } = req;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//   if (isApiAuthRoute) {
//     return null;
//   }
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }
//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL("/auth/login", nextUrl));
//   }
//   return null;
// });

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(req.nextUrl.pathname);
  const isApiAuthRoute = req.nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isPublicRoute) {
    return null;
  }
  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if(nextUrl.search){
      callbackUrl +=nextUrl.search
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    if(encodedCallbackUrl)
    return Response.redirect(new URL("/auth/login?callbackUrl="+encodedCallbackUrl, nextUrl));
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return null;
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
