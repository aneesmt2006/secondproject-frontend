import React, { useState } from 'react';
import { Camera, Mail, Phone, Lock, Calendar } from 'lucide-react';
import Input from './Input';
import Button from './Button';
import Card from './Card';

/**
 * RegistrationForm Component
 *
 * Comprehensive registration form for new users to create their pregnancy companion account.
 * Includes profile photo upload, personal information fields, and authentication options.
 *
 * Props:
 * - onSubmit: (data: RegistrationData) => void - Callback when form is submitted
 * - onGoogleSignUp: () => void - Callback for Google sign-up
 */

interface RegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  dateOfBirth: string;
  profilePhoto?: string;
}

interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => void;
  onGoogleSignUp: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  onGoogleSignUp,
}) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    dateOfBirth: '',
    profilePhoto: undefined,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});
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
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, profilePhoto: 'Please select an image file' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, profilePhoto: 'Image must be less than 5MB' }));
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
        setFormData((prev) => ({ ...prev, profilePhoto: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-8 px-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl" padding="lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cocoa mb-2">
            Basic Information
          </h1>
          <p className="text-lavender text-sm md:text-base">
            Let's start with the essentials to set up your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div
                className={`
                  w-32 h-32 rounded-full overflow-hidden
                  bg-lilac border-4 border-white shadow-lg
                  flex items-center justify-center
                  transition-all duration-200 hover:scale-105
                  ${photoPreview ? '' : 'cursor-pointer'}
                `}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-12 h-12 text-lavender" />
                )}
              </div>
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-periwinkle text-white p-2 rounded-full cursor-pointer hover:bg-opacity-90 transition-all shadow-md"
              >
                <Camera className="w-5 h-5" />
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-lavender mt-3">Upload Profile Photo</p>
            {errors.profilePhoto && (
              <p className="text-sm text-wine mt-1">{errors.profilePhoto}</p>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
              className="md:col-span-1"
            />

            {/* Email */}
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              icon={<Mail className="w-5 h-5" />}
              className="md:col-span-1"
            />

            {/* Phone Number */}
            <Input
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              placeholder="+1 (555) 123-4567"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
              required
              icon={<Phone className="w-5 h-5" />}
              className="md:col-span-1"
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              icon={<Lock className="w-5 h-5" />}
              className="md:col-span-1"
            />

            {/* Date of Birth */}
            <Input
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              error={errors.dateOfBirth}
              required
              icon={<Calendar className="w-5 h-5" />}
              className="md:col-span-2"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="primary" size="lg" fullWidth className="mt-8">
            Create Account
          </Button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-lilac"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-lavender">or</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={onGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-lilac rounded-lg text-cocoa font-medium hover:bg-lilac hover:bg-opacity-10 transition-all duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign Up with Google
          </button>
        </form>
      </Card>
    </div>
  );
};

export default RegistrationForm;
