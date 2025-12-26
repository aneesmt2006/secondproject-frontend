import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  Search,
  Calendar,
  Clock,
  User,
  MoreVertical,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PrescriptionNotebookProps {
  patient: any;
}

export const PrescriptionNotebook = ({ patient }: PrescriptionNotebookProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);

  const pastConsultations = [
    { id: 1, title: "Prenatal Check-up", date: "Dec 12, 2025", time: "10:30 AM", doctor: "Dr. Sarah Jenkins", content: "Patient feeling well. Fetal heart rate normal (140 bpm). BP 110/70. Prescribed Iron supplements." },
    { id: 2, title: "Symptom Review", date: "Nov 28, 2025", time: "02:15 PM", doctor: "Dr. Mike Ross", content: "Discussed mild back pain and sleep issues. Recommended prenatal yoga and physical therapy if pain persists." },
    { id: 3, title: "Initial Consultation", date: "Oct 15, 2025", time: "09:00 AM", doctor: "Dr. Sarah Jenkins", content: "Pregnancy confirmed. Week 8. Patient history reviewed. LMP: Aug 20, 2025." },
  ];

  const handleViewConsultation = (consultation: any) => {
    setSelectedConsultation(consultation);
    setIsModalOpen(true);
  };

  return (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start"
    >
       {/* NEW Prescription Notebook (Writing Area) */}
       <div className="glass-card rounded-[2.5rem] p-1 overflow-hidden shadow-2xl shadow-indigo-500/10">
          <div className="bg-slate-50/80 p-6 border-b border-slate-200/50 backdrop-blur-sm flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500 rounded-lg text-white">
                   <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">New Clinical Note</h3>
             </div>
             <div className="flex items-center gap-2">
                <Button className="h-9 rounded-xl bg-primary text-white text-[11px] font-bold px-5 shadow-lg shadow-primary/20">Save Note</Button>
             </div>
          </div>
          
          <div className="bg-white relative">
             {/* Header Section on Notebook Page */}
             <div className="p-8 pb-4 grid grid-cols-2 gap-y-4 border-b border-slate-100">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Name</p>
                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-primary" /> {patient.name}
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consulting Physician</p>
                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-indigo-500" /> Dr. Sarah Jenkins
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" /> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                   </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                   <p className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" /> {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                   </p>
                </div>
             </div>

             <ScrollArea className="h-[500px]">
                <div className="relative">
                   {/* Lined Paper Lines */}
                   <div className="absolute inset-0 pointer-events-none opacity-[0.15]" 
                       style={{ 
                           backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px)', 
                           backgroundSize: '100% 32px',
                           marginTop: '32px'
                       }} 
                   />
                   
                   <textarea 
                      className="w-full h-full min-h-[500px] bg-transparent border-none focus:ring-0 p-8 pt-8 text-sm text-slate-700 leading-[32px] font-serif resize-none"
                      placeholder="Start writing clinical notes here..."
                   />
                </div>
             </ScrollArea>
          </div>
       </div>

       {/* Previous Consultations List Area */}
       <div className="space-y-6">
          <div className="glass-card rounded-[2rem] p-6 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                   <Clock className="w-5 h-5 text-indigo-500" />
                   Previous Consultations
                </h3>
                <div className="relative">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                   <input type="text" placeholder="Search notes..." className="h-9 w-40 bg-slate-50 border border-slate-100 rounded-xl pl-9 text-[11px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium" />
                </div>
             </div>

             <div className="space-y-3">
                {pastConsultations.map((note) => (
                   <div 
                      key={note.id} 
                      className="group bg-white border border-slate-100 p-4 rounded-2xl hover:border-primary transition-all cursor-pointer relative"
                      onClick={() => handleViewConsultation(note)}
                   >
                      <div className="flex justify-between items-start mb-2">
                         <div className="space-y-0.5">
                            <h4 className="text-[13px] font-bold text-slate-900 group-hover:text-primary transition-colors">{note.title}</h4>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
                               <span>{note.date}</span>
                               <span className="opacity-30">•</span>
                               <span>{note.doctor}</span>
                            </div>
                         </div>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-300 group-hover:text-slate-600">
                            <Maximize2 className="w-4 h-4" />
                         </Button>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium italic">
                         "{note.content}"
                      </p>
                   </div>
                ))}
             </div>
             
             <Button variant="outline" className="w-full border-slate-200 text-slate-500 font-bold text-xs h-12 rounded-2xl hover:bg-slate-50">
                Load More History
             </Button>
          </div>
       </div>

       {/* Consultation Detail Modal */}
       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
            {selectedConsultation && (
              <div className="flex flex-col h-full bg-white">
                <DialogHeader className="bg-slate-50 p-8 border-b border-slate-100">
                  <div className="flex items-start justify-between">
                     <div>
                        <DialogTitle className="text-2xl font-bold text-slate-900">{selectedConsultation.title}</DialogTitle>
                        <div className="flex items-center gap-3 mt-2">
                           <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-primary" /> {selectedConsultation.date}
                           </p>
                           <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-primary" /> {selectedConsultation.time}
                           </p>
                        </div>
                     </div>
                     <Button variant="outline" className="h-10 rounded-xl border-slate-200 gap-2 text-xs font-bold">
                        <Download className="w-4 h-4" /> PDF
                     </Button>
                  </div>
                </DialogHeader>

                <div className="p-8 space-y-8 min-h-[400px]">
                   <div className="flex items-center gap-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">DR</div>
                      <div>
                         <p className="text-[10px] font-black text-primary uppercase tracking-widest">Digital Signature</p>
                         <p className="text-sm font-bold text-slate-900">{selectedConsultation.doctor}</p>
                         <p className="text-[11px] text-slate-400 font-medium">Verified Board Practitioner</p>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Clinical Findings & Notes</h5>
                      <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden">
                         <div className="absolute left-0 top-0 w-1.5 h-full bg-primary/20" />
                         <p className="text-sm text-slate-700 leading-relaxed font-serif italic whitespace-pre-wrap">
                            {selectedConsultation.content}
                         </p>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </DialogContent>
       </Dialog>
    </motion.div>
  );
};
