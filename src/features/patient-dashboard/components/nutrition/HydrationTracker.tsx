import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

interface HydrationTrackerProps {
  itemVariants: any;
}

export const HydrationTracker = ({ itemVariants }: HydrationTrackerProps) => {
  const [hydrationCount, setHydrationCount] = useState(3);

  return (
    <motion.div variants={itemVariants} className="bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 border border-white/60 shadow-sm flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-500 shadow-inner">
        <Droplets className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#5A2D0C] mb-2">Hydration Goal</h3>
      <p className="text-sm text-[#8D6E63] font-medium mb-6">Stay hydrated throughout the day to support your body and pregnancy.</p>
      
      <div className="w-full flex justify-between px-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((cup) => (
          <button 
            key={cup} 
            onClick={() => setHydrationCount(cup)}
            className={`w-6 h-10 rounded-full border-2 ${cup <= hydrationCount ? 'bg-blue-400 border-blue-400 shadow-sm' : 'bg-transparent border-blue-200'} flex-shrink-0 transition-all hover:scale-110`} 
          />
        ))}
      </div>
      <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-6">{hydrationCount} / 8 Cups</p>
    </motion.div>
  );
};
