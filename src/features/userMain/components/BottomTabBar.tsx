import { userSelector } from '@/features/registration/slice/userSlice';
import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';
import { Calendar, BarChart3, Dumbbell, Home, GraduationCap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface TabItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const tabs: TabItem[] = [
  { icon: Home, label: 'Today', path: '/dashboard' },
  { icon: BarChart3, label: 'Insights', path: '/dashboard/baby-insights' },
  { icon: Calendar, label: 'Appts', path: '/dashboard/appointment' },
  { icon: Dumbbell, label: 'Exercise', path: '/dashboard/exercise' },
  { icon: GraduationCap, label: 'Learn', path: '/dashboard/fetus-knowledge' },
];

export const BottomTabBar = () => {
  const location = useLocation();
  const user = useAppSelector(userSelector);

  return (
    <>
      {user.lmp && (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm">
          {/* Glassy Container */}
          <div className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[35px] p-1.5 shadow-[0_8px_32px_rgba(224,130,92,0.15)] flex justify-between items-center relative overflow-hidden">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;

              return (
                <Link
                  key={tab.label}
                  to={tab.path}
                  className="relative z-10 flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-[28px] transition-all duration-300 group tap-highlight-transparent"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {/* Active Pill Background (Slide Animation) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#E0825C]/10 rounded-[28px] shadow-sm border border-[#E0825C]/5"
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 30,
                        duration: 0.3
                      }}
                    />
                  )}
                  
                  {/* Icon */}
                  <div className="relative z-20">
                    <tab.icon 
                      className={`w-[22px] h-[22px] transition-all duration-300 ${
                        isActive 
                          ? 'text-[#E0825C] scale-105' 
                          : 'text-[#9ca3af] group-hover:text-[#E0825C]/70'
                      }`} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[9px] font-bold tracking-wide transition-all duration-300 relative z-20 ${
                      isActive 
                        ? 'text-[#E0825C]' 
                        : 'text-[#9ca3af] group-hover:text-[#E0825C]/70'
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
          
          {/* Outer glow effect for the bar */}
          <div className="absolute -inset-4 bg-[#E0825C]/5 blur-3xl -z-10 rounded-full" />
        </div>
      )}
    </>
  );
};
