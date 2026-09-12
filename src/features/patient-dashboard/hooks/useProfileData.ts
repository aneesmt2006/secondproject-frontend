import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pregnantProfile,profileError } from '@/types/profile.type';
import { animate } from "framer-motion";
import { step1Schema } from "../schemas/user.profile.schema";
import { toast } from "sonner";

export const useProfileData = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<pregnantProfile>({
    _id: "",
    userId: "",
    fullName: "",
    dateOfBirth: "",
    bloodGroup: "",
    height: "",
    weight: "",
    mobile: "",
    emergencyContact: "",
    email: "",
    lmp: "",
    isFirstPregnancy: true,
    gestationalDiabetes: false,
    gestationalSugar: "",
    bloodPressure: false,
    bpReading: "",
    thyroidProblems: false,
    pcosPcod: false,
    takingSupplements: "",
    knownAllergies: "",
    familyRelated: "",
    otherHealthIssues: "",
  });


  const [error, setError] = useState<profileError>({
    fullName: "",
    dateOfBirth: "",
    lmp: "",
    familyRelated: "",
    knownAllergies: "",
    takingSupplements: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    const controls = animate(window.scrollY, 0, {
    duration: 1,   // 👈 1 seconds slow scroll
    ease: "easeInOut",
    onUpdate: (latest) => window.scrollTo(0, latest),
  });
  return () => controls.stop();
  }, [currentStep]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // Clear previous errors before validating
      setError({});

      if (currentStep === 1) {
        // Validate Step 1 fields only
        await step1Schema.validate(profileData, { abortEarly: false });
        setCurrentStep(2); 
      }
    } catch (err) {
      console.log("Validation Error:", err);
      if (err.inner) {
        const fieldErrors: Partial<Record<keyof profileError, string>> = {};
        err.inner.forEach((e) => {
          if (e.path) {
            fieldErrors[e.path as keyof profileError] = e.message;
          }
        });
        setError(fieldErrors as profileError);
        
        // Find the first error message and toast it
        const firstError = Object.values(fieldErrors)[0];
        if (firstError) toast.error(firstError);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else {
      navigate("/dashboard");
    }
  };

  

  return {
    profileData,
    setProfileData,
    handleChange,
    handleNext,
    handleBack,
    error,
    setError,
    currentStep,
  };
};
