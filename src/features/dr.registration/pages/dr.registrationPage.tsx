import { useState } from "react";
import DoctorRegistration from "../components/RegisterForm";
import { drFormData } from "../types/dr.types";
import {
  drOTPverify,
  drRegisterAccount,
  drResendOTP,
} from "../../../services/api/auth.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { setDoctorData } from "../slice/doctorSlice";

const DRregistrationPage = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleSubmit = async (data: drFormData) => {
    console.log("going to call api", data);
    try {
      const response = await drRegisterAccount(data);
      localStorage.setItem("DRemail", response.data as unknown as string);
      setOpen(!isOpen);
      toast.info(response.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error at dr register",error);
      return false;
    }
  };

  const onVerify = async (otp: string) => {
    console.log(otp);
    try {
      const response = await drOTPverify(otp, localStorage.getItem("DRemail")!);
      
      toast.success(response.message);
      dispatch(setDoctorData(response.data!))
      localStorage.clear();
      navigate("/doctor/dashboard", { replace: true });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onClose = () => {
    //    setOpen(!isOpen)
  };

  const onResend = async () => {
    try {
      const response = await drResendOTP(localStorage.getItem("DRemail")!);
      toast.info(response.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    }
  };
  return (
    <>
      <DoctorRegistration
        onVerify={onVerify}
        onClose={onClose}
        onResend={onResend}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default DRregistrationPage;
