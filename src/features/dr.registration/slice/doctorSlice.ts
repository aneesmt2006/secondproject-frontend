import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store"; 

export interface IDoctor {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  role:string,
  password?: string;
  confirmPassword?: string;
  specialization: string;
  clinicName: string;
  accessToken:string;
  
}

export interface IDoctorState {
  doctorData: IDoctor;
}

const initialState: IDoctorState = {
  doctorData: {
    id: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
    specialization: "",
    clinicName: "",
    accessToken:""
  },
};

export const doctorSlice = createSlice({
    name:'doctor',
    initialState,
    reducers:{
        setDoctorData:(state,action:PayloadAction<IDoctor>)=>{
          // console.log("State data doctor",action.payload)
               state.doctorData = {...action.payload}
               console.log('state------>',state.doctorData)
        }
    }
})


export const {setDoctorData} = doctorSlice.actions
export const doctorSelector = (state:RootState)=>state.doctor.doctorData;
export default doctorSlice.reducer
