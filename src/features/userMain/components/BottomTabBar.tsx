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
  { icon: GraduationCap, label: 'Learn', path: '/dashboard/fetus-knowledge' }, // Using GraduationCap for Learn/Knowledge, or keep Baby? Screenshot implies 'Learn' usually -> GraduationCap or Book. I'll stick to 'Learn' with GraduationCap to match standard apps, or stick to Baby if it's strictly fetus. User code had Baby. I'll use GraduationCap to match 'Learn'. 
];

export const BottomTabBar = () => {
  const location = useLocation();
  const user= useAppSelector(userSelector)

  return (
    <>{user.lmp && 
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="pointer-events-auto">
        {/* Floating Action Button Style Container */}
        <div className="bg-white/75 backdrop-blur-xl border-t border-white/60 pb-5 pt-3 px-2 shadow-[0_-8px_30px_-5px_rgba(0,0,0,0.05)] rounded-t-3xl">
          <div className="flex justify-between items-end max-w-sm mx-auto relative px-2">
            {tabs.map((tab) => {
              const isActive = location.pathname === tab.path;

              return (
                <Link
                  key={tab.label}
                  to={tab.path}
                  className="relative flex flex-col items-center justify-end w-14 h-14 group"
                >
                  {/* Active Indicator (Floating Circle) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabCircle"
                      className="absolute -top-10 w-14 h-14 bg-gradient-to-b from-[#F28C64] to-[#e8754a]
 rounded-full shadow-[0_8px_16px_rgba(242,140,100,0.5)] border-[3px] border-white flex items-center justify-center z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                        {/* We render the icon inside the circle for active state to ensure it moves with it and has contrast */}
                        <tab.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </motion.div>
                  )}

                  {/* Standard Icon (Hidden when active) */}
                  {!isActive && (
                    <div className="mb-1 text-slate-600 group-hover:text-[#F28C64] transition-colors duration-300">
                      <tab.icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                  )}

                  {/* Label */}
                  <span
                    className={`text-[10px] font-bold transition-all duration-300 ${
                      isActive ? 'text-[#F28C64] translate-y-1' : 'text-slate-600 group-hover:text-[#F28C64]'
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>}</>
  );
};
