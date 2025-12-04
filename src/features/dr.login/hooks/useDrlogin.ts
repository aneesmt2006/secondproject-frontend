
import React, { useState } from 'react';
import { LoginProps } from '../types/dr.type';
import { drLoginSchema } from '../schemas/dr.login.schema';
import { ValidationError } from 'yup';


/**
 * Doctor Login Page
 * Professional medical theme with Dark Sapphire Blue, Medium Sky Blue, and Soft Ice Blue
 * Viewport-constrained design with no page-level scrolling
 */

interface LoginFormData {
  email: string;
  password: string;
//   rememberMe?: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
//   general?: string;
}
const useDrlogin = ({handleSubmitLogin,role}:LoginProps) => {
   const [formData, setFormData] = useState<LoginFormData>({
     email: '',
     password: '',
    //  rememberMe: false,
   });
 
   const [errors, setErrors] = useState<LoginErrors>({});
   const [isLoading, setIsLoading] = useState(false);
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value, type, checked } = e.target;
     setFormData((prev) => ({
       ...prev,
       [name]: type === 'checkbox' ? checked : value,
     }));
 
     if (errors[name as keyof LoginErrors]) {
       setErrors((prev) => ({ ...prev, [name]: undefined }));
     }
   };
 
   const validateForm = (): boolean => {
     const newErrors: LoginErrors = {};
 
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!formData.email.trim()) {
       newErrors.email = 'Email is required';
     } else if (!emailRegex.test(formData.email)) {
       newErrors.email = 'Please enter a valid email address';
     }
 
     if (!formData.password) {
       newErrors.password = 'Password is required';
     } else if (formData.password.length < 8) {
       newErrors.password = 'Password must be at least 8 characters';
     }
 
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
 
     if (!validateForm() && !await drLoginSchema.validate(formData)) {
       return;
     }
 
     setErrors({});
 
     try {
    //    await new Promise((resolve) => setTimeout(resolve, 1500));
       console.log('Doctor Login:', formData,role);
       const res = await handleSubmitLogin(formData.email,formData.password);
       if(res){
        setIsLoading(true)
       }
     } catch (error) {
       setIsLoading(false)
        console.error('Registration error:', error)
            if (error instanceof ValidationError) {
        const fieldErrors: LoginErrors = {}

        error.inner.forEach((err) => {
          fieldErrors[err.path as keyof LoginFormData] = err.message;
        });

        console.log(fieldErrors)

        setErrors(fieldErrors);
      }
     } 
   };

   return {handleSubmit,isLoading,handleChange,errors,formData}
 
}

export default useDrlogin