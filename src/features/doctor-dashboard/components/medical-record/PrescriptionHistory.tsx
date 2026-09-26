import { motion } from "framer-motion";
import { 
  FileText, 
  Search,
  Calendar,
  Clock,
  User,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePrescriptionHistory } from "../../hooks/usePrescriptionHistory";

interface PrescriptionHistoryProps {
  patientId: string;
  patientName: string;
  compact?: boolean;
}

export const PrescriptionHistory = ({ patientId, patientName, compact = false }: PrescriptionHistoryProps) => {
  const {
    selectedConsultation,
    selectedPrescriptionContent,
    isLoadingHistory,
    isLoadingPrescription,
    handleViewConsultation,
    searchQuery,
    setSearchQuery,
    filteredConsultations,
  } = usePrescriptionHistory(patientId);

  return (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`grid grid-cols-1 ${compact ? '' : 'xl:grid-cols-2'} gap-8 items-start`}
    >
       {/* Notebook (Read-Only) Area - Left Side */}
       <div className="glass-card rounded-[2.5rem] p-1 overflow-hidden shadow-2xl shadow-indigo-500/10">
          <div className="bg-slate-50/80 p-6 border-b border-slate-200/50 backdrop-blur-sm flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500 rounded-lg text-white">
                   <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Clinical Note</h3>
             </div>
          </div>
          
          <div className="bg-white relative">
             {/* Header Section on Notebook Page */}
             <div className="p-8 pb-4 grid grid-cols-2 gap-y-4 border-b border-slate-100">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Name</p>
                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-primary" /> {patientName || "Unknown"}
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consulting Physician</p>
                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-indigo-500" /> {selectedConsultation?.doctorName || "-"}
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" /> {selectedConsultation?.appointmentDate || "-"}
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" /> {selectedConsultation?.appointmentTime || "-"}
                   </p>
                </div>
             </div>

             <ScrollArea className="h-[500px]">
                <div className="relative h-full min-h-[500px]">
                   {/* Lined Paper Lines */}
                   <div className="absolute inset-0 pointer-events-none opacity-[0.15]" 
                       style={{ 
                           backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px)', 
                           backgroundSize: '100% 32px',
                           marginTop: '32px'
                       }} 
                   />
                   
                   {isLoadingPrescription ? (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                     </div>
                   ) : (
                     <div className="p-8 pt-10 text-sm text-slate-700 leading-[32px] font-serif whitespace-pre-wrap">
                        {selectedPrescriptionContent || (selectedConsultation ? "No clinical note found." : "Select a consultation to view notes.")}
                     </div>
                   )}
                </div>
             </ScrollArea>
          </div>
       </div>

       {/* Previous Consultations List Area - Right Side */}
       <div className="space-y-6">
          <div className="glass-card rounded-[2rem] p-6 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                   <Clock className="w-5 h-5 text-indigo-500" />
                   Previous Consultations
                </h3>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                   <input 
                      type="text" 
                      value={searchQuery} 
                      onChange={(e) => setSearchQuery(e.target.value)} 
                      placeholder="Search history..." 
                      className="h-9 w-40 bg-slate-50 border border-slate-100 rounded-xl pl-9 text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                   />
                </div>
             </div>

             {isLoadingHistory ? (
                <div className="flex items-center justify-center p-8">
                   <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
             ) : (
                <div className="space-y-3">
                   {filteredConsultations.length === 0 ? (
                      <p className="text-center text-slate-500 text-sm py-4">No past consultations found.</p>
                   ) : (
                      filteredConsultations.map((app) => {
                         const isSelected = selectedConsultation?.appointmentId === app.appointmentId;
                         
                         return (
                            <div 
                               key={app.appointmentId} 
                               className={`group border p-4 rounded-2xl transition-all cursor-pointer relative ${
                                  isSelected 
                                    ? 'bg-primary/5 border-primary shadow-sm' 
                                    : 'bg-white border-slate-100 hover:border-primary/40'
                               }`}
                               onClick={() => handleViewConsultation(app)}
                            >
                               <div className="flex justify-between items-start mb-2">
                                  <div className="space-y-0.5">
                                     <h4 className={`text-[13px] font-bold transition-colors ${isSelected ? 'text-primary' : 'text-slate-900 group-hover:text-primary'}`}>
                                        {app.reason || "Consultation"}
                                     </h4>
                                     <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
                                        <span>{app.appointmentDate}</span>
                                        <span className="opacity-30">•</span>
                                        <span>{app.doctorName}</span>
                                     </div>
                                  </div>
                               </div>
                               <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium">
                                  {app.specialization || "General"}
                               </p>
                            </div>
                         );
                      })
                   )}
                </div>
             )}
          </div>
       </div>
    </motion.div>
  );
};
