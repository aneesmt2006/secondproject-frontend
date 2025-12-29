import { APIResponse } from "../types/api.response";
import { pregnantProfile, updatePayload } from '@/types/profile.type';
import { axiosInstance } from "./auth.service";
import { Patient } from "@/types/medical.overveiew.type";

// import { IUser } from "../../features/registration/slice/userSlice";


export const updateProfile = async(data:updatePayload):Promise<APIResponse<pregnantProfile>>=>{
   console.log("Updation data from API",data)
   const response  =  await axiosInstance.put<APIResponse<pregnantProfile>>('/medical/patient/profile/update',data);
    return response.data
}


export const getUserProfile = async():Promise<APIResponse<pregnantProfile>>=>{
    const response = await axiosInstance.get<APIResponse<pregnantProfile>>('/medical/patient/profile',{withCredentials:true});
    
    return response.data 
}


export const getAllUserProfile = async():Promise<APIResponse<pregnantProfile[]>>=>{
    const response = await axiosInstance.get<APIResponse<pregnantProfile[]>>('/medical/admin/fetch/usersProfile',{withCredentials:true});
    return response.data 
}

export const getUserMedicalData = async(userId:string):Promise<APIResponse<Patient>>=>{
    const response = await axiosInstance.get<APIResponse<Patient>>(`/medical/patient/profile/medical-record?userId=${userId}`)
    return response.data
}





