

import React, { useState } from 'react'
import { RegistrationData } from '../types/register.type';
import { checkAge } from '../../../utils/checkAge';
import { ValidationError } from 'yup';
import { registrationSchema } from '../schemas/user.register.schema';



const useRegistrationForm = (onSubmit:(data:RegistrationData)=>void) => {

    const [formData, setFormData] = useState<RegistrationData>({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth:"",
    role: "user",
    profileImage: undefined,
  });

  

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegistrationData, string>>
  >({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof RegistrationData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle profile photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          profilePhoto: "Please select an image file",
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profilePhoto: "Image must be less than 5MB",
        }));
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          profilePhoto: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (checkAge(`${formData.dateOfBirth}`) < 18) {
      newErrors.dateOfBirth = "You must be at least 18 year's Old";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        validateForm() &&
        (await registrationSchema.validate(formData, { abortEarly: false }))
      ) {
        
        onSubmit(formData);
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const fieldErrors: Partial<Record<keyof RegistrationData, string>> = {};
        error.inner.forEach((err) => {
          fieldErrors[err.path as keyof RegistrationData] = err.message;
        });

        setErrors(fieldErrors);
      }
    }
  };

  return {handleChange,handleSubmit,handlePhotoUpload,photoPreview,errors,formData}
}

export default useRegistrationForm
