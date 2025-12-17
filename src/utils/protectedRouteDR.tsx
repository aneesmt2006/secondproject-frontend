import { Navigate, Outlet } from "react-router-dom"
import { doctorSelector } from "../features/dr.registration/slice/doctorSlice"
import { useAppSelector } from "../store/hooks"
import { ProtectedLayoutProps, TallowedRoles } from "./protectedRoute"


const ProtectedLayoutDR = ({allowedRoles}:ProtectedLayoutProps)=>{
  const {accessToken,role} = useAppSelector(doctorSelector)
   
  if(!accessToken){
    return <Navigate to='/doctor/login' replace/>
  }

  if(!allowedRoles.includes(role as TallowedRoles)){
    return <Navigate to='/unauthorized' replace/>
  }

  return <Outlet/>
}

export default ProtectedLayoutDR
