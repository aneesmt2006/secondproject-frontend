import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pregnantProfile,profileError } from '@/types/profile.type';
import { animate } from "framer-motion";
import { step1Schema } from "../schemas/user.profile.schema";
import { toast } from "sonner";
import { checkAge } from "../../../utils/checkAge";

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

        if (!profileData.dateOfBirth || isNaN(new Date(profileData.dateOfBirth).getTime())) {
          setError({ dateOfBirth: "Date of birth is required and must be valid." } as profileError);
          toast.error("Date of birth is required and must be valid.");
          return;
        }

        const age = checkAge(`${profileData.dateOfBirth}`);

        if (age < 18) {
          setError({ dateOfBirth: "You must be at least 18 year's Old" } as profileError);
          toast.error("You must be at least 18 year's Old");
          return;
        }

        if (age > 100) {
          setError({ dateOfBirth: "Please enter a valid date of birth." } as profileError);
          toast.error("Please enter a valid date of birth.");
          return;
        }

        if (profileData.lmp) {
          const lmpDate = new Date(profileData.lmp);
          const today = new Date();
          const fortyWeeksInMs = 40 * 7 * 24 * 60 * 60 * 1000;

          if (lmpDate > today) {
            setError({ lmp: "Invalid LMP date. Date cannot be in the future." } as profileError);
            toast.error("Invalid LMP date. Date cannot be in the future.");
            return;
          }

          if (today.getTime() - lmpDate.getTime() > fortyWeeksInMs) {
            setError({ lmp: "Invalid LMP date. Date indicates pregnancy is over 40 weeks." } as profileError);
            toast.error("Invalid LMP date. Date indicates pregnancy is over 40 weeks.");
            return;
          }
        }

        setCurrentStep(2); 
      }
    } catch (err) {
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
