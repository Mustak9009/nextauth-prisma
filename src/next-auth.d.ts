import NextAuth from "next-auth"

declare module "next-auth" {
  interface User{
    userName:string
  }
  interface Session {
    user: {
      userName: string
    } & DefaultSession["user"]
    token:{
        userName:string
    }
  }
}