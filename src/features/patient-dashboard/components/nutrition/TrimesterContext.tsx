import { motion } from "framer-motion";
import { getTrimesterMessage } from "../../constants/nutrition.data";

interface TrimesterContextProps {
  currentWeek: number;
  currentTrimester: number;
}

export const TrimesterContext = ({ currentWeek, currentTrimester }: TrimesterContextProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} 
      className="mb-8 bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/80 shadow-sm text-center"
    >
      <div className="inline-flex items-center justify-center bg-[#E0825C]/10 text-[#5A2D0C] font-bold text-sm px-4 py-1.5 rounded-full mb-3">
        Week {currentWeek} • {currentTrimester}{currentTrimester === 1 ? 'st' : currentTrimester === 2 ? 'nd' : 'rd'} Trimester
      </div>
      <p className="text-[#8D6E63] font-medium text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
        {getTrimesterMessage(currentTrimester)}
      </p>
    </motion.div>
  );
};
