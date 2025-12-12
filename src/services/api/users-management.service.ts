
import axios from "axios";
import { fetusForm, SymptomsData } from "../../features/adminMain/types";
import {  DoctorBooksSlotsWithPageCount, drAppoinmentingData, drProfile, IuploadFileResponse, ProfileData, SlotData } from "../../features/doctorMain/types/profile.type";
import { IDoctor } from "../../features/dr.registration/slice/doctorSlice";
import { APIResponse } from "../types/api.response";
import { axiosInstance } from "./auth.service";

// doctor apis
export const updateProfileDR = async (data:ProfileData):Promise<APIResponse<IDoctor>>=>{
  const respose =   await axiosInstance.put<APIResponse<IDoctor>>('/users/doctor/profile/update',data)
  return respose.data
}

export const getDoctor = async():Promise<APIResponse<ProfileData>>=>{
  const response = await axiosInstance.get<APIResponse<ProfileData>>('/users/doctor/profile');
  return response.data
}


export const getSignedUrl = async(array:object[]):Promise<APIResponse<IuploadFileResponse[]>>=>{
     const response = await axiosInstance.post<APIResponse<IuploadFileResponse[]>>('/users/upload/signed-url',{array})
     return response.data
}

export const uploadFileToSignedUrl = async(signedUrl:string,file:File,contentType:string)=>{
    const response = await axios.put<APIResponse<Response>>(signedUrl,file,{
      headers:{
        "Content-Type":contentType
      }
     })

     return response
}

//user week api
export const getFetusWeekData = async (week:number):Promise<APIResponse<fetusForm>>=>{
    const response = await axiosInstance.get<APIResponse<fetusForm>>(`/users/super-admin/fetus/current-week/${week}`)

    return response.data
}



// admin apis
export const uploadImageToCloundinary = async(selectedFiles:File[]):Promise<string[]|undefined>=>{
  console.log("FROM UPLOAD TO CLOUDINARY ------------------------------->")
    if(selectedFiles.length === 0) return []
    const formData = new FormData()
    selectedFiles.forEach((file)=>{
        formData.append('images',file)
    })
    
    try {

        const response = await  axiosInstance.post<APIResponse<string[]>>(`/users/super-admin/upload/images`,formData,{headers:{"Content-Type":"multipart/form-data"}})
        console.log("Response",response.data)
        return response.data.data as string[]
    } catch (error) {
        console.log(error)
    }
}


export const fetusCreate = async(data: fetusForm):Promise<APIResponse<Response>>=>{
    const selectedFiles :File[]=[];
    selectedFiles.push(data.fetusFile!)
    selectedFiles.push(data.fruitFile!)

    if(selectedFiles.length > 0){
        const images = await uploadImageToCloundinary(selectedFiles)
        console.log('uploaded urls',images)
        data.fetusImage = images![0]
        data.fruitImage = images![1]
    }
    const response = await axiosInstance.post<APIResponse<Response>>('/users/super-admin/fetus/create',data);
    return response.data
}


export const getWeeks = async():Promise<APIResponse<fetusForm[]>>=>{
    const response = await axiosInstance.get<APIResponse<fetusForm[]>>('/users/super-admin/fetus/weeks');
    return response.data
}



export const fetusUpdate = async(data:fetusForm):Promise<APIResponse<Response>>=>{
    const selectedFiles :File[]=[];
    selectedFiles.push(data.fetusFile!)
    selectedFiles.push(data.fruitFile!)

    const hasBothFiles = data.fetusFile && data.fruitFile
    console.log("Both filess",hasBothFiles)

    if(hasBothFiles){
        const images = await uploadImageToCloundinary(selectedFiles)
        console.log('uploaded urls',images)
        data.fetusImage = data.fetusFile! ? images![0]:data.fetusImage
        data.fruitImage = data.fruitFile! ? images![1]:data.fruitImage
    }
    console.log("Updating data--->",data)
    const response = await axiosInstance.put<APIResponse<Response>>('/users/super-admin/fetus/update',data)
    return response.data
}



export const getAllDoctorsProfile = async():Promise<APIResponse<drProfile[]>>=>{
    const response = await axiosInstance.get<APIResponse<drProfile[]>>('/users/doctor/profile/allDoctors')
    return response.data
}



export const symptomsCreate = async (symptomData:SymptomsData):Promise<APIResponse<SymptomsData>>=>{
   const response = await axiosInstance.post<APIResponse<SymptomsData>>('/users/super-admin/symptoms/create',symptomData)
   return response.data
}


export const symptomsUpdate = async (symptomData:SymptomsData):Promise<APIResponse<SymptomsData>>=>{
   const response = await axiosInstance.put<APIResponse<SymptomsData>>('/users/super-admin/symptoms/update',symptomData)
   return response.data
}


export const AllWeekSymptoms = async ():Promise<APIResponse<SymptomsData[]>>=>{
   const response = await axiosInstance.get<APIResponse<SymptomsData[]>>('/users/super-admin/symptoms/weeks')
   return response.data
}

export const weekSymptoms = async(week:number):Promise<APIResponse<SymptomsData>>=>{
    const response = await axiosInstance.get<APIResponse<SymptomsData>>(`/users/super-admin/symptoms/current-week/${week}`)
    return response.data
}

export const upsertSlot = async(slotData:SlotData):Promise<APIResponse<SlotData>>=>{
    const resposne = await axiosInstance.post<APIResponse<SlotData>>('/users/doctor/slot/upsert',slotData)
    return resposne.data
}

export const getSlot = async ():Promise<APIResponse<SlotData>>=>{
    const response = await axiosInstance.get<APIResponse<SlotData>>('/users/doctor/slot')
    return response.data
}

// unused api
export const getAllDoctorAppoinmentData = async():Promise<APIResponse<drAppoinmentingData>>=>{
    const response = await axiosInstance.get<APIResponse<drAppoinmentingData>>('/users/doctor/profile/allAppoinments')
    return response.data
}

export const getAllDoctorsSlots = async (date:string=new Date().toString(),specialization:string="",skip:number):Promise<APIResponse<DoctorBooksSlotsWithPageCount>>=>{
    const response = await axiosInstance.get<APIResponse<DoctorBooksSlotsWithPageCount>>(`/users/book/slots?skip=${skip}&date=${date}&specialization=${specialization}`)
    return response.data
}