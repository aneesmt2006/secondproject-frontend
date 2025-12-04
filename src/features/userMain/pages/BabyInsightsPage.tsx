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
      className="min-h-screen relative overflow-hidden flex flex-col font-sans bg-cover bg-center bg-no-repeat bg-fixed"
      style={{  backgroundColor: '#FDF6E9' }}
    >
      {/* Overlay for better text readability if needed */}
      <div className="absolute inset-0 bg-[#FDF6E9]/30 -z-10" />

      {/* Header */}
      <div className="p-6 pt-8 flex items-center gap-4 z-10">
        <Button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-[#FFFBF5] shadow-sm flex items-center justify-center hover:bg-white transition-colors p-0 text-[#5A2D0C]"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-serif text-[#3E2723]">
          Week {currentWeek}: Your Journey Begins
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-10 md:px-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A373]"></div>
            </div>
          ) : fetusData ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-8 md:items-start"
            >
              {/* Left Column (Desktop): Main Visual */}
              <div className="md:col-span-7 lg:col-span-8 md:sticky md:top-6">
                {/* Main Feature Card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-[#FFF0E0] rounded-[3rem] p-6 md:p-10 relative overflow-hidden min-h-[220px] md:min-h-[400px] flex items-center shadow-[0_4px_20px_-5px_rgba(212,163,115,0.3)] transition-transform hover:scale-[1.01] duration-300"
                >
                  <div className="w-1/2 md:w-3/5 z-10 pr-2">
                    <h2 className="text-3xl md:text-5xl font-serif text-[#3E2723] leading-tight">
                      Your Baby is the Size of a Fruit
                    </h2>
                    <p className="hidden md:block text-[#8D6E63] mt-4 text-lg">
                      Every week brings new developments and milestones.
                    </p>
                  </div>
                  
                  {/* Circle Image Container */}
                  <div className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 bg-[#FADBD8] rounded-full flex items-center justify-center shadow-inner">
                    <div className="relative w-full h-full">
                      {/* Fetus Image */}
                      <img
                        src={fetusData.fetusImage}
                        alt="Fetus"
                        className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 w-24 h-24 md:w-40 md:h-40 object-contain drop-shadow-lg z-20"
                      />
                      {/* Fruit Image */}
                      {fetusData.fruitImage && (
                        <img
                          src={fetusData.fruitImage}
                          alt="Fruit"
                          className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 w-28 h-28 md:w-48 md:h-48 object-contain drop-shadow-md z-10 opacity-90"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column (Desktop): Stats & Details */}
              <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
                {/* Stats Cards */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  {/* Length Card */}
                  <div className="bg-[#FFFBF5] rounded-[2.5rem] p-6 flex flex-col items-center justify-center shadow-sm border border-[#EFEBE9] hover:border-[#D4A373] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#EFEBE9] flex items-center justify-center mb-3 text-[#8D6E63]">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-[#8D6E63] font-medium mb-1">Length</span>
                    <span className="text-xl font-bold text-[#3E2723]">{fetusData.height}</span>
                  </div>

                  {/* Weight Card */}
                  <div className="bg-[#FFFBF5] rounded-[2.5rem] p-6 flex flex-col items-center justify-center shadow-sm border border-[#EFEBE9] hover:border-[#D4A373] transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#EFEBE9] flex items-center justify-center mb-3 text-[#8D6E63]">
                      <Weight className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-[#8D6E63] font-medium mb-1">Weight</span>
                    <span className="text-xl font-bold text-[#3E2723]">{fetusData.weight}</span>
                  </div>
                </motion.div>

                {/* Development Highlights */}
                <motion.div
                  variants={itemVariants}
                  className="bg-[#FFFBF5] rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-[#EFEBE9] flex-grow"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#FFF3E0] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-[#FB8C00]" />
                    </div>
                    <h2 className="text-lg font-bold text-[#3E2723]">Development Highlights</h2>
                  </div>
                  
                  <div className="bg-[#FFF3E0]/50 rounded-2xl p-4 border border-[#FFE0B2] prose prose-sm prose-brown max-w-none">
                     <div 
                       className="text-[#5D4037] leading-relaxed [&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-2 [&>h3]:text-base [&>h3]:font-semibold [&>h3]:mt-3 [&>h3]:mb-1"
                       dangerouslySetInnerHTML={{ __html: fetusData.development }} 
                     />
                  </div>
                </motion.div>
              </div>

            </motion.div>
          ) : (
            <div className="text-center py-10 text-[#8D6E63]">
              <p>No insight data available for this week.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BabyInsightsPage;
