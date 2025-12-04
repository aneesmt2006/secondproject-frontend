import { toast } from 'sonner'
import { AdminLoginAccount } from '../../../services/api/auth.service'
import Drlogin from '../../dr.login/components/Drlogin'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks'
import { setUserData } from '../../registration/slice/userSlice'

const AdminLoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const role = "Admin"
    const onSubmit = async(email:string,password:string)=>{
         console.log(email,password)
         try {
            const response =  await AdminLoginAccount(email,password);
            toast.success(response.message)
            dispatch(setUserData(response.data!))
            navigate('/super-admin/dashboard',{replace:true})
            return true
         } catch (error: any) {
            console.log("ERROR admin login",error)
            toast.error(error.response?.data?.message || "Login failed");
            return false
         }
    }
  return (
    <>
    {/* Re used DR login componet for Admin login */}
    <Drlogin handleSubmitLogin={onSubmit} role={role}/> 
    </>
  )
}

export default AdminLoginPage