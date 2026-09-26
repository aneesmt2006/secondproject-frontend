import { MsgFetchResponse } from "@/components/chat/types";
import { axiosInstance } from "./auth.service";

export const loadThreadMessages = async(id:string):Promise<MsgFetchResponse>=>{
    const response = await axiosInstance.get<MsgFetchResponse>(`/communication/chat/messages/${id}`)
    return response.data
}
