import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { getDailyTip } from "../../constants/nutrition.data";

interface DailyNutritionTipProps {
  itemVariants: any;
  currentTrimester: number;
}

export const DailyNutritionTip = ({ itemVariants, currentTrimester }: DailyNutritionTipProps) => {
  return (
    <motion.div variants={itemVariants} className="bg-orange-50/80 backdrop-blur-xl border border-orange-200 rounded-[2rem] p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-16 h-16 text-orange-500" />
      </div>
      <h4 className="font-bold text-[#5A2D0C] mb-2 uppercase tracking-wider text-xs">Daily Nutrition Tip</h4>
      <p className="text-sm text-[#8D6E63] font-medium leading-relaxed relative z-10">
        {getDailyTip(currentTrimester)}
      </p>
    </motion.div>
  );
};
