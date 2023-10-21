'use client'
import React from 'react'
import {signOut} from 'next-auth/react'
export default function LogOut() {
  return (
    <button className="btn px-3 py-1 !bg-red-500" onClick={()=>signOut()}>Sign Out</button>
  )
}
