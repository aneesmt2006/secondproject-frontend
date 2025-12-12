// types/profile.type.ts
export interface CertificatePreview {
  id: string;
  name: string;
  url: string; // dataURL for preview / download
  type: string;
}

export interface ProfileData {
  doctorId?:string,
  specialization:string
  experience: string;
  address: string;
  profileImage?: string;
  profileImageLink?: string;
  registration: string;
  online_fee: string;
  certificates?: CertificatePreview[];
  certificateLinks?: string[];
  certificateFiles?: File[];
  profileImageFile?: File | null;
}

export interface drProfile {
  doctorId?:string,
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
    specialization:string,
    profileImageLink:string,
    online_fee:string,
    slots:{time:string,status:string}[],
    slotDuration:string
    address:string
}

export interface DoctorBooksSlotsWithPageCount {
   doctorSlots:DoctorBooksSlots[],
   pageCounts:number
}




export interface IuploadFileResponse {
  fileLink: string;
  signedUrl: string;
  
}

export interface IselectedFile {
  fileName: string;
  fileType: string;
}

export interface ProfileErrors {
  [key: string]: string;
}


export interface ProfileFormProps {
  formData: ProfileData;
  errors: ProfileErrors;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleImageUpload: (file: File) => void;

  handleCertificateUpload: (files: FileList | null) => void;

  handleRemoveCertificate: (name: string) => void;

  handleViewCertificate: (url: string, name: string) => void;

  onSubmit: (e: React.FormEvent) => void; // <-- form submit

  loading:boolean
}

export interface Break {
  start: string;
  end: string;
}

export interface DaySchedule {
  enabled: boolean;
  start: string;
  end: string;
  breaks: Break[];
}

export interface SlotData {
  schedule?: Record<string, DaySchedule>;
  days?: Record<string, DaySchedule>;
  slotDuration: string;
  unavailableDates?: string[];
}
