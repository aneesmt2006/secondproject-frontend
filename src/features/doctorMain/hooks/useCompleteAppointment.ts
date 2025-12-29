import { useState, useEffect } from 'react';
import { addWeeks, addMonths, addYears, format } from 'date-fns';
import { AppointmentsDet, AppointmentCompletionData, PreviewDate } from '@/types/appointments.type';
import { completeAppointment } from '@/services/api/appoinment.service';

export const useCompleteAppointment = () => {
  // --- Modal Management State ---
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentsDet | null>(null);

  // --- Completion Logic State ---
  const [isRecurring, setIsRecurring] = useState(false);
  const [repeatValue, setRepeatValue] = useState(1);
  const [repeatUnit, setRepeatUnit] = useState('Months');
  const [totalVisits, setTotalVisits] = useState(1);
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [notes, setNotes] = useState('');
  const [previewDates, setPreviewDates] = useState<PreviewDate[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- External Handlers ---
  const handleOpen = (appointment: AppointmentsDet) => {
    setSelectedAppointment(appointment);
    if (appointment.appoinmentTime) setSelectedTime(appointment.appoinmentTime);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Optional: Reset internal state on close
    setTimeout(() => {
      setIsRecurring(false);
      setRepeatValue(1);
      setRepeatUnit('Months');
      setTotalVisits(1);
      setNotes('');
    }, 300);
  };

  // --- Background Scroll Locking ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // --- Date Calculation Logic ---
  useEffect(() => {
    if (!isRecurring) {
      setPreviewDates([]);
      return;
    }

    const dates: PreviewDate[] = [];
    const currentDate = new Date();
    const visits = Math.max(1, totalVisits);
    const interval_step = Math.max(1, repeatValue);
    
    for (let i = 1; i <= visits; i++) {
      let nextDate;
      const interval = i * interval_step;
      
      if (repeatUnit === 'Weeks') nextDate = addWeeks(currentDate, interval);
      else if (repeatUnit === 'Months') nextDate = addMonths(currentDate, interval);
      else nextDate = addYears(currentDate, interval);
      
      dates.push({
        id: i,
        display: format(nextDate, 'EEE, MMM dd, yyyy'),
        raw: format(nextDate, 'M/d/yyyy')
      });
    }
    setPreviewDates(dates);
  }, [isRecurring, repeatValue, repeatUnit, totalVisits]);

  // --- Submission Logic ---
  const handleSubmit = async () => {
    if (!selectedAppointment) return;

    const data: AppointmentCompletionData = {
      userId: selectedAppointment.userId,
      appointmentId: selectedAppointment.appointmentId,
      isRecurring,
      notes,
      time: selectedTime,
      previewDates: previewDates.map(d => d.raw)
    };

    try {
      setIsSubmitting(true);
      console.log("Sending completion data to backend:", data);
      const response = await completeAppointment(data);
      if (response.success) {
        console.log("Appointment successfully updated:", response.message);
        handleClose();
      }
    } catch (error) {
      console.error("Failed to complete appointment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Modal State
    isOpen,
    selectedAppointment,
    handleOpen,
    handleClose,
    
    // Completion Data & Actions
    isRecurring,
    setIsRecurring,
    repeatValue,
    setRepeatValue,
    repeatUnit,
    setRepeatUnit,
    totalVisits,
    setTotalVisits,
    selectedTime,
    setSelectedTime,
    notes,
    setNotes,
    previewDates,
    isSubmitting,
    handleSubmit
  };
};
