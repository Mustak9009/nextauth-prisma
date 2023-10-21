'use client'
import React from "react";
import {useSession} from 'next-auth/react';
// import { authOption } from "@/utils/auth";
// import { getServerSession, Session } from "next-auth";
// const getSession = async (): Promise<Session | null> => {
//   const session = await getServerSession(authOption);
//   return session;
// };
export default function Profile() {
  // const session = await getSession();
  const {data:session,status} = useSession(); //server session(getServerSession()) is more faster than -> client session (useSession())
  if(status==='unauthenticated'){
    window.location.href='/';
    return;
  }
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      {session && (
        <>
          <img src={session?.user?.image as string} className="mb-5 rounded-lg" alt="user" width="100" height="100"/>
          <b className="text-xl capitalize">
            hello {" "}
            <span className="text-emerald-400">{session?.user?.userName}</span>
          </b>
          <span>Email: {session?.user?.email}</span>
        </>
      )}
    </div>
  );
}
