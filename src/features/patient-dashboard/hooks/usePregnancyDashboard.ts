import { useState, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../patient-auth/slice/userSlice";
import { getFetusWeekData } from "../../../services/api/users-management.service";
import { fetusForm } from "../../admin-dashboard/types";
import { calculatePregnancyWeek } from "../../../utils/pregnancyUtils";

export const usePregnancyDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [logSymptomsOpen, setLogSymptomsOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [fetusWeekData, setFetusWeekData] = useState<fetusForm>();
  const [laoding,setLoading] = useState(true)
  const { lmp } = useAppSelector(userSelector);

  const hasLmp = !!(lmp && lmp.trim() !== "");
  
  const { week: currentWeek, day: currentDay, dueDate } = hasLmp 
    ? calculatePregnancyWeek(currentDate, lmp!) 
    : { week: 0, day: 0, dueDate: new Date() };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentDate]);

  useEffect(() => {
    if (!hasLmp) return;

    const fetchWeekData = async () => {
      try {
        const response = await getFetusWeekData(currentWeek);
        setFetusWeekData(response.data);
      } catch (err) {
      }finally{
        setLoading(false)
      }
    };

    fetchWeekData();
  }, [currentWeek, hasLmp]);

  const handlePrevDate = () => {
    setDirection(-1);
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDate = () => {
    setDirection(1);
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setDirection(today > currentDate ? 1 : -1);
    setCurrentDate(today);
  };

  const handleDateSelect = (date: Date) => {
    // Compare day-only (strip time) to determine correct slide direction
    const newDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const curDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    if (newDay.getTime() === curDay.getTime()) return; // same day, no animation needed
    setDirection(newDay > curDay ? 1 : -1);
    setCurrentDate(date);
  };

  return {
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
    handleDateSelect,
    goToToday,
    laoding
  };
};

