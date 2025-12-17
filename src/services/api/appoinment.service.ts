import { appoinmentConfirm, appoinmentSuccess, DoctorSlotsWithDuration } from "@/types/appointments.type"
import { axiosInstance } from "./auth.service"
import { APIResponse } from "../types/api.response"
import { SlotData } from "@/types/profile.type"




export const appoinmentCreate = async(data:appoinmentConfirm):Promise<APIResponse<appoinmentSuccess>>=>{
    const response = await axiosInstance.post<APIResponse<appoinmentSuccess>>('/appoinment/booking/create',data)
    return response.data
}

export const upsertSlot = async(slotData:SlotData):Promise<APIResponse<SlotData>>=>{
    const resposne = await axiosInstance.post<APIResponse<SlotData>>('/appoinment/doctor/slot/upsert',slotData)
    return resposne.data
}

export const getSlot = async ():Promise<APIResponse<SlotData>>=>{
    const response = await axiosInstance.get<APIResponse<SlotData>>('/appoinment/doctor/slot')
    return response.data
}

export const getDrAvailableSlots = async(doctorId:string,date:Date):Promise<APIResponse<DoctorSlotsWithDuration>>=>{
    const response = await axiosInstance.get<APIResponse<DoctorSlotsWithDuration>>(`/appoinment/book/slots?doctorId=${doctorId}&date=${date}`)
    return response.data
}











