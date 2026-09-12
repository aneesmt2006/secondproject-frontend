import { motion } from 'framer-motion';

interface WeekCalendarProps {
  currentDate: Date;
  onDateSelect?: (date: Date) => void;
}

export const WeekCalendar = ({ currentDate, onDateSelect }: WeekCalendarProps) => {
  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    
    // Set to Sunday of this week
    startOfWeek.setDate(startOfWeek.getDate() - day);
    
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      week.push(weekDate);
    }
    return week;
  };

  const weekDates = getWeekDates(currentDate);
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="flex justify-center gap-2 md:gap-4">
      {weekDates.map((date, index) => {
        const isToday = date.toDateString() === currentDate.toDateString();
        return (
          <motion.button
            key={date.toISOString()}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDateSelect?.(date)}
            className="flex flex-col items-center gap-1 min-w-[40px] md:min-w-[50px]"
          >
            <span className="text-xs text-muted-foreground font-medium">
              {dayLabels[index]}
            </span>
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-smooth ${
              isToday 
                ? 'bg-white shadow-card' 
                : 'hover:bg-white/50'
            }`}>
              <span className={`text-lg font-semibold ${
                isToday ? 'text-primary' : 'text-foreground/70'
              }`}>
                {date.getDate()}
              </span>
            </div>
            {isToday && (
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};
