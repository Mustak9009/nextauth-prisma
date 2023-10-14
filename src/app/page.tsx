"use client";
import React from 'react';
import { SignIN } from "@/components";
import { useFormik } from "formik";
import {EyeState} from '@/components/SignIn';
import * as Yup from 'yup';
const initialValues = {
  email: "",
  password: "",
};
const validateSchema = Yup.object({
  email:Yup.string().required("Please enter your email"),
  password:Yup.string().min(3).max(6).required("Please enter your p***")
})

export default function Home() {
  const {values,errors,touched,handleChange,handleSubmit,handleBlur} = useFormik({
    initialValues,
    validationSchema:validateSchema,
    onSubmit: () => {
      console.log(values);
    },
  });
  const [isShow,setIsShow] = React.useState<EyeState>(EyeState.HIDE);
  return (
    <main className="container mx-auto py-3 px-6">
      <SignIN {...{values,errors,handleChange,handleSubmit,handleBlur,touched,isShow,setIsShow}}/>
    </main>
  );
}
