import { motion, AnimatePresence } from "framer-motion";
import { 
  FlaskConical, 
  ChevronDown, 
  Calendar, 
  Plus, 
  Eye, 
  Download, 
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export const LabResults = () => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["December 2025"]);
  const [previewItem, setPreviewItem] = useState<any>(null);

  const labGroups = [
    { 
      month: "December 2025", 
      count: 2, 
      items: [
        { id: 1, name: "Comprehensive Metabolic Panel", date: "Dec 12, 2025", type: "PDF", size: "1.2 MB", status: "Abnormal", thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=300&fit=crop" },
        { id: 2, name: "Fetal Ultrasound Scan", date: "Dec 10, 2025", type: "Image", size: "3.5 MB", status: "Normal", thumbnail: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop" }
      ]
    },
    { 
       month: "November 2025", 
       count: 1, 
       items: [
         { id: 3, name: "Gestational Diabetes Test", date: "Nov 22, 2025", type: "PDF", size: "0.8 MB", status: "Normal", thumbnail: "https://images.unsplash.com/photo-1576086213369-97a306dca665?w=400&h=300&fit=crop" }
       ]
    },
    { month: "October 2025", count: 0, items: [] }
  ];

  const toggleGroup = (month: string) => {
    setExpandedGroups(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
         <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <FlaskConical className="w-6 h-6 text-indigo-500" />
            Digital Lab Folder
         </h3>
         <Button className="rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 h-10 text-xs font-bold gap-2">
            <Plus className="w-4 h-4" /> Upload New Report
         </Button>
      </div>

      <div className="space-y-4">
        {labGroups.map((group, idx) => {
          const isExpanded = expandedGroups.includes(group.month);
          return (
            <div key={idx} className="glass-card rounded-[2rem] overflow-hidden transition-all duration-300">
               <div 
                  className={`p-6 flex items-center justify-between cursor-pointer hover:bg-white/60 transition-colors ${isExpanded ? 'bg-indigo-50/30' : ''}`}
                  onClick={() => toggleGroup(group.month)}
               >
                  <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-indigo-500 text-white' : 'bg-slate-50 text-slate-400'}`}>
                          <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                          <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest">{group.month}</h4>
                          <p className="text-[11px] font-bold text-slate-400">{group.count} reports available</p>
                      </div>
                  </div>
                  <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                     <ChevronDown className="w-5 h-5 text-slate-300" />
                  </div>
               </div>
               
               <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: "auto", opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="overflow-hidden"
                    >
                       <div className="p-8 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {/* Upload Placeholder inside group */}
                          <div className="border-2 border-dashed border-slate-100 rounded-[1.8rem] p-6 flex flex-col items-center justify-center gap-3 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group cursor-pointer h-full min-h-[220px]">
                              <div className="p-3 bg-slate-50 rounded-full group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                                  <Plus className="w-6 h-6 text-slate-400 group-hover:text-white" />
                              </div>
                              <div className="text-center">
                                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">Upload to {group.month.split(' ')[0]}</p>
                                  <p className="text-[10px] font-bold text-slate-400 mt-1">PDF, JPG or PNG</p>
                              </div>
                          </div>

                          {group.items.map((item) => (
                              <div key={item.id} className="bg-white border border-slate-100 rounded-[1.8rem] p-4 relative group hover:shadow-xl hover:border-indigo-100 transition-all">
                                   <div className="h-40 bg-slate-50 rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative">
                                       <img src={item.thumbnail} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" alt="results" />
                                       <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                           <Button 
                                              size="icon" 
                                              variant="secondary" 
                                              className="rounded-full h-10 w-10 shadow-xl bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white border-none"
                                              onClick={() => setPreviewItem(item)}
                                            >
                                              <Eye className="w-5 h-5" />
                                            </Button>
                                           <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 shadow-xl bg-white text-indigo-500 hover:bg-indigo-500 hover:text-white border-none"><Download className="w-5 h-5" /></Button>
                                       </div>
                                   </div>
                                   <Badge className={`absolute top-6 right-6 border-none text-[10px] px-3 py-1 font-bold rounded-full ${item.status === 'Abnormal' ? 'bg-rose-50 text-rose-500 shadow-sm shadow-rose-100' : 'bg-emerald-50 text-emerald-500 shadow-sm shadow-emerald-100'}`}>
                                      {item.status}
                                   </Badge>
                                   <div className="px-1">
                                      <h5 className="text-[13px] font-bold text-slate-900 leading-tight truncate">{item.name}</h5>
                                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                                         <div className="flex items-center gap-2">
                                            {item.type === 'PDF' ? <FileText className="w-3.5 h-3.5 text-indigo-400" /> : <ImageIcon className="w-3.5 h-3.5 text-orange-400" />}
                                            <span className="text-[10px] font-bold text-slate-400">{item.type} • {item.size}</span>
                                         </div>
                                         <span className="text-[10px] font-bold text-slate-300">{item.date}</span>
                                      </div>
                                   </div>
                              </div>
                          ))}

                          {group.items.length === 0 && (
                            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-10 opacity-50">
                               <p className="text-xs font-bold text-slate-400 italic">No reports found for this period</p>
                            </div>
                          )}
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      <Dialog open={!!previewItem} onOpenChange={() => setPreviewItem(null)}>
        <DialogContent className="max-w-4xl p-1 bg-slate-900 border-none rounded-[2rem] overflow-hidden">
           <div className="relative h-[80vh] w-full bg-slate-100 flex items-center justify-center rounded-[1.8rem] overflow-hidden">
              <img src={previewItem?.thumbnail} className="w-full h-full object-contain" alt="preview" />
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                 <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                    <p className="text-white text-xs font-bold">{previewItem?.name}</p>
                 </div>
                 <Button 
                   size="icon" 
                   variant="secondary" 
                   className="rounded-full h-10 w-10 bg-black/50 text-white border-white/20 hover:bg-white hover:text-black hover:border-white pointer-events-auto"
                   onClick={() => setPreviewItem(null)}
                  >
                   <X className="w-5 h-5" />
                 </Button>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex gap-2 pointer-events-auto shadow-2xl">
                  <Button variant="ghost" className="text-white h-10 px-6 font-bold text-xs gap-2 hover:bg-white/10"><Download className="w-4 h-4" /> Download Result</Button>
                  <Button variant="outline" className="h-10 px-6 font-bold text-xs gap-2 bg-indigo-500 text-white border-none shadow-lg shadow-indigo-500/20 hover:bg-indigo-600">Print Record</Button>
              </div>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
