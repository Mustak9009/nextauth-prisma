"use client";
import React from "react";
import { SignUp } from "@/components";
import { useFormik } from "formik";
import { EyeState } from "@/components/Signup";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import {useRouter} from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
const initialValues = {
  username: "",
  email: "",
  password: "",
};
const validateSchema = Yup.object({
  email: Yup.string().required("Please enter your email"),
  password: Yup.string().min(3).max(6).required("Please enter your p***"),
});

export default function Home() {
  const router = useRouter();
  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
      initialValues,
      validationSchema: validateSchema,
      onSubmit: async () => {
        const handleUserSignIn = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false
        });
        if (!handleUserSignIn?.ok) {
          toast.error("User not found,please check you login details");
        }else{
          router.push('/profile');
        }
      },
    });
  const [isShow, setIsShow] = React.useState<EyeState>(EyeState.HIDE);
  return (
    <main className="container mx-auto py-3 px-6">
      <ToastContainer position="top-center"/>
      <SignUp {...{values,errors,handleChange,handleSubmit,handleBlur,touched,isShow,setIsShow}}/>
    </main>
  );
}
