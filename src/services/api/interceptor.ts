
import { toast } from "sonner";
import {  userSelector } from "../../features/registration/slice/userSlice";
import { store } from "../../store/store";
import { axiosInstance } from "./auth.service";
import { doctorSelector } from "../../features/dr.registration/slice/doctorSlice";
import { APIResponse } from "../types/api.response";


export const interceptors = axiosInstance.interceptors.request.use(
    (config)=>{
        
        const state = store.getState()
        const user = userSelector(state)
        const doctor = doctorSelector(state)
        // console.log("Interceptor --<",user)
        if(user.accessToken && user.role==='user'){
            config.headers!.Authorization =`Bearer ${user.accessToken}`
        }else if(doctor.accessToken && doctor.role==='doctor'){
            config.headers!.Authorization = `Bearer ${doctor.accessToken}`
        }else if(user.role==='admin'){
            config.headers!.Authorization = `Bearer ${user.accessToken}`
        }
        return config

    },
    (error)=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use<APIResponse<Response>>(
    response => response,
    error => {
        if(error.response.status === 403){
            toast.error("Your time expired.Pls login again")
            window.location.href = '/'
        }else if(error.response.status===429){
            toast.error("Too many requests.try after some time")
        }else{
            console.log("ERROR >>>>>>>>>>>>>>>>-------------->>>>>>>>>>",error)
        }

        return Promise.reject(error)
    }
)