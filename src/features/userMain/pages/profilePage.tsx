import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Step1Maternal from '../components/Step1Maternal';
import Step2Medical from '../components/Step2Maternal';
import { useProfileData } from "../hooks/useProfileData";
import { updateProfileSchema } from "../schemas/user.profile.schema";
import { ValidationError } from "yup";
import { PredictionLottie } from '../components/PredictionAnimation';

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserProfile,
  updateProfile,
} from "../../../services/api/medical.service";
import { getLmp, updateLmp } from "../../../services/api/auth.service";
import { pregnantProfile, profileError } from '@/types/profile.type';
import { useAppDispatch } from "../../../store/hooks";
import { setUpdateUserField } from "../../registration/slice/userSlice";
export default function ProfilePage() {
  const {
    profileData,
    setProfileData,
    handleChange,
    handleNext,
    handleBack,
    currentStep,
    setError,
  } = useProfileData();
  const [showAnimation, setShowAnimation] = useState(false);
  const [, setGetProfile] = useState<pregnantProfile>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const progress = currentStep === 1 ? 50 : 100;

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const [profileResponse, lmpResponse] = await Promise.all([
          getUserProfile(),
          getLmp(),
        ]);

        const userProfile = profileResponse.data!;
        const lmpData = lmpResponse.data;

        // Merge LMP from auth service into the profile data
        const combinedProfile = {
          ...userProfile,
          lmp: lmpData?.lmp || userProfile.lmp || "",
        };

        if (combinedProfile.lmp) {
          setProfileData(combinedProfile);
          setGetProfile(combinedProfile);
          dispatch(setUpdateUserField({ lmp: combinedProfile.lmp }));
        }

        console.log("Merged Datas....", combinedProfile);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadUserProfile();
  },[]);


const handleSubmit = async () => {
  try {
    const today = new Date();
    if (profileData.lmp) {
      const lmpDate = new Date(profileData.lmp);

      if (lmpDate > today) {
        toast("Invalid LMP date.", {
          style: {
            background: "#FFF7E8",
            color: "#4B2E05",
            border: "1px solid #F5D0A9",
            fontWeight: "500",
          },
        });
        return;
      }
    }

    // Validate inputs
    await updateProfileSchema.validate(profileData, { abortEarly: false });

    // 1️⃣ Update profile in backend (Split Logic)
    
    // Update LMP in Auth Service
    if (profileData.lmp) {
      await updateLmp(profileData.lmp);
    }

    // Update Other Data in Medical Service
    const {...medicalData } = profileData;
    const response = await updateProfile(medicalData); // Type assertion if needed, or ensure type compatibility
    
    toast.success(response.message);

    const [refreshedProfile, refreshedLmp] = await Promise.all([
      getUserProfile(),
      getLmp(),
    ]);
    
    const updatedProfile = { 
      ...refreshedProfile.data!, 
      lmp: refreshedLmp.data?.lmp || refreshedProfile.data?.lmp || ""
    };

   if (updatedProfile?.isFirstPregnancy) {
      setProfileData(updatedProfile);
      setGetProfile(updatedProfile);
      dispatch(setUpdateUserField({lmp:updatedProfile.lmp!})) // ensure string
    }

    setShowAnimation(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

  } catch (err) {
    if (err instanceof ValidationError) {
      err.errors.forEach((msg) => toast.error(msg));
      const fieldErrors: Partial<Record<keyof profileError, string>> = {};
      err.inner.forEach((e) => {
        if (e.path && e.message) {
          fieldErrors[e.path as keyof profileError] = e.message;
        }
      });
      setError(fieldErrors as profileError);
    } else {
      console.error(err);
      toast.error("Something went wrong while submitting the form.");
    }
  }
};


  

  return (
    <div className="min-h-screen bg-cream py-6 px-3 sm:px-6 md:px-8">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 text-cocoa hover:text-wine"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-cocoa">Profile</h1>
            <span className="font-medium text-periwinkle text-sm">
              Step {currentStep} of 2
            </span>
          </div>

          <Progress value={progress} className="h-2 bg-cream" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-lilac/20"
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 ? (
              <Step1Maternal
                profileData={profileData}
                handleChange={handleChange}
                setProfileData={setProfileData}
              />
            ) : (
              <Step2Medical
                profileData={profileData}
                handleChange={handleChange}
                setProfileData={setProfileData}
              />
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-lilac/20">
            {currentStep === 2 && (
              <Button
                variant="outline"
                onClick={() => handleBack()}
                className="border-periwinkle/30 text-periwinkle hover:bg-periwinkle/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Step 1
              </Button>
            )}

            <Button
              onClick={progress === 50 ? handleNext : handleSubmit}
              className="ml-auto bg-periwinkle hover:bg-lavender text-white shadow-lg"
            >
              {currentStep === 1 ? (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </div>
        </motion.div>
      </div>
      <PredictionLottie
        show={showAnimation}
        onComplete={() => setShowAnimation(false)}
        animationPath="https://lottie.host/7ab69c90-f711-4ba5-b901-d10d2201a608/U7r6qvgQrz.lottie" // change this to your loader animation
        darkMode={window.matchMedia("(prefers-color-scheme: dark)").matches}
      />
    </div>
  );
}
