import { Home, Calendar, Users, MessageSquare, CreditCard, Settings, HelpCircle } from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Calendar, label: "Appointments" },
  { icon: Users, label: "Patients" },
  { icon: MessageSquare, label: "Messages" },
  { icon: CreditCard, label: "Payments" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Support" },
];

export const GlassyNavigation = () => {
  return (
    <nav className="hidden md:flex justify-center mb-8 px-4 sticky top-4 z-50">
      <div className="glass-nav rounded-full px-6 py-3 flex items-center gap-2">
        {navItems.map((item, index) => (
          <button
            key={item.label}
            tabIndex={index}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300
              ${item.active 
                ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                : 'text-foreground hover:bg-white/40'
              }
            `}
          >
            <item.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
