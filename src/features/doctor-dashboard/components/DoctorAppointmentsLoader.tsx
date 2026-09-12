import { motion } from "framer-motion";

export const DoctorAppointmentsLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative flex items-center justify-center">
        {/* Thinner, simpler spinner matching doctor theme */}
        <div className="w-12 h-12 rounded-full border-2 border-primary/10 border-t-primary animate-spin" />
        
        {/* Subtle inner pulse */}
        <motion.div 
          className="absolute w-2 h-2 bg-primary rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-primary/60 text-sm font-bold mt-6 tracking-wide uppercase"
      >
        Syncing Schedule...
      </motion.p>
    </div>
  );
};
