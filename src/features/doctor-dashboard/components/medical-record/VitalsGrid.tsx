import { motion } from "framer-motion";
import { Activity, Heart, Droplet, Scale } from "lucide-react";

interface VitalsGridProps {
  vitals?: any[];
}

export const VitalsGrid = ({ vitals }: VitalsGridProps) => {
  const getIcon = (label: string = '') => {
    switch (label.toLowerCase()) {
      case 'blood pressure': return Activity;
      case 'blood sugar': return Droplet;
      case 'baby heart rate': return Heart;
      case 'weight': return Scale;
      default: return Activity;
    }
  };

  const getStatusStyles = (status: string = '', color: string = '') => {
    const s = status.toLowerCase();
    const c = color.toLowerCase();
    
    if (
      s.includes('abnormal') || 
      s.includes('high') || 
      s.includes('critical') || 
      s.includes('warning') || 
      s.includes('elevated') || 
      c.includes('danger') || 
      c.includes('red')
    ) {
      return {
        badge: 'bg-red-100 text-red-700 border-red-300 font-bold',
        cardBorder: 'border border-slate-100 bg-white',
        valueText: 'text-slate-900 font-bold',
        iconColor: 'text-slate-400',
        descText: 'text-slate-500 font-medium'
      };
    }
    
    if (
      s.includes('borderline') || 
      s.includes('moderate') || 
      s.includes('caution') || 
      c.includes('amber') || 
      c.includes('yellow')
    ) {
      return {
        badge: 'bg-amber-100 text-amber-800 border-amber-300 font-semibold',
        cardBorder: 'border border-slate-100 bg-white',
        valueText: 'text-slate-900 font-bold',
        iconColor: 'text-slate-400',
        descText: 'text-slate-500 font-medium'
      };
    }

    return {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
      cardBorder: 'border border-slate-100 bg-white',
      valueText: 'text-slate-900 font-bold',
      iconColor: 'text-slate-400',
      descText: 'text-slate-500 font-medium'
    };
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 ml-1">Current Health Vitals</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vitals?.map((vital, idx) => {
          const Icon = getIcon(vital.label);
          const styles = getStatusStyles(vital.status, vital.color);
          return (
            <motion.div
              key={vital.id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-[1.5rem] p-6 transition-all group relative overflow-hidden ${styles.cardBorder}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <h5 className="text-base font-medium text-slate-500">{vital.label}</h5>
                </div>
                <span className={`inline-flex items-center text-xs px-3 py-0.5 rounded-full border ${styles.badge}`}>
                  {vital.status}
                </span>
              </div>
              
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl tracking-tight ${styles.valueText}`}>{vital.value}</span>
                <span className="text-base font-medium text-slate-400">{vital.unit}</span>
              </div>
              
              <div className="mt-4 space-y-1">
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                   Recorded: {vital.date}
                </p>
                <p className={`text-xs ${styles.descText}`}>{vital.desc}</p>
              </div>
              
              <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity ${styles.iconColor}`}>
                 <Icon className="w-24 h-24 rotate-12" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
