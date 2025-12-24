import { appoinmentConfirm, appoinmentSuccess, AppointmentsDet, DoctorSlotsWithDuration, AppointmentCompletionData, UserVisitHistory } from "@/types/appointments.type"
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

export const doctorPatients = async(date:string):Promise<APIResponse<AppointmentsDet[]>>=>{
    const response = await axiosInstance.get<APIResponse<AppointmentsDet[]>>(`/appoinment/booking/getDrappointments?date=${date}`);
    return response.data
}

export const completeAppointment = async(data: AppointmentCompletionData): Promise<APIResponse<any>> => {
    const response = await axiosInstance.post<APIResponse<any>>('/appoinment/booking/complete', data);
    return response.data;
}

export const getUserVisitHistory = async(): Promise<APIResponse<UserVisitHistory>> => {
    const response = await axiosInstance.get<APIResponse<UserVisitHistory>>('/appoinment/booking/user/history');
    return response.data;
}
