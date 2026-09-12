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
    setSelectedDoctorName
  } = props;
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-periwinkle/20 border-t-periwinkle rounded-full animate-spin" />
        <p className="text-sm font-bold text-cocoa/40 uppercase tracking-widest">
          Fetching your Records...
        </p>
      </div>
    );
  }

  const visits = data?.history || [];
  const upcoming = data?.upcoming;

  const handleJoinCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (upcoming) {
      toast.success(
        `Connecting to video call with Dr. ${upcoming.doctorName}...`,
      );

      navigate("/dashboard/video", {
        state: { roomCode: data.upcoming?.appointmentId },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-4 gap-2">
        <h2 className="text-base sm:text-lg md:text-xl font-sans font-semibold text-wine flex items-center gap-1.5 shrink-0">
          <HistoryIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
          History & Records
        </h2>
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Change Primary Doctor Button */}
          <button
            onClick={() => setIsDoctorModalOpen(true)}
            className="px-3.5 py-1.5 md:px-5 md:py-2 rounded-full bg-wine/5 border border-wine/10 text-wine hover:bg-wine/10 active:scale-95 transition-all cursor-pointer font-black text-[9px] md:text-[10px] uppercase tracking-wider whitespace-nowrap"
            title="My Doctor"
          >
            My Doctor
          </button>

          <button
            onClick={refresh}
            className="hidden md:flex p-2 rounded-full bg-periwinkle/5 border border-periwinkle/10 text-periwinkle hover:bg-wine/5 hover:text-wine active:scale-95 transition-all items-center justify-center cursor-pointer"
            title="Refresh History"
          >
            <RefreshCw className="w-4 h-4 hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>
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

          <div className="relative flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                    Next Consultation
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold tracking-tight">
                    Dr. {upcoming.doctorName}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-white/60">
                    <span className="text-xs font-medium flex items-center gap-1">
                      <Activity className="w-3 h-3" /> {upcoming.specialization}
                    </span>
                    <span className="text-xs font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{" "}
                      {upcoming.hospitalName || "Medical Center"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/10 flex flex-col items-center justify-center min-w-[120px]">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">
                  {upcoming.appointmentDate}
                </span>
                <span className="text-3xl font-black">
                  {getTimeDisplayParts(upcoming.appointmentTime).time}
                </span>
                <span className="text-[10px] font-bold text-emerald-300 mt-1">
                  {getTimeDisplayParts(upcoming.appointmentTime).ampm}
                </span>
              </div>
            </div>

            {/* Divider line */}
            <div className="h-px bg-white/10" />

            {/* Video Call Action Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isTimeReached ? "bg-emerald-400" : "bg-white/30"}`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${isTimeReached ? "bg-emerald-500" : "bg-white/40"}`}
                  ></span>
                </span>
                <span className="text-xs text-white/80 font-medium leading-none">
                  {isTimeReached
                    ? "Consultation is active. You can join the call now."
                    : "The video call button will become active when the appointment time starts."}
                </span>
              </div>
              <button
                // disabled={!isTimeReached}
                onClick={handleJoinCall}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-xs transition-all duration-300 shadow-md bg-white text-wine hover:bg-cream active:scale-[0.98] shadow-white/5 cursor-pointer disabled:bg-white/5 disabled:text-white/30 disabled:border-white/10 disabled:cursor-not-allowed"
              >
                <Video className="w-4 h-4" />
                Join Video Call
              </button>
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
          <p className="text-xs text-cocoa/40 mt-1">
            Your consultation history will appear here once completed.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {visits.map((visit: UserAppointment, index: number) => (
          <motion.div
            key={visit.appointmentId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white border border-lilac/10 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-periwinkle/10 hover:-translate-y-1 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-periwinkle/5 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110" />

            <div className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-5">
              {/* Date & Icon */}
              <div className="flex md:flex-col items-center gap-3 shrink-0 relative">
                <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-cream flex flex-col items-center justify-center text-wine shadow-inner border border-wine/5">
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-tighter opacity-70">
                    {new Date(visit.appointmentDate.split(",")[0])
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      .substring(0, 3)
                      .toUpperCase()}
                  </span>
                  <span className="text-lg md:text-xl font-bold leading-none">
                    {new Date(visit.appointmentDate.split(",")[0])
                      .toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      .split(" ")[1]
                      .toUpperCase()}
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
              <div className="flex-1 space-y-3 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                      <h3 className="text-base md:text-lg font-bold text-cocoa group-hover:text-wine transition-colors truncate">
                        Dr. {visit.doctorName}
                      </h3>
                      <span className="px-1.5 py-0.5 rounded bg-wine/5 text-[8px] md:text-[10px] font-bold text-wine tracking-wide uppercase whitespace-nowrap">
                        {visit.specialization}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-[10px] md:text-[11px] font-medium text-cocoa/60">
                        <Clock className="w-3 h-3" />
                        {visit.appointmentTime}
                      </div>
                      <span className="text-lilac/40 tracking-widest hidden md:inline">•</span>
                      <div className="flex items-center gap-1 text-[10px] md:text-[11px] font-medium text-cocoa/60">
                        <Calendar className="w-3 h-3" />
                        {new Date(visit.appointmentDate.split(",")[0])
                          .toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                          .toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-cream/30 rounded-xl md:rounded-2xl p-3 md:p-4 border border-lilac/5">
                  <div className="flex items-center gap-2 mb-1">
                    <Stethoscope className="w-3 h-3 md:w-3.5 md:h-3.5 text-periwinkle" />
                    <span className="text-[11px] md:text-xs font-bold text-cocoa">
                      {visit.reason}
                    </span>
                  </div>
                  <p className="text-[11px] md:text-xs text-cocoa/70 leading-relaxed italic line-clamp-2">
                    {visit.notes
                      ? `"${visit.notes}"`
                      : "No consultation notes available."}
                  </p>
                </div>

                <div className="flex items-center gap-3 justify-between">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full shadow-sm ${visit.status === "Cancelled" ? "bg-rose-500" : "bg-emerald-500"}`}
                    />
                    <span
                      className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${visit.status === "Cancelled" ? "text-rose-600" : "text-emerald-600"}`}
                    >
                      {visit.status}
                    </span>
                  </div>

                  <button className="flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-periwinkle hover:text-wine transition-colors">
                    View Full Details
                    <ArrowRight className="w-3 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
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
