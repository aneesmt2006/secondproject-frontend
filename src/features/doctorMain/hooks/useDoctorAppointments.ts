import { doctorPatients, cancelAppointment } from '@/services/api/appoinment.service';
import { AppointmentsDet } from '@/types/appointments.type';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export type AppointmentStatus = 'Upcoming' | 'Completed' | 'Canceled' | 'Emergency' | 'Recurring';

export interface PatientAppointment {
  id: string;
  patientName: string;
  patientAge: number;
  pregnancyWeek?: number;
  reason?: string;
  date: string;
  time: string;
  type: 'Online' | 'Offline';
  status: AppointmentStatus;
  avatarUrl?: string;
}

const mockAppointments: PatientAppointment[] = [
  {
    id: '1',
    patientName: 'Aisha Sharma',
    patientAge: 28,
    pregnancyWeek: 12,
    reason: 'First trimester check...',
    date: '2024-07-20',
    time: '10:00 AM',
    type: 'Online',
    status: 'Upcoming',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    patientName: 'Maya Devi',
    patientAge: 32,
    pregnancyWeek: 20,
    reason: 'Mid-pregnancy scan...',
    date: '2024-07-20',
    time: '11:30 AM',
    type: 'Offline',
    status: 'Upcoming',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    patientName: 'Priya Singh',
    patientAge: 25,
    pregnancyWeek: 30,
    reason: 'Third trimester consu...',
    date: '2024-07-21',
    time: '09:00 AM',
    type: 'Online',
    status: 'Upcoming',
    avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    patientName: 'Gauri Singh',
    patientAge: 31,
    pregnancyWeek: 18,
    reason: 'Dietary advice for pr...',
    date: '2024-07-22',
    time: '04:00 PM',
    type: 'Online',
    status: 'Upcoming',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    patientName: 'Rohan Das',
    patientAge: 45,
    reason: 'Cardiac follow-up',
    date: '2024-07-19',
    time: '02:00 PM',
    type: 'Online',
    status: 'Completed',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    patientName: 'Anita Roy',
    patientAge: 29,
    reason: 'Severe abdominal pa...',
    date: 'Today',
    time: 'NOW',
    type: 'Online',
    status: 'Emergency',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
];

export const useDoctorAppointments = () => {
  const [activeFilter, setActiveFilter] = useState<AppointmentStatus>('Upcoming');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [appointments, setAppointments] = useState<AppointmentsDet[]>();
  const [isLoading, setIsLoading] = useState(true);
  

  // const filteredAppointments = mockAppointments.filter(app => {
  //   // First Filter by Status
  //   const statusMatch = app.status === activeFilter;
  //   if (!statusMatch) return false;

  //   // Second: If 'Upcoming' is active and a date is selected, filter by date
  //   if (activeFilter === 'Upcoming' && selectedDate) {
  //     return app.date === selectedDate;
  //   }

  //   return true;
  // });

  const loadAppointmentPatients = async () => {
    try {
      setIsLoading(true);
      const response = await doctorPatients(selectedDate);
      console.log(response);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error loading appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppointmentPatients();
  }, [selectedDate]);

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

  const counts = {
    Upcoming: mockAppointments.filter(app => app.status === 'Upcoming').length,
    Completed: mockAppointments.filter(app => app.status === 'Completed').length,
    Canceled: mockAppointments.filter(app => app.status === 'Canceled').length,
    Emergency: mockAppointments.filter(app => app.status === 'Emergency').length,
    Recurring: mockAppointments.filter(app => app.status === 'Recurring').length,
  };

  return {
    activeFilter,
    setActiveFilter,
    selectedDate,
    setSelectedDate,
    appointments: appointments ?? [],
    counts,
    isLoading,
    handleCancelAppointment
  };
};
