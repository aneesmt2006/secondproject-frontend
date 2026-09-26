import { Navigate, Outlet, useLocation } from "react-router-dom"
import { userSelector } from "../features/patient-auth/slice/userSlice"
import { doctorSelector } from "../features/doctor-auth/slice/doctorSlice"
import { useAppSelector } from "../store/hooks"
import { BottomTabBar } from "../features/patient-dashboard/components/BottomTabBar"
import { NotificationModal } from "../features/patient-dashboard/components/NotificationModal"

export type TallowedRoles = "user" | "doctor" | 'admin'
export interface ProtectedLayoutProps {
  allowedRoles: TallowedRoles[]
}

const ProtectedLayout = ({ allowedRoles }: ProtectedLayoutProps) => {
  const user = useAppSelector(userSelector)
  const doctor = useAppSelector(doctorSelector)
  const location = useLocation()
  const isExcludedPath = 
    location.pathname === '/dashboard/chat' || 
    location.pathname === '/profile' || 
    location.pathname === '/dashboard/video';

  const isDoctorRoute = allowedRoles.includes('doctor');
  const currentUser = isDoctorRoute ? doctor : user;
  const loginRedirectPath = isDoctorRoute ? '/doctor/login' : '/login';

  if (!currentUser || !currentUser.accessToken) {
    return <Navigate to={loginRedirectPath} replace />
  }

  if (currentUser.role && !allowedRoles.includes(currentUser.role as TallowedRoles)) {
    return <Navigate to='/unauthorized' replace />
  }

  return (
   <>
     <Outlet /> 
     {allowedRoles.includes('user') && user.lmp && !isExcludedPath && <BottomTabBar />}
     {(allowedRoles.includes('user') || allowedRoles.includes('doctor')) && <NotificationModal />}
   </>
  )
}

export default ProtectedLayout;




