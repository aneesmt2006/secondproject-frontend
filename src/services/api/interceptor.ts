import { toast } from "sonner";
import { setUpdateUserField, userSelector } from "../../features/patient-auth/slice/userSlice";
import { setDoctorData, doctorSelector } from "../../features/doctor-auth/slice/doctorSlice";
import { store } from "../../store/store";
import { axiosInstance } from "./auth.service";
import { APIResponse } from "../types/api.response";


axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const user = userSelector(state);
        const doctor = doctorSelector(state);

        if (user.accessToken && (user.role === 'user' || user.role === 'admin')) {
            config.headers!.Authorization = `Bearer ${user.accessToken}`;
        } else if (doctor.accessToken && doctor.role === 'doctor') {
            config.headers!.Authorization = `Bearer ${doctor.accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

const resolveQueue = (newToken: string) => {
    pendingRequests.forEach((callback) => callback(newToken));
    pendingRequests = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        console.log("What are the error contains---> ",error)
        console.log("What inside error.config---->",error.config)
        const originalRequest = error.config;

     
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // prevent infinite retry loop

            if (isRefreshing) {
               
                return new Promise((resolve) => {
                    pendingRequests.push((newToken: string) => {
                        originalRequest.headers!.Authorization = `Bearer ${newToken}`;
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                // Step 1: Call refresh endpoint (cookie is sent automatically 
                //         because axiosInstance has withCredentials: true)
                const refreshResponse = await axiosInstance.post<APIResponse<{ accessToken: string }>>(
                    '/account/auth/common/refresh'
                );
                console.log("refresh token ---->",refreshResponse)

                const newAccessToken = refreshResponse.data.data?.accessToken;

                if (!newAccessToken) throw new Error("No access token in refresh response");

                
                const state = store.getState();
                const user = userSelector(state);
                const doctor = doctorSelector(state);

                if (user.role === 'user' || user.role === 'admin') {
                    
                    store.dispatch(setUpdateUserField({ accessToken: newAccessToken }));
                } else if (doctor.role === 'doctor') {
                    store.dispatch(setDoctorData({ ...doctor, accessToken: newAccessToken }));
                }

                resolveQueue(newAccessToken);

                originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                pendingRequests = [];
                toast.error("Session expired. Please log in again.");
                toast.error("Session expired. Please log in againsssss.");

                // setTimeout(() => {
                //     window.location.href = '/';
                // }, 2000);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        
        if (error.response?.status === 429) {
            toast.error("Too many requests. Please try again later.");
        }

        return Promise.reject(error);
    }
);

