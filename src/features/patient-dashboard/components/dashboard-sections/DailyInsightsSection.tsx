import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Baby, X } from "lucide-react";
import { useState } from "react";
import { LogSymptomsCard } from "../LogSymptomsCard";
import { DailyInsightCard } from "../DailyInsightCard";

interface DailyInsightsSectionProps {
  currentDate: Date;
  currentWeek: number;
  hasLmp: boolean;
  lmp: string | null | undefined;
}

import { useNavigate } from "react-router-dom";

// ... imports

const DailyInsightsSection = ({
  currentDate,
  currentWeek,
  hasLmp,
  lmp,
}: DailyInsightsSectionProps) => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);

  const dailyInsights = [
    {
      title: `Your baby at ${currentWeek} weeks`,
      description:
        "Your baby is now about 3 inches long and can make facial expressions!",
      color: "#FFB6C1",
      emoji: "👶🍋",
      action: "baby-insights",
    },

     {
      title: "Your nutrition",
      description:
        "Discover the best foods for you and your baby's growth during this stage of pregnancy.",
      color: "#87CEEB",
      emoji: "🥗🍎",
      action: "nutrition",
    },
    {
      title: `Your body at ${currentWeek} weeks`,
      description:
        "Your baby bump may start showing. Energy levels often improve during the second trimester.",
      color: "#F6A192",
      emoji: "🤰",
      action: "body-insights",
    },
    {
      title: "Sleep Guide",
      description:
        "Learn the best sleeping positions and tips for a restful night based on your trimester.",
      color: "#D4A5A5",
      emoji: "🌙💤",
      action: "sleep-guide",
    },
    {
      title: "Do's & Don'ts",
      description:
        "Learn what activities and foods to avoid, and safe practices during this stage.",
      color: "#FFD700",
      emoji: "✅❌",
      action: "dos-and-donts",
    },
    {
      title: "Weight Changes",
      description:
        "Monitor your weight gain and stay within healthy ranges for your stage.",
      color: "#B4F8C8",
      emoji: "⚖️",
      action: "weight",
    },
  ];

  const handleInsightClick = (action?: string) => {
    if (action === "baby-insights") {
      navigate("/dashboard/baby-insights", { state: { date: currentDate.toISOString() } });
    } else if (action === "body-insights") {
      navigate("/dashboard/body-insights", { state: { date: currentDate.toISOString() } });
    } else if (action === "nutrition") {
      navigate("/dashboard/nutrition");
    } else if (action === "dos-and-donts") {
      navigate("/dashboard/dos-and-donts", { state: { date: currentDate.toISOString() } });
    } else if (action === "sleep-guide") {
      navigate("/dashboard/sleep-guide", { state: { date: currentDate.toISOString() } });
    } else if (action === "weight") {
      setShowComingSoon(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="px-6 md:px-8 mt-8 mb-8 relative z-10"
    >
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        My daily insights ·{" "}
        {currentDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
        <Sparkles className="w-5 h-5 text-accent" />
      </h2>
      <div className="flex gap-4 overflow-x-auto overflow-visible pb-6 px-1 scrollbar-hide relative z-10">
        {lmp && <LogSymptomsCard delay={0} onClick={() => navigate("/dashboard/symptoms")} />}
        {dailyInsights.map((insight, index) => (
          <div key={insight.title} className="relative">
            {!hasLmp && (
              <div className="locked-overlay">
                <Baby className="w-10 h-10 text-primary opacity-70" />
              </div>
            )}

            <div className={!hasLmp ? "locked-card" : ""}>
              <DailyInsightCard
                title={insight.title}
                description={insight.description}
                color={insight.color}
                emoji={insight.emoji}
                delay={(index + 1) * 0.1}
                onClick={() => handleInsightClick(insight.action)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComingSoon(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white/70 backdrop-blur-2xl border border-white/60 p-6 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col items-center text-center overflow-hidden"
            >
              <button 
                onClick={() => setShowComingSoon(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/50 flex items-center justify-center hover:bg-white text-cocoa transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-300 to-rose-300 flex items-center justify-center shadow-lg shadow-pink-300/30 mb-4 rotate-12">
                <Sparkles className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-extrabold text-cocoa mb-2">Coming Soon!</h3>
              <p className="text-sm font-medium text-cocoa/70 mb-4">
                We're currently brewing up this feature. Check back in a little while!
              </p>
              
              <button 
                onClick={() => setShowComingSoon(false)}
                className="px-6 py-2.5 rounded-full bg-cocoa text-white text-sm font-bold shadow-md hover:bg-cocoa/90 transition-all"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DailyInsightsSection;
