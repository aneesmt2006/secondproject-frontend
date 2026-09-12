import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  iconColor: string;
  subtitle?: string;
  trend?: string;
}

export const StatsCard = ({ icon: Icon, title, value, iconColor, subtitle, trend }: StatsCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-3 md:p-4 glass-hover">
      <div className="flex items-start justify-between mb-2 md:mb-3">
        <p className="text-[10px] md:text-xs font-medium text-muted-foreground leading-tight">{title}</p>
        <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl ${iconColor}`}>
          <Icon className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>
      <h3 className="text-xl md:text-3xl font-bold text-foreground mb-1">{value}</h3>
      {subtitle && <p className="text-[10px] md:text-xs text-muted-foreground mb-1 md:mb-2">{subtitle}</p>}
      {trend && <p className="text-[10px] md:text-xs font-medium text-medical-success">{trend}</p>}
    </div>
  );
};
