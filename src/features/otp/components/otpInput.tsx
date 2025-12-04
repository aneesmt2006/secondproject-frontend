import { Mail } from 'lucide-react'
import Button from '../../../components/Button'
import useOtp from '../hooks/useOtp'
import { OTPVerificationProps } from '../types/OTPverify.type'


const OtpInput:React.FC<OTPVerificationProps> = ({onVerify,onResendCode}) => {
    const {error,formatTime,handleChange,handleKeyDown,handlePaste,handleResendClick,handleSubmit,otp,timeLeft,inputRefs} = useOtp({onVerify,onResendCode})
  return (
    <>
    <div className="relative min-h-screen bg-cream flex items-center justify-center p-4 overflow-hidden">
  {/* Left side - Image stays fixed to the left */}
  <div className="absolute left-0 top-0 bottom-0 hidden lg:flex items-center">
    <img
      src="otp-background.png"
      alt="Pregnant woman"
      className="h-full w-auto object-cover"
    />
  </div>

  {/* Right side - Form stays centered */}
  <div className="relative z-10 w-full max-w-xl mx-auto">
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-cocoa">
          Verify Your Account
        </h1>
        <p className="text-lg md:text-xl text-lavender">
          Enter the 6-digit code sent to you email
        </p>
      </div>

      {/* Email Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-lilac bg-opacity-30 flex items-center justify-center">
          <Mail className="w-10 h-10 text-lavender" strokeWidth={1.5} />
        </div>
      </div>

      {/* OTP Input Boxes */}
      <div className="space-y-4">
        <div className="flex justify-center gap-2 md:gap-3">
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
              onPaste={index === 0 ? handlePaste : undefined}
              className={`
                w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
                text-2xl md:text-3xl font-bold text-center
                rounded-3xl border-3 transition-all duration-200
                ${error ? 'border-wine' : 'border-rose'}
                bg-white text-cocoa
                focus:outline-none focus:ring-4 focus:ring-rose focus:ring-opacity-20
                focus:border-rose focus:scale-105
              `}
              style={{ borderWidth: '3px' }}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-lavender text-sm">
              Code expires in{' '}
              <span className="font-semibold text-cocoa">
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <p className="text-wine text-sm font-semibold">
              Code expired. Please request a new one.
            </p>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-center text-wine text-sm">{error}</p>}

      {/* Helper Links */}
      <div className="text-center space-y-3">
        <div className="text-lavender">
          <span>Didn't receive </span>
          <button
            type="button"
            onClick={handleResendClick}
            disabled={timeLeft > 0}
            className={`font-semibold transition-colors duration-200 underline ${
              timeLeft > 0
                ? 'text-lilac cursor-not-allowed'
                : 'text-rose hover:text-wine'
            }`}
          >
            Resend Code
          </button>
        </div>
        {/* <div className="text-lavender">
          <span>Wrong email? </span>
          <button
            type="button"
            className="text-rose font-semibold hover:text-wine transition-colors duration-200 underline"
          >
            Change Email
          </button>
        </div> */}
      </div>

      {/* Verify Button */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="min-w-[240px]"
        >
          Verify
        </Button>
      </div>
    </form>
  </div>
</div>
    </>
  )
}

export default OtpInput