// Files like this are for auth.ts
import NextAuth, {DefaultSession} from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER"
}

declare module "next-auth" {
  interface Session {
    user:ExtendedUser,
  }
}



// This alone should have worked
// declare module "@auth/core" {
//   interface Session {
//     user: {
//       role: "ADMIN" | "USER",
//      } & DefaultSession["user"]
//   }
// }