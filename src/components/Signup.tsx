'use client'
import React from "react";
import Link from "next/link";
import type { FormikErrors, FormikTouched } from "formik";
import {signIn} from 'next-auth/react';
export enum EyeState {
  SHOW = "SHOW",
  HIDE = "HIDE",
}
export interface PropsType {
  values: {
    email: string;
    password: string;
    username:string;
    confirm_password:string
  };
  errors: FormikErrors<{
    email: string;
    password: string;
    username:string;
    confirm_password:string
  }>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: FormikTouched<{
    email: string;
    password: string;
    username:string;
    confirm_password:string
  }>;
  isShow: EyeState;
  setIsShow: React.Dispatch<React.SetStateAction<EyeState>>;
  isUserExist:string;
  setIsUserExist: React.Dispatch<React.SetStateAction<string>>
}
export default function Signup({ values, errors, handleBlur, handleChange, handleSubmit, touched, isShow, setIsShow,isUserExist,setIsUserExist}: PropsType) {
  return (
    <div className="sigin h-[80vh] flex justify-center items-center">
      <div className="sighin_card min-w-[25rem]  px-3 rounded-md shadow-md bg-gray-50 py-6">
        <form action="POST" onSubmit={handleSubmit} autoComplete="off" onChange={()=>setIsUserExist('')}>
          {isUserExist && (
            <p className="text-white bg-red-500 rounded py-2 px-3 mb-5">{isUserExist}</p>
          )}
          <div className="card_top space-y-3">
            <div className="input_box">
              <label htmlFor="username">User name</label>
              <input type="text" name="username" id="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
              {errors.username && touched.username && (
                <p className="text-red-500 relative top-1">{errors.username}</p>
              )}
            </div>
            <div className="input_box">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
              {errors.email && touched.email && (
                <p className="text-red-500 relative top-1">{errors.email}</p>
              )}
            </div>
            <div className="input_box">
              <label htmlFor="password">Password</label>
              <input type={`${isShow === EyeState.SHOW ? "text" : "password"}`} name="password" id="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
              <div className="relative left-[92%] bottom-7 inline w-5 cursor-pointer ">
                {isShow === EyeState.SHOW ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" onClick={() => setIsShow(EyeState.HIDE)}>
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" onClick={() => setIsShow(EyeState.SHOW)}>
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 relative -top-3">{errors.password}</p>
              )}
            </div>
            <div className="input_box relative -top-4">
              <label htmlFor="confirm_password">Confirm password</label>
              <input type="password" name="confirm_password" id="confirm_password" value={values.confirm_password} onChange={handleChange} onBlur={handleBlur}/>
              {errors.confirm_password && touched.confirm_password && (
                <p className="text-red-500 relative top-1">{errors.confirm_password}</p>
              )}
            </div>
            <button type="submit" className="btn w-full py-2">
              Sign up
            </button>
          </div>
          <div className="card_middle">
            <span /> <b>Or</b> <span />
          </div>
          <div className="card_bottom">
            <div className="sign_with_google mb-2">
              <button type="button"  className="btn w-full py-2 flex justify-center items-center gap-2" >
                Sign up with Github
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 496 512"
                  className="fill-white"
                >
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                </svg>
              </button>
            </div>
            <p className="[&>a]:text-blue-500">
              Already have account{" "}
              <Link href={"/"} className="underline hover:text-blue-700">
                Sign in.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
