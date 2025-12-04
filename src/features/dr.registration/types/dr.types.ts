export interface Profile {
  experience: string;
  address: string;
  profileImageLink?: string;
  registration: string;
  online_fee: string;
  offline_fee: string;
  certificateLinks?: string[];
}

export interface drFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  specialization: string;
  role?:"doctor";
  clinicName: string;
  profile?:Profile
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  specialization?: string;
  clinicName?: string;
}


export interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<boolean>;
}

export interface DRregistrationProps extends OTPModalProps{
 onSubmit:(data:drFormData)=>Promise<boolean | null>
}

export interface useRegistrationProps {
    onSubmit:(data:drFormData)=>Promise<boolean | null>
}