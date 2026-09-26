import { doctorPatients, cancelAppointment } from '@/services/api/appoinment.service';
import { AppointmentsDet } from '@/types/appointments.type';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export type AppointmentStatus = 'Upcoming' | 'Completed' | 'Canceled' | 'Recurring';

export const useDoctorAppointments = () => {
  const [activeFilter, setActiveFilter] = useState<AppointmentStatus>('Upcoming');
  const [appointments, setAppointments] = useState<AppointmentsDet[]>();
  const [isLoading, setIsLoading] = useState(true);
  
  const loadAppointmentPatients = async () => {
    try {
      setIsLoading(true);
      const response = await doctorPatients(activeFilter);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error loading appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointmentPatients();
  }, [activeFilter]);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const response = await cancelAppointment(appointmentId);
      if (response.success) {
        toast.success("Appointment canceled successfully");
        await loadAppointmentPatients();
      } else {
        toast.error(response.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      toast.error("An error occurred while canceling the appointment");
    }
  };

  const counts = {}; // Hiding numerical counts as per requirement

  return {
    activeFilter,
    setActiveFilter,
    appointments: appointments ?? [],
    counts,
    isLoading,
    handleCancelAppointment
  };
};
