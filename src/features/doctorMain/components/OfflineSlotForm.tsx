// import { useState } from "react";
import { Label } from "../../shared/components/label";
import { Input } from "../../shared/components/input";
import { Button } from "../../shared/components/button";
import { Checkbox } from "../../shared/components/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../shared/components/select";
import { Popover, PopoverContent, PopoverTrigger } from "../../shared/components/popover";
import { Calendar as CalendarComponent } from "../../shared/components/calendar";
import { Calendar, Clock } from "lucide-react";

interface OfflineSlotFormProps {
  offlineUnavailableDates: Date[];
  setOfflineUnavailableDates: (dates: Date[]) => void;
}

const OfflineSlotForm = ({
  offlineUnavailableDates,
  setOfflineUnavailableDates,
}: OfflineSlotFormProps) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handlePreviewSlots = () => {
    alert("Preview offline slots - Feature to be implemented");
  };

  const handleSaveRules = () => {
    alert("Offline rules saved successfully!");
  };

  return (
    <div className="glass-card rounded-3xl p-6 lg:p-8 space-y-6">
      <h2 className="text-xl font-bold text-foreground mb-2">Offline Consultation Slot Rules</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Configure rules for in-person clinic appointments
      </p>

      {/* Working Days */}
      <div className="space-y-3">
        <Label>Working Days</Label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {weekDays.map((day) => (
            <div key={day} className="flex items-center gap-2">
              <Checkbox id={`offline-${day}`} />
              <Label htmlFor={`offline-${day}`} className="cursor-pointer text-sm font-normal">
                {day}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clinic Hours */}
      <div className="space-y-3">
        <Label>Clinic Hours</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TimeField id="offline-from" label="From" defaultValue="10:00" />
          <TimeField id="offline-to" label="To" defaultValue="18:00" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="offline-duration">Slot Duration</Label>
          <Select defaultValue="20">
            <SelectTrigger id="offline-duration" className="glass-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="20">20 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="offline-max">Max Patients Per Day</Label>
          <Input id="offline-max" type="number" placeholder="30" className="glass-card" />
        </div>
      </div>

      {/* Holidays / Leave Dates */}
      <div className="space-y-2">
        <Label>Holidays / Leave Dates</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="glass-card w-full justify-start text-left font-normal">
              <Calendar className="mr-2 h-4 w-4" />
              {offlineUnavailableDates.length > 0
                ? `${offlineUnavailableDates.length} date(s) selected`
                : "Select holidays/leave dates"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="multiple"
              selected={offlineUnavailableDates}
              onSelect={(dates) => setOfflineUnavailableDates(dates || [])}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Validity Period */}
      <div className="space-y-3">
        <Label>Validity Period</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DateField id="offline-valid-from" label="From" />
          <DateField id="offline-valid-to" label="To" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={handlePreviewSlots}
          className="glass-card rounded-xl flex-1"
        >
          <Clock className="w-4 h-4 mr-2" />
          Preview Slots
        </Button>
        <Button onClick={handleSaveRules} className="rounded-xl flex-1">
          Save Rules
        </Button>
      </div>
    </div>
  );
};

// Reusable sub-fields
const TimeField = ({ id, label, defaultValue }: { id: string; label: string; defaultValue: string }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-normal text-muted-foreground">{label}</Label>
    <Input id={id} type="time" defaultValue={defaultValue} className="glass-card !text-black placeholder:!text-gray-400" />
  </div>
);

const DateField = ({ id, label }: { id: string; label: string }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-normal   !text-black placeholder:!text-gray-400">{label}</Label>
    <Input id={id} type="date" className="glass-card" />
  </div>
);

export default OfflineSlotForm;
