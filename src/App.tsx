import { useRoutes, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import DoctorAppointmentsPage from "./features/doctor-dashboard/pages/DoctorAppointmentsPage";
import DoctorPatientsPage from "./features/doctor-dashboard/pages/DoctorPatientsPage";
import MedicalRecordPage from "./features/doctor-dashboard/pages/MedicalRecordPage";
import DoctorChatPage from "./features/doctor-dashboard/pages/DoctorChatPage";
import BabyInsightsPage from "./features/patient-dashboard/pages/BabyInsightsPage";
import BodyInsightsPage from "./features/patient-dashboard/pages/BodyInsightsPage";
import DosAndDontsPage from "./features/patient-dashboard/pages/DosAndDontsPage";
import SymptomsPage from "./features/patient-dashboard/pages/SymptomsPage";
import AppointmentPage from "./features/patient-dashboard/pages/AppointmentPage";
import ChatPage from "./features/patient-dashboard/pages/ChatPage";
import NutritionPage from "./features/patient-dashboard/pages/NutritionPage";
import SleepGuidePage from "./features/patient-dashboard/pages/SleepGuidePage";
import VideoCallPage from "./features/video-call/pages/VideoCallPage";
import ExercisePage from "./features/patient-dashboard/pages/ExercisePage";
import PublicRoute from "./utils/publicRoute";
import "./services/api/interceptor";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const routes = useRoutes([
    {
      element: <PublicRoute />,
      children: [
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
        {
          path: "/doctor/register",
          element: <DRregistrationPage />,
        },
        {
          path: "/doctor/login",
          element: <DrloginPage />,
        },
        {
          path: "/super-admin/login",
          element: <AdminLoginPage />,
        },
      ],
    },
    

    // USER ROUTES * PROTECTED
    {
      element: <ProtectedLayout allowedRoles={["user"]} />,
      children: [
        { path: "/dashboard", element: <UserDashPage /> },
        { path: "/profile", element: <Profile /> },
        { path: "/dashboard/baby-insights", element: <BabyInsightsPage /> },
        { path: "/dashboard/body-insights", element: <BodyInsightsPage /> },
        { path: "/dashboard/dos-and-donts", element: <DosAndDontsPage /> },
        { path: "/dashboard/symptoms", element: <SymptomsPage /> },
        { path: "/dashboard/appointment", element: <AppointmentPage /> },
        { path: "/dashboard/chat", element: <ChatPage /> },
        { path: "/dashboard/nutrition", element: <NutritionPage /> },
        { path: "/dashboard/sleep-guide", element: <SleepGuidePage /> },
        { path: "/dashboard/video", element: <VideoCallPage /> },
        { path: "/dashboard/exercise", element: <ExercisePage /> },
        
      ],
    },
    // DOCTOR ROUTES * PROTECTED
    {
      element: <ProtectedLayout allowedRoles={["doctor"]} />,
      children: [
        { path: "/doctor/dashboard", element: <DoctorDashPage /> },
        { path: "/doctor/profile", element: <DoctorProfile /> },
        { path: "/doctor/appointments", element: <DoctorAppointmentsPage /> },
        { path: "/doctor/medical-record/:id", element: <MedicalRecordPage /> },
        { path: "/doctor/chat", element: <DoctorChatPage /> },
        { path: "/doctor/video", element: <VideoCallPage /> },
        { path: "/doctor/patients", element: <DoctorPatientsPage /> },
      ],
    },
    {
      path: "/check/dashboard",
      element: <UserDashPage />,
    },
    // {
    //   path:'/doctor/dashboard',
    //   element:<DoctorDashPage/>
    // }
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
