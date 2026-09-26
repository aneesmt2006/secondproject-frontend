import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ArrowRight, Activity, Heart, Sparkles } from "lucide-react";
import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../patient-auth/slice/userSlice";
import { calculatePregnancyWeek } from "../../../utils/pregnancyUtils";
import { Button } from "@/components/ui/button";
import { getBodyInsightForWeek } from "../constants/body.insights.data";

const BodyInsightsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lmp } = useAppSelector(userSelector);

  const dateState = location.state?.date;
  const currentDate = dateState ? new Date(dateState) : new Date();

  const { week: currentWeek } = lmp 
    ? calculatePregnancyWeek(currentDate, lmp) 
    : { week: 0 };

  const insight = getBodyInsightForWeek(currentWeek);

  const pageVariants = {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#fff0e0] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#ffe4d9] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse delay-1000 pointer-events-none" />

      {/* Header */}
      <div className="relative px-6 pt-10 pb-4 flex items-center justify-between z-10 max-w-7xl mx-auto w-full flex-shrink-0">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-xl shadow-[0_8px_20px_-5px_rgba(90,58,46,0.1)] border border-white/50 flex items-center justify-center hover:bg-white text-[#5A2D0C] transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </Button>
          <div className="flex flex-col">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-bold text-[#5A2D0C] uppercase tracking-wider mb-0.5"
            >
              Your Body
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif font-bold text-[#5A2D0C]"
            >
              Week <span className="text-[#5A2D0C]">{currentWeek}</span>
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 md:px-8 lg:px-12 scrollbar-none z-10">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch h-full pb-4"
          >
            {/* Left Column (Desktop): Main Visual Hero & Physical Changes */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 h-full">
               <motion.div
                 variants={itemVariants}
                 className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(90,45,12,0.08)] relative overflow-hidden flex-1 flex flex-col justify-start"
               >
                 <div className="relative z-10 mb-4">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 border border-rose-500/20 backdrop-blur-sm mb-3">
                     <span className="text-[10px] font-black uppercase tracking-widest">
                       {insight.weeks} • Trimester {insight.trimester}
                     </span>
                   </div>
                   <h2 className="text-2xl md:text-3xl font-extrabold text-cocoa leading-tight">
                     {insight.title}
                   </h2>
                   <p className="text-xs font-medium text-cocoa/60 flex items-center gap-1 mt-1">
                     What's happening at week {currentWeek}
                   </p>
                 </div>

                 <div className="space-y-3 relative z-10">
                    {/* Physical Changes */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#E0825C] to-[#F28C64] text-white shadow-md shadow-[#E0825C]/25">
                          <Activity className="w-4 h-4 fill-white/20" />
                        </div>
                        <h3 className="text-lg font-bold text-cocoa">
                          Physical Changes
                        </h3>
                      </div>
                      <div className="space-y-1.5">
                        {insight.changes.map((change: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/60 border border-orange-200/50 shadow-sm transition-all hover:bg-white/80 hover:shadow-md">
                            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border border-orange-200 mt-0.5">
                              <span className="text-[10px] font-bold text-rose-500">{idx + 1}</span>
                            </div>
                            <p className="text-xs text-cocoa/80 leading-relaxed font-medium">
                              {change}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               </motion.div>
            </div>

            {/* Right Column (Desktop): Symptoms & Tips */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 h-full">
              
              {/* Common Symptoms */}
              <motion.div variants={itemVariants} className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-5 md:p-6 border border-white/60 shadow-sm relative overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-pink-500 to-rose-400 text-white shadow-sm shadow-pink-500/25">
                    <Heart className="w-4 h-4 fill-white/20" />
                  </div>
                  <h3 className="text-lg font-bold text-cocoa">
                    Common Symptoms
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {insight.symptoms.map((symptom: string, idx: number) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-100/50 flex items-center gap-2 shadow-sm transition-all hover:bg-rose-50">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span className="text-xs text-cocoa/80 font-medium">{symptom}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Wellness Tips */}
              <motion.div variants={itemVariants} className="flex-1 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-xl p-5 md:p-6 rounded-[2rem] border border-emerald-100/50 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-sm shadow-emerald-500/25">
                    <Sparkles className="w-4 h-4 fill-white/20" />
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900">
                    Wellness Tips
                  </h3>
                </div>
                <ul className="space-y-1.5 flex-grow overflow-y-auto pr-1 custom-scrollbar">
                  {insight.tips.map((tip: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-emerald-900/80 font-medium bg-white/40 p-2.5 rounded-xl border border-white/50">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default BodyInsightsPage;
