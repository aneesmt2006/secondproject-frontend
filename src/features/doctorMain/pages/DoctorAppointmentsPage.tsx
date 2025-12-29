import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  ChevronRight, 
  History, 
  XCircle, 
  AlertTriangle, 
  Dot 
} from "lucide-react";
import { DoctorHeader } from "../components/DoctorHeader";
import { GlassyNavigation } from "../components/GlassyNavigation";
import { BottomNavigation } from "../components/BottomNavigation";
import { AppointmentStatusFilters } from "../components/AppointmentStatusFilters";
import { DoctorAppointmentCard } from "../components/DoctorAppointmentCard";
import { EmptyAppointments } from "../components/EmptyAppointments";
import { DoctorAppointmentsLoader } from "../components/DoctorAppointmentsLoader";
import { useCompleteAppointment } from "../hooks/useCompleteAppointment";
import { useDoctorAppointments } from "../hooks/useDoctorAppointments";
import { useAppSelector } from "../../../store/hooks";
import { doctorSelector } from "../../dr.registration/slice/doctorSlice";
import "../../../theme/doctor.css";
import { CompleteAppointmentModal } from "../components/CompleteAppointmentModal";
import { AppointmentsDet } from "../../../types/appointments.type";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMedicalRecord } from "../hooks/useMedicalRecord";

const DoctorAppointmentsPage = () => {
  const navigate = useNavigate();
  const { fullName } = useAppSelector(doctorSelector);
  const { 
    activeFilter, 
    setActiveFilter, 
    selectedDate, 
    setSelectedDate, 
    appointments, 
    counts,
    isLoading,
    handleCancelAppointment,

  } = useDoctorAppointments();
  const {laodMedicalData} = useMedicalRecord()

  const completion = useCompleteAppointment();
  const [appointmentIdToCancel, setAppointmentIdToCancel] = useState<string | null>(null);

  const confirmCancel = async () => {
    if (appointmentIdToCancel) {
      await handleCancelAppointment(appointmentIdToCancel);
      setAppointmentIdToCancel(null);
    }
  };

  return (
    <div className="doctor-theme min-h-screen pb-48 md:pb-8">
      <DoctorHeader
        doctorName={fullName ? `Dr. ${fullName}` : "Sarah"}
        avatarUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
        rating={4.9}
        patientCount={850}
      />

      <GlassyNavigation />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        {/* Desktop Header - Always at the top */}
        <div className="hidden lg:flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900 tracking-tight leading-none">
              Appointment Queue
            </h1>
            <p className="text-[14px] font-bold text-slate-400 mt-3">
              Manage consultations and patient status
            </p>
          </div>

          {activeFilter === 'Upcoming' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary z-10 group-hover:scale-110 transition-transform" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-12 pr-12 py-3.5 bg-white border border-slate-200 rounded-[1.2rem] text-[13px] font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer shadow-sm hover:border-primary/40 hover:shadow-md appearance-none min-w-[220px]"
              />
              <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 rotate-90 z-10 pointer-events-none group-hover:text-primary transition-colors" />
            </motion.div>
          )}
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-900">Appointments</h1>
            {activeFilter === 'Upcoming' && (
              <div className="relative group">
                  <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full cursor-pointer z-10"
                />
                <div className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-900 flex items-center gap-3 shadow-sm group-hover:border-primary/40 transition-all">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  {selectedDate || 'Select Date'}
                  <ChevronRight className="w-4 h-4 text-slate-300 rotate-90" />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <AppointmentStatusFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start relative">
          {/* Sidebar - Desktop Only (Balanced width) */}
          <aside className="hidden lg:flex flex-col gap-6 w-56 shrink-0 sticky top-30">
            <div className="bg-white rounded-[2.2rem] p-5 border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-7 px-3">
                Filter Schedule
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'Upcoming', icon: Dot, color: 'emerald' },
                  { id: 'Emergency', icon: AlertTriangle, color: 'rose' },
                  { id: 'Completed', icon: History, color: 'indigo' },
                  { id: 'Canceled', icon: XCircle, color: 'slate' },
                ].map((filter) => {
                  const isActive = activeFilter === filter.id;
                  const count = (counts as any)[filter.id] || 0;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id as any)}
                      className={`
                        group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300
                        ${isActive 
                          ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1' 
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <filter.icon className={`w-5 h-5 
                          ${isActive ? 'text-white' : `text-${filter.color}-500`}
                          ${filter.id === 'Emergency' ? 'animate-pulse' : ''}
                        `} />
                        <span className="text-[14px] font-bold tracking-tight">{filter.id}</span>
                      </div>
                      {count > 0 && (
                        <span className={`
                          text-[10px] font-bold px-2 py-0.5 rounded-lg min-w-[22px] text-center
                          ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}
                        `}>
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="px-6">
               <p className="text-[12px] font-bold text-slate-400 leading-relaxed italic border-l-2 border-slate-100 pl-4">
                 Showing all {activeFilter.toLowerCase()} sessions for today's schedule.
               </p>
            </div>
          </aside>

          {/* Main Column - Aligned on the same line as Sidebar */}
          <div className="flex-1 w-full">
            <div className="min-h-[600px]">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-40"
                  >
                    <DoctorAppointmentsLoader />
                  </motion.div>
                ) : appointments.length > 0 ? (
                  <motion.div 
                    key={activeFilter}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {appointments.map((appointment: AppointmentsDet, i: number) => (
                      <DoctorAppointmentCard 
                        key={i} 
                        appointment={appointment} 
                        onComplete={() => completion.handleOpen(appointment)}
                        onViewRecords={() => {
                          navigate(`/doctor/medical-record/${appointment.userId}`);
                          laodMedicalData(appointment.userId!)
                        }}
                        onCancel={(id) => setAppointmentIdToCancel(id)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex flex-col items-center justify-center py-32 bg-white/40 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem]"
                  >
                    <EmptyAppointments status={activeFilter} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />

      {completion.selectedAppointment && (
        <CompleteAppointmentModal
          isOpen={completion.isOpen}
          onClose={completion.handleClose}
          appointment={completion.selectedAppointment}
          completionState={completion}
        />
      )}

      <AlertDialog  open={!!appointmentIdToCancel} onOpenChange={(open) => !open && setAppointmentIdToCancel(null)}>
        <AlertDialogContent className="bg-slate-50 rounded-[2rem] border-none shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className=" text-xl font-bold text-slate-900">Cancel Appointment?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium">
              Are you sure you want to cancel this consultation? This action will notify the patient and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 mt-4">
            <AlertDialogCancel className="rounded-xl bg- border-slate-200 font-bold hover:bg-slate-50 ">Keep Appointment</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmCancel}
              className="rounded-xl bg-rose-500 hover:bg-rose-600 font-bold text-black shadow-lg shadow-rose-200"
            >
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DoctorAppointmentsPage;
