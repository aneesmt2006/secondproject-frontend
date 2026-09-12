import { TrendingUp, Activity, Users } from "lucide-react";

export const PerformanceCard = () => {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-foreground">Monthly Performance</h3>
        <select className="text-xs bg-white/50 border border-white/60 rounded-lg px-2 py-1 text-foreground">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-xl bg-medical-success/10 mb-2">
            <TrendingUp className="w-5 h-5 text-medical-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">156</p>
          <p className="text-xs text-muted-foreground">Total Patients</p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex p-3 rounded-xl bg-medical-info/10 mb-2">
            <Activity className="w-5 h-5 text-medical-info" />
          </div>
          <p className="text-2xl font-bold text-foreground">98%</p>
          <p className="text-xs text-muted-foreground">Success Rate</p>
        </div>
        
        <div className="text-center">
          <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-2">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">45</p>
          <p className="text-xs text-muted-foreground">New Patients</p>
        </div>
      </div>
    </div>
  );
};
