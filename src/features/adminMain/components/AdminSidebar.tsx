import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  DollarSign,
  FileText,
  Bot,
  BarChart3,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'doctors', label: 'Doctor Management', icon: Stethoscope },
    { id: 'appointments', label: 'Booking Management', icon: Calendar },
    { id: 'payments', label: 'Payment & Revenue', icon: DollarSign },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'ai', label: 'AI System Management', icon: Bot },
    { id: 'reports', label: 'Report & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Admin Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-rose/20 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-rose/20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-rose to-lilac rounded-lg flex items-center justify-center">
            <span className="text-white text-xl font-bold">P</span>
          </div>
          <span className="text-2xl font-bold text-wine">PregnaCare</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-rose/20 to-lilac/20 text-wine font-semibold'
                  : 'text-cocoa/70 hover:bg-rose/5 hover:text-cocoa'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-rose/20">
        <div className="text-xs text-cocoa/50 text-center">
          <p>Legal • Company</p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
