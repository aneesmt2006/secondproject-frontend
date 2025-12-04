import { motion } from 'framer-motion';
import { Home, Apple, Dumbbell, Calendar, FileText, Baby, Moon } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', active: true },
  { icon: Apple, label: 'Nutrition' },
  { icon: Dumbbell, label: 'Exercise' },
  { icon: Calendar, label: 'Appointment' },
  { icon: FileText, label: "Do's and Donts" },
  { icon: Baby, label: 'Fetus Knowledge' },
  { icon: Moon, label: 'Sleep Guide' },
];

export const DesktopNavbar = () => {
  return (
    <nav className="hidden md:block fixed top-6 left-0 right-0 z-50 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-soft rounded-full px-4 lg:px-8 py-4">
          <div className="flex justify-center items-center gap-2 lg:gap-6">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 rounded-full transition-smooth ${
                  item.active
                    ? 'bg-white/50 text-primary font-semibold shadow-sm'
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/30'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-xs lg:text-sm whitespace-nowrap">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
