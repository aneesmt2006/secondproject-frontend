import { Activity, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatContact } from "@/components/chat/types";

interface DoctorPatientCardProps {
  patient: ChatContact;
  onClick: (patientId: string) => void;
}

export const DoctorPatientCard = ({ patient, onClick }: DoctorPatientCardProps) => {
  return (
    <div
      onClick={() => onClick(patient.id)}
      className="bg-white p-5 rounded-[1.8rem] border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group flex flex-col gap-4"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14 rounded-2xl ring-4 ring-slate-50 shadow-inner">
          <AvatarImage src={patient.avatarUrl} alt={patient.name} className="object-cover" />
          <AvatarFallback className="bg-gradient-to-br from-primary/10 to-indigo-50 text-primary font-bold rounded-2xl text-lg">
            {patient.name?.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <h3 className="text-[15px] font-bold text-slate-900 truncate tracking-tight group-hover:text-primary transition-colors">
            {patient.name}
          </h3>
          <p className="text-[11px] font-bold text-slate-400 mt-1 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            View Medical Record
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-dashed border-slate-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Patient ID: {patient.id.substring(patient.id.length - 6).toUpperCase()}
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </div>
  );
};
