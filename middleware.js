import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { LOGIN, PUBLIC_ROUTES, REGISTERED_API, ROOT } from "./lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
   // req.auth
   const { nextUrl } = req;
   const isAuthenticated = !!req.auth;
   console.log({ nextUrl, isAuthenticated });

   const isPublicRoute =
      PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === ROOT;
   console.log({ isAuthenticated, PUBLIC_ROUTES });

   const isRegistering =
      nextUrl.pathname === REGISTERED_API && !isAuthenticated;

   if (!isAuthenticated && !isPublicRoute && !isRegistering) {
      console.log("Entered there");

      return Response.redirect(new URL(LOGIN, nextUrl));
   }
});

export const config = {
   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
