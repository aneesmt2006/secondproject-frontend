import { userSelector } from '@/features/patient-auth/slice/userSlice';
import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';
import { Calendar, Apple, Dumbbell, Home, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface TabItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const tabs: TabItem[] = [
  { icon: Home, label: 'Today', path: '/dashboard' },
  { icon: Apple, label: 'Nutrition', path: '/dashboard/nutrition' },
  { icon: Calendar, label: 'Appts', path: '/dashboard/appointment' },
  { icon: Dumbbell, label: 'Exercise', path: '/dashboard/exercise' },
  { icon: MessageCircle, label: 'Chat', path: '/dashboard/chat' },
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
                  id={tab.label === 'Chat' ? 'tour-mobile-chat' : undefined}
                  to={tab.path}
                  className="relative z-10 flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-[28px] transition-all duration-300 group tap-highlight-transparent"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {/* Active Pill Background (Slide Animation) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 rounded-[28px] shadow-sm border border-transparent transition-colors"
                      style={{ 
                        backgroundColor: 'color-mix(in srgb, var(--patient-primary) 15%, transparent)',
                      }}
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
                          ? 'text-patient-primary scale-105' 
                          : 'text-[#9ca3af] group-hover:text-patient-primary/70'
                      }`} 
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    {tab.label === 'Chat' && (
                      <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-patient-primary border-2 border-white text-[8px] font-bold text-white transition-colors">
                        1
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[9px] font-bold tracking-wide transition-all duration-300 relative z-20 ${
                      isActive 
                        ? 'text-patient-primary' 
                        : 'text-[#9ca3af] group-hover:text-patient-primary/70'
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
          
          {/* Outer glow effect for the bar */}
          <div 
            className="absolute -inset-4 blur-3xl -z-10 rounded-full transition-colors"
            style={{ backgroundColor: 'color-mix(in srgb, var(--patient-primary) 10%, transparent)' }}
          />
        </div>
      )}
    </>
  );
};

