import authConfig from "@/auth.config"
import NextAuth from "next-auth"

const {auth } = NextAuth(authConfig)
import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "@/routes"


export default auth((req) => {
  const pathname = req.nextUrl
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;
  // console.log(req.nextUrl.pathname)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if(isApiAuthRoute) return null

  if(isAuthRoute) {
    if(isLoggedIn) return Response.redirect(new URL('DEFAULT_LOGIN_REDIRECT'))
    return null
  }
})

// Optionally, don't invoke Middleware on some paths
// It invokes the auth method on every path
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}