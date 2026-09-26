import { motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  User,
  MessageCircle,
} from "lucide-react";
import { LogSymptomsDialog } from "./LogSymptomsDialog";
import { BottomTabBar } from "./BottomTabBar";
import { DesktopNavbar } from "./DesktopNavbar";
import { WeekCalendar } from "./WeekCalendar";
import { CalendarDialog } from "./CalendarDialog";
import { ChatbotButton } from "./ChatbotButton";
import { Link } from "react-router-dom";
import { NotificationButton } from "./NotificationButton";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePregnancyDashboard } from "../hooks/usePregnancyDashboard";
import { formatDate } from "../../../utils/pregnancyUtils";
import FetusVisualSection from "./dashboard-sections/FetusVisualSection";
import DailyInsightsSection from "./dashboard-sections/DailyInsightsSection";
import QuickActionsSection from "./dashboard-sections/QuickActionsSection";

export const PregnancyDashboard = () => {
  const {
    currentDate,
    setCurrentDate,
    calendarOpen,
    setCalendarOpen,
    logSymptomsOpen,
    setLogSymptomsOpen,
    direction,
    fetusWeekData,
    lmp,
    hasLmp,
    currentWeek,
    currentDay,
    dueDate,
    handlePrevDate,
    handleNextDate,
    goToToday,
    laoding,
  } = usePregnancyDashboard();

  return (
    <div className="min-h-screen bg-patient-theme text-[color:var(--foreground)] relative overflow-hidden transition-colors duration-500">
      {/* Wave Background */}
      <div className="absolute inset-0 z-0">
        <div className="bg-patient-theme min-h-screen transition-colors duration-500" />
        <svg
          className="absolute left-0 w-full h-32 md:h-40"
          style={{ top: "calc(100vh - 220px)" }}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="var(--patient-surface)"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,112C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <div
          className="absolute left-0 w-full transition-colors duration-500"
          style={{ top: "calc(100vh - 100px)", height: "200vh", backgroundColor: "var(--patient-surface)" }}
        />
      </div>

      <DesktopNavbar />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 pb-0 pt-6 md:pt-28"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div id="tour-profile" className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-card">
              <Link to="/profile">
                <User className="w-5 h-5 text-patient-primary transition-colors" />
              </Link>
            </div>
            <div id="tour-notifications">
              <NotificationButton />
            </div>
            <div id="tour-theme" className="md:hidden">
              <ThemeSwitcher />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentDate.toDateString() !== new Date().toDateString() && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={goToToday}
                className="px-4 py-2 rounded-full bg-[color:var(--background)] text-[color:var(--foreground)] shadow-card text-sm font-semibold transition-colors"
              >
                Today
              </motion.button>
            )}
            <Link to="/dashboard/chat" id="tour-chat" className="hidden md:block">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-card flex items-center justify-center"
              >
                <div className="relative">
                  <MessageCircle className="w-5 h-5 text-patient-primary" />
                  <span className="absolute -top-1.5 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-patient-primary border-2 border-white text-[8px] font-bold text-white transition-colors">
                    1
                  </span>
                </div>
              </motion.button>
            </Link>

            <motion.button
              id="tour-calendar"
              whileTap={{ scale: 0.9 }}
              onClick={() => setCalendarOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-card"
            >
              <Calendar className="w-5 h-5 text-patient-primary" />
              <span className="text-sm font-semibold text-[color:var(--foreground)] hidden md:inline transition-colors">
                {formatDate(currentDate)}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Week Calendar with Navigation */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePrevDate}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-card"
            >
              <ChevronLeft className="w-5 h-5 text-patient-primary transition-colors" />
            </motion.button>

            <div className="text-center">
              <p className="text-base md:text-lg font-semibold text-[color:var(--foreground)] mb-1 transition-colors">
                {formatDate(currentDate)}
              </p>
              {lmp && (
                <p className="text-xs text-muted-foreground">
                  Estimated Due Date: {formatDate(dueDate)}
                </p>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleNextDate}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-card"
            >
              <ChevronRight className="w-5 h-5 text-patient-primary transition-colors" />
            </motion.button>
          </div>

          <WeekCalendar
            currentDate={currentDate}
            onDateSelect={setCurrentDate}
          />
        </div>

        <FetusVisualSection
          currentDate={currentDate}
          direction={direction}
          hasLmp={hasLmp}
          currentWeek={currentWeek}
          currentDay={currentDay}
          fetusWeekData={fetusWeekData}
          laoding={laoding}
        />
      </motion.div>

      <DailyInsightsSection
        currentDate={currentDate}
        currentWeek={currentWeek}
        hasLmp={hasLmp}
        lmp={lmp}
      />

      {/* <QuickActionsSection hasLmp={hasLmp} /> */}
      <div className="h-28 md:h-4" /> {/* Spacer for mobile so the bottom tab bar doesn't overlap the Insights section */}

      {/* Bottom Tab Bar */}
      <BottomTabBar />

      {/* Chatbot Button */}
      <ChatbotButton />

      {/* Calendar Dialog */}
      <CalendarDialog
        open={calendarOpen}
        onOpenChange={setCalendarOpen}
        selectedDate={currentDate}
        onDateSelect={setCurrentDate}
      />

      {/* Log Symptoms Dialog */}
      <LogSymptomsDialog
        open={logSymptomsOpen}
        onOpenChange={setLogSymptomsOpen}
      />

      {/* Custom scrollbar hide */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

