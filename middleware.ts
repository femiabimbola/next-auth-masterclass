import authConfig from "@/auth.config"
import NextAuth from "next-auth"

const {auth } = NextAuth(authConfig)

export default auth((req) => {
  // console.log(req.nextUrl.pathname)
})

// Optionally, don't invoke Middleware on some paths
// It invokes the auth method on every path
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}