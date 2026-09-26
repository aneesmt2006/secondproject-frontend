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
    shadow-card hover:shadow-soft
  "
  style={{
    backgroundColor: 'color-mix(in srgb, var(--patient-primary) 20%, transparent)',
    borderColor: 'color-mix(in srgb, var(--patient-primary) 40%, transparent)',
  }}
>
  <div
    className="
      w-16 h-16 
      rounded-full 
      bg-patient-primary transition-colors
      flex items-center justify-center
    "
  >
    <Plus className="w-8 h-8 text-white" strokeWidth={3} />
  </div>

  <h3 className="text-sm font-bold text-center text-[color:var(--foreground)] transition-colors">
    Log Symptoms
  </h3>
</motion.div>

  );
};
