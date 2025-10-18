import { useState } from 'react';
import OnboardingScreen from './components/OnboardingScreen';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'registration' | 'main'>('onboarding');

  const handleOnboardingComplete = () => {
    setCurrentScreen('registration');
  };

  const handleRegistrationSubmit = (data: any) => {
    console.log('Registration data:', data);
    setCurrentScreen('main');
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
        />
      )}
      {currentScreen === 'main' && (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-cocoa mb-4">
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

export default App;
