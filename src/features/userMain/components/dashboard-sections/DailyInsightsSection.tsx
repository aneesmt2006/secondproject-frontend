import { motion } from "framer-motion";
import { Sparkles, Baby } from "lucide-react";
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
      title: `Your body at ${currentWeek} weeks`,
      description:
        "Your baby bump may start showing. Energy levels often improve during the second trimester.",
      color: "#F6A192",
      emoji: "🤰",
    },
    {
      title: "Symptoms",
      description:
        "Morning sickness usually decreases. You might experience mild headaches and dizziness.",
      color: "#87CEEB",
      emoji: "💊🍪💊",
    },
    {
      title: "Watch-outs",
      description:
        "Stay hydrated and maintain a balanced diet. Contact your doctor if you experience severe pain.",
      color: "#FFD700",
      emoji: "➕",
    },
    {
      title: "Cravings",
      description:
        "Track your food cravings and what you're enjoying this week.",
      color: "#FF9AA2",
      emoji: "🍕🍫",
    },
    {
      title: "Weight Changes",
      description:
        "Monitor your weight gain and stay within healthy ranges for your stage.",
      color: "#B4F8C8",
      emoji: "⚖️",
    },
  ];

  const handleInsightClick = (action?: string) => {
    if (action === "baby-insights") {
      navigate("/dashboard/baby-insights", { state: { date: currentDate.toISOString() } });
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
    </motion.div>
  );
};

export default DailyInsightsSection;
