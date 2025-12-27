import { SymptomsData, LogSymptomsPayload } from "@/features/adminMain/types"
import { axiosInstance } from "./auth.service"
import { APIResponse } from "../types/api.response"



export const symptomsCreate = async (symptomData:SymptomsData):Promise<APIResponse<SymptomsData>>=>{
   const response = await axiosInstance.post<APIResponse<SymptomsData>>('/tracking/super-admin/symptoms/create',symptomData)

   return response.data
}


export const symptomsUpdate = async (symptomData:SymptomsData):Promise<APIResponse<SymptomsData>>=>{
   const response = await axiosInstance.put<APIResponse<SymptomsData>>('/tracking/super-admin/symptoms/update',symptomData)
   return response.data
}


export const AllWeekSymptoms = async ():Promise<APIResponse<SymptomsData[]>>=>{
   const response = await axiosInstance.get<APIResponse<SymptomsData[]>>('/tracking/super-admin/symptoms/weeks')
   return response.data
}

export const weekSymptoms = async(week:number):Promise<APIResponse<SymptomsData>>=>{
    const response = await axiosInstance.get<APIResponse<SymptomsData>>(`/tracking/super-admin/symptoms/current-week/${week}`)
    return response.data
}

export const logDailySymptoms = async(data:LogSymptomsPayload):Promise<APIResponse<any>>=>{
    const response = await axiosInstance.post<APIResponse<any>>('/tracking/user/symptoms/log',data)
    return response.data
}