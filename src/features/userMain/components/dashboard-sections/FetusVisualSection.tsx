import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Baby } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../shared/components/button";
import { fetusForm } from "../../../adminMain/types";


interface FetusVisualSectionProps {
  currentDate: Date;
  direction: number;
  hasLmp: boolean;
  currentWeek: number;
  currentDay: number;
  fetusWeekData?: fetusForm;
  laoding?: boolean;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const FetusVisualSection = ({
  currentDate,
  direction,
  hasLmp,
  currentWeek,
  currentDay,
  fetusWeekData,
  laoding
}: FetusVisualSectionProps) => {
  const [imgLoaded, setImgLoaded] = React.useState(false);

  // Reset image loading state when the image source changes
  React.useEffect(() => {
    setImgLoaded(false);
  }, [fetusWeekData?.fetusImage]);

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentDate.toISOString()}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center py-8 min-h-[400px]"
      >
        {hasLmp ? (
          <>
            {/* NORMAL FETUS VIEW */}
            <div className="relative w-full flex justify-center mb-4">
               {/* Loader - Show when either fetching data OR downloading image */}
               {(laoding || !imgLoaded) && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
               )}

               {/* Image Container - Only show content if data is present (even if loading image) */}
               {!laoding && fetusWeekData && (
                 <motion.div
                   animate={{ y: [0, -10, 0] }}
                   transition={{
                     duration: 3,
                     repeat: Infinity,
                     ease: "easeInOut",
                   }}
                   className={`w-48 h-48 relative transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                 >
                   <img
                     src={fetusWeekData.fetusImage}
                     alt={`Fetus at ${currentWeek} weeks`}
                     className="w-full h-full object-contain drop-shadow-2xl"
                     onLoad={() => setImgLoaded(true)}
                   />
                 </motion.div>
               )}
               {/* Placeholder div to maintain height if totally empty/loading data */}
               {laoding && <div className="w-48 h-48" />}
            </div>

            <motion.h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-2">
              <span className="text-[1.8rem] font-bold text-[#8B4513]">
                {currentWeek} weeks
                {currentDay > 0 ? `, ${currentDay} days` : ""}
              </span>
              <Info className="w-5 h-5 text-primary/60" />
            </motion.h1>

            <Button className="mt-4 bg-[#F28C64] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#e8754a] transition-smooth">
              Details
            </Button>
          </>
        ) : (
          <>
            {/* NO LMP → SHOW CLEAN PROFILE CARD */}
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-card p-6 rounded-2xl text-center border border-[#F28C64]/20">
              <Baby className="w-16 h-16 text-primary mx-auto mb-4" />

              <h2 className="text-xl font-bold text-[#5A2D0C] mb-2">
                Complete Your Profile
              </h2>

              <p className="text-[#7A4A2B]/80 mb-4 text-sm">
                Add your last menstrual period (LMP) to show your due date,
                pregnancy week, and weekly fetus insights.
              </p>

              <Link to="/profile">
                <Button className="bg-[#F28C64] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#e8754a] transition-smooth">
                  Update Profile
                </Button>
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FetusVisualSection;
