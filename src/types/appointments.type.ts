export interface doctorBooking {
  doctorId: string;
  name: string;
  specialty: string;
  qualification: string;
  location: string;
  image: string;
  rating: number;
  availability: string; // e.g., "Available Today, 4:00 PM"
  tags: string[];
  consultationFee: number;
  
}

export interface appoinmentConfirm {
  userId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  amount: number;
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
  slots:DoctorSlots[],
  slotDuration:number
}
