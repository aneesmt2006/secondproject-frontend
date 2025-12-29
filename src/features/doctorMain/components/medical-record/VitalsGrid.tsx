import { motion } from "framer-motion";
import { Activity, Heart, Droplet, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface VitalsGridProps {
  vitals?: any[];
}

export const VitalsGrid = ({ vitals }: VitalsGridProps) => {
  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'blood pressure': return Activity;
      case 'blood sugar': return Droplet;
      case 'baby heart rate': return Heart;
      case 'weight': return Scale;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 ml-1">Current Health Vitals</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vitals?.map((vital, idx) => {
          const Icon = getIcon(vital.label);
          return (
            <motion.div
              key={vital.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <h5 className="text-base font-medium text-slate-500">{vital.label}</h5>
                </div>
                <Badge className="bg-emerald-50 text-emerald-600 border-none text-xs font-medium px-3 py-0.5 rounded-full">
                  {vital.status}
                </Badge>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 tracking-tight">{vital.value}</span>
                <span className="text-base font-medium text-slate-400">{vital.unit}</span>
              </div>
              
              <div className="mt-4 space-y-1">
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                   Recorded: {vital.date}
                </p>
                <p className="text-xs text-slate-500 font-medium">{vital.desc}</p>
              </div>
              
              <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
                 <Icon className="w-24 h-24 rotate-12" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
