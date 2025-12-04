import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface QuickActionButtonProps {
  icon: LucideIcon;
  title: string;
  badge?: string;
  onClick?: () => void;
  delay?: number;
}

export const QuickActionCard = ({
  icon: Icon,
  title,
  badge,
  onClick,
  delay = 0,
}: QuickActionButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
      whileHover={{
        scale: 1.03,
        background:
          "linear-gradient(135deg, hsl(24 100% 93% / 0.6) 0%, hsl(22 95% 82% / 0.55) 40%, hsl(18 80% 70% / 0.5) 100%)",
        backdropFilter: "blur(10px)",
        boxShadow:
          "0 6px 18px rgba(242, 140, 100, 0.25), inset 0 0 10px rgba(255, 255, 255, 0.2)",
        transition: { duration: 0.15 },
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="relative w-full flex items-center justify-between px-6 py-4 rounded-full
                 bg-[rgba(255,255,255,0.4)] backdrop-blur-md
                 border border-[rgba(208,138,58,0.45)]
                 shadow-sm hover:shadow-md transition-all duration-200 active:shadow-inner"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 245, 235, 0.6), rgba(255, 228, 200, 0.4))",
      }}
    >
      {/* Left icon */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fbe2d2]/90 to-[#f9c7a4]/90 flex items-center justify-center shadow-inner">
          <Icon
            className="w-6 h-6 text-[#8B4513] opacity-90"
            strokeWidth={2.3}
          />
        </div>

        <span className="text-[#5A2D0C] font-semibold text-sm tracking-wide">
          {title}
        </span>
      </div>

      {/* Optional badge */}
      {badge && (
        <div className="w-6 h-6 bg-[#F28C64] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
          {badge}
        </div>
      )}
    </motion.button>
  );
};
