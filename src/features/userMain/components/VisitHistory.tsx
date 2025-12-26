import { motion } from "framer-motion";
import { 
  Calendar, 
  Stethoscope, 
  FileText, 
  Clock,
  ArrowRight,
  Activity,
  MapPin,
  Star,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useVisitHistory } from "../hooks/useVisitHistory";
import { UserAppointment } from "@/types/appointments.type";

export default function VisitHistory() {
  const { data, isLoading, refresh } = useVisitHistory();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-periwinkle/20 border-t-periwinkle rounded-full animate-spin" />
        <p className="text-sm font-bold text-cocoa/40 uppercase tracking-widest">Fetching your Records...</p>
      </div>
    );
  }


  const visits = data?.history || [];
  const upcoming = data?.upcoming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-sans font-semibold text-wine flex items-center gap-2">
          <HistoryIcon className="w-5 h-5" />
          History & Records
        </h2>
        <span className="text-[10px] font-black text-periwinkle uppercase tracking-[0.2em] bg-periwinkle/5 px-4 py-1.5 rounded-full border border-periwinkle/10">
          {visits.length} Records
        </span>
      </div>

      {/* Upcoming Appointment Card */}
      {upcoming && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden bg-gradient-to-br from-wine to-cocoa rounded-[2.5rem] p-6 text-white shadow-2xl shadow-wine/20 group cursor-pointer transition-transform hover:scale-[1.01]"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
             <Star className="w-24 h-24 fill-white" />
          </div>
          
          <div className="relative flex flex-col sm:flex-row justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Next Consultation</span>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Dr. {upcoming.doctorName}</h3>
                <div className="flex items-center gap-3 mt-1 text-white/60">
                  <span className="text-xs font-medium flex items-center gap-1">
                    <Activity className="w-3 h-3" /> {upcoming.specialization}
                  </span>
                  <span className="text-xs font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {upcoming.hospitalName || "Medical Center"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/10 flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">{upcoming.appoinmentDate}</span>
              <span className="text-3xl font-black">{upcoming.appoinmentTime.split(' ')[1]}</span>
              <span className="text-[10px] font-bold text-emerald-300 mt-1">{upcoming.appoinmentTime.split(' ')[2]}</span>
            </div>
          </div>
        </motion.div>
      )}

      {visits.length === 0 && !upcoming && (
        <div className="bg-white border-2 border-dashed border-lilac/20 rounded-[2.5rem] p-12 text-center">
            <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-lilac/30" />
            </div>
            <p className="text-cocoa font-bold">No Records Found</p>
            <p className="text-xs text-cocoa/40 mt-1">Your consultation history will appear here once completed.</p>
        </div>
      )}

      <div className="space-y-4">
        {visits.map((visit: UserAppointment, index: number) => (
          <motion.div
            key={visit.appointmentId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white border border-lilac/10 rounded-[2rem] p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-periwinkle/10 hover:-translate-y-1 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-periwinkle/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110" />
            
            <div className="relative flex flex-col md:flex-row md:items-start gap-5">
              {/* Date & Icon */}
              <div className="flex md:flex-col items-center gap-3 shrink-0 relative">
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-cream flex flex-col items-center justify-center text-wine shadow-inner border border-wine/5">
                  <span className="text-[10px] font-black uppercase tracking-tighter opacity-70">
                    {new Date(visit.appoinmentDate.split(',')[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).substring(0, 3).toUpperCase()}
                  </span>
                  <span className="text-xl font-bold leading-none">
                    {new Date(visit.appoinmentDate.split(',')[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).split(' ')[1].toUpperCase()}
                  </span>
                </div>
                
                {/* Timeline Path Line */}
                {index !== visits.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-24 z-0">
                    <div className="w-full h-full bg-gradient-to-b from-periwinkle/40 via-periwinkle/20 to-transparent border-l-2 border-dashed border-periwinkle/20" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-cocoa group-hover:text-wine transition-colors">
                        Dr. {visit.doctorName}
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-wine/5 text-[10px] font-bold text-wine tracking-wide uppercase">
                        {visit.specialization}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-[11px] font-medium text-cocoa/60">
                        <Clock className="w-3 h-3" />
                        {visit.appoinmentTime}
                      </div>
                      <span className="text-lilac/40 tracking-widest">•</span>
                      <div className="flex items-center gap-1 text-[11px] font-medium text-cocoa/60">
                        <Calendar className="w-3 h-3" />
                        {new Date(visit.appoinmentDate.split(',')[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-cream/30 rounded-2xl p-4 border border-lilac/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Stethoscope className="w-3.5 h-3.5 text-periwinkle" />
                    <span className="text-xs font-bold text-cocoa">{visit.reason}</span>
                  </div>
                  <p className="text-xs text-cocoa/70 leading-relaxed italic line-clamp-2">
                    {visit.notes ? `"${visit.notes}"` : "No consultation notes available."}
                  </p>
                </div>

                <div className="flex items-center gap-3 justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full shadow-sm ${visit.status === 'Cancelled' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${visit.status === 'Cancelled' ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {visit.status}
                        </span>
                    </div>
                    
                    <button className="flex items-center gap-1 text-[11px] font-bold text-periwinkle hover:text-wine transition-colors">
                        View Full Details
                        <ArrowRight className="w-3 h-4" />
                    </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
