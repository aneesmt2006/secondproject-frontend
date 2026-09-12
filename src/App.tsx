import { useRoutes } from "react-router-dom";
import LoginPage from "./features/patient-auth/pages/PatientLoginPage";
import OtpVerifcationPage from "./features/patient-auth/pages/OtpVerificationPage";
import SplashWithRegistration from "./features/patient-auth/pages/PatientRegisterPage";
import DRregistrationPage from "./features/doctor-auth/pages/DoctorRegistrationPage";
import { Toaster } from "sonner";
import DrloginPage from "./features/doctor-auth/pages/DoctorLoginPage";
// import DoctorDemo from "./pages/DoctorDemo";
import AdminLoginPage from "./features/admin-auth/Pages/AdminLoginPage";
import AdminMainPage from "./features/admin-dashboard/pages/AdminDashboardPage";
import UserDashPage from "./features/patient-dashboard/pages/PatientDashboardPage";
import DoctorDashPage from "./features/doctor-dashboard/pages/DoctorDashboardPage";
import Profile from "./features/patient-dashboard/pages/PatientProfilePage";
import ProtectedLayout from "./utils/protectedRoute";
import DoctorProfile from "./features/doctor-dashboard/pages/DoctorProfilePage";
import ProtectedLayoutDR from "./utils/protectedRouteDR";
import DoctorAppointmentsPage from "./features/doctor-dashboard/pages/DoctorAppointmentsPage";
import MedicalRecordPage from "./features/doctor-dashboard/pages/MedicalRecordPage";
import DoctorChatPage from "./features/doctor-dashboard/pages/DoctorChatPage";
import BabyInsightsPage from "./features/patient-dashboard/pages/BabyInsightsPage";
import SymptomsPage from "./features/patient-dashboard/pages/SymptomsPage";
import AppointmentPage from "./features/patient-dashboard/pages/AppointmentPage";
import ChatPage from "./features/patient-dashboard/pages/ChatPage";
import VideoCallPage from "./features/video-call/pages/VideoCallPage";
import "./services/api/interceptor";

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <SplashWithRegistration />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/otp-verify",
      element: <OtpVerifcationPage />,
    },
    
    // USER ROUTES * PROTECTED
    {
      element: <ProtectedLayout allowedRoles={["user"]} />,
      children: [
        { path: "/dashboard", element: <UserDashPage /> },
        { path: "/profile", element: <Profile /> },
        { path: "/dashboard/baby-insights", element: <BabyInsightsPage /> },
        { path: "/dashboard/symptoms", element: <SymptomsPage /> },
        { path: "/dashboard/appointment", element: <AppointmentPage /> },
        { path: "/dashboard/chat", element: <ChatPage /> },
        { path: "/dashboard/video", element: <VideoCallPage /> },
        
      ],
    },
    // DOCTOR ROUTES * PROTECTED
    {
      element: <ProtectedLayoutDR allowedRoles={["doctor"]} />,
      children: [
        { path: "/doctor/dashboard", element: <DoctorDashPage /> },
        { path: "/doctor/profile", element: <DoctorProfile /> },
        { path: "/doctor/appointments", element: <DoctorAppointmentsPage /> },
        { path: "/doctor/medical-record/:id", element: <MedicalRecordPage /> },
        { path: "/doctor/chat", element: <DoctorChatPage /> },
        { path: "/doctor/video", element: <VideoCallPage /> },

      ],
    },
    {
      path: "/check/dashboard",
      element: <UserDashPage />,
    },
    {
      path: "/doctor/register",
      element: <DRregistrationPage />,
    },
    {
      path: "/doctor/login",
      element: <DrloginPage />,
    },
    // {
    //   path:'/doctor/dashboard',
    //   element:<DoctorDashPage/>
    // }
    {
      path: "/super-admin/login",
      element: <AdminLoginPage />,
    },
    {
      path: "/super-admin/dashboard",
      element: <AdminMainPage />,
    },
    {
      path: "/check/dash",
      element: <UserDashPage />,
    },
  ]);

  return (
    <>
      {routes}
      <Toaster position="top-center" />
    </>
  );
};

export default App;
