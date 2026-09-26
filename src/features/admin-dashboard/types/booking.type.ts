export interface AdminBookingStats {
  totalBookings: number;
  todayBookings: number;
  upcoming: number;
  completed: number;
  cancelled: number;
  refunded: number;
}

export interface AdminAppointment {
  bookingId: string;
  apmntId: string;
  userId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  consultationStatus: string;
  amount: number;
  isRecurring: boolean;
  notes: string;
}

export interface AdminBookingListResponse {
  appointments: AdminAppointment[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}
