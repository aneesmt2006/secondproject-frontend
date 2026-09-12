import { motion } from 'framer-motion';

interface DailyInsightCardProps {
  title: string;
  description: string;
  color: string;
  emoji?: string;
  delay?: number;
  onClick?: () => void;
}

export const DailyInsightCard = ({ title, description, color, emoji, delay = 0, onClick }: DailyInsightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.1}}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex-shrink-0 w-40 md:w-48 h-48 md:h-56 rounded-3xl p-4 md:p-5 shadow-card cursor-pointer hover:shadow-soft"
      style={{ 
        background: `linear-gradient(145deg, ${color}15, ${color}30)`,
        border: `2px solid ${color}40`,
        transition: 'all 0.2s ease'
      }}
    >
      <div className="flex flex-col h-full">
        {emoji && (
          <div className="text-4xl mb-3">{emoji}</div>
        )}
        <h3 className="text-base font-bold text-foreground mb-2">{title}</h3>
        <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed flex-grow line-clamp-4 text-ellipsis overflow-hidden">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
