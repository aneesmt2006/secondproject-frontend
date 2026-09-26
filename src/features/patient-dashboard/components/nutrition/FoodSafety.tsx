import { motion } from "framer-motion";
import { ShieldAlert, AlertCircle, Info } from "lucide-react";
import { foodsToAvoid, foodsToLimit } from "../../constants/nutrition.data";

interface FoodSafetyProps {
  itemVariants: any;
}

export const FoodSafety = ({ itemVariants }: FoodSafetyProps) => {
  return (
    <motion.div variants={itemVariants} className="flex-1 bg-rose-50/80 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 border border-rose-200 shadow-sm flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-rose-500 text-white shadow-md shadow-rose-500/20">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold text-rose-900">Foods to Avoid</h3>
      </div>
      <ul className="space-y-3 mb-6">
        {foodsToAvoid.map((food, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="mt-0.5 min-w-[20px]">
              <AlertCircle className="w-5 h-5 text-rose-400" />
            </div>
            <span className="text-sm text-rose-950 font-medium leading-relaxed">{food}</span>
          </li>
        ))}
      </ul>

      <h4 className="font-bold text-rose-900 mb-3 border-t border-rose-200/50 pt-4">Limit Intake</h4>
      <ul className="space-y-3">
        {foodsToLimit.map((food, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="mt-0.5 min-w-[20px]">
              <Info className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-sm text-rose-950/80 font-medium leading-relaxed">{food}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};
