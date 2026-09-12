import { useState } from "react";
import { drRegisterSchema } from "../schemas/dr.register.schema";
import { ValidationError } from "yup";
import { drFormData,FormErrors, useRegistrationProps } from '../types/dr.types';

const useRegistration = ({onSubmit}:useRegistrationProps) => {
  const [formData, setFormData] = useState<drFormData>({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      specialization: '',
      role:"doctor",
      clinicName: '',
    });
  
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    };
  
    const validateForm = (): boolean => {
      const newErrors: FormErrors = {};
  
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Name must be at least 3 characters';
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
  
      const phoneRegex = /^\+?[\d\s\-()]{10,12}$/;
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
  
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
  
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
  
      if (!formData.specialization.trim()) {
        newErrors.specialization = 'Specialization is required';
      }
  
      if (!formData.clinicName.trim()) {
        newErrors.clinicName = 'Clinic/Hospital name is required';
      }

     
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        if(validateForm() && await drRegisterSchema.validate(formData,{abortEarly:false})){
        
            console.log('Doctor Registration:', formData);
           const res = await  onSubmit(formData);
           if(res){
            setIsLoading(!isLoading)
           }
        }
      } catch (error) {
        setIsLoading(false)
        console.error('Registration error:', error.errors)
            if (error instanceof ValidationError) {
        const fieldErrors: Partial<Record<keyof drFormData, string>> = {};

        error.inner.forEach((err) => {
          fieldErrors[err.path as keyof drFormData] = err.message;
        });

        console.log(fieldErrors)

        setErrors(fieldErrors);
      }
      }
  
    //   if (!validateForm()) {
    //     return;
    //   }
  
    //   setIsLoading(true);
  
    //   try {
    //     await new Promise((resolve) => setTimeout(resolve, 1500));
    //     console.log('Doctor Registration:', formData);
    //   } catch (error) {
    //     console.error('Registration error:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    };

    return {handleSubmit,handleChange,isLoading,setIsLoading,formData,errors}
  
}

export default useRegistration
