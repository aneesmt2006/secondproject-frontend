import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";



// export interface  IProfile{
//       lmp: string,
//       isFirstPregnancy: boolean,
//       bloodGroup: string | null,
//       height: string | null,
//       weight: string | null,
//       gestationalDiabetes: boolean,
//       gestationalSugar: string | null,
//       bloodPressure: boolean,
//       bpReading: string | null,
//       thyroidProblems: boolean,
//       pcosPcod: boolean,
//       takingSupplements: string,
//       knownAllergies: string,
//       familyRelated: string,
//       otherHealthIssues: string,
//     }


export interface IUser{
    role?:string,
    id:string;
    full_name:string,
    email:string,
    lmp?:string,
    phone:string,
    data?:string,
    dateOfBirth:Date | null,
    createdAt:Date | null,
    updatedAt:Date | null,
    accessToken:string,
}



export interface IUserState {
    userData : IUser
} 
 const initialState : IUserState = {
   userData:{
    role:'',
    id:"",
    full_name:"",
    email:"",
    lmp:"",
    phone:"",
    dateOfBirth:null,
    createdAt:null,
    updatedAt:null,
    accessToken:""
   }
}


export const userSlice = createSlice({
    name:"user",
   initialState,
    reducers:{
        setUserData:(state,action:PayloadAction<IUser>)=>{
        
            state.userData = {...action.payload}
          
          console.log("state data",state.userData)
        },
        setUpdateUserField:(state,action:PayloadAction<Partial<IUser>>)=>{
            state.userData = {...state.userData,...action.payload}
        }
    }
})

export const {setUserData,setUpdateUserField} = userSlice.actions
export const userSelector = (state:RootState)=>state.user.userData
export default userSlice.reducer
