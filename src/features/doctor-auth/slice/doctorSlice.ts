import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";

export interface IDoctor {
    role?: string;
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    specialization?: string;
    experience?: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    accessToken: string;
}

export interface IDoctorState {
    doctorData: IDoctor;
} 

const initialState: IDoctorState = {
   doctorData: {
    role: '',
    id: "",
    full_name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    createdAt: null,
    updatedAt: null,
    accessToken: ""
   }
}

export const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        setDoctorData: (state, action: PayloadAction<IDoctor>) => {
            state.doctorData = { ...action.payload };
        },
        setUpdateDoctorField: (state, action: PayloadAction<Partial<IDoctor>>) => {
            state.doctorData = { ...state.doctorData, ...action.payload };
        }
    }
});

export const { setDoctorData, setUpdateDoctorField } = doctorSlice.actions;
export const doctorSelector = (state: RootState) => state.doctor?.doctorData || state.doctor; // Fallback in case state.doctor is the data itself
export default doctorSlice.reducer;
