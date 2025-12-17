import { useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Plus, Trash2, Copy, Clock, Loader2, Calendar as CalendarIcon, X } from "lucide-react";
import { useSlotManagement } from "../hooks/useSlotManagement";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hour24 = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  const period = hour24 < 12 ? "AM" : "PM";
  const hour12 = hour24 % 12 || 12; 
  return `${hour12.toString().padStart(2, "0")}:${minute} ${period}`;
});

interface OnlineSlotFormProps {
  unavailableDates: Date[];
  setUnavailableDates: (dates: Date[]) => void;
}

const OnlineSlotForm = ({ unavailableDates, setUnavailableDates }: OnlineSlotFormProps) => {
  const {
    schedule,
    slotDuration,
    setSlotDuration,
    loading,
    toggleDay,
    updateTime,
    addBreak,
    removeBreak,
    updateBreak,
    copyToAllDays,
    saveSlotSettings,
    notAvailableDates,
    isFetching,
  } = useSlotManagement();

  const hasSyncedRef = useRef(false);
 
  useEffect(() => {
    if (!hasSyncedRef.current && notAvailableDates && notAvailableDates.length > 0) {
      setUnavailableDates(notAvailableDates.map((date) => new Date(date)));
      hasSyncedRef.current = true;
    }
  }, [notAvailableDates, setUnavailableDates]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Work hours</h2>
          <p className="text-gray-500 mt-1">Configure your weekly availability and breaks</p>
        </div>
        <Button 
          onClick={() => saveSlotSettings(unavailableDates)} 
          disabled={loading || isFetching}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8"
        >
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          Save Changes
        </Button>
      </div>
      
      {isFetching ? (
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-sm border border-white/20 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
               <Clock className="w-5 h-5 text-blue-600" />
               <Label className="text-base font-medium text-gray-900">Slot Duration</Label>
            </div>
            <Select value={slotDuration} onValueChange={setSlotDuration}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white border-gray-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-sm border border-white/20">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <Label className="text-base font-medium text-gray-900">Leave Dates</Label>
                    <p className="text-sm text-gray-500">Select dates when you are unavailable</p>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full sm:w-[240px] justify-start text-left font-normal bg-white border-gray-200",
                        !unavailableDates?.length && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Add leave dates</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="multiple"
                      selected={unavailableDates}
                      onSelect={(dates) => setUnavailableDates(dates || [])}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {unavailableDates && unavailableDates.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {unavailableDates.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm border border-red-100 animate-in fade-in zoom-in duration-200"
                    >
                      <span>{format(date, "PPP")}</span>
                      <button
                        onClick={() => {
                          const newDates = unavailableDates.filter((_, i) => i !== index);
                          setUnavailableDates(newDates);
                        }}
                        className="hover:bg-red-100 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8 bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-sm border border-white/20">
            {DAYS.map((day) => (
              <div key={day} className="group">
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  {/* Day Toggle & Name */}
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <Switch
                      checked={schedule[day].enabled}
                      onCheckedChange={() => toggleDay(day)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <Label className={`text-base font-medium ${schedule[day].enabled ? "text-gray-900" : "text-gray-400"}`}>
                      {day}
                    </Label>
                  </div>

                  {schedule[day].enabled ? (
                    <div className="flex-1 flex flex-col gap-4">
                      {/* Main Hours Row */}
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <TimeSelect
                            value={schedule[day].start}
                            onChange={(v) => updateTime(day, "start", v)}
                          />
                          <span className="text-gray-400">-</span>
                          <TimeSelect
                            value={schedule[day].end}
                            onChange={(v) => updateTime(day, "end", v)}
                          />
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToAllDays(day)}
                          className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors ml-auto md:ml-0"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy for all days
                        </Button>
                      </div>

                      {/* Breaks Section */}
                      <div className="space-y-3 pl-0 md:pl-4 border-l-2 border-gray-100 ml-2 md:ml-0">
                        {schedule[day].breaks?.map((breakItem, index) => (
                          <div key={index} className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-top-2">
                            <span className="text-sm text-gray-500 w-16">Break {index + 1}</span>
                            <div className="flex items-center gap-2">
                              <TimeSelect
                                value={breakItem?.start}
                                onChange={(v) => updateBreak(day, index, "start", v)}
                              />
                              <span className="text-gray-400">-</span>
                              <TimeSelect
                                value={breakItem?.end}
                                onChange={(v) => updateBreak(day, index, "end", v)}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeBreak(day, index)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 px-2"
                            >
                              <Trash2 className="w-4 h-4 mr-1.5" />
                              Remove break
                            </Button>
                          </div>
                        ))}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addBreak(day)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 w-fit h-8 px-2 -ml-2"
                        >
                          <Plus className="w-4 h-4 mr-1.5" />
                          Add a break
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 italic">Unavailable</div>
                  )}
                </div>
                {day !== "Sunday" && <div className="h-px bg-gray-100 mt-8" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TimeSelect = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-[120px] bg-white border-gray-200 focus:ring-blue-500/20">
      <SelectValue />
    </SelectTrigger>
    <SelectContent className="max-h-[200px]">
      {TIME_OPTIONS.map((time) => (
        <SelectItem key={time} value={time}>
          {time}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default OnlineSlotForm;
