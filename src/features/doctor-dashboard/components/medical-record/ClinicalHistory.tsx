import { motion } from "framer-motion";

interface ClinicalHistoryProps {
  // Add props if needed
}

export const ClinicalHistory = ({}: ClinicalHistoryProps) => {
  const timelineItems = [
    { title: "Annual Physical Exam", date: "Oct 12, 2025", desc: "Routine check-up. Blood work ordered. BP normal.", doctor: "Dr. Sarah Jenkins", status: "Completed" },
    { title: "Tele-Health Consultation", date: "June 15, 2025", desc: "Patient complained of seasonal allergies. Prescribed Claritin.", doctor: "Dr. Mike Ross", status: "Completed" },
    { title: "Specialist Referral", date: "Feb 10, 2025", desc: "Referred to Endocrinologist for thyroid evaluation.", doctor: "Dr. Sarah Jenkins", status: "Historical" },
  ];

  return (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card rounded-[2.5rem] p-8"
    >
      <div className="flex items-center justify-between mb-10 px-4">
         <h3 className="text-xl font-bold text-slate-900 ml-1">Patient Clinical Timeline</h3>
         <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sort by:</span>
            <select className="bg-transparent text-[11px] font-bold text-primary focus:outline-none cursor-pointer">
               <option>Newest First</option>
               <option>Oldest First</option>
            </select>
         </div>
      </div>

      <div className="space-y-0 pl-10 relative">
        <div className="absolute left-[20px] top-4 bottom-4 w-px bg-slate-200 dashed" 
             style={{ backgroundImage: 'linear-gradient(to bottom, #e2e8f0 50%, transparent 50%)', backgroundSize: '1px 8px' }} 
        />
        
        {timelineItems.map((item, idx) => (
            <div key={idx} className="relative pl-12 pb-14 group last:pb-0">
                <div className="absolute left-[-27px] top-1 w-5 h-5 rounded-full bg-white border-4 border-primary z-10 group-hover:scale-125 transition-transform shadow-sm" />
                <div className="bg-white/40 border border-slate-100 p-6 rounded-3xl hover:shadow-xl hover:bg-white transition-all hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
                        <div>
                           <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{item.title}</h4>
                           <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{item.date}</span>
                              <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md">{item.status}</span>
                           </div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 italic">Performed by: <span className="text-slate-900 not-italic">{item.doctor}</span></span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-5">{item.desc}</p>
                    <div className="flex items-center gap-4">
                        <button className="text-primary text-[11px] font-black hover:underline uppercase tracking-widest">View Full Note</button>
                        <button className="text-slate-400 text-[11px] font-black hover:text-slate-600 uppercase tracking-widest">Download PDF</button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </motion.div>
  );
};
