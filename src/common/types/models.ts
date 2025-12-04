export interface PregnantProfile {
  userId?: string;
  lmp: string;
  isFirstPregnancy: boolean;
  bloodGroup: string;
  height: string;
  weight: string;
  gestationalDiabetes: boolean;
  gestationalSugar: string;
  bloodPressure: boolean;
  bpReading: string;
  thyroidProblems: boolean;
  pcosPcod: boolean;
  takingSupplements: string;
  knownAllergies: string;
  familyRelated: string;
  otherHealthIssues: string;
  email?: string;
  dueDate?: string;
  currentWeek?: number;
}

export interface User extends PregnantProfile {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  status?: boolean;
  profileImage?: string;
}

export interface Doctor {
  id: string;
  full_name: string;
  email: string;
  specialization: string;
  location: string;
  fee: string;
  status: 'pending' | 'approved' | 'rejected' | 'blocked';
  total_appointments: number;
  avatar_url?: string;
  experience_years?: string;
  qualifications?: string[];
  bio?: string;
  doctorId?: string;
}

export interface Appointment {
  id: string;
  user_id: string;
  doctor_id: string;
  appointment_date: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}
