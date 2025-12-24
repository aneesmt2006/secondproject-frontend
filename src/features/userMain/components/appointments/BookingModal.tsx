import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { doctors, visitReasons } from '@/features/userMain/constants/appointments.data';
import { DoctorSlots } from "@/types/appointments.type";


interface BookingModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedDoctor: (typeof doctors)[0] | null;
  slots:DoctorSlots[]|undefined
  setSelectTime:(time:string)=>void,
  selectTime:string|null,
  onConfirm: () => void;
  loading?: boolean;
  isRecurring: boolean;
  setIsRecurring: (value: boolean) => void;
}


export const BookingModal = ({ 
  isModalOpen, 
  setIsModalOpen, 
  selectedDoctor, 
  slots, 
  selectTime, 
  setSelectTime, 
  onConfirm, 
  loading = false,
  isRecurring,
  setIsRecurring
}: BookingModalProps) => {
  return (
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AnimatePresence>
          {isModalOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" 
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                  <motion.div 
                    initial={{ opacity: 0, y: "100%", x: "-50%" }}
                    animate={{ opacity: 1, y: "-50%", x: "-50%" }}
                    exit={{ opacity: 0, y: "100%", x: "-50%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
                    className="fixed top-[50%] left-[50%] w-[90vw] md:w-[90vw] max-w-md bg-white rounded-[2rem] p-0 shadow-2xl z-50 border border-white/50 outline-none flex flex-col max-h-[80vh] overflow-hidden"
                  >
                    {selectedDoctor && (
                      <>
                        {/* Fixed Header */}
                        <div className="p-6 pb-4 shrink-0 border-b border-gray-50">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md shrink-0">
                              <img
                                src={selectedDoctor.image}
                                alt={'image'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">
                                Dr.{selectedDoctor.fullName}
                              </h2>
                              <p className="text-sm text-[hsl(var(--primary))] font-medium">
                                {selectedDoctor.specialty}
                              </p>
                              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                {selectedDoctor.clinicName}
                              </p>
                            </div>
                            <Dialog.Close className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                              <span className="sr-only">Close</span>
                              <svg
                                className="w-4 h-4 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </Dialog.Close>
                          </div>
                        </div>

                        {/* Scrollable Content */}
                        <div 
                          className="flex-1 overflow-y-auto px-6 py-2 space-y-6 relative min-h-0"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                           <style>{`
                              div::-webkit-scrollbar {
                                display: none;
                              }
                            `}</style>
                          
                          {/* Time Slots */}
                          <div>
                            <label className="text-xs font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3 block pt-2">
                              Select Time Slot
                            </label>
                          {slots && slots.length > 0 && !slots.every(s=>s.status.toLowerCase().includes('past')) ? (
                            <div className="grid grid-cols-3 gap-3">
                              {slots.map((slot, i) => {
                                const isPast = slot.status.toLowerCase().includes('past');
                                const isBooked = slot.status.toLowerCase().includes('booked');
                                const isDisabled = isPast || isBooked;

                                return (
                                  <button
                                    key={i}
                                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                                      isPast 
                                        ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed" 
                                        : isBooked 
                                          ? "bg-red-50 text-red-400 border-red-100 cursor-not-allowed"
                                          : selectTime === slot.time 
                                            ? "bg-[#E0825C] text-white border-[#E0825C] shadow-md"
                                            : "bg-white border-gray-200 text-gray-600 hover:border-[#E0825C] hover:text-[#E0825C]"
                                    }`}
                                    disabled={isDisabled}
                                    onClick={()=>setSelectTime(slot.time)}
                                  >
                                    {slot.time.split(',')[1] }
                                  </button>
                                )
                              })}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                              <p className="text-sm font-medium text-gray-500">No available slots</p>
                              <p className="text-xs text-gray-400 mt-1">Please check another date</p>
                            </div>
                          )}
                        </div>

                          {/* Recurring Appointment Option */}
                          <div className="pb-8">
                            <div 
                              onClick={() => setIsRecurring(!isRecurring)}
                              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                                isRecurring 
                                  ? "bg-orange-50 border-orange-200 shadow-sm" 
                                  : "bg-gray-50/50 border-gray-100 hover:border-gray-200"
                              }`}
                            >
                              <div className="flex gap-3 items-center">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                  isRecurring ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-400"
                                }`}>
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-sm font-bold text-gray-800">Recurring Appointment</p>
                                  <p className="text-[10px] text-gray-500 font-medium">Schedule this visit periodically</p>
                                </div>
                              </div>
                              <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${isRecurring ? "bg-orange-500" : "bg-gray-300"}`}>
                                <motion.div 
                                  animate={{ x: isRecurring ? 24 : 0 }}
                                  className="w-4 h-4 bg-white rounded-full shadow-sm" 
                                />
                              </div>
                            </div>
                          </div>
                          {/* Visit Reason */}
                          <div className="pb-4">
                            <label className="text-xs font-bold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3 block">
                              Visit Reason (Optional)
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {visitReasons.map((reason) => (
                                <button
                                  key={reason}
                                  className="px-4 py-2 rounded-full text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                  {reason}
                                </button>
                              ))}
                            </div>
                          </div>

                          
                        </div>

                         {/* Scroll Indicator */}
                         <div className="absolute bottom-[90px] left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none flex items-end justify-center pb-1">
                            <ChevronDown className="w-5 h-5 text-gray-400 animate-bounce" />
                         </div>

                        {/* Fixed Footer */}
                        <div className="p-6 pt-4 shrink-0 border-t border-gray-50 bg-white z-20">
                          <button
                          // setIsModalOpen(false)
                            onClick={onConfirm}
                            disabled={!selectTime || loading}
                            className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                              selectTime && !loading
                                ? "bg-[#E0825C] text-white shadow-[#E0825C]/20 hover:bg-[#d07550]" 
                                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                            }`}
                          >
                            {loading ? (
                              <>
                                <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                <span>Processing...</span>
                              </>
                            ) : (
                              "Confirm Appointment"
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
  );
};
