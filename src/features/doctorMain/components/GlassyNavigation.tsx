import { Home, Calendar, Users, MessageSquare, CreditCard, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/doctor/dashboard" },
  { icon: Calendar, label: "Appointments", path: "/doctor/appointments" },
  { icon: Users, label: "Patients", path: "/doctor/patients" },
  { icon: MessageSquare, label: "Messages", path: "/doctor/messages" },
  { icon: CreditCard, label: "Payments", path: "/doctor/payments" },
  { icon: Settings, label: "Settings", path: "/doctor/settings" },
];

export const GlassyNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="hidden md:flex justify-center mb-6 lg:mb-10 px-4 sticky top-4 lg:top-6 z-50">
      <div className="glass-nav rounded-full px-2 py-1.5 lg:px-3 lg:py-2.5 flex items-center gap-1 shadow-xl max-w-full overflow-x-auto no-scrollbar">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              tabIndex={index}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center gap-2 lg:gap-2.5 px-3 py-2 lg:px-6 lg:py-3 rounded-full transition-all duration-300 whitespace-nowrap
                ${isActive 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105 font-bold' 
                  : 'text-foreground/70 hover:bg-white/50 hover:text-primary'
                }
              `}
            >
              <item.icon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="text-[11px] lg:text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
