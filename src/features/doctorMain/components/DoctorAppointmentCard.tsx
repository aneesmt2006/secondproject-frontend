import { 
  Video, 
  CheckCircle2, 
  XCircle, 
  Activity,
  MapPin,
  MessageSquare,
  Clock
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AppointmentsDet } from "@/types/appointments.type";

interface DoctorAppointmentCardProps {
  appointment: AppointmentsDet;
  onComplete?: () => void;
}

export const DoctorAppointmentCard = ({ appointment, onComplete }: DoctorAppointmentCardProps) => {
  const isOnline = appointment.consultationStatus === 'Online';
  
  return (
    <div className="bg-white rounded-[1.8rem] overflow-hidden flex flex-col h-full border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      {/* Top Accent Bar */}
      <div className={`h-2.5 w-full ${isOnline ? 'bg-[#0F172A]' : 'bg-primary'}`} />
      
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Header: Time & Type */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-slate-900 leading-none tracking-tighter">
                {appointment.appoinmentTime?.split(' ')[0]}
              </span>
              <span className="text-base font-bold text-slate-500 uppercase tracking-tight">
                {appointment.appoinmentTime?.split(' ')[1]}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Clock className="w-3 h-3 text-slate-900" strokeWidth={3} />
              <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                {appointment.appoinmentDate || 'TODAY'}
              </span>
            </div>
          </div>

          <div className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 border-2 ${
            isOnline 
              ? 'bg-slate-50 text-slate-900 border-slate-200' 
              : 'bg-indigo-50 text-indigo-700 border-indigo-100'
          }`}>
            {isOnline ? (
              <Video className="w-3 h-3" />
            ) : (
              <MapPin className="w-3 h-3" />
            )}
            {isOnline ? 'Online' : 'In-Person'}
          </div>
        </div>

        {/* Patient Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 rounded-xl ring-4 ring-slate-50 shadow-inner">
              <AvatarImage src={''} alt={appointment?.fullName} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-700 font-bold rounded-xl text-base">
                {appointment.fullName?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-[2.5px] border-white shadow-sm"></span>
          </div>

          <div className="flex flex-col min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate tracking-tight leading-tight group-hover:text-primary transition-colors">
              {appointment.fullName}
            </h3>
            <p className="text-[11px] font-bold text-slate-500 mt-0.5">
              {appointment.age} Yrs <span className="mx-1 opacity-20">•</span> {appointment.week ? `Week ${appointment.week}` : 'Routine'}
            </p>
          </div>
        </div>

        {/* Notes Section - more compact */}
        <div className="pt-3 border-t border-dashed border-slate-200 flex-1">
          <p className="text-[11px] text-slate-600 font-bold leading-relaxed line-clamp-1 italic">
            <Activity className="w-3 h-3 inline mr-1 text-slate-400" />
            {appointment.reason || "General Consultation Check-up"}
          </p>
        </div>

        {/* Actions Row */}
        <div className="mt-1 space-y-2">
          {/* Main Actions */}
          <div className="flex flex-col gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-[0.9rem] h-11 text-[12px] font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
              <Video className="w-4 h-4 mr-2" />
              Start Video Call
            </Button>
            <Button variant="outline" className="border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-[0.9rem] h-11 text-[12px] font-bold transition-all active:scale-[0.98] shadow-sm">
              <MessageSquare className="w-4 h-4 mr-2 text-primary" />
              Chat Now
            </Button>
          </div>

          {/* Status Actions - Minimalist pills */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onComplete}
              className="flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 bg-slate-50/80 text-slate-500 hover:bg-emerald-100 hover:text-emerald-600 transition-all text-[10px] font-bold group/btn"
            >
              <CheckCircle2 className="w-3 h-3 opacity-60 group-hover/btn:opacity-100" />
              Complete
            </button>
            
            <button className="flex-1 py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 bg-slate-50/80 text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-all text-[10px] font-bold group/btn">
              <XCircle className="w-3 h-3 opacity-60 group-hover/btn:opacity-100" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
