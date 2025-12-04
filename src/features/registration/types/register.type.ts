// import { RegistrationData } from "../../../types/auth.type";

import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";



export interface RegistrationData {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: string;
  role?: "user" ;
  profileImage?: string;
  profile?:Profile
}


export interface Profile {
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
}





export interface OTPVerificationProps {
  email?: string;
  onVerify: (otp: string) => void;
  onResendCode?: () => void;
}


export interface RegistrationFormProps {
  onSubmit: (data: RegistrationData) => void;
  onGoogleSignUp: () => void;
  isLoad: boolean;
}

export interface googleAuthError {
  error:string,
  error_description:string,
  error_uri?:string
}


export interface GoogleAuthResult {
  code?: string;
  scope?: string;
  authuser?: string;
  prompt?: string;
  error?: string;
  
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
  dispatch: ReturnType<typeof useAppDispatch>
}


