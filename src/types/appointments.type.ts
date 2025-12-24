export interface doctorBooking {
  fullName: string;
  doctorId: string;
  specialty: string;
  qualification: string;
  location: string;
  image: string;
  rating: number;
  availability: string; // e.g., "Available Today, 4:00 PM"
  tags: string[];
  consultationFee: number;
  clinicName: string;
}

export interface appoinmentConfirm {
  userId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  amount: number;
  isRecurring?: boolean;
}

export interface appoinmentSuccess {
  appointmentId: string;
  status: string;
  amount: number;
}

export interface DoctorSlots {
  time: string;
  status: string;
}

export interface DoctorSlotsWithDuration {
  slots: DoctorSlots[];
  slotDuration: number;
}

export interface AppointmentsDet {
  reason: string;
  type: "Offline";
  fullName: string;
  week: number;
  age: number;
  isFirstPregnancy?: boolean;
  trimester: string;
  appoinmentDate?: string;
  appoinmentTime?: string;
  consultationStatus?: string;
  userId?: string;
  appointmentId?: string;
}

export interface PreviewDate {
  id: number;
  display: string;
  raw: string;
}

export interface UserAppointment {
  appointmentId: string;
  doctorName: string;
  specialization: string;
  appoinmentDate: string;
  appoinmentTime: string;
  reason: string;
  notes?: string;
  status: 'Completed' | 'Upcoming' | 'Cancelled' | 'Scheduled';
  doctorImage?: string;
  hospitalName?: string;
}

export interface UserVisitHistory {
  upcoming: UserAppointment | null;
  history: UserAppointment[];
}

export interface AppointmentCompletionData {
  userId?: string;
  appointmentId?: string;
  isRecurring: boolean;
  notes: string;
  time: string;
  previewDates: string[];
}
