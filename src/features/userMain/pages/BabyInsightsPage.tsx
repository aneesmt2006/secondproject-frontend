import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Ruler, Weight, Sparkles } from "lucide-react";
import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../registration/slice/userSlice";
import { getFetusWeekData } from "../../../services/api/users-management.service";
import { fetusForm } from "../../adminMain/types";
import { calculatePregnancyWeek } from "../../../utils/pregnancyUtils";
import { Button } from "../../shared/components/button";
// import babyInsightsBg from "../../../assets/images/weeks-back.png";

const BabyInsightsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lmp } = useAppSelector(userSelector);
  const [fetusData, setFetusData] = useState<fetusForm | null>(null);
  const [loading, setLoading] = useState(true);

  // Use passed date or default to today
  const dateState = location.state?.date;
  const currentDate = dateState ? new Date(dateState) : new Date();

  const { week: currentWeek } = lmp 
    ? calculatePregnancyWeek(currentDate, lmp) 
    : { week: 0 };

  useEffect(() => {
    const fetchData = async () => {
      if (currentWeek > 0) {
        try {
          const response = await getFetusWeekData(currentWeek);
          setFetusData(response.data || null);
        } catch (error) {
          console.error("Failed to fetch fetus data", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentWeek]);

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
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#fff0e0] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#ffe4d9] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-pulse delay-1000" />

      {/* Header */}
      <div className="relative px-6 pt-10 pb-4 flex items-center justify-between z-10 max-w-7xl mx-auto w-full">
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
              Pregnancy Journey
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
      <div className="flex-1 overflow-y-auto px-6 pb-24 md:px-8 md:pb-24 lg:px-12 scrollbar-none z-10">
        <div className="max-w-7xl mx-auto pt-4">
          {loading ? (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-[#E0825C] border-t-transparent"></div>
                <p className="text-[#8D6E63] font-medium animate-pulse">Loading insights...</p>
              </div>
            </div>
          ) : fetusData ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
            >
              {/* Left Column (Desktop): Main Visual Hero */}
              <div className="lg:col-span-7 xl:col-span-8 relative">
                <motion.div
                  variants={itemVariants}
                  className="relative bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-[0_20px_40px_-15px_rgba(90,45,12,0.08)] group h-full"
                >
                  <div className="relative z-20 max-w-full">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/50 backdrop-blur-md mb-6 shadow-sm">
                       <span className="w-2 h-2 rounded-full bg-[#E0825C] animate-pulse" />
                       <span className="text-xs font-bold text-[#E0825C] uppercase tracking-wide">Baby's Growth</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-[#5A2D0C] leading-[1.1] mb-6">
                      {fetusData.week >= 4 &&" Size of a"} <br/>
                      <span className="bg-gradient-to-r from-[#E0825C] to-[#F28C64] bg-clip-text text-transparent font-bold">
                         {fetusData.week >= 4 ? "Fruit":""} {fetusData.weight.split(' ').slice(1).join(' ')
}
                      </span>
                    </h2>
                    <p className="text-[#7A5C50] text-lg leading-relaxed max-w-[55%] font-medium">
                      Your little one is growing stronger every day. Here's a glimpse of their amazing journey this week.
                    </p>
                  </div>

                  {/* Dynamic Visual Circle */}
                  <div className="absolute -right-20 -bottom-20 md:right-[-5%] md:top-1/2 md:-translate-y-1/2 w-[350px] h-[350px] md:w-[480px] md:h-[480px] z-10 pointer-events-none">
                     {/* Outer Glow Ring */}
                     <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FFF5EA] to-[#FFE0B2] opacity-60 blur-2xl" />
                     
                     {/* Main Circle */}
                     <div className="relative w-full h-full rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-inner">
                        <div className="absolute inset-8 rounded-full border border-white/30" />
                        <div className="absolute inset-[15%] rounded-full border border-white/20 border-dashed animate-[spin_60s_linear_infinite]" />
                        
                        {/* Images */}
                        <div className="relative w-48 h-48 md:w-72 md:h-72 flex items-center justify-center">
                           <motion.img 
                             src={fetusData.fetusImage} 
                             alt="Fetus"
                             animate={{ y: [0, -12, 0], opacity: [0.9, 1, 0.9] }}
                             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                             className="absolute w-full h-full object-contain drop-shadow-2xl z-20"
                           />
                           {fetusData.fruitImage && (
                             <motion.img 
                               src={fetusData.fruitImage} 
                               alt="Fruit comparison"
                               animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                               className="absolute bottom-[-10px] right-[-10px] w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-lg opacity-90 z-30"
                             />
                           )}
                        </div>
                     </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column (Desktop): Stats & Details */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 h-full">
                
                {/* Stats Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  {/* Length */}
                 {fetusData.week >= 4 && 
                  (
                    <>
                    <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-5 border border-white/60 shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300 group flex flex-col justify-between h-full">
                     <div className="flex justify-between items-start mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#FFE4D6] flex items-center justify-center text-[#E0825C] group-hover:scale-110 transition-transform">
                           <Ruler className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                     </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider block">Length</span>
                      <p className="text-xl md:text-2xl font-bold text-[#5A2D0C]">{fetusData.height}</p>
                    </div>
                  </div>

                 
                  <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-5 border border-white/60 shadow-sm hover:shadow-md hover:bg-white/60 transition-all duration-300 group flex flex-col justify-between h-full">
                     <div className="flex justify-between items-start mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#FFE4D6] flex items-center justify-center text-[#E0825C] group-hover:scale-110 transition-transform">
                           <Weight className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                     </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider block">Weight</span>
                      <p className="text-xl md:text-2xl font-bold text-[#5A2D0C]">{fetusData.weight.split(' ')[0].toString()}</p>
                    </div>
                  </div>
                    </>
                  )}
                </motion.div>

                {/* Highlights Card */}
                <motion.div
                  variants={itemVariants}
                  className="flex-1 bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 shadow-sm relative overflow-hidden flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#E0825C] to-[#F28C64] text-white shadow-lg shadow-[#E0825C]/25">
                      <Sparkles className="w-5 h-5 fill-white/20" />
                    </div>
                    <h2 className="text-xl font-bold text-[#5A2D0C]">Weekly Highlights</h2>
                  </div>
                  
                  <div className="prose prose-sm prose-brown max-w-none flex-grow overflow-y-auto pr-2 custom-scrollbar">
                     <div 
                       className="text-[#6D4C41] font-medium leading-relaxed [&>h1]:text-lg [&>h1]:font-bold [&>h1]:text-[#5A2D0C] [&>h1]:mb-2 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-4 [&>li]:mb-1 text-sm md:text-base"
                       dangerouslySetInnerHTML={{ __html: fetusData.development }} 
                     />
                  </div>
                  
                  {/* Decorative Icon Watermark */}
                  <Sparkles className="absolute -bottom-6 -right-6 w-48 h-48 text-[#E0825C]/5 rotate-12 pointer-events-none" />
                </motion.div>
              </div>

            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white/40 backdrop-blur-md rounded-[3rem] border border-white/50">
               <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-[#D4A373] opacity-50" />
               </div>
              <p className="text-[#8D6E63] text-lg font-medium">No insight data available for this week.</p>
              <Button onClick={() => navigate(-1)} className="mt-6 bg-[#E0825C] hover:bg-[#d07248] text-white rounded-full px-8">
                 Go Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BabyInsightsPage;
