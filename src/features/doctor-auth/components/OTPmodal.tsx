import { useState, useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { OTPModalProps } from '../types/dr.types';

export default function OTPModal({ isOpen, onClose, onVerify, onResend }: OTPModalProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState(120);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTimer(120);
      setOtp(new Array(6).fill(''));
      setError('');
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');
    try {
      setTimeout(()=>{
        console.log("sending..")
      },3000)
       await onVerify(otpValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    try {
      const response = await onResend();
      if(response){
    setTimer(120);
      setOtp(new Array(6).fill(''));
      inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#0A0F3C]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#2C5DA9] to-[#0A0F3C] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#0A0F3C] mb-2">Verify OTP</h2>
          <p className="text-gray-600 text-sm">
            Enter the 6-digit code sent to<br />
            {/* <span className="font-semibold text-[#2C5DA9]">{phoneNumber}</span> */}
          </p>
        </div>

        <div className="mb-6">
          <div className="flex justify-center gap-2 mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg transition-all
                  ${digit ? 'border-[#2C5DA9] bg-[#C8DAF9]/20' : 'border-gray-300'}
                  focus:border-[#2C5DA9] focus:ring-2 focus:ring-[#2C5DA9]/20 focus:outline-none
                  ${error ? 'border-red-500' : ''}`}
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying || otp.some(d => !d)}
          className="w-full bg-gradient-to-r from-[#2C5DA9] to-[#0A0F3C] text-white py-3 rounded-lg font-semibold
            hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2 mb-6"
        >
          {isVerifying ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </button>

        <div className="text-center">
          {timer > 0 ? (
            <p className="text-gray-600 text-sm">
              Resend code in <span className="font-semibold text-[#2C5DA9]">{formatTime(timer)}</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-[#2C5DA9] font-semibold text-sm hover:underline disabled:opacity-50
                disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
            >
              {isResending ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Resending...
                </>
              ) : (
                'Resend OTP'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
