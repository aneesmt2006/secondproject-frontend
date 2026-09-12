import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface LogSymptomsCardProps {
  delay?: number;
  onClick?: () => void;
}

export const LogSymptomsCard = ({ delay = 0, onClick }: LogSymptomsCardProps) => {
  return (
   <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay, duration: 0.3 }}
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  onClick={onClick}
  className="
    flex-shrink-0 
    w-40 md:w-48 h-48 md:h-56 
    rounded-3xl 
    p-4 md:p-5 
    cursor-pointer 
    flex flex-col items-center justify-center gap-3 
    transition-all duration-200 ease-in-out 
    border-2 
    bg-gradient-to-br from-[rgba(243,139,102,0.2)] to-[rgba(249,182,120,0.2)] 
    border-[rgba(243,139,102,0.4)] 
    shadow-[0_2px_12px_-2px_hsl(15_60%_70%_/_0.12)] 
    hover:shadow-[0_4px_20px_-2px_hsl(15_85%_65%_/_0.15)]
  "
>
  <div
    className="
      w-16 h-16 
      rounded-full 
      bg-[#f38b66] 
      flex items-center justify-center
    "
  >
    <Plus className="w-8 h-8 text-white" strokeWidth={3} />
  </div>

  <h3 className="text-sm font-bold text-center text-[#7a4432]">
    Log Symptoms
  </h3>
</motion.div>

  );
};
