import { useRoutes } from "react-router-dom";
import LoginPage from "./features/login/pages/LoginPage";
import OtpVerifcationPage from "./features/otp/pages/otpVerifcationPage";
import SplashWithRegistration from "./features/registration/pages/splashWithRegistrationPage";
import DRregistrationPage from "./features/dr.registration/pages/dr.registrationPage";
import { Toaster } from "sonner";
import DrloginPage from "./features/dr.login/pages/DrloginPage";
// import DoctorDemo from "./pages/DoctorDemo";
import AdminLoginPage from "./features/adminLogin/Pages/LoginPage";
import AdminMainPage from "./features/adminMain/pages/mainPage";
import UserDashPage from "./features/userMain/pages/userDashPage";
import DoctorDashPage from "./features/doctorMain/pages/doctorDashPage";
import Profile from "./features/userMain/pages/profilePage";
import ProtectedLayout from "./utils/protectedRoute";
import DoctorProfile from "./features/doctorMain/pages/DoctorProfilePage";
import ProtectedLayoutDR from "./utils/protectedRouteDR";
import DoctorAppointmentsPage from "./features/doctorMain/pages/DoctorAppointmentsPage";
import MedicalRecordPage from "./features/doctorMain/pages/MedicalRecordPage";

import  "./services/api/interceptor";
import BabyInsightsPage from "./features/userMain/pages/BabyInsightsPage";
import SymptomsPage from "./features/userMain/pages/SymptomsPage";
import AppointmentPage from "./features/userMain/pages/AppointmentPage";

const App = () => {
  
  const routes = useRoutes([
    {
      path:'/',
      element:<SplashWithRegistration/>
    },
    {
      path:'/login',
      element:<LoginPage/>
    },
    {
      path:'/otp-verify',
      element:<OtpVerifcationPage/>
    },
    // USER ROUTES * PROTECTED
    {
      element:<ProtectedLayout allowedRoles={["user"]}/>,
      children:[
        { path:'/dashboard',element:<UserDashPage/>},
        {path:'/profile',element:<Profile/>},
        {path:'/dashboard/baby-insights',element:<BabyInsightsPage/>},
        {path:'/dashboard/symptoms',element:<SymptomsPage/>},
        {path:'/dashboard/appointment',element:<AppointmentPage/>}
      ]
    },
    // DOCTOR ROUTES * PROTECTED
    {
      element:<ProtectedLayoutDR allowedRoles={["doctor"]}/>,
      children:[
        {path:'/doctor/dashboard',element:<DoctorDashPage/>},
        {path:'/doctor/profile',element:<DoctorProfile/>},
        {path:'/doctor/appointments',element:<DoctorAppointmentsPage/>},
        {path:'/doctor/medical-record/:id',element:<MedicalRecordPage/>}
      ]
    },
    {
      path:'/check/dashboard',
      element:<UserDashPage/>
    },
    {
      path:'/doctor/register',
      element:<DRregistrationPage/>
    },
    {
      path:'/doctor/login',
      element:<DrloginPage/>
    },
    // {
    //   path:'/doctor/dashboard',
    //   element:<DoctorDashPage/>
    // }
    {
      path:'/super-admin/login',
      element:<AdminLoginPage/>
    },{
      path:'/super-admin/dashboard',
      element:<AdminMainPage/>
    },
    {
      path:'/check/dash',
      element:<UserDashPage/>
    }
   
  ])

 
  return (
    <>
    {routes}
    <Toaster position="top-center" />
    </>
  )
  
};

export default App;
