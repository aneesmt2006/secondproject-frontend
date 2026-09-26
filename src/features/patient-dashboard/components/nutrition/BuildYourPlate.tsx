import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { buildYourPlateCategories, mealExamples } from "../../constants/nutrition.data";

interface BuildYourPlateProps {
  itemVariants: any;
}

export const BuildYourPlate = ({ itemVariants }: BuildYourPlateProps) => {
  return (
    <motion.div variants={itemVariants} className="bg-emerald-50/80 backdrop-blur-xl border border-emerald-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
      <h3 className="text-xl md:text-2xl font-bold text-emerald-900 mb-2 flex items-center gap-2">
        Build Your Plate
      </h3>
      <p className="text-sm text-emerald-800 font-medium mb-6">Incorporate these pregnancy-friendly foods into your daily meals.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          {buildYourPlateCategories.map((cat, i) => (
            <div key={i}>
              <h4 className="text-sm font-bold text-emerald-900">{cat.title}</h4>
              <p className="text-sm text-emerald-700/80 font-medium leading-relaxed">{cat.examples}</p>
            </div>
          ))}
        </div>
        <div className="bg-white/60 rounded-2xl p-5 border border-emerald-200/50">
          <h4 className="text-sm font-bold text-emerald-900 mb-3 uppercase tracking-wider">Meal Examples</h4>
          <ul className="space-y-3">
            {mealExamples.map((meal, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                {meal}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
