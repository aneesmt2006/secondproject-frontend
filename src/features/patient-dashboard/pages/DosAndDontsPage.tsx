import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, CheckCircle, XOctagon, HelpCircle } from "lucide-react";
import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../patient-auth/slice/userSlice";
import { calculatePregnancyWeek } from "../../../utils/pregnancyUtils";
import { Button } from "@/components/ui/button";
import { getWatchOutsForWeek } from "../constants/dosAndDonts.data";

const DosAndDontsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lmp } = useAppSelector(userSelector);

  const dateState = location.state?.date;
  const currentDate = dateState ? new Date(dateState) : new Date();

  const { week: currentWeek } = lmp 
    ? calculatePregnancyWeek(currentDate, lmp) 
    : { week: 0 };

  const insight = getWatchOutsForWeek(currentWeek);

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
              Safety Guidelines
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif font-bold text-[#5A2D0C]"
            >
              Do's & Don'ts <span className="text-xl md:text-2xl font-sans text-rose-500 font-medium ml-2">Week {currentWeek}</span>
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch h-full pb-4 scale-90 origin-top"
          >
            {/* Left Column (Desktop): Do's */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-4 h-full">
               <motion.div
                 variants={itemVariants}
                 className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(90,45,12,0.08)] relative overflow-hidden flex-1 flex flex-col justify-start border-l-4 border-l-emerald-500"
               >
                 <div className="relative z-10 mb-4">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 backdrop-blur-sm mb-3">
                     <span className="text-[10px] font-black uppercase tracking-widest">
                       {insight.weeks} • Trimester {insight.trimester}
                     </span>
                   </div>
                   <h2 className="text-2xl md:text-3xl font-extrabold text-cocoa leading-tight text-emerald-900">
                     Recommended Do's
                   </h2>
                   <p className="text-xs font-medium text-emerald-800/80 mt-2">
                     Follow these healthy practices for you and your baby.
                   </p>
                 </div>

                 <div className="space-y-3 relative z-10">
                    <div className="space-y-2">
                      <div className="space-y-1.5">
                        {insight.dos.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 shadow-sm transition-all hover:bg-emerald-100 hover:shadow-md">
                            <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 border border-emerald-300 mt-0.5">
                              <span className="text-[10px] font-bold text-emerald-700">✓</span>
                            </div>
                            <p className="text-sm text-emerald-900 leading-relaxed font-semibold">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               </motion.div>
            </div>

            {/* Right Column (Desktop): Don'ts, Myths */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-4 h-full">
              
              {/* Don'ts */}
              <motion.div variants={itemVariants} className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-5 md:p-6 border border-white/60 shadow-sm relative overflow-hidden flex flex-col border-l-4 border-l-rose-500">
                <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-rose-400 to-red-500 text-white shadow-sm shadow-rose-500/25">
                    <XOctagon className="w-4 h-4 fill-white/20" />
                  </div>
                  <h3 className="text-lg font-bold text-cocoa">
                    Crucial Don'ts
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-1.5 overflow-y-auto pr-1 custom-scrollbar">
                  {insight.donts.map((item: string, idx: number) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-rose-50/50 border border-rose-100/50 flex items-start gap-2 shadow-sm transition-all hover:bg-rose-50">
                      <div className="w-5 h-5 rounded-full bg-rose-200 flex items-center justify-center shrink-0 border border-rose-300 mt-0.5">
                         <span className="text-[10px] font-bold text-rose-700">✕</span>
                      </div>
                      <span className="text-sm text-cocoa/80 font-medium leading-snug pt-0.5">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Myths vs Facts */}
              <motion.div variants={itemVariants} className="flex-1 bg-gradient-to-br from-violet-50/80 to-purple-50/80 backdrop-blur-xl p-5 md:p-6 rounded-[2rem] border border-violet-100/50 shadow-sm flex flex-col">
                <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-violet-500 to-purple-400 text-white shadow-sm shadow-violet-500/25">
                    <HelpCircle className="w-4 h-4 fill-white/20" />
                  </div>
                  <h3 className="text-lg font-bold text-violet-900">
                    Pregnancy Myths vs. Facts
                  </h3>
                </div>
                <div className="space-y-2 flex-grow overflow-y-auto pr-1 custom-scrollbar">
                  {insight.myths.map((item: { myth: string, fact: string }, idx: number) => (
                    <div key={idx} className="bg-white/60 p-3 rounded-xl border border-white/50 flex flex-col gap-1.5 shadow-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-100 px-2 py-0.5 rounded-full">Myth</span>
                        <p className="text-xs font-semibold text-cocoa">{item.myth}</p>
                      </div>
                      <div className="flex items-start gap-2 bg-violet-100/50 p-2 rounded-lg mt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-violet-600 bg-violet-200 px-2 py-0.5 rounded-full shrink-0">Fact</span>
                        <p className="text-xs font-medium text-violet-900/80 leading-snug">{item.fact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DosAndDontsPage;
