import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { primaryNutrients, secondaryNutrients } from "../../constants/nutrition.data";

interface EssentialNutrientsProps {
  itemVariants: any;
}

export const EssentialNutrients = ({ itemVariants }: EssentialNutrientsProps) => {
  const [showMoreNutrients, setShowMoreNutrients] = useState(false);

  return (
    <motion.div variants={itemVariants} className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-[#5A2D0C] flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#E0825C]" />
          Essential Nutrients
        </h3>
        <p className="text-[#8D6E63] text-sm mt-1 font-medium">Today's Nutrition Focus</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {primaryNutrients.map((nutrient, idx) => (
          <div key={idx} className={`p-5 rounded-2xl ${nutrient.bg} border ${nutrient.border} hover:shadow-md transition-shadow`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  {nutrient.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{nutrient.title}</h4>
                  <span className="text-xs font-bold text-gray-500 uppercase">{nutrient.amount}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {nutrient.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button 
          onClick={() => setShowMoreNutrients(!showMoreNutrients)}
          className="flex items-center justify-between w-full p-4 rounded-2xl bg-white/50 border border-white/60 hover:bg-white/80 transition-colors"
        >
          <span className="font-bold text-[#5A2D0C]">Also Important</span>
          {showMoreNutrients ? <ChevronUp className="w-5 h-5 text-[#8D6E63]" /> : <ChevronDown className="w-5 h-5 text-[#8D6E63]" />}
        </button>
        <AnimatePresence>
          {showMoreNutrients && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {secondaryNutrients.map((nut, i) => (
                  <div key={i} className="bg-white/60 p-3 rounded-xl border border-white/80">
                    <h5 className="font-bold text-sm text-[#5A2D0C]">{nut.title}</h5>
                    <p className="text-xs text-[#8D6E63] mt-1 font-medium">{nut.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
