"use client";
import React, { useState } from 'react';
import { SignIn } from "@/components";
import { useFormik } from "formik";
import {EyeState} from '@/components/Signin';
import * as Yup from 'yup';
import {createNewUser} from '@/helpers';
import {useRouter} from 'next/navigation';
const initialValues = {
  username:'',
  email: "",
  password: "",
  confirm_password:''
};
const validateSchema = Yup.object({
  username:Yup.string().required("Please enter your userName"),
  email:Yup.string().required("Please enter your email"),
  password:Yup.string().min(3).max(6).required("Please enter your p***"),
  confirm_password:Yup.string().required().oneOf([Yup.ref('password')],"Confirm should be match")
})

export default function Home() {
  const router = useRouter();
  const [isUserExist,setIsUserExist] = useState<string>('');
  const [isShow,setIsShow] = React.useState<EyeState>(EyeState.HIDE);
  const {values,errors,touched,handleChange,handleSubmit,handleBlur} = useFormik({
    initialValues,
    validationSchema:validateSchema,
    onSubmit: async () => {
      const {username,email,password} = values;
      const newUser = await createNewUser({userName:username,email,password});
      if(newUser && !newUser.error){
        router.push('/')
      }else{
        setIsUserExist(newUser.error);
      }
    },
  });
  return (
    <main className="container mx-auto py-3 px-6">
      <SignIn {...{values,errors,handleChange,handleSubmit,handleBlur,touched,isShow,setIsShow,isUserExist,setIsUserExist}}/>
    </main>
  );
}