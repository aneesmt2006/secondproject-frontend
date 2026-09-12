import { CalendarX2 } from "lucide-react";

interface EmptyAppointmentsProps {
  status: string;
}

export const EmptyAppointments = ({ status }: EmptyAppointmentsProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="bg-primary/5 p-8 rounded-full mb-6 animate-bounce-slow">
        <CalendarX2 className="w-16 h-16 text-primary/20" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">No appointments found</h3>
      <p className="text-muted-foreground max-w-xs">
        There are no {status.toLowerCase()} appointments at this time.
      </p>
    </div>
  );
};
