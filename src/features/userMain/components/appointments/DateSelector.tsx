import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface DateSelectorProps {
  viewStartDate: Date;
  setViewStartDate: (date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (open: boolean) => void;
  visibleDates: Date[];
  handleNextDatePage: () => void;
  handlePrevDatePage: () => void;
}

export const DateSelector = ({
  viewStartDate,
  setViewStartDate,
  selectedDate,
  setSelectedDate,
  isCalendarOpen,
  setIsCalendarOpen,
  visibleDates,
  handleNextDatePage,
  handlePrevDatePage,
}: DateSelectorProps) => {
  return (
    <div className="relative w-full md:w-1/2 flex flex-col gap-2">
    
    {/* Month Selector Header */}
    <div className="flex items-center gap-3 pl-2 mb-1">
      <span className="text-[10px] uppercase tracking-widest font-bold text-[#9CA3AF] hidden xs:block">
        Choose Month
      </span>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <button className="flex items-center gap-2 text-[#5A3A2E] hover:text-[#E0825C] transition-colors font-bold text-sm md:text-base bg-white/40 px-3 py-1.5 rounded-full border border-white/40 backdrop-blur-md">
            <CalendarIcon className="w-4 h-4 text-[#E0825C]" />
            {format(viewStartDate, "MMMM yyyy")}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setViewStartDate(date);
                setIsCalendarOpen(false); // Close instantly
              }
            }}
            initialFocus
            classNames={{
              day_selected: "bg-[#E0825C] text-white hover:bg-[#cc7254] hover:text-white focus:bg-[#E0825C] focus:text-white",
              day_today: "bg-orange-50 text-[#E0825C] font-bold",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>

    {/* Date Buttons Container */}
    <div className="relative flex items-center backdrop-blur-xl py-3 rounded-3xl w-full">
      {/* Left Arrow */}
      <button
        onClick={handlePrevDatePage}
        className="absolute left-0 z-30 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md 
        shadow-sm flex items-center justify-center text-[#5A3A2E] hover:bg-white border border-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Actual Date Scroller */}
      <div className="flex-1 overflow-hidden px-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={viewStartDate.toISOString()}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex justify-between gap-1"
          >
            {visibleDates.map((date) => {
              const active = isSameDay(date, selectedDate);
              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`font-nunito flex flex-col justify-center items-center
                    flex-1 h-[4.5rem] rounded-2xl border backdrop-blur-xl
                    transition-all duration-200
                    ${active
                      ? "bg-[#E0825C] text-white border-[#E0825C]/30 shadow-[0_8px_20px_rgba(224,130,92,0.3)] scale-[1.05]"
                      : "bg-white/50 text-[#5A3A2E] border-white/40 hover:bg-white/70"
                    }`}
                >
                  <span className={`text-[10px] md:text-[12px] uppercase ${active ? "opacity-90" : "opacity-60"}`}>
                    {format(date, "EEE")}
                  </span>
                  <span className="text-[14px] md:text-[16px] font-extrabold">{format(date, "d")}</span>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNextDatePage}
        className="absolute right-0 z-30 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md 
        shadow-sm flex items-center justify-center text-[#5A3A2E] hover:bg-white border border-gray-100"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  </div>
  );
};
