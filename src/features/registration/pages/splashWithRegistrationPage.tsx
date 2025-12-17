import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingScreen from '@/features/registration/components/OnboardingScreen';
import {  registerAccount } from "../../../services/api/auth.service";
import {  RegistrationData } from "../../../types/auth.type";
import RegisterForm from "../components/registerForm";
import { toast } from "sonner";
import { useGoogleAuthforRoles } from "../../../hooks/useGoogleAuth";
import { useAppDispatch } from "../../../store/hooks";


// import axios from "axios";


const SplashWithRegistration = () => {
   const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'registration' | 'main'>('onboarding');
    const [isLoad,setLoad] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // const selector = useSelector(useAppSelector);
    



  const handleOnboardingComplete = () => {
    setCurrentScreen('registration');
  };

  const handleRegistrationSubmit = async(data:RegistrationData) => {
    try {
      console.log('Registration data:', data);
      
    const response = await registerAccount(data)
      setLoad(!isLoad)

      
    if(response){
      console.log("Response--->",response)
      // dispatch(setUserData((response)))
      setTimeout(()=>{
          localStorage.setItem('email',response.data!)
          localStorage.setItem('InitialTime',`${Math.round((Date.now()/1000))}`)
          navigate('/otp-verify',{replace:true});
      },3000)
       
    }  
      
    // setCurrentScreen('main');
    } catch (error) {
      // alert(error.response.data.message)
      toast.error(error.response.data.message)
    }
  };


  const googleLogin = useGoogleAuthforRoles({
    role:'user',
    pathRedirect:'/dashboard',
    navigate,
    dispatch
  })


  return (
  <>
      {currentScreen === 'onboarding' && (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === 'registration' && (
        <RegisterForm
          onSubmit={handleRegistrationSubmit}
          onGoogleSignUp={googleLogin}
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
  )
}

export default SplashWithRegistration
