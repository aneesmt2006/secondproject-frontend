import { Navigate, Outlet, useLocation } from "react-router-dom"
import { userSelector } from "../features/patient-auth/slice/userSlice"
import { useAppSelector } from "../store/hooks"
import { BottomTabBar } from "../features/patient-dashboard/components/BottomTabBar"
import { NotificationModal } from "../features/patient-dashboard/components/NotificationModal"

export type  TallowedRoles = "user" | "doctor" | 'admin'
export interface ProtectedLayoutProps {
  allowedRoles:TallowedRoles[]
}

const ProtectedLayout = ({allowedRoles}:ProtectedLayoutProps) =>{

  const user = useAppSelector(userSelector)
  const location = useLocation()
  const isExcludedPath = 
    location.pathname === '/dashboard/chat' || 
    location.pathname === '/profile' || 
    location.pathname === '/dashboard/video';

  if(!user.accessToken){
    return <Navigate to='/login' replace/>
  }

  if(!allowedRoles.includes(user.role as TallowedRoles)){
    return <Navigate to='/unauthorized' replace/>
  }

  return (
   <>
     <Outlet/> 
     {allowedRoles.includes('user') && user.lmp && !isExcludedPath && <BottomTabBar/>}
     {(allowedRoles.includes('user') || allowedRoles.includes('doctor')) && <NotificationModal />}
   </>
  )
}

export default ProtectedLayout;



