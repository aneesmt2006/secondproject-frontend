import { useState } from "react";
import { Home, Calendar, Users, MessageSquare, CreditCard, Settings, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const mobileNavItems = [
  { icon: Home, label: "Home", path: "/doctor/dashboard" },
  { icon: Calendar, label: "Appointments", path: "/doctor/appointments" },
  { icon: Users, label: "Patients", path: "/doctor/patients" },
  { icon: MessageSquare, label: "Messages", path: "/doctor/messages" },
  { icon: CreditCard, label: "Payments", path: "/doctor/payments" },
  { icon: Settings, label: "Settings", path: "/doctor/settings" },
];

export const BottomNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <Menu className="w-6 h-6 text-primary" />
        )}
      </button>

      {/* Navigation Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col gap-2 min-w-[200px]">
          {mobileNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`
                  glass-card flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300 animate-in slide-in-from-bottom-2
                  ${isActive 
                    ? 'bg-primary text-primary-foreground border-primary/30' 
                    : 'hover:bg-white/60'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-foreground'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
