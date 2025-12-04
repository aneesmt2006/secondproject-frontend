import { useEffect, useRef, useState } from "react";
import { OTPVerificationProps } from "../types/OTPverify.type";


const useOtp =({onVerify,onResendCode}:OTPVerificationProps) => {

    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
      const [error, setError] = useState<string>('');
      const [timeLeft, setTimeLeft] = useState<number>(0);
      const targetDelay=  60 * 2;
      const timeRef = useRef<NodeJS.Timeout | null>(null)
      const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    
      useEffect(() => {
        inputRefs.current[0]?.focus();
      }, []);
    
      useEffect(() => {
        
        const localStorageValue = localStorage.getItem('InitialTime')
        let  InitialTime : number
        if(localStorageValue){
           InitialTime = parseInt(localStorageValue!)
        }
        console.log("local vlaue",localStorageValue)

        timeRef.current =  setInterval(()=>{
           if((InitialTime+targetDelay)-Math.round((Date.now()/1000)) > 0){
         setTimeLeft((InitialTime+targetDelay)-Math.round((Date.now()/1000)))
        }else{
          setTimeLeft(0)
        }
          
        },1000)

       
     
        return ()=>clearInterval(timeRef.current!)
        
      },[]);
    
      const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
      };
    
      const handleResendClick = () => {
        setTimeLeft(120);
        onResendCode();
      };
    
      const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
          value = value.slice(-1);
        }
    
        if (!/^\d*$/.test(value)) {
          return;
        }
    
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');
    
        if (value && index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
    
        if (newOtp.every((digit) => digit !== '') && index === 5) {
          handleVerify(newOtp.join(''));
        }
      };
    
      const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
          if (!otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
          }
        } else if (e.key === 'ArrowLeft' && index > 0) {
          inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < 5) {
          inputRefs.current[index + 1]?.focus();
        }
      };
    
      const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
    
        if (!/^\d{6}$/.test(pastedData)) {
          setError('Please paste a valid 6-digit code');
          return;
        }
    
        const digits = pastedData.split('');
        setOtp(digits);
        inputRefs.current[5]?.focus();
    
        handleVerify(pastedData);
      };
    
      const handleVerify = (code: string) => {
        if (code.length !== 6) {
          setError('Please enter all 6 digits');
          return;
        }
        onVerify(code);
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleVerify(otp.join(''));
      }
  return {handleSubmit,otp,handleChange,handleKeyDown,error,timeLeft,formatTime,handleResendClick,handlePaste,inputRefs}
}

export default useOtp