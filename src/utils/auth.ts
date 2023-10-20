import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {prisma} from '@/db/prisma';
import {compare} from 'bcryptjs';
export const authOption: NextAuthOptions = {
  adapter:PrismaAdapter(prisma),
  session:{
    strategy:'jwt'
  },
  pages:{
    signIn:'/',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if(!credentials?.email || !credentials?.password){
          return null;
        }
        const isUserExist = await prisma.user.findUnique({where:{email:credentials.email}});
        if(!isUserExist){
          return null;
        }
        const isPasswordMatch = await compare(credentials.password,isUserExist.password);
        if(!isPasswordMatch){
          return null;
        }
        return {
          id:isUserExist.id,
          email:isUserExist.email,
          name:isUserExist.userName
        }
      },
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET
};
