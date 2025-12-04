import { Card, CardContent, CardHeader, CardTitle } from "../../shared/components/card";
import { TrendingUp } from "lucide-react";

interface RevenueData {
  month: string;
  amount: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.amount));

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-card to-card/80 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <p className="text-sm text-muted-foreground">Monthly performance</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3 h-56 px-2">
          {data.map((item, index) => {
            const heightPercent = (item.amount / maxRevenue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  className="w-full relative rounded-t-lg overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Gradient bar */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-secondary"></div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Value tooltip on hover */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-border px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    <p className="text-xs font-semibold text-foreground">
                      ${(item.amount / 1000).toFixed(1)}k
                    </p>
                  </div>
                </div>
                
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="flex justify-between mt-4 pt-4 border-t border-border/30">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Min:</span> $0k
          </div>
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Max:</span> ${(maxRevenue / 1000).toFixed(0)}k
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
