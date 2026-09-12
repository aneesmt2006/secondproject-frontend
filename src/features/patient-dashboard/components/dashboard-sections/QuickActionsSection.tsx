import { motion } from "framer-motion";
import {
  Dumbbell,
  FileText,
  Baby,
  Activity,
  Stethoscope,
  Bot,
} from "lucide-react";
import { QuickActionCard } from "../QuickActionCard";

interface QuickActionsSectionProps {
  hasLmp: boolean;
}

const QuickActionsSection = ({ hasLmp }: QuickActionsSectionProps) => {
  const quickActions = [
    { icon: Dumbbell, title: "Exercise" },
    { icon: FileText, title: "Do's and Donts" },
    { icon: Baby, title: "Fetus Info" },
    { icon: Activity, title: "Monthly Checkup (AI)", badge: "4" },
    { icon: Stethoscope, title: "Book Doctor" },
    { icon: Bot, title: "AI Pess Check" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="px-6 md:px-8 mb-24 block md:hidden relative z-20"
    >
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-4 pb-28">
        {quickActions.map((action, index) => (
          <div key={action.title} className="relative">
            {!hasLmp && (
              <div className="locked-overlay">
                <Baby className="w-8 h-8 text-primary/70" />
              </div>
            )}

            <div className={!hasLmp ? "locked-card" : ""}>
              <QuickActionCard
                icon={action.icon}
                title={action.title}
                badge={action.badge}
                delay={index * 0.05}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActionsSection;
