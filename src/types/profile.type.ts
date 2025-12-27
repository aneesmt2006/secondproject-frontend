
// Existing User Profile Types
export interface pregnantProfile {
  _id:string,
  userId: string;
  fullName: string;
  dateOfBirth: string;
  bloodGroup: string;
  height: string;
  weight: string;
  mobile: string;
  emergencyContact: string;
  email: string;

  // Medical History
  allergies?: string[];
  chronicConditions?: string[];
  pastSurgeries?: string[];
  familyHistory?: string[];

  // Pregnancy Specific
  lmp?: string; // Last Menstrual Period
  edd?: string; // Estimated Due Date
  currentWeek?: number;
  babyCrl?: number; // Crown-Rump Length
  babyWeight?: number;
  healthPeculiarity?: string;
  
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?:string
  isFirstPregnancy?: boolean;

  // Step 2 Medical Fields
  gestationalDiabetes?: boolean;
  gestationalSugar?: string;
  bloodPressure?: boolean;
  bpReading?: string;
  thyroidProblems?: boolean;
  pcosPcod?: boolean;
  takingSupplements?: string;
  knownAllergies?: string;
  familyRelated?: string;
  otherHealthIssues?: string;
}

export interface profileError {
  fullName?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  height?: string;
  weight?: string;
  mobile?: string;
  emergencyContact?: string;
  email?: string;
  lmp?: string;
  familyRelated?: string;
  knownAllergies?: string;
  takingSupplements?: string;
  otherHealthIssues?: string;
}

export interface updatePayload {
  fullName?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  height?: string;
  weight?: string;
  mobile?: string;
  emergencyContact?: string;
  email?: string;
  lmp?: string;
  isFirstPregnancy?: boolean;
  gestationalDiabetes?: boolean;
  gestationalSugar?: string;
  bloodPressure?: boolean;
  bpReading?: string;
  thyroidProblems?: boolean;
  pcosPcod?: boolean;
  takingSupplements?: string;
  knownAllergies?: string;
  familyRelated?: string;
  otherHealthIssues?: string;
  allergies?: string[];
  chronicConditions?: string[];
  pastSurgeries?: string[];
  familyHistory?: string[];
}

// Doctor Profile and Slot Types (Merged)

export interface CertificatePreview {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface IuploadFileResponse {
  key: string;
  signedUrl: string;
}

export interface IreadSignedUrl {
  readSignedUrl:string
}

export interface IselectedFile {
  fileName: string;
  fileType: string;
  signedUrl?: string; // Optional as it comes from response
  fileLink?: string;  // Optional as it comes from response
}

export interface ProfileData {
  _id?: string;
  userId?: string;
  doctorId?: string;
  
  fullName?: string;
  clinicName?: string;
  email?: string;
  phone?: string;
  
  specialization: string;
  experience: string | number; // Allow number for form handling, string for API if needed
  address: string;
  registration: string;
  online_fee: string | number;

  profileImage?: string; 
  profileImageLink?: string;
  profileImageFile?: File | null;

  certificates?: CertificatePreview[];
  certificateLinks?: string[];
  certificateFiles?: File[];
}

export interface drProfile {
  doctorId?:string,
  fullName?: string,
  clinicName?: string,
  specialization?:string,
  experience: string;
  address: string;
  profileImageLink?: string;
  registration: string;
  online_fee: string;
  certificateLinks?: string[];
}

export interface drBasicData {
  id?:string,
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  role?: "doctor";
  clinicName: string;
  status?:string
}

export interface drAppoinmentingData {
  id:string,
  fullName: string;
  email: string;
  specialization: string;
  role?: "doctor";
  clinicName: string;
  status?:string
}

export interface DoctorBooksSlots {
    doctorId:string,
    doctorName?: string,
    fullName?: string,
    clinicName?: string,
    specialization:string,
    profileImageLink:string,
    online_fee:string,
    slots:{time:string,status:string}[],
    slotDuration:string
    address:string
}

export interface DoctorProfileWithPageCounts {
  profiles : DoctorBooksSlots[],
  pageCounts:number
}



export interface ProfileErrors {
  fullName?: string;
  clinicName?: string;
  specialization?: string;
  experience?: string;
  address?: string;
  registration?: string;
  [key: string]: string | undefined;
}

export interface ProfileFormProps {
  formData: ProfileData;
  errors: ProfileErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (file: File) => void;
  handleCertificateUpload: (files: FileList | null) => void;
  handleRemoveCertificate: (name: string) => void;
  handleViewCertificate: (url: string, name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

// Slot Management
export interface SlotBreak {
  start: string;
  end: string;
}
// Alias for backwards compatibility if 'Break' was used
export type Break = SlotBreak; 

export interface DaySchedule {
  enabled: boolean;
  start: string;
  end: string;
  breaks: SlotBreak[];
}

export interface SlotData {
  schedule?: Record<string, DaySchedule>;
  days?: Record<string, DaySchedule>;
  slotDuration: string;
  unavailableDates?: string[];
}
