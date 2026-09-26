import { motion } from "framer-motion";
import { useClinicalHistory } from "../../hooks/useClinicalHistory";
import { Calendar, Clock, FileText, User } from "lucide-react";
import { PrescriptionNotebookModal } from "@/features/patient-dashboard/components/PrescriptionNotebookModal";

interface ClinicalHistoryProps {
  patientId?: string;
}

export const ClinicalHistory = ({ patientId }: ClinicalHistoryProps) => {
  const {
    history,
    upcoming,
    isLoading,
    sortOrder,
    setSortOrder,
    isPrescriptionModalOpen,
    selectedPrescription,
    selectedAppointment,
    isPrescriptionLoading,
    handleViewPrescription,
    handleClosePrescriptionModal,
  } = useClinicalHistory(patientId);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card rounded-[2.5rem] p-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 px-2 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Patient Clinical Timeline</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Historical medical appointments, notes, and records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Sort by:</span>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
            className="bg-white/80 border border-slate-200 rounded-xl px-3 py-1 text-xs font-bold text-primary focus:outline-none cursor-pointer shadow-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center space-y-3">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-xs text-slate-500 font-medium">Loading clinical timeline...</p>
        </div>
      ) : (
        <div className="space-y-0 pl-6 md:pl-10 relative">
          <div 
            className="absolute left-[16px] md:left-[20px] top-4 bottom-4 w-px bg-slate-200 dashed" 
            style={{ backgroundImage: 'linear-gradient(to bottom, #e2e8f0 50%, transparent 50%)', backgroundSize: '1px 8px' }} 
          />
          
          {/* Upcoming Appointment */}
          {upcoming && (
            <div className="relative pl-10 md:pl-12 pb-10 group">
              <div className="absolute left-[-21px] md:left-[-27px] top-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white z-10 shadow-sm" />
              <div className="bg-emerald-50/40 border border-emerald-200/80 p-6 rounded-3xl shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        Upcoming Appointment
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-2">{upcoming.reason || "Scheduled Consultation"}</h4>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    Dr. {upcoming.doctorName} ({upcoming.specialization || "Doctor"})
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 mt-2">
                  <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-xl border border-slate-200/60 shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-primary" /> {upcoming.appointmentDate}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-xl border border-slate-200/60 shadow-2xs">
                    <Clock className="w-3.5 h-3.5 text-primary" /> {upcoming.appointmentTime}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* History Timeline */}
          {history.length > 0 ? (
            history.map((item, idx) => (
              <div key={item.appointmentId || idx} className="relative pl-10 md:pl-12 pb-10 group last:pb-0">
                <div className="absolute left-[-21px] md:left-[-27px] top-1 w-5 h-5 rounded-full bg-white border-4 border-primary z-10 group-hover:scale-125 transition-transform shadow-sm" />
                <div className="bg-white/60 border border-slate-100 p-6 rounded-3xl hover:shadow-lg hover:bg-white transition-all hover:-translate-y-0.5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3 gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight">{item.reason || "Consultation"}</h4>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          {item.appointmentDate} {item.appointmentTime && `• ${item.appointmentTime}`}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                          item.status === 'Completed' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/60' :
                          item.status === 'Cancelled' ? 'text-rose-700 bg-rose-50 border border-rose-200/60' :
                          item.status === 'Expired' ? 'text-amber-700 bg-amber-50 border border-amber-200/60' :
                          'text-indigo-700 bg-indigo-50 border border-indigo-200/60'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      Doctor: <span className="font-bold text-slate-800">{item.doctorName}</span>
                    </span>
                  </div>

                  {item.notes && (
                    <div className="mt-3 bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                      <span className="font-bold text-slate-700 block mb-0.5">Consultation Notes:</span>
                      {item.notes}
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-4">
                    <button 
                      onClick={() => handleViewPrescription(item)}
                      className="text-primary text-[11px] font-black hover:underline uppercase tracking-widest flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" /> View Note Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-400 font-medium">
              No historical medical records found for this patient.
            </div>
          )}
        </div>
      )}

      <PrescriptionNotebookModal
        isOpen={isPrescriptionModalOpen}
        onClose={handleClosePrescriptionModal}
        appointment={selectedAppointment}
        prescription={selectedPrescription}
        isLoading={isPrescriptionLoading}
        variant="doctor"
      />
    </motion.div>
  );
};

