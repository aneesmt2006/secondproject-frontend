import { Navigate, Outlet } from "react-router-dom";
import { doctorSelector } from "../features/doctor-auth/slice/doctorSlice";
import { useAppSelector } from "../store/hooks";
import { ProtectedLayoutProps, TallowedRoles } from "./protectedRoute";
import { NotificationModal } from "@/features/patient-dashboard/components/NotificationModal";

const ProtectedLayoutDR = ({ allowedRoles }: ProtectedLayoutProps) => {
  const { accessToken, role } = useAppSelector(doctorSelector);

  if (!accessToken) {
    return <Navigate to="/doctor/login" replace />;
  }

  if (!allowedRoles.includes(role as TallowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <>
      <Outlet />
      {(allowedRoles.includes("user") || allowedRoles.includes("doctor")) && (
        <NotificationModal />
      )}
    </>
  );
};

export default ProtectedLayoutDR;

