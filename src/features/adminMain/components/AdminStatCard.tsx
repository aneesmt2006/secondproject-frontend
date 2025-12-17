import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
}

const AdminStatCard = ({ title, value, subtitle, icon: Icon, trend }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-rose/20 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-cocoa/60 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-cocoa">{value}</h3>
          {subtitle && (
            <p className="text-xs text-cocoa/50 mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className="text-xs text-rose mt-2">{trend}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-rose/20 to-lilac/20 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-wine" />
        </div>
      </div>
    </div>
  );
};

export default AdminStatCard;
