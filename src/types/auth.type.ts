import { useNavigate } from "react-router-dom";

export interface RegistrationData {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: string;
  role?: "user" ;
  profilePhoto?: string;
}


export interface OTPVerificationProps {
  email?: string;
  onVerify: (otp: string) => void;
  onResendCode?: () => void;
}


export type googleAuthforRolesProps = {
  role:string,
  pathRedirect:string,
  navigate: ReturnType<typeof useNavigate>
}

export type lmp = {
  lmp:string
}


