import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Plus, 
  Calendar, 
  Clock, 
  Check,
  ChevronDown,
  Repeat
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AppointmentsDet, PreviewDate } from '@/types/appointments.type';
import { useCompleteAppointment } from '../hooks/useCompleteAppointment';

interface CompleteAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentsDet;
  completionState: ReturnType<typeof useCompleteAppointment>;
}

export const CompleteAppointmentModal = ({ 
  isOpen, 
  onClose, 
  appointment,
  completionState
}: CompleteAppointmentModalProps) => {
  const {
    isRecurring,
    setIsRecurring,
    repeatValue,
    setRepeatValue,
    repeatUnit,
    setRepeatUnit,
    totalVisits,
    setTotalVisits,
    selectedTime,
    setSelectedTime,
    notes,
    setNotes,
    previewDates,
    handleSubmit
  } = completionState;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            className="relative w-full max-w-[440px] bg-white rounded-[1.8rem] shadow-2xl overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="relative p-6 pb-2 overflow-hidden">
              {/* Decorative Background Icon */}
              <div className="absolute top-[-15px] right-[-15px] w-32 h-32 text-slate-50 opacity-10 pointer-events-none transform rotate-12">
                <Plus className="w-full h-full stroke-[4]" />
              </div>

              <button 
                onClick={onClose}
                className="absolute top-5 right-5 p-1.5 hover:bg-slate-50 rounded-lg transition-all duration-300 z-20 group"
              >
                <X className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </button>

              <div className="flex items-center gap-4 relative z-10">
                <div className="relative">
                  <Avatar className="h-14 w-14 rounded-2xl ring-4 ring-slate-50 shadow-inner">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-600 font-bold text-lg">
                      {appointment.fullName?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-md border-2 border-white shadow-sm" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[20px] font-bold text-slate-900 tracking-tight leading-none">
                      {appointment.fullName}
                    </h2>
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-bold rounded uppercase tracking-[0.1em] border border-emerald-100/50">
                      Active
                    </span>
                  </div>
                  <p className="text-slate-400 font-bold text-[12px] mt-1 tracking-tight">
                    {appointment.reason || 'General Consultation'}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 pt-3 space-y-4">
              {/* Recurring & Time Consolidated Row */}
              <div className="flex gap-3">
                {/* Recurring Toggle Card */}
                <div className="flex-1 flex items-center justify-between p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className={`relative p-1.5 rounded-lg ${isRecurring ? 'bg-primary/10 text-primary' : 'bg-slate-200/50 text-slate-400'} transition-colors`}>
                      <Calendar className="w-4 h-4" />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center border-2 border-white ${isRecurring ? 'bg-primary text-white' : 'bg-slate-400 text-white'}`}>
                        <Repeat className="w-1.5 h-1.5" strokeWidth={3.5} />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-slate-700 tracking-tight leading-none">Recurring</h4>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsRecurring(!isRecurring)}
                    className={`relative w-9 h-4.5 rounded-full p-0.5 transition-colors duration-300 focus:outline-none ${isRecurring ? 'bg-primary' : 'bg-slate-300'}`}
                  >
                    <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform duration-300 ${isRecurring ? 'translate-x-4.5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* Time Card */}
                <div className="flex-1 p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-2.5">
                  <div className="p-1.5 bg-slate-200/50 rounded-lg text-slate-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    placeholder="3:00 PM"
                    className="w-full bg-transparent font-bold text-slate-900 border-none p-0 focus:ring-0 text-[11px] placeholder:text-slate-300"
                  />
                </div>
              </div>

              <AnimatePresence>
                {isRecurring && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden space-y-3"
                  >
                    {/* Repeat & Visits Controls */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">
                          Repeat Every
                        </label>
                        <div className="flex gap-1.5">
                          <input 
                            type="number" 
                            min="1"
                            value={repeatValue}
                            onChange={(e) => setRepeatValue(Math.max(1, Number(e.target.value)))}
                            className="w-10 h-9 bg-white border border-slate-200 rounded-lg text-center font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-[10px]"
                          />
                          <div className="relative flex-1">
                            <select 
                              value={repeatUnit}
                              onChange={(e) => setRepeatUnit(e.target.value)}
                              className="w-full h-9 bg-white border border-slate-200 rounded-lg px-2 font-bold text-slate-900 appearance-none focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer text-[10px]"
                            >
                              <option>Weeks</option>
                              <option>Months</option>
                              <option>Years</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">
                          Total Visits
                        </label>
                        <div className="relative">
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px]">#</span>
                          <input 
                            type="number" 
                            min="1"
                            value={totalVisits}
                            onChange={(e) => setTotalVisits(Math.max(1, Number(e.target.value)))}
                            className="w-full h-9 bg-white border border-slate-200 rounded-lg pl-6 pr-2 font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all text-[10px]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Schedule Preview */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 px-0.5">
                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                          Schedule Preview
                        </label>
                      </div>
                      
                      <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-2.5 max-h-[100px] overflow-y-auto scrollbar-hide space-y-1">
                        {previewDates.map((item: PreviewDate) => (
                          <motion.div 
                            key={item.id} 
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: item.id * 0.04 }}
                            className="flex items-center justify-between p-1.5 bg-white rounded-lg border border-slate-200/60 shadow-sm transition-all hover:border-primary/30 group/item"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded-md bg-slate-50 flex items-center justify-center text-[7px] font-bold text-slate-400 border border-slate-100 group-hover/item:text-primary transition-colors">
                                #{item.id}
                              </span>
                              <span className="text-[10px] font-bold text-slate-700 tracking-tight">{item.display}</span>
                            </div>
                            <span className="px-1 py-0.5 bg-blue-50 text-blue-600 text-[7px] font-bold rounded border border-blue-100/50 uppercase tracking-wider">
                              Scheduled
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Medical Notes */}
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  Medical Notes & Feedback
                </label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Everythign is fine"
                  className="w-full h-20 bg-white border border-slate-200 rounded-2xl p-4 text-[11px] font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 resize-none placeholder:text-slate-300 transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3">
              <Button 
                variant="outline"
                onClick={onClose}
                className="flex-[0.6] h-10 border-slate-100 bg-white hover:bg-slate-50 text-slate-500 rounded-xl font-bold text-xs transition-all active:scale-[0.98] shadow-sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1 h-10 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-xl font-bold text-xs shadow-xl shadow-blue-500/30 transition-all active:scale-[0.98]"
              >
                <Check className="w-4 h-4 mr-2" />
                Complete
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
