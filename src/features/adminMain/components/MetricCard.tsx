import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../shared/components/card";
import { cn } from "../../shared/utils/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export default function MetricCard({ title, value, subtitle, icon: Icon, trend, className }: MetricCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-border/50",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ring-2 ring-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          {value}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={cn(
            "text-xs font-medium mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full",
            trend.isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
          )}>
            {trend.isPositive ? "↑" : "↓"} {trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
