
import { toast } from "sonner";
import { otpVerify, resendOTP } from "../../../services/api/auth.service"
// import { useAppSelector } from "../../../store/hooks";
// import { userSelector } from "../../registration/slice/userSlice";
import OtpInput from "../components/otpInput"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {  setUserData, userSelector } from "../../registration/slice/userSlice";




const OtpVerifcationPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const statedata = useAppSelector(userSelector)
  // const selector = useAppSelector(userSelector);
  // console.log("From OTP apge",selector)
  const onVerify = async(code:string) =>{
   
   try {
    const  response =  await otpVerify(code,localStorage.getItem('email')!)
    
   if(response){
    console.log("OTP response-->",response)
    // dispatch(setUserData(response.data!))
    toast.success(response.message)
    // localStorage.clear()
    // selector
    dispatch(setUserData({
      full_name:response.data?.full_name??'',
      email:response.data?.email??'',
      id:response.data?.id??'',
      phone:response.data?.phone??'',
      role:response.data?.role,
      lmp:response.data?.lmp??'',
      dateOfBirth:response.data?.dateOfBirth??null,
      accessToken:response.data?.accessToken??'',
      createdAt:response.data?.createdAt??null,
      updatedAt:response.data?.updatedAt??null,
    }))

    console.log("state after update",statedata)
    await navigate('/dashboard',{replace:true})
   }
   
   } catch (error) {
    toast.error(error.response.data.message)
   }
  }

  const resendCode = async() =>{
       try {
         localStorage.setItem('InitialTime',`${Math.round((Date.now()/1000))}`)
        const response =  await resendOTP(localStorage.getItem('email')!)
        toast.success(response.message)
       } catch (error) {
        toast.error(error.response.data.message)
       }
  }
  return (
    <>
    <OtpInput onVerify={onVerify} onResendCode={resendCode} />
    </>
  )
}

export default OtpVerifcationPage