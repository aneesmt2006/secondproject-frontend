import { motion } from 'framer-motion';
import { Calendar, BarChart3, Dumbbell, Baby, Home } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface TabItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const tabs: TabItem[] = [
  { icon: Home, label: 'Today', active: true },
  { icon: BarChart3, label: 'Insights' },
  { icon: Calendar, label: 'Appointment' },
  { icon: Dumbbell, label: 'Exercise' },
  { icon: Baby, label: 'Fetus Knowledge' },
];

export const BottomTabBar = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 gradient-card border-t border-border/20 px-6 py-3 shadow-soft z-50">
      <div className="max-w-2xl mx-auto flex justify-around items-center">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.label}
            tabIndex={index}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            <div className={`p-2 rounded-xl transition-smooth ${
              tab.active 
                ? 'bg-gradient-to-br from-[#F9C7A4] to-[#F28C64] text-white shadow-md rounded-full p-2 transition-all' 
                : 'text-muted-foreground hover:text-foreground'
            }`}>
              <tab.icon className="w-5 h-5" strokeWidth={2.5} />
            </div>
            <span className={`text-xs font-medium transition-smooth ${
              tab.active ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
