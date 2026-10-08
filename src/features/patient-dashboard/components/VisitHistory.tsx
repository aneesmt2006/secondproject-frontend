import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Calendar,
  Stethoscope,
  FileText,
  Clock,
  ArrowRight,
  Activity,
  MapPin,
  Star,
  RefreshCw,
  Video,
  Check,
} from "lucide-react";
import { useVisitHistory } from "../hooks/useVisitHistory";
import { UserAppointment } from "@/types/appointments.type";
import { toast } from "sonner";
import { getTimeDisplayParts } from "@/utils/appointmentUtils";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PrescriptionNotebookModal } from "./PrescriptionNotebookModal";

type VisitHistoryProps = ReturnType<typeof useVisitHistory>;

export default function VisitHistory(props: VisitHistoryProps) {
  const { 
    data, 
    isLoading, 
    isTimeReached, 
    refresh,
    isDoctorModalOpen,
    setIsDoctorModalOpen,
    bookedDoctorsList,
    isDoctorsLoading,
    isUpdatingDoctor,
    handleChangePrimaryDoctor,
    currentPrimaryDoctor,
    isCurrentDoctorLoading,
    selectedDoctorId,
    setSelectedDoctorId,
    selectedDoctorName,
    setSelectedDoctorName,
    isPrescriptionModalOpen,
    selectedPrescription,
    selectedAppointment,
    isPrescriptionLoading,
    handleViewPrescription,
    handleClosePrescriptionModal,
  } = props;
  const navigate = useNavigate();

  const [visibleCount, setVisibleCount] = useState(3);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-black/10 border-t-patient-primary rounded-full animate-spin transition-colors" />
        <p className="text-sm font-bold text-[color:var(--foreground)] opacity-40 uppercase tracking-widest transition-colors">
          Fetching your Records...
        </p>
      </div>
    );
  }

  const visits = data?.history || [];
  const upcoming = data?.upcoming;

  const visibleVisits = visits.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, visits.length));
  };

  const handleJoinCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (upcoming) {
      toast.success(
        "Connecting to video call with Dr. " + upcoming.doctorName + "..."
      );

      navigate("/dashboard/video", {
        state: { roomCode: data?.upcoming?.appointmentId },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-8 pb-12"
    >
      <div className="flex justify-end gap-4 px-4 sm:px-8 max-w-4xl mx-auto mb-2">
        <div className="flex items-center gap-3 pb-1">
          <button
            onClick={() => setIsDoctorModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 md:px-5 rounded-xl bg-white border border-white shadow-sm text-patient-primary font-bold text-xs hover:bg-patient-primary/5 hover:border-patient-primary/20 hover:shadow-md active:scale-95 transition-all cursor-pointer whitespace-nowrap group"
            title="My Doctor"
          >
            My Doctor
          </button>

          <button
            onClick={refresh}
            className="hidden md:flex p-2 md:px-4 md:py-2 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 text-patient-primary hover:bg-white hover:shadow-md active:scale-95 transition-all items-center gap-2 cursor-pointer font-bold text-xs"
            title="Refresh History"
          >
            <RefreshCw className="w-3.5 h-3.5 hover:rotate-180 transition-transform duration-500" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10 w-full">
        
        {/* Upcoming Section */}
        {upcoming && (
          <motion.section
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3 className="text-[11px] font-black uppercase tracking-widest text-patient-primary/70 mb-3 ml-2 flex items-center gap-2">
              <Star className="w-3.5 h-3.5" /> Next Consultation
            </h3>
            <div className="bg-patient-primary rounded-[2rem] p-6 md:p-8 text-white shadow-2xl shadow-patient-primary/20 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/20">
              <div className="absolute -top-10 -right-10 p-8 opacity-10 pointer-events-none transform rotate-12">
                <Star className="w-64 h-64 fill-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-8 w-full md:w-auto">
                <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 md:p-5 text-center border border-white/30 shrink-0 min-w-[80px] shadow-inner flex flex-col justify-center h-full">
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-90 mb-1">
                    {new Date(upcoming.appointmentDate.split(",")[0]).toLocaleDateString("en-US", { month: "short" })}
                  </div>
                  <div className="text-3xl md:text-4xl font-black leading-none tracking-tighter">
                    {new Date(upcoming.appointmentDate.split(",")[0]).toLocaleDateString("en-US", { day: "2-digit" })}
                  </div>
                </div>
                
                <div className="pt-1">
                  <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1.5 drop-shadow-sm">Dr. {upcoming.doctorName}</h4>
                  <p className="text-white/90 font-semibold text-[13px] md:text-sm flex items-center gap-2 mb-3">
                    <Stethoscope className="w-4 h-4 opacity-80" /> {upcoming.specialization}
                  </p>
                  <div className="text-white/95 text-[11px] md:text-xs font-bold bg-black/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 inline-flex flex-wrap items-center gap-2.5 shadow-inner">
                    <span className="tracking-wide flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 opacity-70" />
                      {getTimeDisplayParts(upcoming.appointmentTime).time} {getTimeDisplayParts(upcoming.appointmentTime).ampm}
                    </span>
                    <span className="opacity-40">•</span>
                    <span>{upcoming.reason || "General Consultation"}</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                <button
                  onClick={(e) => handleJoinCall(e)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-patient-primary hover:bg-white/90 transition-all shadow-xl font-extrabold text-sm active:scale-95 whitespace-nowrap group"
                >
                  <Video className="w-5 h-5 transition-transform group-hover:scale-110" />
                  Join Video Call
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {/* Past Records Section */}
        <section>
          <h3 className="text-[11px] font-black uppercase tracking-widest text-[color:var(--foreground)] opacity-40 mb-4 ml-2 flex items-center gap-2">
            <HistoryIcon className="w-3.5 h-3.5" /> Past Records
          </h3>
          
          {visits.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-md border-2 border-dashed border-white/80 rounded-[2rem] p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FileText className="w-8 h-8 opacity-30 text-[color:var(--foreground)]" />
              </div>
              <p className="text-[color:var(--foreground)] font-bold transition-colors">No Records Found</p>
              <p className="text-xs text-[color:var(--foreground)] opacity-50 mt-1 transition-colors">
                Your completed consultations will appear here.
              </p>
            </div>
          ) : (
            <div className="relative space-y-4">
              {/* Vertical Timeline Line */}
              <div className="absolute left-[38px] md:left-[42px] top-4 bottom-4 w-[2px] bg-patient-primary/10 rounded-full hidden sm:block pointer-events-none"></div>

              {visibleVisits.map((record, idx) => {
                const visitDate = new Date(record.appointmentDate.split(",")[0]);
                const isCancelled = record.status === 'Cancelled';
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.05), duration: 0.4 }}
                    key={record.appointmentId}
                    onClick={() => !isCancelled && handleViewPrescription(record as any)}
                    className={`relative z-10 group bg-white/80 backdrop-blur-xl border border-white rounded-[1.5rem] p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 shadow-sm ${!isCancelled ? 'cursor-pointer hover:bg-white hover:shadow-xl hover:-translate-y-1' : 'opacity-70 grayscale-[30%]'}`}
                  >
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className={`relative z-20 rounded-2xl p-3 md:p-4 text-center border min-w-[64px] shrink-0 transition-colors ${
                        isCancelled ? 'bg-rose-50 border-rose-100 text-rose-900/60' : 'bg-white shadow-sm border-patient-primary/10 text-patient-primary group-hover:border-patient-primary/30'
                      }`}>
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-0.5 leading-none">
                          {visitDate.toLocaleDateString("en-US", { month: "short" })}
                        </div>
                        <div className="text-xl md:text-2xl font-black leading-none tracking-tighter">
                          {visitDate.toLocaleDateString("en-US", { day: "2-digit" })}
                        </div>
                      </div>
                      
                      <div className="min-w-0 py-1">
                        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                          <h4 className="text-base md:text-lg font-extrabold text-[color:var(--foreground)] truncate tracking-tight">Dr. {record.doctorName}</h4>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-inner ${
                            isCancelled ? 'bg-rose-100 text-rose-700' : 'bg-emerald-50 border border-emerald-100 text-emerald-600'
                          }`}>
                            {record.status}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[color:var(--foreground)] opacity-70 mb-1.5 truncate flex items-center gap-1.5">
                          <Stethoscope className="w-3.5 h-3.5 opacity-60" /> {record.specialization}
                          <span className="opacity-30 mx-1">•</span> 
                          {record.reason || "General Consultation"}
                        </p>
                        <p className="text-[11px] font-bold text-patient-primary/60 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {visitDate.toLocaleDateString('en-US', { year: 'numeric'})} at {getTimeDisplayParts(record.appointmentTime).time} {getTimeDisplayParts(record.appointmentTime).ampm}
                        </p>
                      </div>
                    </div>

                    {!isCancelled && (
                      <div className="shrink-0 mt-2 sm:mt-0">
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-patient-primary/5 border border-patient-primary/10 text-patient-primary font-bold text-xs hover:bg-patient-primary/10 hover:border-patient-primary/30 transition-all duration-300 active:scale-95 group-hover:shadow-md">
                          View Details
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
              
              {visibleCount < visits.length && (
                <div className="py-6 flex justify-center">
                  <button 
                    onClick={handleLoadMore}
                    className="flex items-center gap-2 px-6 py-2.5 bg-patient-primary/10 text-patient-primary font-bold text-xs uppercase tracking-widest rounded-full hover:bg-patient-primary/20 transition-all active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Load More
                  </button>
                </div>
              )}
            </div>

          )}
        </section>
      </div>

{/* Choose Primary Doctor Modal */}
      <Dialog open={isDoctorModalOpen} onOpenChange={setIsDoctorModalOpen}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto bg-gradient-to-br from-white to-[#FFF9E6]/30 rounded-3xl p-6 shadow-2xl border border-lilac/10">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl font-bold text-wine tracking-tight flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-periwinkle" />
              Choose Primary Doctor
            </DialogTitle>
            <p className="text-xs text-cocoa/50 font-medium">
              Select a doctor from your booked consultations to set as your primary doctor.
            </p>
          </DialogHeader>

          {/* Current Doctor Display Banner */}
          {isCurrentDoctorLoading ? (
            <div className="mb-5 p-4 rounded-2xl bg-wine/5 border border-wine/10 flex items-center gap-3 animate-pulse">
              <div className="w-10 h-10 rounded-xl bg-wine/10 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-wine/10 rounded w-24" />
                <div className="h-4 bg-wine/10 rounded w-36" />
              </div>
            </div>
          ) : currentPrimaryDoctor ? (
            <div className="mb-5 p-4 rounded-2xl bg-wine/5 border border-wine/10 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-wine/10 flex items-center justify-center text-wine shrink-0">
                  <Stethoscope className="w-5 h-5 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-wine/60 uppercase tracking-widest block">
                    Current Primary Doctor
                  </span>
                  <h4 className="text-sm font-extrabold text-wine truncate">
                    Dr. {currentPrimaryDoctor.doctorName}
                  </h4>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[9px] font-black text-emerald-600 uppercase tracking-wider shrink-0">
                Active
              </span>
            </div>
          ) : (
            <div className="mb-5 p-4 rounded-2xl bg-periwinkle/5 border border-dashed border-periwinkle/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-periwinkle/10 flex items-center justify-center text-periwinkle shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-periwinkle/60 uppercase tracking-widest block">
                  Current Primary Doctor
                </span>
                <h4 className="text-sm font-semibold text-cocoa/50 italic">
                  No primary doctor selected yet
                </h4>
              </div>
            </div>
          )}

          {isDoctorsLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-8 h-8 border-4 border-periwinkle/20 border-t-periwinkle rounded-full animate-spin" />
              <p className="text-xs font-bold text-cocoa/40 uppercase tracking-widest animate-pulse">
                Loading Doctors...
              </p>
            </div>
          ) : bookedDoctorsList.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center mx-auto">
                <Stethoscope className="w-6 h-6 text-lilac/30" />
              </div>
              <p className="text-sm font-bold text-cocoa/70">No Booked Doctors Found</p>
              <p className="text-xs text-cocoa/45">
                Book an appointment first to set a doctor as your primary consultant.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-cocoa/40 uppercase tracking-widest px-1">
                Select Doctor
              </p>
              <div className="space-y-2.5 max-h-[30vh] overflow-y-auto pr-1">
                {bookedDoctorsList.map((dr) => {
                  const isSelected = dr.id === selectedDoctorId;
                  const isCurrent = currentPrimaryDoctor && dr.id === currentPrimaryDoctor.doctorId;
                  return (
                    <button
                      key={dr.id}
                      disabled={isUpdatingDoctor}
                      onClick={() => {
                        setSelectedDoctorId(dr.id);
                        setSelectedDoctorName(dr.name);
                      }}
                      className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border transition-all text-left group disabled:opacity-50 disabled:pointer-events-none ${
                        isSelected
                          ? "border-periwinkle bg-periwinkle/5 ring-1 ring-periwinkle/25"
                          : "border-lilac/10 bg-white hover:bg-cream/40 hover:border-periwinkle/20"
                      }`}
                    >
                      <img
                        src={dr.avatarUrl || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150&h=150"}
                        alt={dr.name}
                        className={`w-12 h-12 rounded-full object-cover border-2 transition-all shrink-0 ${
                          isSelected ? "border-periwinkle shadow-sm" : "border-cream"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-extrabold text-cocoa group-hover:text-wine transition-colors truncate">
                            Dr. {dr.name}
                          </h4>
                          {isCurrent && (
                            <span className="px-1.5 py-0.5 rounded bg-wine/10 text-[8px] font-extrabold text-wine uppercase tracking-wider shrink-0">
                              Current
                            </span>
                          )}
                        </div>
                        {dr.specialty && (
                          <p className="text-[11px] font-bold text-periwinkle uppercase tracking-wider mt-0.5 truncate">
                            {dr.specialty}
                          </p>
                        )}
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                        isSelected 
                          ? "bg-periwinkle text-white" 
                          : "bg-cream/40 text-periwinkle group-hover:bg-periwinkle/10"
                      }`}>
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full border-2 border-periwinkle/30 group-hover:border-periwinkle" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Confirm Selection Action Button */}
              <div className="mt-6 pt-4 border-t border-lilac/10">
                <button
                  disabled={
                    isUpdatingDoctor ||
                    !selectedDoctorId ||
                    selectedDoctorId === currentPrimaryDoctor?.doctorId
                  }
                  onClick={handleChangePrimaryDoctor}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedDoctorId && selectedDoctorId !== currentPrimaryDoctor?.doctorId
                      ? "bg-wine text-white shadow-lg shadow-wine/25 hover:bg-wine/90 active:scale-[0.98] cursor-pointer"
                      : "bg-cocoa/5 text-cocoa/30 border border-lilac/10 cursor-not-allowed"
                  }`}
                >
                  {isUpdatingDoctor ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Confirm Primary Doctor</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Prescription Notebook Page Modal */}
      <PrescriptionNotebookModal
        isOpen={isPrescriptionModalOpen}
        onClose={handleClosePrescriptionModal}
        appointment={selectedAppointment}
        prescription={selectedPrescription}
        isLoading={isPrescriptionLoading}
      />
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
