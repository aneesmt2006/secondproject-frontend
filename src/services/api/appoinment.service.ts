import { appoinmentConfirm, appoinmentSuccess, AppointmentsDet, DoctorSlotsWithDuration, AppointmentCompletionData, UserVisitHistory, DoctorDashboardStatsData } from "@/types/appointments.type"
import { axiosInstance } from "./auth.service"
import { APIResponse } from "../types/api.response"
import { SlotData } from "@/types/profile.type"
import { ChatContact } from "@/components/chat/types"

export const appoinmentCreate = async(data:appoinmentConfirm):Promise<APIResponse<appoinmentSuccess>>=>{
    const response = await axiosInstance.post<APIResponse<appoinmentSuccess>>('/appointment/booking/create',data)
    return response.data
}

export const upsertSlot = async(slotData:SlotData):Promise<APIResponse<SlotData>>=>{
    const resposne = await axiosInstance.post<APIResponse<SlotData>>('/appointment/doctor/slot/upsert',slotData)
    return resposne.data
}

export const getSlot = async ():Promise<APIResponse<SlotData>>=>{
    const response = await axiosInstance.get<APIResponse<SlotData>>('/appointment/doctor/slot')
    return response.data
}

export const getDrAvailableSlots = async(doctorId:string,date:Date):Promise<APIResponse<DoctorSlotsWithDuration>>=>{
    const response = await axiosInstance.get<APIResponse<DoctorSlotsWithDuration>>(`/appointment/book/slots?doctorId=${doctorId}&date=${date}`)
    return response.data
}

export const doctorPatients = async(status:string):Promise<APIResponse<AppointmentsDet[]>>=>{
    const response = await axiosInstance.get<APIResponse<AppointmentsDet[]>>(`/appointment/booking/getDrappointments?status=${status}`);
    return response.data
}

export const completeAppointment = async(data: AppointmentCompletionData): Promise<APIResponse<any>> => {
    const response = await axiosInstance.post<APIResponse<any>>('/appointment/booking/complete', data);
    return response.data;
}

export const getUserVisitHistory = async(userId?: string): Promise<APIResponse<UserVisitHistory>> => {
    console.log("User id ===? inside api call",userId)
    const url = userId ? `/appointment/booking/user/history?userId=${userId}` : '/appointment/booking/user/history';
    const response = await axiosInstance.get<APIResponse<UserVisitHistory>>(url);
    return response.data;
}

export const cancelAppointment = async(appointmentId: string): Promise<APIResponse<any>> => {
    const response = await axiosInstance.put<APIResponse<any>>('/appointment/booking/cancel', { appointmentId });
    return response.data;
}

export const bookedDoctors = async():Promise<APIResponse<ChatContact[]>> => {
    const response = await axiosInstance.get<APIResponse<ChatContact[]>>('/appointment/booked/doctors')
    return response.data
}

export const bookedPatients = async():Promise<APIResponse<ChatContact[]>> => {
    const response = await axiosInstance.get<APIResponse<ChatContact[]>>('/appointment/booked/patients') 
    return response.data
}


export const getDoctorDashboardStats = async(): Promise<APIResponse<DoctorDashboardStatsData>> => {
    const response = await axiosInstance.get<APIResponse<DoctorDashboardStatsData>>('/appointment/booking/doctor/stats');
    return response.data;
}

// Admin Booking Endpoints
import { AdminBookingStats, AdminBookingListResponse } from "@/features/admin-dashboard/types/booking.type";
import { AdminDashboardStatsData } from "@/features/admin-dashboard/types/adminDashboard.type";


export const getAdminBookingStats = async (): Promise<APIResponse<AdminBookingStats>> => {
  const response = await axiosInstance.get<APIResponse<AdminBookingStats>>("/appointment/booking/admin/booking-stats");
  return response.data;
};

export const getAdminBookingList = async (
  page: number = 1,
  limit: number = 10
): Promise<APIResponse<AdminBookingListResponse>> => {
  const response = await axiosInstance.get<APIResponse<AdminBookingListResponse>>(
    `/appointment/booking/admin/list?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getAdminDashboardStats = async (period: 'daily' | 'monthly' | 'yearly'): Promise<APIResponse<AdminDashboardStatsData>> => {
  const response = await axiosInstance.get<APIResponse<AdminDashboardStatsData>>(
    `/appointment/booking/admin/stats?period=${period}`
  );
  return response.data;
};
