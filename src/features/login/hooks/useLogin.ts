

import React, { useState } from 'react'
import { loginData, onSubmitProp } from '../types/login.types';
import { loginSchema } from '../../registration/schemas/user.register.schema';
import { ValidationError } from 'yup';



const useLogin = ({onSubmit}:onSubmitProp)=>{

   const [formData, setFormData] = useState({
       email: '',
       password: '',
     });
   
     const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
     const [rememberMe, setRememberMe] = useState(false);
   
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target;
       setFormData((prev) => ({ ...prev, [name]: value }));
       if (errors[name as keyof typeof errors]) {
         setErrors((prev) => ({ ...prev, [name]: undefined }));
       }
     };
   
     const validateForm = (): boolean => {
       const newErrors: { email?: string; password?: string } = {};
   
       if (!formData.email.trim()) {
         newErrors.email = 'Email is required';
       } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
         newErrors.email = 'Please enter a valid email';
       }
   
       if (!formData.password) {
         newErrors.password = 'Password is required';
       }
   
       setErrors(newErrors);
       return Object.keys(newErrors).length === 0;
     };
   
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       try {
        if (validateForm() && await loginSchema.validate(formData,{abortEarly:false})) {
         onSubmit(formData.email, formData.password);
       }

       } catch (error) {
        if(error instanceof ValidationError){
           const fieldErrors: Partial<Record<keyof loginData, string>> = {};
        error.inner.forEach((err) => {
          fieldErrors[err.path as keyof loginData] = err.message;
        });

        setErrors(fieldErrors);
        }

        
       }
     };

     return {formData,setRememberMe,rememberMe,handleChange,handleSubmit,errors,}
};

export default useLogin