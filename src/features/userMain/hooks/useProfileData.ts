import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pregnantProfile,profileError } from "../types/profile.type";
import { animate } from "framer-motion";
// import { getUser } from "../../../services/api/user.service";
// import { profileSchema } from "../schemas/user.profile.shema";
// import { updateProfile } from "../../../services/api/user.service";
// import { ValidationError } from "yup";

export const useProfileData = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<pregnantProfile>({
    lmp: "",
    isFirstPregnancy: true,
    bloodGroup: "",
    height: "",
    weight: "",
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

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2); 
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
