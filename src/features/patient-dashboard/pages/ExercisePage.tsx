import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../patient-auth/slice/userSlice";
import { calculatePregnancyWeek } from "../../../utils/pregnancyUtils";

import { ExerciseHero } from "../components/exercise/ExerciseHero";
import { TrimesterTabs } from "../components/exercise/TrimesterTabs";
import { VideoCard } from "../components/exercise/VideoCard";
import { VideoPlayerModal } from "../components/exercise/VideoPlayerModal";
import { trimesterVideos, ExerciseVideo } from "../constants/exercise.data";

const ExercisePage = () => {
  const navigate = useNavigate();
  const { lmp } = useAppSelector(userSelector);
  
  const currentDate = new Date();
  const { week: currentWeek } = lmp 
    ? calculatePregnancyWeek(currentDate, lmp) 
    : { week: 0 };

  const currentTrimester = currentWeek <= 13 ? 1 : currentWeek <= 26 ? 2 : 3;
  
  const [activeTab, setActiveTab] = useState(currentTrimester);
  const [playingVideo, setPlayingVideo] = useState<ExerciseVideo | null>(null);

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

  const videos = trimesterVideos[activeTab] || [];
  const isLocked = activeTab !== currentTrimester;

  return (
    <>
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
                Exercise & Wellness
              </motion.h1>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-bold text-[#8D6E63] uppercase tracking-wider mt-1"
              >
                Safe workouts for you
              </motion.span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24 md:px-8 md:pb-24 lg:px-12 scrollbar-none z-10">
          <div className="max-w-7xl mx-auto pt-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6"
            >
              <ExerciseHero itemVariants={itemVariants} />
              
              <div className="flex flex-col items-center mt-4">
                <TrimesterTabs 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  userTrimester={currentTrimester} 
                />
              </div>

              {isLocked && (
                <motion.div 
                  variants={itemVariants}
                  className="bg-white/60 backdrop-blur-md rounded-2xl p-4 flex items-start gap-3 border border-white/50 shadow-sm mx-auto max-w-2xl"
                >
                  <Info className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 font-medium">
                    You are currently in your <span className="font-bold text-rose-500">{currentTrimester}{currentTrimester === 1 ? 'st' : currentTrimester === 2 ? 'nd' : 'rd'} Trimester</span>. 
                    These videos are tailored for the {activeTab}{activeTab === 1 ? 'st' : activeTab === 2 ? 'nd' : 'rd'} Trimester and are locked for your safety. Focus on workouts recommended for your current stage!
                  </p>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#5A2D0C]">
                    {activeTab === 1 ? "1st" : activeTab === 2 ? "2nd" : "3rd"} Trimester Workouts
                  </h3>
                  <span className="text-xs font-bold text-[#8D6E63] bg-white/50 px-3 py-1 rounded-full">
                    {videos.length} Videos
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <VideoCard 
                      key={video.id} 
                      video={video} 
                      isLocked={isLocked}
                      onPlay={setPlayingVideo}
                      itemVariants={itemVariants}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Medical Disclaimer */}
              <motion.p 
                variants={itemVariants} 
                className="text-center text-xs text-[#8D6E63]/70 font-medium mt-12 mb-4 px-6 max-w-3xl mx-auto"
              >
                Always consult with your healthcare provider before starting any exercise program during pregnancy. Listen to your body and stop if you feel pain, dizziness, or shortness of breath.
              </motion.p>

            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <VideoPlayerModal 
        video={playingVideo} 
        onClose={() => setPlayingVideo(null)} 
      />
    </>
  );
};

export default ExercisePage;
