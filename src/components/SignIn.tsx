import React from "react";
import Link from "next/link";
import type { FormikErrors, FormikTouched } from "formik";
export enum EyeState {
  SHOW = "SHOW",
  HIDE = "HIDE",
}
export interface PropsType {
  values: {
    email: string;
    password: string;
  };
  errors: FormikErrors<{
    email: string;
    password: string;
  }>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched: FormikTouched<{
    email: string;
    password: string;
  }>;
  isShow: EyeState;
  setIsShow: React.Dispatch<React.SetStateAction<EyeState>>;
}
export default function SignIn({ values, errors, handleBlur, handleChange, handleSubmit, touched, isShow, setIsShow,}: PropsType) {
  return (
    <div className="sigin h-[80vh] flex justify-center items-center">
      <div className="sighin_card  px-3 rounded-md shadow-md bg-gray-50 py-6">
        <form action="POST" onSubmit={handleSubmit} autoComplete="off">
          <div className="card_top">
            <div className="input_box">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
              {errors.email && touched.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="input_box">
              <label htmlFor="password">Password</label>
              <input type={`${isShow === EyeState.SHOW ? 'text': 'password'}`} name="password" id="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
              <div className="relative left-[92%] bottom-7 inline w-5 cursor-pointer">
                {isShow === EyeState.SHOW ? (
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" onClick={() => setIsShow(EyeState.HIDE)}>
                    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" onClick={()=>setIsShow(EyeState.SHOW)}>
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                )}
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <button type="submit" className="btn w-full py-2">
              Login
            </button>
          </div>
          <div className="card_middle">
            <span /> <b>Or</b> <span />
          </div>
          <div className="card_bottom">
            <div className="sign_with_google mb-2">
              <button className="btn w-full py-2 flex justify-center items-center gap-2">
                Sign in with Google
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-white"
                  height="1em"
                  viewBox="0 0 488 512"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
              </button>
            </div>
            <p className="[&>a]:text-blue-500">
              If you already have an account, please{" "}
              <Link href={"#"} className="underline hover:text-blue-700">
                Sign in.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
