import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../patient-auth/slice/userSlice";
import { calculatePregnancyWeek } from "../../../utils/pregnancyUtils";
import { Button } from "@/components/ui/button";
import { getSleepGuideForWeek } from "../constants/sleepGuide.data";

const SleepGuidePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lmp } = useAppSelector(userSelector);

  const dateState = location.state?.date;
  const currentDate = dateState ? new Date(dateState) : new Date();

  const { week: currentWeek } = lmp 
    ? calculatePregnancyWeek(currentDate, lmp) 
    : { week: 0 };

  const guide = getSleepGuideForWeek(currentWeek);

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
              Sleep Guide • {guide.weeks}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif font-bold text-[#5A2D0C]"
            >
              {guide.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-8 md:px-8 lg:px-12 scrollbar-none z-10">
        <div className="max-w-5xl mx-auto flex flex-col h-full space-y-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
          >
            {/* DO Card */}
            <motion.div variants={itemVariants} className="bg-emerald-50/40 backdrop-blur-2xl rounded-[2rem] p-6 shadow-xl border-2 border-white/60 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 opacity-20" />
              </div>
              <h2 className="text-xl font-bold text-emerald-900 mb-2 flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-700 p-1.5 rounded-lg text-sm">How to sleep</span>
                {guide.dos.title}
              </h2>
              <p className="text-slate-600 text-sm mb-6 flex-1">
                {guide.dos.description}
              </p>
              <div className="rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-50 relative aspect-video">
                <img src={guide.dos.image} alt={guide.dos.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* DONT Card */}
            <motion.div variants={itemVariants} className="bg-rose-50/40 backdrop-blur-2xl rounded-[2rem] p-6 shadow-xl border-2 border-white/60 flex flex-col relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4">
                <XCircle className="w-8 h-8 text-rose-500 opacity-20" />
              </div>
              <h2 className="text-xl font-bold text-rose-900 mb-2 flex items-center gap-2">
                <span className="bg-rose-100 text-rose-700 p-1.5 rounded-lg text-sm">Avoid</span>
                {guide.donts.title}
              </h2>
              <p className="text-slate-600 text-sm mb-6 flex-1">
                {guide.donts.description}
              </p>
              <div className="rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-50 relative aspect-video">
                <img src={guide.donts.image} alt={guide.donts.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </motion.div>
          </motion.div>

          {/* Tips Section */}
          <motion.div variants={itemVariants} className="bg-white/40 backdrop-blur-2xl rounded-[2rem] p-6 shadow-xl border-2 border-white/60 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[#432C7A] flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#80489C]" />
              Pro Tips for Trimester {guide.trimester}
            </h3>
            <ul className="space-y-3">
              {guide.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white/60 p-3 rounded-xl border border-white">
                  <span className="w-6 h-6 rounded-full bg-[#80489C]/10 text-[#80489C] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                  <span className="text-slate-700 text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default SleepGuidePage;
