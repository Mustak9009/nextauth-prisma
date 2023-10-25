import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import { compare } from "bcryptjs";
import GithubProvider from "next-auth/providers/github";

export const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const isUserExist = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!isUserExist) {
          return null;
        }
        if(isUserExist.password){
          const isPasswordMatch = await compare(credentials.password,isUserExist.password);
          if (!isPasswordMatch) {
            return null;
          }
        }
        return {
          id: isUserExist.id,
          email: isUserExist.email,
          userName: isUserExist.userName,
          image:"https://pub-static.fotor.com/assets/projects/pages/7252c2b86395453a836cdd57b13b3d39/600w/fotor-7c742084acd7491aae9923279bdc3218.jpg",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: { //Extend 
    async jwt({ token, user, account, profile }) {
      if(user){
        return{
          ...token,
          id:user.id,
          userName:user.userName,
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user:{
          ...session.user,
          id:token.id,
          userName:token.userName
        }
      };
    }
  },
};
