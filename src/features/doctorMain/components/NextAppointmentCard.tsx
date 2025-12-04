import { Calendar, Clock } from "lucide-react";
import { Button } from "../../shared/components/button";

export const NextAppointmentCard = () => {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-base font-bold text-foreground mb-4">Next Appointment</h3>
      
      <div className="flex items-start gap-3">
        <div className="p-3 rounded-xl bg-primary/10">
          <Calendar className="w-5 h-5 text-primary" />
        </div>
        
        <div className="flex-1">
          <p className="font-semibold text-foreground mb-1">John Peterson</p>
          <p className="text-xs text-muted-foreground mb-2">Follow-up Consultation</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Today, 2:30 PM</span>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full mt-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl h-9 text-xs font-medium"
        variant="ghost"
      >
        View Full Schedule →
      </Button>
    </div>
  );
};
