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
import VisitHistory from '../components/VisitHistory';
import { LayoutGrid, History, User } from "lucide-react";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserProfile,
  updateProfile,
} from "../../../services/api/medical.service";
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
    error,
    setError,
  } = useProfileData();
  const [showAnimation, setShowAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [, setGetProfile] = useState<pregnantProfile>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const progress = activeTab === 'profile' ? (currentStep === 1 ? 50 : 100) : null;

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setIsLoading(true);
        const profileResponse = await getUserProfile();
        const userProfile = profileResponse.data!;

        // Format dates for input fields
        const formattedProfile = {
          ...userProfile,
          dateOfBirth: userProfile.dateOfBirth?.split('T')[0] || "",
          lmp: userProfile.lmp?.split('T')[0] || "",
        };

        if (formattedProfile.lmp || formattedProfile.fullName) {
          setProfileData(formattedProfile);
          setGetProfile(formattedProfile);
          dispatch(setUpdateUserField({ lmp: formattedProfile.lmp }));
        }

        console.log("Profile Data Loaded:", formattedProfile);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        // Add a small artificial delay for a smoother transition
        setTimeout(() => setIsLoading(false), 800);
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

    // Update everything (including LMP) in Medical Service
    const response = await updateProfile(profileData);
    
    toast.success(response.message);

    const refreshedProfileResponse = await getUserProfile();
    const updatedProfile = { 
      ...refreshedProfileResponse.data!, 
      dateOfBirth: refreshedProfileResponse.data?.dateOfBirth?.split('T')[0] || "",
      lmp: refreshedProfileResponse.data?.lmp?.split('T')[0] || ""
    };

    if (updatedProfile) {
      setProfileData(updatedProfile);
      setGetProfile(updatedProfile);
      dispatch(setUpdateUserField({ lmp: updatedProfile.lmp }));
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

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-cocoa tracking-tight mb-1">
                {activeTab === 'profile' ? 'Profile Details' : 'Medical History'}
              </h1>
              <p className="text-sm text-cocoa/50 font-medium">
                {activeTab === 'profile' 
                  ? `Maintain your personal medical information` 
                  : 'Track your previous prenatal consultation records'}
              </p>
            </div>

            {/* Pill Switcher */}
            <div className="bg-cream/50 p-1.5 rounded-2xl flex items-center gap-1 border border-lilac/10 shadow-inner relative">
              <button
                onClick={() => setActiveTab('profile')}
                className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
                  activeTab === 'profile' ? 'text-wine' : 'text-cocoa/40 hover:text-cocoa/60'
                }`}
              >
                {activeTab === 'profile' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-lg shadow-periwinkle/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <User className={`w-4 h-4 relative z-20 ${activeTab === 'profile' ? 'text-periwinkle' : 'text-cocoa/30'}`} />
                <span className="relative z-20">Profile</span>
              </button>
              
              <button
                onClick={() => setActiveTab('history')}
                className={`relative z-10 flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
                  activeTab === 'history' ? 'text-wine' : 'text-cocoa/40 hover:text-cocoa/60'
                }`}
              >
                {activeTab === 'history' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-xl shadow-lg shadow-periwinkle/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <History className={`w-4 h-4 relative z-20 ${activeTab === 'history' ? 'text-periwinkle' : 'text-cocoa/30'}`} />
                <span className="relative z-20">History</span>
              </button>
            </div>
          </div>

          {progress !== null && (
            <div className="space-y-2 mb-4">
               <div className="flex justify-between items-end mb-1">
                <span className="text-[10px] font-black text-periwinkle uppercase tracking-widest">Setup Progress</span>
                <span className="text-[10px] font-black text-periwinkle/50 uppercase tracking-widest">Step {currentStep} of 2</span>
              </div>
              <Progress value={progress} className="h-1.5 bg-cream/50 rounded-full" />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-lilac/20 relative overflow-hidden"
        >
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[50] flex items-center justify-center bg-white/60 backdrop-blur-md"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cocoa"></div>
                  <p className="text-cocoa font-semibold text-sm animate-pulse tracking-wide">
                    Loading profile...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {activeTab === 'profile' ? (
              currentStep === 1 ? (
                <Step1Maternal
                  profileData={profileData}
                  handleChange={handleChange}
                  setProfileData={setProfileData}
                  errors={error}
                />
              ) : (
                <Step2Medical
                  profileData={profileData}
                  handleChange={handleChange}
                  setProfileData={setProfileData}
                />
              )
            ) : (
              <VisitHistory />
            )}
          </AnimatePresence>

          {activeTab === 'profile' && (
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
          )}
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
