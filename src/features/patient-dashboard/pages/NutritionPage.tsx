import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../patient-auth/slice/userSlice";
import { calculatePregnancyWeek } from "../../../utils/pregnancyUtils";

// Import Refactored Components
import { TrimesterContext } from "../components/nutrition/TrimesterContext";
import { NutritionHero } from "../components/nutrition/NutritionHero";
import { EssentialNutrients } from "../components/nutrition/EssentialNutrients";
import { BuildYourPlate } from "../components/nutrition/BuildYourPlate";
import { HydrationTracker } from "../components/nutrition/HydrationTracker";
import { FoodSafety } from "../components/nutrition/FoodSafety";
import { DailyNutritionTip } from "../components/nutrition/DailyNutritionTip";

const NutritionPage = () => {
  const navigate = useNavigate();
  const { lmp } = useAppSelector(userSelector);
  
  const currentDate = new Date();
  const { week: currentWeek } = lmp 
    ? calculatePregnancyWeek(currentDate, lmp) 
    : { week: 0 };

  const currentTrimester = currentWeek <= 13 ? 1 : currentWeek <= 26 ? 2 : 3;

  const pageVariants = {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="min-h-screen gradient-peach relative overflow-hidden flex flex-col font-sans"
    >
      {/* Decorative Background Blobs */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#fff0e0] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#ffe4d9] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse delay-1000" />

      {/* Header */}
      <div className="relative px-6 pt-10 pb-4 flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-xl shadow-sm border border-white/50 flex items-center justify-center hover:bg-white text-[#5A2D0C] transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Button>
          <div className="flex flex-col">
            <motion.h1 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-serif font-bold text-[#5A2D0C]"
            >
              Nutrition Guide
            </motion.h1>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider mt-1"
            >
              Healthy You, Healthy Baby
            </motion.span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 md:px-8 md:pb-24 lg:px-12 scrollbar-none z-10">
        <div className="max-w-7xl mx-auto pt-4">
          
          <TrimesterContext currentWeek={currentWeek} currentTrimester={currentTrimester} />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
          >
            {/* Left Column: Hero & Overview */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
              <NutritionHero itemVariants={itemVariants} />
              <EssentialNutrients itemVariants={itemVariants} />
              <BuildYourPlate itemVariants={itemVariants} />
            </div>

            {/* Right Column: Tracking & Warnings */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 h-full">
              <HydrationTracker itemVariants={itemVariants} />
              <FoodSafety itemVariants={itemVariants} />
              <DailyNutritionTip itemVariants={itemVariants} currentTrimester={currentTrimester} />
            </div>
          </motion.div>

          {/* Medical Disclaimer */}
          <motion.p 
            variants={itemVariants} 
            initial="hidden" animate="show"
            className="text-center text-xs text-[#8D6E63]/70 font-medium mt-12 mb-4 px-6"
          >
            Nutrition needs vary during pregnancy. This information is for general education and does not replace advice from your doctor, midwife, or registered dietitian.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default NutritionPage;
