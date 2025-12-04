import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSlot, upsertSlot } from "../../../services/api/users-management.service";
import { DaySchedule, SlotData } from "../types/profile.type";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const useSlotManagement = () => {
  const [loading, setLoading] = useState(false);
  const [slotDuration, setSlotDuration] = useState("30");
  const [notAvailableDates,setNotAvailableDates] = useState<string[]>([])
  const [schedule, setSchedule] = useState<Record<string, DaySchedule>>(
    DAYS.reduce((acc, day) => ({
      ...acc,
      [day]: {
        enabled: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].includes(day),
        start: "09:00 AM",
        end: "05:00 PM",
        breaks: [],
      },
    }), {} as Record<string, DaySchedule>)
  );


  useEffect(()=>{
    const loadDoctorSlot = async()=>{
      try {
        const response = await getSlot()
        console.log("Fetched Slot Data:", response.data);
        const scheduleData = response.data?.schedule || response.data?.days;
        if (scheduleData) {
          console.log("Schedule from API:", scheduleData);
          setSchedule((prevSchedule) => {
            const newSchedule = { ...prevSchedule };
            Object.keys(scheduleData).forEach((day) => {
              if (newSchedule[day]) {
                newSchedule[day] = {
                  ...newSchedule[day],
                  ...scheduleData[day],
                  breaks: Array.isArray(scheduleData[day].breaks) 
                    ? scheduleData[day].breaks 
                    : []
                };
              }
            });
            return newSchedule;
          });
        }
        if (response.data) {
          setSlotDuration(response.data.slotDuration ?? slotDuration)
          setNotAvailableDates(response.data.unavailableDates ?? notAvailableDates)
        }

      } catch (error) {
        toast.error(error.data?.message)
        console.log("Error",error)
      }
    }
    loadDoctorSlot()
  },[])

  const updateDay = (day: string, updates: Partial<DaySchedule>) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], ...updates },
    }));
  };

  const toggleDay = (day: string) => {
    updateDay(day, { enabled: !schedule[day].enabled });
  };

  const updateTime = (day: string, type: "start" | "end", value: string) => {
    updateDay(day, { [type]: value });
  };

  const addBreak = (day: string) => {
    const newBreak = { start: "01:00 PM", end: "02:00 PM" };
    updateDay(day, { breaks: [...schedule[day].breaks, newBreak] });
  };

  const removeBreak = (day: string, index: number) => {
    const newBreaks = [...schedule[day].breaks];
    newBreaks.splice(index, 1);
    updateDay(day, { breaks: newBreaks });
  };

  const updateBreak = (day: string, index: number, type: "start" | "end", value: string) => {
    const newBreaks = [...schedule[day].breaks];
    newBreaks[index] = { ...newBreaks[index], [type]: value };
    updateDay(day, { breaks: newBreaks });
  };

  const copyToAllDays = (sourceDay: string) => {
    const sourceSchedule = schedule[sourceDay];
    const newSchedule = { ...schedule };
    
    DAYS.forEach((day) => {
      if (day !== sourceDay) {
        newSchedule[day] = {
          ...sourceSchedule,
          enabled: true, 
          breaks: [...sourceSchedule.breaks], 
        };
      }
    });

    setSchedule(newSchedule);
    toast.success(`Schedule from ${sourceDay} copied to all days`);
  };

  const saveSlotSettings = async (unavailabledates?: Date[]) => {
    setLoading(true);
    const unavailableDates = unavailabledates?.map((date)=>date.toDateString())
    
    try {
      const slotData: SlotData = {
        schedule,
        slotDuration,
        unavailableDates,
      };

      console.log('---------------------->',slotData)
      
      await upsertSlot(slotData);
      toast.success("Work hours saved successfully");
    } catch (error) {
      console.error("Failed to save slot settings:", error);
      toast.error("Failed to save slot settings");
    } finally {
      setLoading(false);
    }
  };

  return {
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
    notAvailableDates
  };
};
