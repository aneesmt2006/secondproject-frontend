import { APIResponse } from "../types/api.response";
import { pregnantProfile, updatePayload } from "../../features/userMain/types/profile.type";
import { axiosInstance } from "./auth.service";
import { getUser } from "../../features/userMain/types/profile.type";
// import { IUser } from "../../features/registration/slice/userSlice";


export const updateProfile = async(data:updatePayload):Promise<APIResponse<getUser<Response>>>=>{
   console.log("Updation data from API",data)
   const response  =  await axiosInstance.put<APIResponse< getUser<Response>>>('/medical/patient/profile/update',data);
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





