
import { useState } from 'react';
import OnboardingScreen from '../components/OnboardingScreen';
import RegistrationForm from '../components/RegistrationForm';
import { registerAccount } from '../services/api/auth.service';
import { RegistrationData } from '../types/auth.type';
import { useNavigate } from 'react-router-dom';






const SplashwithRegisterPage = () => {
    const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'registration' | 'main'>('onboarding');
    const [isLoad,setLoad] = useState(false)
    const navigate = useNavigate()
    

  const handleOnboardingComplete = () => {
    setCurrentScreen('registration');
  };

  const handleRegistrationSubmit = async(data:RegistrationData) => {
    try {
      console.log('Registration data:', data);
    const response = await registerAccount(data)
    console.log(response)
      setLoad(!isLoad)
      navigate('/otp-verify',{replace:true})
    // setCurrentScreen('main');
    } catch (error) {
      alert(error)
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign-up initiated');
    setCurrentScreen('main');
  };

  return (
    <>
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === 'registration' && (
        <RegistrationForm
          onSubmit={handleRegistrationSubmit}
          onGoogleSignUp={handleGoogleSignUp}
          setLoad={setLoad}
          isLoad={isLoad}
          
        />
      )}
      {currentScreen === 'main' && (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className=" kooy text-4xl font-bold text-cocoa mb-4">
              Welcome to Your Pregnancy Journey
            </h1>
            <p className="text-xl text-lavender">
              Your personalized companion is ready to support you every step of the way.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SplashwithRegisterPage