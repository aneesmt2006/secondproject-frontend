import { Navigate, Outlet} from "react-router-dom"
import { userSelector } from "../features/registration/slice/userSlice"
import { useAppSelector } from "../store/hooks"
import { BottomTabBar } from "../features/userMain/components/BottomTabBar"
import { NotificationModal } from "../features/userMain/components/NotificationModal"

export type  TallowedRoles = "user" | "doctor" | 'admin'
export interface ProtectedLayoutProps {
  allowedRoles:TallowedRoles[]
}

const ProtectedLayout = ({allowedRoles}:ProtectedLayoutProps) =>{

  const user = useAppSelector(userSelector)

  if(!user.accessToken){
    return <Navigate to='/login' replace/>
  }

  if(!allowedRoles.includes(user.role as TallowedRoles)){
    return <Navigate to='/unauthorized' replace/>
  }

  return (
   <>
     <Outlet/> 
     {allowedRoles.includes('user') && (user.lmp && <BottomTabBar/>)}
     {(allowedRoles.includes('user') || allowedRoles.includes('doctor')) && <NotificationModal />}
   </>
  )
}

export default ProtectedLayout;


