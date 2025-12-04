export interface OTPVerificationProps {
  email?: string;
  onVerify: (otp: string) => void;
  onResendCode: () => void;
}

