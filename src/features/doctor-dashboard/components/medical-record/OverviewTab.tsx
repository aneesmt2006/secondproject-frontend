import { motion } from "framer-motion";
import { 
  FileText, 
  FlaskConical, 
  AlertCircle, 
  ChevronRight,
  Clock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OverviewTabProps {
  patient: any;
  onNavigateToTab: (tab: string) => void;
}

export const OverviewTab = ({ patient, onNavigateToTab }: OverviewTabProps) => {
  return (
    <motion.div 
       initial={{ opacity: 0, x: -20 }}
       animate={{ opacity: 1, x: 0 }}
       className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* Abnormalities & Quick Alerts */}
      <div className="lg:col-span-3">
         <div className="glass-card rounded-[1.8rem] p-5 bg-rose-50/20 border-rose-100/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="p-2.5 bg-rose-100 rounded-xl text-rose-600">
                  <AlertCircle className="w-5 h-5" />
               </div>
               <div>
                  <h4 className="text-[13px] font-black text-rose-600 uppercase tracking-widest">Abnormalities Found</h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">{patient.abnormalities}</p>
               </div>
            </div>
            <Badge variant="outline" className="border-rose-200 text-rose-500 bg-white text-[10px] font-bold">Needs Monitoring</Badge>
         </div>
      </div>

      {/* Main Grid: Reports & Prescriptions */}
      <div className="lg:col-span-2 space-y-6">
         {/* Last Prescriptions Section */}
         <div className="glass-card rounded-[2.2rem] p-6 space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <FileText className="w-5 h-5 text-primary" />
                    Last Prescriptions
                </h3>
                <Button 
                   variant="ghost" 
                   onClick={() => onNavigateToTab("prescriptions")}
                   className="text-primary text-[11px] font-bold gap-1 h-8"
                >
                    View All <ChevronRight className="w-3.5 h-3.5" />
                </Button>
            </div>
            
            <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
               <div className="flex justify-between items-start mb-3">
                  <div>
                     <p className="text-[13px] font-bold text-slate-800">{patient.lastPrescription.medication}</p>
                     <p className="text-[10px] text-slate-400 font-medium mt-0.5">By {patient.lastPrescription.doctor}</p>
                  </div>
                  <Badge className="bg-blue-50 text-blue-600 border-none text-[9px] font-bold uppercase">{patient.lastPrescription.date}</Badge>
               </div>
               <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200/30">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold rounded-lg border-slate-200 bg-white">Download PDF</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold text-primary">View Details</Button>
               </div>
            </div>
         </div>

         {/* Last Uploaded Reports */}
         <div className="glass-card rounded-[2.2rem] p-6 space-y-5">
            <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <FlaskConical className="w-5 h-5 text-primary" />
                    Last Uploaded Reports
                </h3>
                <Button 
                   variant="ghost" 
                   onClick={() => onNavigateToTab("lab")}
                   className="text-primary text-[11px] font-bold gap-1 h-8"
                >
                    Full History <ChevronRight className="w-3.5 h-3.5" />
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="h-10 w-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                     <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                     <p className="text-xs font-bold text-slate-800 truncate">{patient.lastReport.name}</p>
                     <p className="text-[10px] text-slate-400 font-medium">{patient.lastReport.date} • {patient.lastReport.status}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 ml-auto" />
               </div>
               
               <div className="border border-dashed border-slate-200 rounded-2xl p-4 flex items-center justify-center gap-2 hover:border-primary transition-colors cursor-pointer group">
                  <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-primary/10 transition-colors">
                     <Clock className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-primary">Request New Report</span>
               </div>
            </div>
         </div>
      </div>

      {/* Sidebar: Side Info or Context */}
      <div className="space-y-6">
         <div className="glass-card rounded-[2.2rem] p-6 bg-primary/5 border-primary/10">
            <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-4">Doctor's Clinical Summary</h4>
            <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
               Patient is showing typical third trimester progression. Fetal movement is active. Blood pressure is within normal ranges but should be checked weekly.
            </p>
            <div className="mt-6 flex items-center gap-3 pt-6 border-t border-primary/10">
               <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">DR</div>
               <div>
                  <p className="text-[11px] font-black text-slate-900">Dr. Sarah Jenkins</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Obstetrician</p>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
};
