import { motion } from "framer-motion";
import { FileText, Download, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LabResultsProps {
    // Add props if needed
}

export const LabResults = ({}: LabResultsProps) => {
  const labReports = [
    { 
        title: "Complete Blood Count (CBC)", 
        date: "Oct 12, 2025", 
        facility: "Main City Lab",
        status: "Normal",
        pdfUrl: "#",
        isAbnormal: false
    },
    { 
        title: "Urinalysis - Routine", 
        date: "Oct 12, 2025", 
        facility: "Main City Lab",
        status: "Abnormal",
        pdfUrl: "#",
        isAbnormal: true,
        note: "Elevated protein levels detected."
    },
    { 
        title: "Thyroid Panel (TSH, T3, T4)", 
        date: "Feb 10, 2025", 
        facility: "Endo Diagnostics",
        status: "Normal",
        pdfUrl: "#",
        isAbnormal: false
    },
  ];

  return (
    <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
    >
      <div className="glass-card rounded-[2.5rem] p-8">
        <div className="flex items-center justify-between mb-8 px-2">
            <div>
                <h3 className="text-xl font-bold text-slate-900">Laboratory Results</h3>
                <p className="text-xs font-semibold text-slate-400 mt-1">Recent pathology and diagnostic reports</p>
            </div>
            <Button variant="outline" className="rounded-xl border-slate-200 text-xs font-bold gap-2">
                <Download className="w-4 h-4" /> Download All
            </Button>
        </div>

        <div className="space-y-4">
            {labReports.map((report, idx) => (
                <div key={idx} className="group bg-white/40 border border-slate-100 p-5 rounded-3xl hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-2xl ${report.isAbnormal ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-slate-900 mb-1">{report.title}</h4>
                                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                                    <span>{report.date}</span>
                                    <span>•</span>
                                    <span>{report.facility}</span>
                                </div>
                                {report.isAbnormal && (
                                    <div className="flex items-center gap-2 text-rose-500 text-xs font-bold bg-rose-50 px-3 py-1.5 rounded-lg w-fit">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>Attention: {report.note}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                report.isAbnormal 
                                    ? 'bg-rose-100 text-rose-600' 
                                    : 'bg-emerald-100 text-emerald-600'
                            }`}>
                                {report.status}
                            </span>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" variant="ghost" className="h-8 rounded-lg text-xs font-bold hover:bg-slate-100">
                                    View
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};
