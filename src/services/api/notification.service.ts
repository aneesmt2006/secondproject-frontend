import { axiosInstance } from "./auth.service";
import { APIResponse } from "../types/api.response";
import { INotification } from "../../types/notification.type";

export const getNotifications = async (): Promise<APIResponse<INotification[]>> => {
  const response = await axiosInstance.get<APIResponse<INotification[]>>("/notifications");
  return response.data;
};



export const markAllAsRead = async (): Promise<APIResponse<void>> => {
  const response = await axiosInstance.patch<APIResponse<void>>("/notifications/read-all");
  return response.data;
};
