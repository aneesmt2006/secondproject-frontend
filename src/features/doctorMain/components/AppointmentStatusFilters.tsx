import { 
  History, 
  XCircle, 
  AlertTriangle, 
  Dot
} from "lucide-react";
import { AppointmentStatus } from "../hooks/useDoctorAppointments";

interface AppointmentStatusFiltersProps {
  activeFilter: AppointmentStatus;
  onFilterChange: (status: AppointmentStatus) => void;
  counts: Record<AppointmentStatus, number>;
}

const filters: { label: AppointmentStatus; icon: any; color: string }[] = [
  { label: 'Upcoming', icon: Dot, color: 'text-medical-success' },
  { label: 'Completed', icon: History, color: 'text-primary' },
  { label: 'Canceled', icon: XCircle, color: 'text-destructive' },
  { label: 'Emergency', icon: AlertTriangle, color: 'text-medical-warning' },
];

export const AppointmentStatusFilters = ({ activeFilter, onFilterChange, counts }: AppointmentStatusFiltersProps) => {
  return (
    <div className="flex items-center justify-between overflow-x-auto pb-4 scrollbar-hide md:overflow-visible">
      <div className="flex items-center gap-1.5 p-1.5 bg-white/50 backdrop-blur-xl rounded-full border border-white/60 shadow-lg">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.label;
          const Icon = filter.icon;
          const count = counts[filter.label];

          return (
            <button
              key={filter.label}
              onClick={() => onFilterChange(filter.label)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap
                ${isActive 
                  ? 'bg-primary text-white shadow-md scale-[1.05]' 
                  : 'text-muted-foreground hover:bg-white/80 hover:text-foreground'
                }
              `}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'animate-pulse' : ''} ${isActive ? 'text-white' : filter.color}`} />
              {filter.label}
              {count > 0 && (
                <span className={`
                  ml-1 px-1.5 py-0.5 rounded-full text-[10px] 
                  ${isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'}
                `}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
