import React from "react";
import {
  UserCircle,
  Mail,
  Phone,
  Lock,
  Stethoscope,
  Building2,
} from "lucide-react";
import DoctorButton from '@/features/doctorMain/components/DoctorButton';
import DoctorInput from '@/features/doctorMain/components/DoctorInput';
import useRegistration from "@/features/dr.registration/hooks/useRegistration";
import OTPModal from "./OTPmodal";
import { DRregistrationProps } from '@/features/dr.registration/types/dr.types';

/**
 * Doctor Registration Page
 * Professional medical theme with Dark Sapphire Blue, Medium Sky Blue, and Soft Ice Blue
 * Split-screen layout: Left side with medical imagery (desktop), Right side with form
 * Mobile-responsive: Single column layout on small screens
 */

const DoctorRegistration: React.FC<DRregistrationProps> = ({isOpen,onResend,onClose,onVerify,onSubmit}) => {
  const { handleChange, handleSubmit, isLoading, formData, errors } =
    useRegistration({onSubmit});

  return (
    <>
    <div className="h-screen w-screen overflow-hidden ">
      {/* Split-screen container: flex-row on desktop, flex-col on mobile */}
      <div className="h-full flex flex-col lg:flex-row">
        {/* LEFT SIDE: Background Image Section (Hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Background image */}
          <img
            src="/dr-signup2.png" // 👈 replace with your desired image URL
            alt="Doctor background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlay for Sapphire Drift effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F3C]/20 via-[#2C5DA9]/10 to-[#0A0F3C]/20"></div>

          
        </div>

        {/* RIGHT SIDE: Registration Form */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-gradient-to-br from-[#F8FBFF] to-white">
          <div className="min-h-full flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md">
              {/* Form header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0A0F3C] rounded-full mb-4">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-[#0A0F3C] mb-2">
                  Doctor Registration
                </h1>
                <p className="text-[#2C5DA9]">
                  Create your professional account
                </p>
              </div>

              {/* Registration form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <DoctorInput
                  label="Full Name"
                  type="text"
                  name="fullName"
                  placeholder="Dr. John Smith"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  required
                  icon={<UserCircle size={20} />}
                />

                <DoctorInput
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="doctor@hospital.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                  icon={<Mail size={20} />}
                />

                <DoctorInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  required
                  icon={<Phone size={20} />}
                />

                <DoctorInput
                  label="Medical Specialization"
                  type="text"
                  name="specialization"
                  placeholder="e.g., Obstetrics & Gynecology"
                  value={formData.specialization}
                  onChange={handleChange}
                  error={errors.specialization}
                  required
                  icon={<Stethoscope size={20} />}
                />

                <DoctorInput
                  label="Clinic/Hospital Name"
                  type="text"
                  name="clinicName"
                  placeholder="Medical Center Name"
                  value={formData.clinicName}
                  onChange={handleChange}
                  error={errors.clinicName}
                  required
                  icon={<Building2 size={20} />}
                />

                <DoctorInput
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                  icon={<Lock size={20} />}
                />

                <DoctorInput
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  required
                  icon={<Lock size={20} />}
                />

                <div className="pt-4">
                  <DoctorButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isLoading}
                    
                  >
                    {isLoading ? "Creating Account..." : "Register"}
                  </DoctorButton>
                </div>

                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                      href="/doctor/login"
                      className="text-[#2C5DA9] hover:text-[#0A0F3C] font-semibold transition-colors"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OTPModal onVerify={onVerify} onClose={onClose} onResend={onResend} isOpen={isOpen}/>
    </>
  );
};

export default DoctorRegistration;
