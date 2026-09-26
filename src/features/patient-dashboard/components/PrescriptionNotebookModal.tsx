import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { UserAppointment } from "@/types/appointments.type";
import { MedicalPrescription } from "@/types/medical.overview.type";
import { FileText, Calendar, Clock, X } from "lucide-react";

interface PrescriptionNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: UserAppointment | null;
  prescription: MedicalPrescription | null;
  isLoading: boolean;
  variant?: "patient" | "doctor";
}

export const PrescriptionNotebookModal: React.FC<PrescriptionNotebookModalProps> = ({
  isOpen,
  onClose,
  appointment,
  prescription,
  isLoading,
  variant = "patient",
}) => {
  const isDoctor = variant === "doctor";

  // Preserve last valid data during exit animation so closing content doesn't snap away
  const appointmentRef = useRef(appointment);
  const prescriptionRef = useRef(prescription);

  if (appointment) appointmentRef.current = appointment;
  if (prescription) prescriptionRef.current = prescription;

  const currentAppointment = appointment || appointmentRef.current;
  const currentPrescription = prescription || prescriptionRef.current;

  // Lock body scroll smoothly without scrollbar jump
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  const doctorName = currentPrescription?.doctorName || currentAppointment?.doctorName || "Attending Physician";
  const dateStr = currentPrescription?.createdAt 
    ? new Date(currentPrescription.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : (currentAppointment?.appointmentDate || "Date N/A");
  const timeStr = currentAppointment?.appointmentTime || "";
  const reason = currentAppointment?.reason || "General Consultation";
  const notesText = currentPrescription?.content || currentAppointment?.notes || "No prescription notes logged for this consultation.";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

                    {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-2xl text-slate-800 overflow-visible shadow-2xl z-10 my-auto pointer-events-auto ${
              isDoctor ? "bg-white border-slate-200 rounded-3xl border" : "rounded-sm"
            }`}
          >
            {isDoctor ? (
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-200">
                {/* Header Ribbon */}
                <div className="px-6 py-4 flex items-center justify-between text-white bg-[#2563eb] shadow-md shadow-blue-500/20">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-white" />
                    <h2 className="text-base font-bold tracking-wide text-white">
                      Clinical Prescription Record
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Notebook / Sheet Body */}
                <div className="p-6 md:p-8 relative min-h-[420px] flex flex-col justify-between">
                  <div>
                    {/* Top Medical Clinic Header */}
                    <div className="flex justify-between items-start pb-6 border-b-2 border-dashed relative z-10 border-slate-200">
                      <div className="space-y-1">
                        <span className="text-4xl font-black italic tracking-tighter font-serif block text-primary">
                          Rx
                        </span>
                        <h3 className="text-lg font-extrabold leading-tight text-slate-900">
                          Dr. {doctorName}
                        </h3>
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">
                          {currentAppointment?.specialization || "Obstetrics & Gynecology"}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {currentAppointment?.hospitalName || "Tomome Women's Health Clinic"}
                        </p>
                      </div>

                      <div className="text-right space-y-1.5 p-3 rounded-2xl border shadow-2xs bg-slate-50/80 border-slate-200">
                        <div className="flex items-center justify-end gap-1.5 text-xs text-slate-600 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{dateStr}</span>
                        </div>
                        {timeStr && (
                          <div className="flex items-center justify-end gap-1.5 text-xs text-slate-600 font-medium">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            <span>{timeStr}</span>
                          </div>
                        )}
                        <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block border border-emerald-200/60">
                          Verified Prescription
                        </div>
                      </div>
                    </div>

                    {/* Patient & Consultation Meta */}
                    <div className="py-3.5 flex items-center justify-between gap-4 text-xs border-b relative z-10 border-slate-200">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-700">Reason:</span>
                        <span className="text-slate-600 font-medium">{reason}</span>
                      </div>
                    </div>

                    {/* Content Lines */}
                    <div className="py-6 relative z-10 pl-6 border-l-2 ml-2 min-h-[220px] border-primary/30">
                      <div className="text-xs font-extrabold uppercase tracking-widest block mb-4 text-slate-800">
                        Doctor Notes & Prescribed Medication
                      </div>

                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-10 space-y-3 min-h-[160px]">
                          <div className="w-8 h-8 border-3 rounded-full animate-spin border-primary/20 border-t-primary" />
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Loading Prescription...
                          </p>
                        </div>
                      ) : (
                        <div
                          className="text-sm font-medium text-slate-800 leading-[36px] whitespace-pre-wrap font-sans min-h-[180px]"
                          style={{
                            backgroundImage: "linear-gradient(to bottom, transparent 35px, rgba(226, 232, 240, 0.9) 35px, rgba(226, 232, 240, 0.9) 36px)",
                            backgroundSize: "100% 36px",
                          }}
                        >
                          {notesText}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notebook Footer / Digital Stamp */}
                  <div className="pt-5 mt-4 border-t flex items-center justify-between relative z-10 border-slate-200">
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Authorized Signature
                      </p>
                      <p className="text-sm font-serif italic font-bold text-slate-900">
                        {doctorName.includes('Dr') ? `${doctorName}` :  `Dr ${doctorName}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Realistic Spiral Notebook Patient View
              <div className="relative w-full min-h-[600px] flex flex-col bg-[#F9F9F9] border-[6px] border-[#656565] rounded-lg shadow-2xl pb-6 mt-6">
                
                {/* Spiral Binding Overlay */}
                <div className="absolute -top-[24px] left-0 w-full h-[36px] flex justify-evenly items-center z-30 px-6 pointer-events-none">
                  {[...Array(14)].map((_, i) => (
                    <div key={i} className="relative w-[18px] h-[48px]">
                      {/* Paper Hole */}
                      <div className="absolute top-[28px] left-[2px] w-[14px] h-[14px] rounded-full bg-[#1A1A1A] shadow-inner"></div>
                      {/* Metal Wire */}
                      <div className="absolute top-0 left-0 w-[16px] h-[40px] rounded-full bg-gradient-to-r from-[#D0D0D0] via-[#FFFFFF] to-[#808080] shadow-[1px_3px_5px_rgba(0,0,0,0.5)] border border-[#808080] transform -rotate-[15deg]"></div>
                    </div>
                  ))}
                </div>
                
                {/* Header Shadow (from spirals/cover) */}
                <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-black/20 to-transparent z-20 pointer-events-none"></div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 z-40 p-2 rounded-full hover:bg-black/5 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Left Margin Red Line */}
                <div className="absolute top-0 bottom-0 left-[22%] md:left-[16%] w-[1.5px] bg-[#FF7B7B] z-10 shadow-[1px_0_0_rgba(255,123,123,0.3)]"></div>

                {/* Lined Paper Background (Blue Horizontal Lines) */}
                <div 
                  className="absolute inset-0 pt-16 z-0" 
                  style={{
                    backgroundImage: "linear-gradient(to bottom, transparent 35px, #BCE0EF 35px, #BCE0EF 36px)",
                    backgroundSize: "100% 36px",
                    backgroundPositionY: "14px"
                  }}
                ></div>

                {/* Content Area */}
                <div className="relative z-20 pt-[80px] pl-[26%] md:pl-[19%] pr-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-white/40 p-2 -ml-2 rounded-lg backdrop-blur-xs">
                      <span className="text-[40px] font-black italic tracking-tighter font-serif text-[#333333] leading-none drop-shadow-sm">Rx</span>
                      <h3 className="text-lg font-extrabold text-[#111111] mt-1">Dr. {doctorName}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#555555]">{currentAppointment?.specialization || "General"}</p>
                    </div>
                    <div className="text-right font-medium font-mono text-[13px] text-[#555555] bg-white/40 px-3 py-1 rounded backdrop-blur-xs">
                      {dateStr}
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-3 min-h-[160px]">
                      <div className="w-8 h-8 border-3 rounded-full animate-spin border-patient-primary/20 border-t-patient-primary" />
                    </div>
                  ) : (
                    <div className="text-[#222222] font-semibold text-[15px] leading-[36px] whitespace-pre-wrap font-sans mt-[6px]">
                      {notesText}
                    </div>
                  )}

                  <div className="mt-16 flex justify-end pb-8">
                    <div className="text-center bg-white/30 p-2 rounded backdrop-blur-xs">
                      <div className="w-40 h-[1.5px] bg-[#666666] mb-2 rounded-full"></div>
                      <p className="text-[10px] font-black text-[#555555] uppercase tracking-widest">Sign / Stamp</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Paper Stack Layers */}
                <div className="absolute -bottom-[5px] left-0 w-full h-[5px] bg-[#EEEEEE] border-b-[2px] border-x-[2px] border-[#656565] rounded-b-lg shadow-[0_2px_4px_rgba(0,0,0,0.2)]"></div>
                <div className="absolute -bottom-[10px] left-0 w-full h-[5px] bg-[#DDDDDD] border-b-[3px] border-x-[2px] border-[#656565] rounded-b-xl shadow-[0_4px_8px_rgba(0,0,0,0.3)]"></div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
