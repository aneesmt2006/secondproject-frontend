import { Navigate, Outlet } from "react-router-dom"
import { userSelector } from "../features/patient-auth/slice/userSlice"
import { doctorSelector } from "../features/doctor-auth/slice/doctorSlice"
import { useAppSelector } from "../store/hooks"

const PublicRoute = () => {
  const user = useAppSelector(userSelector)
  const doctor = useAppSelector(doctorSelector)

  if (doctor && doctor.accessToken) {
    return <Navigate to="/doctor/dashboard" replace />
  }

  if (user && user.accessToken) {
    if (user.role === 'Admin' || user.role === 'admin') {
      return <Navigate to="/super-admin/dashboard" replace />
    }
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default PublicRoute;
