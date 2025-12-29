import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Phone, 
  Mail, 
  Ruler, 
  Scale, 
  Droplet, 
  AlertCircle,
  Calendar,
  Activity
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PatientHeaderProps {
  patient: any;
}

export const PatientHeader = ({ patient }: PatientHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-[2.5rem] p-6 flex flex-col xl:flex-row items-center gap-6"
    >
      {/* Avatar & Basic Info */}
      <div className="flex items-center gap-6 xl:border-r border-slate-200/50 xl:pr-8 w-full xl:w-auto">
        <div className="relative shrink-0">
          <Avatar className="h-24 w-24 rounded-2xl ring-4 ring-white shadow-xl overflow-hidden">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-white shadow-lg">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        </div>

        <div className="space-y-2 min-w-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 truncate tracking-tight">{patient.name}</h2>
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-100 font-bold px-2 py-0.5 uppercase text-[11px] tracking-widest whitespace-nowrap">
                {patient.status}
              </Badge>
            </div>
            <p className="text-slate-500 text-sm font-medium mt-0.5">{patient.gender}, {patient.age} Yrs</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl bg-white/60 h-8 px-3 gap-1.5 border-slate-200 shadow-sm transition-all hover:scale-105">
              <Phone className="w-3.5 h-3.5 text-primary" /> <span className="text-xs font-bold text-slate-700">Call</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl bg-white/60 h-8 px-3 gap-1.5 border-slate-200 shadow-sm transition-all hover:scale-105">
              <Mail className="w-3.5 h-3.5 text-primary" /> <span className="text-xs font-bold text-slate-700">Email</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid - More compact to avoid overlapping */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 w-full xl:w-auto">
        {[
            { label: "HEIGHT", value: patient.height, icon: Ruler },
            { label: "WEIGHT", value: patient.weight, icon: Scale },
            { label: "BLOOD TYPE", value: patient.bloodType, icon: Droplet },
            { label: "ALLERGIES", value: patient.allergies, icon: AlertCircle, color: "rose" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/40 border border-slate-200/50 rounded-xl p-3 transition-all hover:bg-white/60 group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary transition-colors">{stat.label}</p>
            <div className="flex items-baseline gap-1">
                <span className={`text-base font-bold ${stat.color === 'rose' ? 'text-rose-500' : 'text-slate-900'}`}>{stat.value.split(' ')[0]}</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase">{stat.value.split(' ')[1]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pregnancy Tracker Card - Compact version */}
      <div className="bg-[#009E8F] rounded-[1.8rem] p-4 text-white min-w-[240px] w-full xl:w-auto relative overflow-hidden group shadow-lg shadow-emerald-500/10">
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
           <Activity className="w-12 h-12" />
         </div>
         
         <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Pregnancy Status</p>
                    <h4 className="text-2xl font-black tracking-tight">Week {patient.pregnancy.week}</h4>
                    <p className="text-xs font-medium opacity-90">{patient.pregnancy.trimester}</p>
                </div>
                <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md">
                    <Calendar className="w-3.5 h-3.5" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${patient.pregnancy.progress}%` }}
                        className="h-full bg-white rounded-full"
                    />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                    <span className="opacity-70">Start</span>
                    <span>Due: {patient.pregnancy.dueDate}</span>
                </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
};
