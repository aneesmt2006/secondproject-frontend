
import { toast } from "sonner"
import { drLoginAccount } from "../../../services/api/auth.service"
import Drlogin from "../components/Drlogin"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../../store/hooks"
import { setDoctorData } from "../../doctor-auth/slice/doctorSlice"
const DrloginPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const role:string="doctor"
    const onSubmit = async (email:string,password:string) =>{
      try {
         const response =   await drLoginAccount(email,password)
      dispatch(setDoctorData({ ...response.data!, role: 'doctor' }))
      toast.success(response.message)
      navigate('/doctor/dashboard',{replace:true})
      return true
      
      } catch (error: unknown) {
        // Safely extract server message — avoids crash if error has no response (e.g. network error)
        const message =
          (error as { response?: { data?: { message?: string } } })?.response?.data?.message
          || (error instanceof Error ? error.message : null)
          || 'Login failed. Please try again.';
        toast.error(message, { richColors: true });
        return false;
      }
    }
  return (
   <>
   <Drlogin handleSubmitLogin={onSubmit} role={role}/>
   </>
  )
}

export default DrloginPage

