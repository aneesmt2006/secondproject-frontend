import axios from "axios";
import { RegistrationData } from "../../types/auth.type";
import { IUser } from "../../features/registration/slice/userSlice";
import { APIResponse } from "../types/api.response";
import { drFormData } from "../../features/dr.registration/types/dr.types";
import { IDoctor } from "../../features/dr.registration/slice/doctorSlice";
import { User } from "../../features/adminMain/types";
import { drBasicData } from "../../features/doctorMain/types/profile.type";



const apiUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerAccount = async (accountData: RegistrationData) => {
  
    console.log("API frontend from register account :", accountData);
  const response = await axiosInstance.post<IUser>("/account/auth/register",accountData);
  
  return response.data;
  };

export const otpVerify = async (otp:string,email:string):Promise<APIResponse<IUser>>=> {
 
    console.log("OTP verify frontend ***hit***",{otp,email});
    const response = await axiosInstance.post<APIResponse<IUser>>("/account/auth/verify-otp",{otp,email});
    console.log("Response of OTP ",response)
    return response.data
 
}

export const resendOTP = async(email:string):Promise<APIResponse<Response>>=>{
    const response = await axiosInstance.post<APIResponse<Response>>('/account/auth/resend-otp',{email});
    return response.data
}

export const googleAuth = async(code:string,role:string):Promise<APIResponse<IUser>>=>{
   const response = await axiosInstance.get<APIResponse<IUser>>(`/account/auth/google?code=${code}&role=${role}`);
   return response.data
}

export const loginAccount = async(email:string,password:string):Promise<APIResponse<IUser>>=>{
    const response  = await axiosInstance.post<APIResponse<IUser>>('/account/auth/login',{email,password})
    return response.data
}

export const drRegisterAccount =async(data:drFormData):Promise<APIResponse<Response>>=>{
   const response = await axiosInstance.post<APIResponse<Response>>('/account/auth/dr/register',data);
   return response.data
}

export const drOTPverify = async(otp:string,email:string):Promise<APIResponse<IDoctor>>=>{
  const response = await axiosInstance.post<APIResponse<IDoctor>>('/account/auth/dr/verify-otp',{otp,email});
  return response.data
}

export const drResendOTP = async(email:string):Promise<APIResponse<Response>>=>{
    const respone = await axiosInstance.post<APIResponse<Response>>('/account/auth/dr/resend-otp',{email})
    return respone.data
}


export const drLoginAccount = async(email:string,password:string):Promise<APIResponse<IDoctor>>=>{
   const response = await axiosInstance.post<APIResponse<IDoctor>>('/account/auth/dr/login',{email,password})
   return response.data
}

export const AdminLoginAccount = async(email:string,password:string):Promise<APIResponse<IUser>>=>{
  const response = await axiosInstance.post<APIResponse<IUser>>('/account/auth/admin/login',{email,password})
  return response.data
}


export const getAllUsers = async ():Promise<APIResponse<User[]>>=>{
    const response = await axiosInstance.get<APIResponse<User[]>>('/account/auth/admin/getAllUsers')
    return response.data
}

export const getAllDoctors = async():Promise<APIResponse<drBasicData[]>>=>{
  const response = await axiosInstance.get<APIResponse<drBasicData[]>>('/account/auth/admin/getAllDoctors');
  return response.data
}

export const updateDoctorStatus = async(id:string,status:string):Promise<APIResponse<Response>>=>{
  const response = await axiosInstance.put<APIResponse<Response>>(`/account/auth/admin/updateDoctorStatus/${id}`,{status})
  return response.data
}


export const updateUserStatus = async(id:string,status:boolean):Promise<APIResponse<User>>=>{
  const response = await axiosInstance.put<APIResponse<User>>(`/account/auth/admin/updateUserStatus/${id}`,{status})
  return response.data
}





